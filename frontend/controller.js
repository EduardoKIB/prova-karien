const livros = []; 
function GetLivros(req, res) { 
res.json(livros); 
} 
function GetLivrosByTitulo(req, res) {
const { titulo } = req.params; 
const livros = livros.find(v => v.titulo === titulo);
    if (livros) { 
    res.json(livros); 
    } else {
    res.status(404).json({ message: 'Livro não encontrado.' });
    } 
} 
function createLivros(req, res) { 
const { titulo, autor, genero, ano } = req.body; 

const livros = { titulo, autor, genero, ano };
    livros.push(livros); 
    res.status(201).json({ message: 'Livro cadastrado com sucesso.' }); 
} 

function updateLivros(req, res) { const { titulo } = req.params; 
    const { autor, genero, ano } = req.body; 
    const livros = livros.find(v => v.titulo === titulo); 
    if (livros) { 
        livros.autor= autor|| livros.autor; 
        livros.genero = genero || livros.genero; 
        livros.ano = ano || livros.ano; 
        res.json({ message: 'Informações do livro atualizadas com sucesso.' }); 
        } else { 
        res.status(404).json({ message: 'Livro não encontrado.' }); 
        } 
} 

function deleteLivros(req, res) { 
    const { titulo } = req.params; 
    const livrosIndex = livros.findIndex(v => v.titulo === titulo); 
        if (livrosIndex !== -1) { 
            livros.splice(livrosIndex, 1); 
        res.json({ message: 'Livro excluído com sucesso.' }); 
        } else { 
        res.status(404).json({ message: 'Livro não encontrado.' }); 
} 
} 

module.exports = { GetLivros, GetLivrosByTitulo, createLivros, updateLivros, deleteLivros};
