const {Router} = require('express')
const NivelController = require('../controllers/NivelController')

const router =Router()

router.get('/niveis', NivelController.pegaTodasOsNiveis)
router.get('/niveis/:id', NivelController.buscaNivel)
router.post('/niveis',  NivelController.criaNivel)
router.post('/niveis/:id/restaura',  NivelController.restauraNivel)

router.put('/niveis/:id',  NivelController.atualizaNivel)
router.delete('/niveis/:id',  NivelController.deletaNiveis)

module.exports = router