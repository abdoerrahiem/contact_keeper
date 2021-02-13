const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../config/db')

router.post(
  '/',
  [
    check('name', 'Nama tidak boleh kosong.').not().isEmpty(),
    check('email', 'Email tidak valid.').isEmail(),
    check('password', 'Password harus minimal 6 karakter.').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const { errors } = validationResult(req)
    if (errors.length > 0) return res.status(400).json({ errors })

    const { name, email, password } = req.body

    try {
      let existingUser = await db('users').where({ email }).first()
      if (existingUser)
        return res.status(400).json({ msg: 'Email telah digunakan.' })

      const passwordHashed = await bcrypt.hash(password, 10)

      let user = await db('users').insert({
        name,
        email,
        password: passwordHashed,
      })

      user = await db('users').where({ id: user }).first()

      const payload = {
        user: {
          id: user.id,
        },
      }

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '6h' },
        (err, token) => {
          if (err) throw err

          res.json({ token })
        }
      )
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error!')
    }
  }
)

module.exports = router
