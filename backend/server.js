const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server terhubung di port ${PORT}`))
