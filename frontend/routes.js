const express = require('express'); 
const router = express.Router(); 

const controller = require('./controller'); 
router.get('/livros', controller.getLivros); 
router.get('/livros/:titulo', controller.getLivrosByTitulo); 
router.post('/livros', controller.createLivros); 
router.put('/livros/:titulo', controller.updateLivros); 
router.delete('/livros/:titulo', controller.deleteLivros); 

module.exports = router;
