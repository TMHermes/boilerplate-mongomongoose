require('dotenv').config();

let mongoose = require('mongoose');

const mySecret = process.env['MONGO_URI']

mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true });

let Person;

let personSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number
    },
    favoriteFoods: {
      type: [String]
    }
});

Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let tiago = new Person({
    name: 'Tiago',
    age: 29,
    favoriteFoods: ['Strogonoff', 'Parmiggiana', 'Carbonara']
  });

  tiago
    .save(function(err, data) {
      if (err) return console.log(err);
      done(null, data)
    });
};

let arrayOfPeople = [
    {name: 'Bia', age: 27, favoriteFoods: ['Sushi', 'Milanesa', 'Fries']}, 
    {name: 'Beto', age: 58, favoriteFoods: ['Esfiha', 'Pizza', 'Soup']}, 
    {name: 'Silvia', age: 55, favoriteFoods: ['Bread', 'Codfish', 'Fruits']}
  ];

const createManyPeople = function(arrayOfPeople, done) {
  Person.create(arrayOfPeople, function(err, data) {
      if (err) return console.log(err);
      done(null, people)
    });
};

const findPeopleByName = function(personName, done) {
  Person.find({name: personName}, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

const findOneByFood = function(food, done) {
  Person.findOne({favoriteFoods: [food]}, function (err, food) {
    if (err) return console.log(err);
    done(null, food);
  });
};

const findPersonById = function(personId, done) {
  Person.findById({_id: personId}, function (err, personId) {
    if (err) return console.log(err);
    done(null, personId);
  });
};

const findEditThenSave = function(personId, done) {
  const foodToAdd = "hamburger";

  Person.findById(personId, function(err, person) {
    person.favoriteFoods.push(foodToAdd);
    person.save(function(err, updatedPerson) {
      if (err) return console.log(err);
      done(null, updatedPerson);
    })
  })
};

const findAndUpdate = function(personName, done) {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if (err) return console.log(err);
    done(null, updatedDoc);
  })
};

const removeById = function(personId, done) {
  Person.findByIdAndRemove(personId, (err, removedDoc) => {
      if(err) return console.log(err);
      done(null, removedDoc);
  }); 
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  
  Person.remove({name: nameToRemove}, (err, removedDoc) => {
    if (err) return console.log(err);
    done(null, removedDoc);
  })
};

const queryChain = function(done) {
  const foodToSearch = "burrito";
  
  Person.find({favoriteFoods: foodToSearch})
  .sort({name: 'asc'})
  .limit(2)
  .select('-age')
  .exec(function(err, finalResult) {
    if (err) return console.log(err);
    done(null, finalResult);
  })
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
