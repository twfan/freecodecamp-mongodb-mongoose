require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});


const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: {type: String, required: true},
  age: {type: Number},
  favoriteFoods: [String]
});


const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const taufanErlangga = new Person({
    name: "Taufan Erlangga",
    age: "28",
    favoriteFoods: ["tahu", "tempe"]
  });

  taufanErlangga.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

let arrayOfPeople = [
  {name: "Sandy", age: 17, favoriteFoods:["bakso", "soup"]},
  {name: "Erwin", age: 25, favoriteFoods:["bakso"]},
  {name: "Tata", age: 12, favoriteFoods:["pizza"]}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people)=> {
    if (err) return console.log(err);
    done(null , people);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, personFound)=>{
    if (err) return console.log(err);
    done(null, personFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, personFound)=>{
    if (err) return console.log(err);
    done(null, personFound);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err, personFound)=>{
    if (err) return console.log(err);
    done(null, personFound);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id: personId}, (err, personFound)=>{
    if (err) return console.log(err);
    personFound.favoriteFoods.push(foodToAdd);
    personFound.save((err, updatedPerson)=>{
      if (err) return console.log(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc)=>{
    if (err) return console.log(err);
    done(null, updatedDoc);
  });

};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id: personId}, (err, removedDoc)=>{
    if (err) return console.log(err);
    done(null, removedDoc);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err,response)=>{
    if (err) return console.log(err);
    done(null, response);
  });

};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
