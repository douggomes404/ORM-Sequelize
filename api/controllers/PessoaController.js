// const database = require('../models');
// const Sequelize = require ('sequelize')
const {PessoasServices} = require('../services')

const pessoasServices = new PessoasServices()

class PessoaController {
    static async pegaPessoasAtivas(req,res){
        try{
            const pessoasAtivas = await pessoasServices.pegaRegistrosAtivos()
            res.status(200).json(pessoasAtivas)
        }catch(err){
            return res.status(500).json(err.message)
        }
    }
    static async pegaTodasAsPessoas(req,res){
        try{
            const todasAsPessoas = await pessoasServices.pegaTodosOsRegistros()
            return res.status(200).json(todasAsPessoas)
        }catch(err){
            return res.status(500).json(err.message)
        }
    }

    static async buscaPessoa(req,res){
        const {id} = req.params
        try {
            const pessoa = await pessoasServices.pegaUmRegistro(Number(id))
            return res.status(200).json(pessoa)
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }

    static async criaPessoa(req,res){
        const novaPessoa = req.body
        try {
            const novaPessoaCriada = await pessoasServices.criaRegistro(novaPessoa)
            return res.status(200).json(novaPessoaCriada)
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }

    static async atualizaPessoa(req,res){
        const {id} = req.params
        const pessoa = req.body
        try {
            await pessoasServices.atualizaRegistros(pessoa, Number(id))
            res.status(200).json(await pessoasServices.pegaUmRegistro(Number(id)))
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }

    static async deletaPessoas(req,res){
        const {id} = req.params
        try {
            await pessoasServices.apagaRegistro(Number(id))
            res.status(200).json({mensagem: `o id ${id} deletado.`})
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }

    static async restauraPessoa(req,res){
        const {id} = req.params
        try {
            await pessoasServices.restauraRegistro(Number(id))
            res.status(200).json({mensagem: `id ${id} restaurado`})
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

    static async restauraMatricula(req,res){
        const {estudanteId, matriculaId} = req.params
        try {
            await database.Matriculas.restore({
                where:
                    {id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }})
            res.status(200).json({mensagem: `id ${id} restaurado`})
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }

    static async pegaMatriculas(req,res){
        const {estudanteId} = req.params
        try {
            const pessoa = await database.Pessoas.findOne({where: {id: Number(estudanteId)}})
            const matriculas = await pessoa.getAulasMatriculadas()
            res.status(200).json(matriculas)
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }

    static async pegaMatriculasPorTurma(req,res){
        const {turmaId} = req.params
        try {
            const todasAsMatriculas = await database.Matriculas.findAndCountAll({
                where: {
                    turma_id: Number(turmaId),
                    status: 'confirmado'
                },
                limit: 10,
                order: [['estudante_id', 'ASC']]
            })
            res.status(200),json(todasAsMatriculas)
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }

    static async pegaTurmasLotadas(req,res){
        const lotacaoTurma = 2
        try {
            const turmasLotadas = await database.Matriculas.findAndCountAll({
                where: {
                    status: 'confirmado'
                },
                attributes: ['turma_id'],
                group: ['turma_id'],
                having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
            })
            res.status(200).json(turmasLotadas.count)
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }

    static async cancelaPessoa(req,res){
        const {estudanteId} = req.params
        try {
            await pessoasServices.cancelaPessoasEMatriculas(Number(estudanteId))
            res.status(200).json({message: `matriculas ref. estudante ${estudanteId} canceladas`})
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }
}


module.exports = PessoaController