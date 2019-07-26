router.post('/recovery', (req, res) => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; 
  let user = UserModel.findOne({ 'email': req.body.email });
  if (!user) return res.status(400).send('this email is not register'); 
  const token = jwt.sign({ email: req.body.email }, SECRET_JWT, { expiresIn: "48h" }) 
  const url = `http://localhost:3000/users/recoveryPass/${token}` 
  transporter.sendMail({ 
    from: "bootcampstream@gmail.com",
    to: req.body.email, 
    subject: "Reactive su contraseña", 
    html: ` 
     <h1>Recupere su contraseña</h1>

    <p>Por favor, para cambiar su contraseña pulse el siguiente link:
      <a href="${url}">
         Click aquí para activar tu cuenta
      </a>
    </p>
    ` 
  }).then(res.render('pass')) 
    .catch(console.log)
})

router.get('/recoveryPass/:token', (req, res) => { 
  res.render('recoveryPass') 
})

router.post('/recoveryPass/users/submitPass/:token', (req, res) => { 
  try {
    const token = req.headers.referer.split('/')[5];
    const email = jwt.verify(token, SECRET_JWT).email;
    const salt = bcrypt.genSalt(10);
    const hash = bcrypt.hash(req.body.password, salt);
    UserModel.findOneAndUpdate({ email }, { password: hash });
    res.render('submitPass')
  }
  catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
});