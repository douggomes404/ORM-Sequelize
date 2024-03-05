const database = require('../models')

class Services {
    constructor(nomeDoModelo){
        this.nomeDoModelo = nomeDoModelo
    }

    async pegaTodosOsRegistros() {
        return database[this.nomeDoModelo].findAll()
    }

    async pegaUmRegistro(id){
        return database[this.nomeDoModelo].findOne({ where: {id: id}})
    }

    async criaRegistro(dados){
        return await database[this.nomeDoModelo].create(dados)
    }

    async atualizaRegistro(dados, id, transacao = {}){
        return database[this.nomeDoModelo].update(dados, {where: {id:id}}, transacao)
    }

    async atualizaRegistros(dados, where, transacao = {}){
        return database[this.nomeDoModelo].update(dados, {where: {...where}}, transacao)
    }

    async apagaRegistro(id){
        return database[this.nomeDoModelo].destroy({where: {id:id}})
    }
}

module.exports = Services