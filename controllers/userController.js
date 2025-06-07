const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;
exports.getRegister =  (req, res) => {
    res.render('users/index');   

};

exports.postRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render('users/index', { errorMessage: 'Email já cadastrado' });
    }

    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = new User({ name, email, password: passwordHash });
    await user.save();

    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.render('users/index', { errorMessage: 'Erro ao registrar usuário, tente novamente.' });
  }
};


exports.getLogin = (req, res) => {

  res.render('users/login');
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.render('users/login', { errorMessage: 'Usuário não encontrado' });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.render('users/login', { errorMessage: 'Senha incorreta' });
  }

  req.session.user = user;
  res.redirect('/home');
};
