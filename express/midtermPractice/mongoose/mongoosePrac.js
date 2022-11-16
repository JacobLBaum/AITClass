const { links } = require('express/lib/response')
const mongoose = require('mongoose')

const PersonSchema = new mongoose.Schema({
    first: String,
    last: {type: String, required: true},   //passing object allows for more options on schema field
    height: Number
})

mongoose.model('Person', PersonSchema)      //specifies collection name as lowercase plural of word-people

const Person = mongoose.model('Person')     //retrieve a constructor from model
   
/*
const p = new Person({
    first: 'Jacob',
    last: 'Baum',
    height: 69,
    foo: 'bar'      //this does not show up because schema does not have foo as a field
})

p.save((err, savedPerson) => {
    console.log('err', err)
    console.log('saved person', savedPerson)
})
*/
const queryObj = {last: 'Baum'}
Person.find(queryObj, function(err, people, count) {
    console.log('err', err)
    console.log('people', people)
})



mongoose.connect('mongodb://localhost/ait-class11')     //mongodb://[hostName]/[databaseName]