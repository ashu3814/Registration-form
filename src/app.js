const express = require('express');
const app = express();
const port = 3000;
require('./db/db');
const path = require('path');
const empCollection = require('./model/model');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const authorization = require('./middleware/authorization');

const templatePath = path.join(__dirname, '../template/views');
app.set('view engine', 'hbs');
app.set('views', templatePath);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.render('signup');
});

app.get('/service', authorization , (req, res) => {
  //console.log(req.cookies.UserToken);
  res.render('service');
});


app.post('/empdata', async (req, res) => {
  try {
    const { name, email, phone, password, cpassword } = req.body;

    if (password === cpassword) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const empData = new empCollection({
        name: name,
        email: email,
        phone: phone,
        password: hashedPassword,
      });

      const token = await empData.createToken();

      res.cookie("UserToken", token, {
        expires: new Date(Date.now() + 50000),
        httpOnly: true
      });

      await empData.save();
      res.render('index');
    } else {
      res.send('Password not matched.....');
    }
  } catch (error) {
    res.send(error);
  }
});

app.get('/login', (req, res) => {
 
  res.render('login');
});

app.get('/logout', authorization, async(req,res) =>{
  try {
    res.clearCookie('UserToken');
    req.user.tokens = [];
    await req.user.save();
    res.render('login');
    
  } catch (error) {
    res.status(501).send(error);
    
  }

});

app.post('/loginPage', async (req, res) => {
  try {
    const { email, loginpassword } = req.body;

    const user = await empCollection.findOne({ email: email });
    const token = await user.createToken();

    res.cookie("UserToken", token, {
      expires: new Date(Date.now() + 50000),
      httpOnly: true
    });

   
    
  
    const isPasswordMatch =  bcrypt.compare(loginpassword, user.password);
    //console.log(isPasswordMatch);


    if (isPasswordMatch) {
      res.render('index');
    } else {
      res.send('Incorrect password');
    }
  } catch (error) {
    res.send(error);
  }
});



app.get('/index', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
