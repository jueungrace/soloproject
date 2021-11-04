const express = require('express');
const mongoose = require('mongoose');
const app = express();
const User = require('./models/userModels');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const MONGO_URI = 'mongodb+srv://grace:yun@cluster0.fs19l.mongodb.net/beanbook?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'beanbook'
})
  .then(() => console.log('Connected to Mongo DB'))
  .catch(err => console.log(err));

const PORT = 3000;

app.post('/signup', async (req, res, next) => {
  const { firstName, lastName, email, username, password } = req.body;
  console.log(req.body);
  if (!firstName || !lastName || !email || !username || !password ) {
    return next({ code: 422, error: "Please fill out the entire form" });
  }

  const user = await User.create(req.body);
  //await user.save();
  res.json({ code: 200, userID: user._id });

  // try {
  //   const user = await User.create(req.body);
  //   await user.save();
  //   res.send({ code: 200, userID: user._id });
  // } catch (err) {
  //   res.send(err);
  // }
});

app.post('/entry', async (req, res) => {
  try {
    const { id, entry } = req.body;
    const user = await User.findById(id);
    const { entries } = user;
    entries.push(entry);
    await user.save();
    res.send({ code: 200, userID: user._id });
  } catch (err) {
    res.send({error: "We're having issues with our database."})
  }
});

app.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  console.log(req.body);

  if (username == '' || password == '') {
    return next({ code: 422, error: 'Please provide both username and password' });
  }

  const user = await User.findOne({username});
  if (!user) return next({ code: 422, error: "Invalid login!"});

  bcrypt.compare(password, user.password, function(err, result) {
      console.log(result);
      if (err) return next({ code: 422, error: "Bcrypt err" })
      if (result == true) res.json({ code: 200, userID: user._id });
      else return next({ code: 422, error: "Wrong password!" });
  })
})

app.get('/user', async (req, res) => {
  try {
    const id = req.query.id;
    const user = await User.findById(id);
    const { firstName, entries } = user;
    res.status(200).json({ firstName, entries });
  } catch (err) {
    res.send(err);
  }
})

// app.get('/', (req, res) => {
//   res.send('this is the server');
// })

app.use(({ code=400, error }, req, res, next) => {
  res.status(code).send({ error });
})

app.listen(PORT, () => console.log('Listening on http://localhost:3000/'));