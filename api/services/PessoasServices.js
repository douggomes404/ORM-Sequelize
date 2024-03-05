const Services = require('./Services')
const database = require('../models')

class PessoasServices extends Services{
    constructor(){
        super('Pessoas')
        this.matriculas = new Services('Matriculas')
    }
    //métodos especificos do controlador de Pessoas
    async pegaRegistrosAtivos(param = {}){
        return database[this.nomeDoModelo].findAll({where:{...param}})
    }

    async pegaTodosOsRegistros(param = {}){
        return database[this.nomeDoModelo].scope('todos').findAll({where: {...param}})
    }

    async cancelaPessoasEMatriculas(estudanteId){
        return database.sequelize.transaction(async t =>{
            await super.atualizaRegistro({ativo: false}, estudanteId, {transaction: t})
            await this.matriculas.atualizaRegistros({status: 'cancelado'}, {estudante_id: estudanteId}, {transaction: t})
        })
    }

    async restauraRegistro(id){
        return await database.Pessoas.restore({where: {id: Number(id)}})
    }
}

module.exports = PessoasServices