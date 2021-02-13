const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const { auth_token } = req.headers

  if (!auth_token)
    return res.status(401).json({ msg: 'Silahkan login terlebih dahulu.' })

  try {
    const decoded = jwt.verify(auth_token, process.env.JWT_SECRET)
    req.user = decoded.user

    next()
  } catch (err) {
    res.status(401).json({ msg: 'Token tidak valid.' })
  }
}
