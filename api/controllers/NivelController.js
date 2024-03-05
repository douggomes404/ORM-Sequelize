const database = require('../models');

class NivelController {
    static async pegaTodasOsNiveis(req,res){
        try{
            const todasAsNiveis = await database.Niveis.findAll()
            return res.status(200).json(todasAsNiveis)
        }catch(err){
            return res.status(500).json(err.message)
        }
    }

    static async buscaNivel(req,res){
        const {id} = req.params
        try {
            const Nivel = await database.Niveis.findOne({ where: {id: Number(id)}})
            return res.status(200).json(Nivel)
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }

    static async criaNivel(req,res){
        const novaNivel = req.body
        try {
            const novaNivelCriada = await database.Niveis.create(novaNivel)
            return res.status(200).json(novaNivelCriada)
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }

    static async atualizaNivel(req,res){
        const {id} = req.params
        const nivel = req.body
        try {
            await database.Niveis.update(nivel, {where: {id: Number(id)}})
            res.status(200).json(await database.Niveis.findOne({where:{id:Number(id)}}))
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }

    static async deletaNiveis(req,res){
        const {id} = req.params
        try {
            await database.Niveis.destroy({where: {id: Number(id)}})
            res.status(200).json({mensagem: `o id ${id} deletado.`})
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }

    static async restauraNivel(req,res){
        const {id} = req.params
        try {
            await database.Niveis.restore({where: {id: Number(id)}})
            res.status(200).json({mensagem: `id ${id} restaurado`})
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }
}


module.exports = NivelController