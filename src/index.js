const express = require('express')
require('./db/mongoose')
require('dotenv').config();

const userRouter = require('./routers/user')
// const taskRouter = require('./routers/task')
// const User = require('./models/user')
const app = express()
const port = process.env.PORT
const cors = require('cors');

// Allow cross-origin requests from all domains (for development, you can restrict this in production)
app.use(cors());

app.use(express.json())
app.use(userRouter)
// app.post('/users', async (req, res) => {
//     try {
//         const newUser = new User(req.body);
//         await newUser.save();
//         res.status(201).json(newUser);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

