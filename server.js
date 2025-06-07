const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const session = require('express-session');
const app = express();

// Configurar o Session
app.use(session({
  secret: 'seuSegredoAqui',
  resave: false,
  saveUninitialized: false,   // melhor false para evitar criar sessão desnecessariamente
  cookie: {
    maxAge: 1000 * 60 * 60,  // 1 hora (60 min), agora está 60 segundos só, muito pouco
    httpOnly: true,
    secure: false             // se estiver em localhost, tem que ser false; em produção, true com HTTPS
  }
}));


// Conecta ao MongoDB
connectDB();

// Configurar EJS como template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para entender json e urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importar rotas
const routesUsers = require('./routes/userRoutes');
app.use('/', routesUsers);

const routesHome = require('./routes/homeRoutes');
app.use('/home', routesHome);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
