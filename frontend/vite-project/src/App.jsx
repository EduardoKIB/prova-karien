import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [livros, setLivros] = useState([]); // Lista de veículos
  const [formData, setFormData] = useState({
    titulo: '',
    Autor: '',
    genero: '',
    ano: ''
  });
  const [isEditing, setIsEditing] = useState(false); // Controla se estamos editando ou criando

  useEffect(() => {
    // Carrega os veículos ao montar o componente
    fetchLivros();
  }, []);

  const fetchLivros = async () => {
    try {
      const response = await axios.get('http://localhost:3000/livros');
      setLivros(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateLivros = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/livros', formData);
      setFormData({
        titulo: '',
        Autor: '',
        genero: '',
        ano: ''
      });
      fetchLivros();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateLivros = async e => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/livros/${formData.titulo}`, formData);
      setFormData({
        titulo: '',
        Autor: '',
        genero: '',
        ano: ''
      });
      setIsEditing(false);
      fetchLivros();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteLivros = async titulo => {
    try {
      await axios.delete(`http://localhost:3000/livros/${titulo}`);
      fetchlivros();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditLivro = livro => {
    setFormData({
      titulo: livro.titulo,
      Autor: livro.Autor,
      genero: livro.genero,
      ano: livro.ano
    });
    setIsEditing(true);
  };

  return (
    <div>
      <h1>Livros</h1>
      <form onSubmit={isEditing ? handleUpdateLivros : handleCreateLivros}>
        <label>
          Titulo:
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleInputChange}
            disabled={isEditing} // Desabilita a titulo durante a edição
          />
        </label>
        <label>
          Autor:
          <input
            type="text"
            name="Autor"
            value={formData.Autor}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Genero:
          <input
            type="text"
            name="genero"
            value={formData.genero}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Ano:
          <input
            type="text"
            name="ano"
            value={formData.ano}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">{isEditing ? 'Atualizar' : 'Cadastrar'}</button>
      </form>

      <ul>
        {livros.map(livro => (
          <li key={livro.titulo}>
            {livro.titulo} - {livro.Autor} - {livro.genero} - {livro.ano}
            <button onClick={() => handleEditLivro(livro)}>Editar</button>
            <button onClick={() => handleDeleteLivros(livro.titulo)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;