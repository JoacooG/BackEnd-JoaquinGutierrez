const express = require("express")
const app = express()
const mainRouter = require('./routes/index');
const { urlencoded } = require("express");
const puerto = 8080;

app.use(express.json());
app.use(express.urlencoded ({extended:true}));
app.use('/api', mainRouter);


app.listen(8080, () => {
  console.log(`Corriendo en el puerto ${puerto}`)
})
