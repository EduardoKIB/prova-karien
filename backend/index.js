const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Importando o pacote CORS

const app = express();

// Habilita CORS para todas as origens
app.use(cors());  // Ou você pode usar app.use(cors({ origin: 'http://localhost:5173' })) para limitar a origem

// Usando body-parser para entender o corpo das requisições em JSON
app.use(bodyParser.json());

const livros = [];

// Rota para obter todos os Livros
app.get('/livros', (req, res) => {
    res.json(livros);
});

// Rota para obter um Livro específico por titulo
app.get('/livros/:titulo', (req, res) => {
    const { titulo } = req.params;
    const livro = livros.find(v => v.titulo === titulo);
    if (livro) {
        res.json(livro);
    } else {
        res.status(404).json({ message: 'Livro não encontrado.' });
    }
});

// Rota para cadastrar um novo Livro
app.post('/livros', (req, res) => {
    const { titulo, autor, genero, ano } = req.body;
    const livro = { titulo, autor, genero, ano };
    livros.push(livro);
    res.status(201).json({ message: 'Livro cadastrado com sucesso.' });
});

// Rota para atualizar as informações de um Livro
app.put('/livros/:titulo', (req, res) => {
    const { titulo } = req.params;
    const { autor, genero, ano } = req.body;
    const livro = livros.find(v => v.titulo === titulo);
    if (livro) {
        livro.autor = autor || livro.autor;
        livro.genero = genero || livro.genero;
        livro.ano = ano || livro.ano;
        res.json({ message: 'Informações do Livro atualizadas com sucesso.' });
    } else {
        res.status(404).json({ message: 'Livro não encontrado.' });
    }
});

// Rota para excluir um Livro
app.delete('/livros/:titulo', (req, res) => {
    const { titulo } = req.params;
    const livroIndex = livros.findIndex(v => v.titulo === titulo);
    if (livroIndex !== -1) {
        livros.splice(livroIndex, 1);
        res.json({ message: 'Livro excluído com sucesso.' });
    } else {
        res.status(404).json({ message: 'Livro não encontrado.' });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});