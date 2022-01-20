"use strict";

const { createNewBillingJuno } = require("../../../Services/newBillingJuno");
const { getToken } = require("../../../Services/RefreshJunoToken/Handle");

const moment = require("moment");
const { getBillingJuno } = require("../../../Services/getBillingJuno");
const { getCredCardHash } = require("../../../Services/getCredCardHash");
const { createPayment } = require("../../../Services/payment");
const Env = use("Env");
class PaymentController {


  async logs({ request, response }) {
    console.log("novo pagamento", JSON.stringify(request.post()));
    const token = await getToken();
    const data = request.post();
    let payment;
    for (const charge of data.data) {
      const junoPayment = await getBillingJuno(
        token,
        charge.attributes.charge.id,
      );

      payment = await Payment.findByOrFail("juno_id", junoPayment.id);
      const student = await Student.find(payment.student_id);
      const user = await student.user().fetch();
      if (junoPayment.status === "PAID") {

      }

      payment.status = junoPayment.status;
      await payment.save();
    }
    return response.status(200).send({
      message: "ok",
    });
  }
  async store({ request, response }) {
    const { references, amount, user } = request.post()
    const dueDate = moment().add(3, "days").format("YYYY-MM-DD");
    const charge = {
      description: "Compra no app",
      references: [references],
      amount: amount,
      dueDate: dueDate,
      maxOverdueDays: 0,
      fine: 0,
      interest: "0.00",
      discountAmount: "0.00",
      discountDays: -1,
      paymentTypes: ["BOLETO", "CREDIT_CARD"],
      // pixKey: Env.get("PIX_KEY"), "BOLETO_PIX"
      paymentAdvance: true,
      split: [],
    };
    const billing = {
      name: user.name,
      document: user.cpf.toString().replace(/[^\d]+/g, ""),
      email: user.email,
      address: {
        street: user.address_street,
        number: user.address_number || "N/A",
        complement: user.address_complement,
        neighborhood: user.address_neighborhood,
        city: user.address_city,
        state: user.address_state,
        postCode: user.address_zip_code.toString().replace(/[^\d]+/g, ""),
      },
      phone: user.cell_phone.toString().replace(/[^\d]+/g, ""),
      birthDate: user.date_of_birth,
      notify: true,
    };
    const data = await createNewBillingJuno(
      charge,
      billing,
    );
    const { creditCardHash } = request.post();

    const res = await getCredCardHash(creditCardHash);

    if (res.status > 300) {
      console.log("error", res.data);
      return response.status(res.status).send(res.data);
    }
    // Cria um novo id para o cartão de crédito junto a juno
    const { creditCardId } = res.data;
    const { email, address } = billing
    return createPayment(data._embedded.charges[0].id, { email, address, "delayed": false }, creditCardId)

  }
}

module.exports = PaymentController;
