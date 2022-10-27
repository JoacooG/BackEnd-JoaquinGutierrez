const express = require("express")
const app = express()
const mainRouter = require('./routes/index');
const { urlencoded } = require("express");
const { engine } = require('express-handlebars');
const puerto = 8080;

app.use(express.json());
app.use(express.urlencoded ({extended:true}));
app.set('view engine', 'handlebars');
app.set('views', './views');
app.engine('handlebars', engine({
  layoutsDir: './views/layouts',
  defaultLayout: 'index.handlebars'
}))
app.use('/api', mainRouter);




app.listen(8080, () => {
  console.log(`Corriendo en el puerto ${puerto}`)
})
