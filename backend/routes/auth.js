const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const db = require('../config/db')

router.get('/', auth, async (req, res) => {
  try {
    const user = await db('users').where('id', req.user.id).first()

    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

router.post(
  '/',
  [
    check('email', 'Email tidak valid.').isEmail(),
    check('password', 'Password tidak boleh kosong.').exists(),
  ],
  async (req, res) => {
    const { errors } = validationResult(req)
    if (errors.length > 0) return res.status(400).json({ errors })

    const { email, password } = req.body

    try {
      let user = await db('users').where({ email }).first()
      if (!user) return res.status(404).json({ msg: 'User tidak ditemukan.' })

      const passwordMatch = await bcrypt.compare(password, user.password)

      if (!passwordMatch)
        return res.status(400).json({ msg: 'Email dan password tidak cocok.' })

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
      res.status(500).send('Server error')
    }
  }
)

module.exports = router
