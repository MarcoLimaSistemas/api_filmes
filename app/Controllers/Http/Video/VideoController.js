'use strict'

const { existAssociatedWithSale } = require("../../../Validators/Products/DestroyProduct")

const Video = use('App/Models/Video')
const Drive = use('Drive')
//Implementar endpoints para cadastro, edição e exclusão de produtos.
class VideoController {

    async index({ pagination, request }) {

        const videos = await Video.query()
            .paginate(
                pagination.page,
                pagination.perpage,
            )

        return videos
    }

    async store({ request }) {
        const body = request.post()

        const video = await Video.create(body)

        return video
    }

    async show({ params }) {

        const video = await Video.findOrFail(params.id)

        return video
    }

    async destroy({ params, response }) {
        const invalidFields = await existAssociatedWithSale(params.id)
        if (invalidFields.length > 0) {
            return response.status(400).send({
                error: invalidFields
            })
        }

        const video = await Video.findOrFail(params.id)

        await video.delete()
    }


    async update({ request, params }) {

        const body = request.post()

        const video = await Video.findOrFail(params.id)

        video.merge(body)

        await video.save()

        return video
    }



    async upload({ request, response, params }) {

        const validationOptions = {
            // types: ["jpeg", "jpg", "png"],
            size: "50mb",
        };
        request.multipart.file("video", validationOptions, async (file) => {
            // set file size from stream byteCount, so adonis can validate file size
            file.size = file.stream.byteCount;

            // catches validation errors, if any and then throw exception
            const error = file.error();
            if (error.message) {
                throw new Error(error.message);
            }
            const Key = `videos/test/${file.clientName}`;
            const ContentType = file.headers["content-type"];
            const ACL = "public-read";
            // upload file to s3
            const path = await Drive.put(Key, file.stream, {
                ContentType,
                ACL,
            });
            const video = await Video.find(params.videoid)
            video.url_link = path
            await video.save()
        });
        await request.multipart.process();
        return response.status(200).send({
            message: "Upload de fotos realizadas com sucesso",
            data: video,
        });
    }

}

module.exports = VideoController