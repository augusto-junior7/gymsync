const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // 1 conta por email
  },
  senha: {
    type: String,
    required: true,
    minlength: [3], // A senha deve ter pelo menos 3 caracteres
  },
});
