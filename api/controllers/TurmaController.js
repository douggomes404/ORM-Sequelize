const database = require('../models');

class TurmaController {
    static async pegaTodasAsTurmas(req,res){
        try{
            const todasAsTurmas = await database.Turmas.findAll()
            return res.status(200).json(todasAsTurmas)
        }catch(err){
            return res.status(500).json(err.message)
        }
    }

    static async buscaTurma(req,res){
        const {id} = req.params
        try {
            const turma = await database.Turmas.findOne({ where: {id: Number(id)}})
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