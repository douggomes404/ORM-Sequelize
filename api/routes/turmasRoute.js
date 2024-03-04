const {Router} = require('express')
const TurmaController = require('../controllers/TurmaController')

const router =Router()

router.get('/turmas', TurmaController.pegaTodasAsTurmas)
router.get('/turmas/:id', TurmaController.buscaTurma)
router.post('/turmas',  TurmaController.criaTurma)
router.put('/turmas/:id',  TurmaController.atualizaTurma)
router.delete('/turmas/:id',  TurmaController.deletaTurmas)

module.exports = router