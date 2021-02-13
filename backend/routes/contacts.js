const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')
const db = require('../config/db')

router.get('/', auth, async (req, res) => {
  try {
    const contacts = await db('contacts')
      .where({ user: req.user.id })
      .orderBy('created_at', 'desc')

    res.json(contacts)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: 'Server error' })
  }
})

router.post(
  '/',
  [
    auth,
    [
      check('name', 'Nama kontak harus diisi.').not().isEmpty(),
      check('email', 'Email tidak valid.').isEmail(),
      check('phone', 'Nomor HP harus diisi.').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const { errors } = validationResult(req)
    if (errors.length > 0) return res.status(400).json({ errors })

    const { name, email, phone, type } = req.body

    try {
      const existingEmail = await db('contacts')
        .where({
          user: req.user.id,
          email,
        })
        .first()

      const existingPhone = await db('contacts')
        .where({
          user: req.user.id,
          phone,
        })
        .first()

      if (existingEmail && existingPhone)
        return res.status(400).json({
          msg: 'Anda telah menambahkan kontak ini.',
        })
      if (existingEmail)
        return res.status(400).json({ msg: 'Email telah ada di kontak anda.' })
      if (existingPhone)
        return res
          .status(400)
          .json({ msg: 'Nomor HP telah ada di kontak anda.' })

      let contact = await db('contacts').insert({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      })

      contact = await db('contacts').where('id', contact).first()

      res.json(contact)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error!')
    }
  }
)

router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body

  try {
    let contact = await db('contacts').where('id', req.params.id).first()
    if (!contact)
      return res.status(404).json({ msg: 'Kontak tidak ditemukan.' })

    if (contact.user.toString() !== req.user.id.toString())
      return res
        .status(401)
        .json({ msg: 'Anda tidak bisa menghapus kontak ini.' })

    await db('contacts').where('id', req.params.id).update({
      name,
      email,
      phone,
      type,
    })

    res.json(contact)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error!')
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await db('contacts').where('id', req.params.id).first()
    if (!contact)
      return res.status(404).json({ msg: 'Kontak tidak ditemukan.' })

    if (contact.user.toString() !== req.user.id.toString())
      return res
        .status(401)
        .json({ msg: 'Anda tidak bisa menghapus kontak ini.' })

    await db('contacts').where('id', req.params.id).del()

    res.json({ msg: 'Kontak berhasil dihapus.' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error!')
  }
})

module.exports = router
