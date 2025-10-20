require('dotenv').config();
const jwt = require('jsonwebtoken');


const usuario = {
  id: 1,
  nome: 'a',
  email: 'a@exemplo.com'
};

// Gera o token com validade de 2 horas
const token = jwt.sign(
  { id: usuario.id, nome: usuario.nome, email: usuario.email },
  process.env.JWT_SECRET,
  { expiresIn: '2h' }
);

console.log('Seu token JWT é:\n');
console.log(token);