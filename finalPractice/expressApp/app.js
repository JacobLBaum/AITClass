const express = require('express')
const app = express()
app.set('view engine', 'hbs');
const path = require('path')
app.use(express.static(path.join(__dirname, 'public'))) //register static file serving middleware
const fs = require('fs')

app.use(express.urlencoded({ extended: false}))

const cors = require('cors');
app.use(cors());
app.use(express.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dma-sp22', {useNewUrlParser: true, useUnifiedTopology: true});

const MealSchema = new mongoose.Schema({
  food: {type: String, required: true, minLength: 3}
});
const Meal = mongoose.model('Meal', MealSchema);

app.options('/trackMeal', cors())

// TODO: add your route handler here

app.get('/', (req, res) => {
    
    
    res.json(Meal.find())
})

app.listen(3001);