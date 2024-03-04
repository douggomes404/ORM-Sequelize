const database = require('../models');

class PessoaController {
    static async pegaTodasAsPessoas(req,res){
        try{
            const todasAsPessoas = await database.Pessoas.findAll()
            return res.status(200).json(todasAsPessoas)
        }catch(err){
            return res.status(500).json(err.message)
        }
    }

    static async buscaPessoa(req,res){
        const {id} = req.params
        try {
            const pessoa = await database.Pessoas.findOne({ where: {id: Number(id)}})
            return res.status(200).json(pessoa)
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }

    static async criaPessoa(req,res){
        const novaPessoa = req.body
        try {
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
            return res.status(200).json(novaPessoaCriada)
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }

    static async atualizaPessoa(req,res){
        const {id} = req.params
        const pessoa = req.body
        try {
            await database.Pessoas.update(pessoa, {where: {id: Number(id)}})
            res.status(200).json(await database.Pessoas.findOne({where:{id:Number(id)}}))
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }

    static async deletaPessoas(req,res){
        const {id} = req.params
        try {
            await database.Pessoas.destroy({where: {id: Number(id)}})
            res.status(200).json({mensagem: `o id ${id} deletado.`})
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }

    //Matriculas
    static async buscaMatricula(req,res){
        const {estudanteId, matriculaId} = req.params
        try {
            const matricula = await database.Matriculas.findOne({ 
                where: {id: Number(matriculaId),
                estudante_id: Number(estudanteId)}})

            return res.status(200).json(matricula)
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }

    static async criaMatricula(req,res){
        const {estudanteId} = req.params
        const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) }
        try {
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula)
            return res.status(200).json(novaMatriculaCriada)
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }

    static async atualizaMatricula(req,res){
        const {estudanteId, matriculaId} = req.params
        const novasInfos = req.body
        try {
            await database.novasInfoss.update(novasInfos, {
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }})
            res.status(200).json(await database.Pessoas.findOne({where:{id:Number(matriculaId)}}))
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }

    static async deletaMatricula(req,res){
        const {estudanteId, matriculaId} = req.params
        try {
            await database.Matriculas.destroy({where: { id: Number(matriculaId) }})
            res.status(200).json({mensagem: `o id ${matriculaId} deletado.`})
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }
}


module.exports = PessoaController