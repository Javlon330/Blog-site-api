const router = require('express').Router()
const User = require('../models/User');
const bcrypt = require('bcrypt')

//register

router.post('/register', async (req, res) => {
  const user = new User(req.body)
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt)
  await user.save()
    .then(() => { console.log('Siz muvaffaqiyatli ro\'yxatdan o\'tdingiz') })
    .catch ((err) => {
      return res.status(500).json(err)
    })
  res.status(201).json(user)
})

//login

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({username: req.body.username})
    if(!user){
     return res.status(400).json("Wrong credentials")
    }
    const validate = await bcrypt.compare(req.body.password, user.password)
    if(!validate){
     return res.status(400).json("Wrong credentials")
    }
    const {password, ...other} = user._doc
    res.status(200).json(other)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router;