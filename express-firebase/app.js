require('dotenv').config();
const express = require('express');
const cors = require('cors');


const usersRouter = require('./routes/user');


const app = express();
app.use(cors());
app.use(express.json());


app.use('/users', usersRouter);


app.get('/', (req, res) => res.json({ ok: true, message: 'API Express + Firebase' }));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));