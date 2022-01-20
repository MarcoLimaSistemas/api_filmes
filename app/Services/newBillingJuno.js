const axios = require("axios");
const { getToken } = require("./RefreshJunoToken/Handle");
const Env = use("Env");
module.exports = {
  /**
      * A charge
      * @typedef {Object} Charge
      * @property {string} description - Nesse campo deverá ser inserido informações referentes a produtos, serviços e afins relacionados a essa cobrança
      * @property {string[]} references - Lista de references atrelada a cada cobrança gerada. O número de itens deve ser igual ao número de parcelas.
      * @property {number} amount - Valor total da parcela. O valor será aplicado para cada parcela. Se utilizado, não deverá ser utilizado
      * @property {date} dueDate - Data de vencimento.
      * @property {number} maxOverdueDays - Número de dias permitido para pagamento após o vencimento. Não disponível para BOLETO_PIX.    *
      * @property {number} fine - Multa para pagamento após o vencimento. Recebe valores de 0.00 a 20.00. Só é efetivo se maxOverdueDays for maior que zero. Não disponível para BOLETO_PIX.    *
      * @property {string} interest - Juros ao mês. Recebe valores de 0.00 a 20.00. Só é efetivo se maxOverdueDays for maior que zero. O valor inserido é dividido pelo número de dias para cobrança de juros diária. Não disponível para BOLETO_PIX.   *
      * @property {string} discountAmount -Valor absoluto de desconto. Não disponível para BOLETO_PIX.     *
      * @property {string} discountDays - Número de dias de desconto. Não disponível para BOLETO_PIX.     *
      * @property {string[]} paymentTypes - Tipos de pagamento permitidos BOLETO, BOLETO_PIX e CREDIT_CARD. Para checkout transparente, deve receber obrigatoriamente o tipo CREDIT_CARD    *
      * @property {boolean} paymentAdvance - Define se a cobrança, quando paga, terá sua liberação de seu valor de recebimento adiantada. Valido apenas para cartão de crédito. Se false, o pagamento não será antecipado.    *
      * @property {string[]} split - Divisão de valores de recebimento *
      * @property {number} installments - integer <int32> Número de parcelas.
      *  * A Address
      * @typedef {Object} Address
      * @property {string} street - Rua.*
      * @property {string} number - Número. Se não houver, envie N/A. *
      * @property {string} complement - Complemento. *
      * @property {string} neighborhood - Bairro. *
      * @property {string} city - Cidade *
      * @property {date} state - Estado em sigla de Unidade Federativa (UF). *
      * @property {number} postCode - Código de Endereçamento Postal no Brasil (CEP) *
      * A billing
      * @typedef {Object} Billing
      * @property {string} name - Nome do comprador.*
      * @property {string} document - CPF ou CNPJ do comprador. Envie sem ponto ou traço. *
      * @property {string} email - Email do comprador. *
      * @property {Address} address - Endereço. *
      * @property {string} phone - Telefone do comprador *
      * @property {date} birthDate - Data de nascimento do comprador *
      * @property {boolean} notify - Define se o compador receberá emails de notificação diretamente da Juno *

      *
     * @param {Charge} charge
     * @param {Billing} billing
     * @return {Promise<Object>} The string token
     */
  async createNewBillingJuno(charge, billing) {
    const token = await getToken()
    const options = {
      method: "POST",
      url: `${Env.get("JUNO_URL_API")}/charges`,
      headers: {
        "X-Api-Version": "2",
        "X-Resource-Token": Env.get("JUNO_PRIVATE_TOKEN"),
        Authorization: `Bearer ${token}`,
      },
      data: {
        charge,
        billing,
      },
    };
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return error.response.data;
    }
  },
};
