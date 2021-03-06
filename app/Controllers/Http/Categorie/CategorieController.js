'use strict'

const { existAssociatedProduct } = require("../../../Validators/Categories/DestroyCategorie")

const Category = use('App/Models/Category')
//Implementar endpoints para cadastro, edição e exclusão de categorias.
class CategorieController {

    async index({ pagination, request }) {
        // Implementar endpoint para listagem de categorias e os produtos dessas categorias 
        // com possibilidade de busca pelo nome da categoria ou de um produto que pertença a ela.

        const { query } = request.get()

        const preQuery = Category.query()
    
        const categories = await preQuery.paginate(
            pagination.page,
            pagination.perpage,
        )
        return categories
    }

    async store({ request, response }) {
        const body = request.post()

        const categorie = await Category.create(body)

        return response.created(categorie)
    }

    async show({ params }) {
        const categorie = await Category.findOrFail(params.id)

        return categorie
    }

    async update({ params, request }) {
        const categorie = await Category.findOrFail(params.id)

        categorie.merge(request.only(['name']))

        await categorie.save()

        return categorie
    }

    async destroy({ params }) {
        const invalidFields = await existAssociatedProduct(params.id)
        if (invalidFields.length > 0) {
            return { status: 400, error: invalidFields };
        }
        const categorie = await Category.findOrFail(params.id)

        await categorie.delete()
    }

}


module.exports = CategorieController