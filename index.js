const express = require('express');
const app = express();

// Lista de produtos para a API
const produtos = [
  { id: 1, nome: "Tênis", preco: 199.9, categoria: "Calçados" },
  { id: 2, nome: "Camiseta", preco: 79.9, categoria: "Roupas" },
  { id: 3, nome: "Mochila", preco: 149.9, categoria: "Acessórios" },
  { id: 4, nome: "Boné", preco: 49.9, categoria: "Acessórios" },
];

// Rota para listar todos os produtos
app.get('/produtos', (req, res) => {
  res.json(produtos);
});

// Rota para buscar produto por ID
app.get('/produtos/:id', (req, res) => {
  const produto = produtos.find(p => p.id === Number(req.params.id));
  res.json(produto);
});

// Rota para buscar produto por categoria (query params)
app.get('/produtos-busca', (req, res) => {
  const categoria = req.query.categoria;
  const resultado = produtos.filter(p => p.categoria === categoria);
  res.json(resultado);
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});