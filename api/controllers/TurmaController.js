// const database = require('../models')
// const Sequelize = require('sequelize')
// const Op = Sequelize.Op
const {TurmasServices} = require('../services')
const turmasServices = new TurmasServices()

class TurmaController {
    static async pegaTodasAsTurmas(req,res){
        const {data_inicial, data_final} = req.query
        const where = {}
        data_inicial || data_final ?  where.data_inicio = {} :null
        data_inicial ? where.data_inicio[Op.gte] = data_inicial : null
        data_final ? where.data_inicio[Op.lte] = data_final : null
        try{
            const todasAsTurmas = await database.Turmas.findAll({where})
            return res.status(200).json(todasAsTurmas)
        }catch(err){
            return res.status(500).json(err.message)
        }
    }

    static async buscaTurma(req,res){
        const {id} = req.params
        try {
            const turma = await turmasServices.pegaUmRegistro(Number(id))
            return res.status(200).json(turma)
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }

    static async criaTurma(req,res){
        const novaTurma = req.body
        try {
            const novaTurmaCriada = await database.Turmas.create(novaTurma)
            return res.status(200).json(novaTurmaCriada)
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }

    static async atualizaTurma(req,res){
        const {id} = req.params
        const turma = req.body
        try {
            await database.Turmas.update(turma, {where: {id: Number(id)}})
            res.status(200).json(await database.Turmas.findOne({where:{id:Number(id)}}))
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }

    static async deletaTurmas(req,res){
        const {id} = req.params
        try {
            await database.Turmas.destroy({where: {id: Number(id)}})
            res.status(200).json({mensagem: `o id ${id} deletado.`})
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }

    static async restauraTurma(req,res){
        const {id} = req.params
        try {
            await database.Turmas.restore({where: {id: Number(id)}})
            res.status(200).json({mensagem: `id ${id} restaurado`})
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }
}


module.exports = TurmaController