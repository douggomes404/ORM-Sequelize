const {Router} = require('express')
const PessoaController = require('../controllers/PessoaController')

const router =Router()

router.get('/pessoas', PessoaController.pegaPessoasAtivas)
router.get('/pessoas/todos', PessoaController.pegaTodasAsPessoas)
router.get('/pessoas/:id', PessoaController.buscaPessoa)
router.post('/pessoas', PessoaController.criaPessoa)
router.post('/pessoas/:id/restaura', PessoaController.restauraPessoa)
router.put('/pessoas/:id', PessoaController.atualizaPessoa)
router.delete('/pessoas/:id', PessoaController.deletaPessoas)
router.get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.buscaMatricula)
router.put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.atualizaMatricula)
router.post('/pessoas/:estudanteId/matricula/:matriculaId/restaura', PessoaController.restauraMatricula)
router.post('/pessoas/:estudanteId/matricula', PessoaController.criaMatricula)
router.delete('/pessoas/:estudanteId/matricula', PessoaController.deletaMatricula)


module.exports = router