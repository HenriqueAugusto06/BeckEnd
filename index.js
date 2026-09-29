const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors()); // Permite requisições do React
app.use(express.json()); // Permite receber dados JSON no corpo da requisição (Parte 1)

let produtos = [
  { id: 1, nome: "Tênis", preco: 199.9, categoria: "Calçados" },
  { id: 2, nome: "Camiseta", preco: 79.9, categoria: "Roupas" },
  { id: 3, nome: "Mochila", preco: 149.9, categoria: "Acessórios" },
  { id: 4, nome: "Boné", preco: 49.9, categoria: "Acessórios" },
];

// Rota GET /produtos
app.get('/produtos', (req, res) => {
  res.json(produtos);
});

// Parte 3: GET /produtos/:id com tratamento de erro 404
app.get('/produtos/:id', (req, res) => {
  const id = Number(req.params.id);
  const produto = produtos.find(p => p.id === id);

  if (!produto) {
    return res.status(404).json({ mensagem: "Produto não encontrado." });
  }

  res.json(produto);
});

// Partes 1 e 2: POST /produtos com validação (400)
app.post('/produtos', (req, res) => {
  const { nome, preco, categoria } = req.body;

  // Validação
  if (!nome || typeof nome !== 'string' || preco === undefined || typeof preco !== 'number') {
    return res.status(400).json({ 
      mensagem: "Dados inválidos! Forneça um 'nome' (texto) e um 'preco' (número)." 
    });
  }

  const novoId = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1;
  const novoProduto = { id: novoId, nome, preco, categoria: categoria || "Geral" };

  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});