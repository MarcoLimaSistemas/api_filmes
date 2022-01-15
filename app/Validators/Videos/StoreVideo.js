'use strict'

class StoreVideo {
  
  async fails (errorMessages) {
    return this.ctx.response.status(400).send(errorMessages)
  }

  get rules () {
    return {
      title: 'required|min:3|max:45|unique:videos',
      description: 'required|min:50',
      //Todo video cadastrado precisa obrigatoriamente pertencer a uma categoria.
      categorie_id: 'required|exists:categories,id',
      image_id: 'required|exists:images,id',
    }
  }


  get messages () {
    return {
      'title.required': 'Titulo é obrigatório.',
      'title.min': 'Titulo muito curto.',
      'description.min': 'Descrição muito curta.',
      'description.required': 'Descrição obrigatória',
      'title.unique': 'Video já cadastrado',
      'categorie_id.required': 'Todo video cadastrado precisa obrigatoriamente pertencer a uma categoria.',
      'image_id.required': 'Todo video cadastrado precisa obrigatoriamente ter uma imagem',
      'categorie_id.exists': 'Categoria inexistente',
      'image_id.exists': 'Imagem inexistente',
    }
  }
}

module.exports = StoreVideo
