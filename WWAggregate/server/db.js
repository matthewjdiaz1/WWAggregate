const sequelize = require('sequelize');
const faker = require('faker');
const _ = require('lodash');
const bcrypt = require('bcrypt');


const Conn = new sequelize(
  'testitem',
  'carforce',
  '',
  {
    dialect: 'postgres',
    host: 'localhost',
  }
);

const User = Conn.define('user', {
  email: { type: sequelize.STRING },
  password: { type: sequelize.STRING },
  firstName: { type: sequelize.STRING },
  lastName: { type: sequelize.STRING },
});
const Item = Conn.define('item', {
  name: { type: sequelize.STRING },
  barcode: { type: sequelize.STRING },
  barcodeType: { type: sequelize.STRING },
});
const Nutrition = Conn.define('nutrition', {
  calories: { type: sequelize.STRING },
  protein: { type: sequelize.STRING },
  sugar: { type: sequelize.STRING },
  carbohydrates: { type: sequelize.STRING },
});
const MealEntry = Conn.define('mealEntry', {
  userID: { type: sequelize.INTEGER },
  itemID: { type: sequelize.INTEGER },
  servingSize: { type: sequelize.STRING }, // TODO - investigate FLOAT here
  dateCreated: { type: sequelize.STRING },
  timeCreated: { type: sequelize.STRING },
});

// Relations
Item.hasOne(Nutrition);
// MealEntry.hasOne(User);
User.hasMany(MealEntry);
Item.hasMany(MealEntry);

//////////////////////// SEED 10 ITEMS W/ NUTRITION ////////////////////////
// force overrides existing tables
Conn.sync({ force: true }).then(() => {
  const today = new Date();
  const date = `${today.getFullYear()}-${(today.getMonth() + 1)}-${today.getDate()}`;
  const yesterdayDate = `${today.getFullYear()}-${(today.getMonth() + 1)}-${today.getDate() - 1}`;
  const time = `${today.getHours()}:${(today.getMinutes() + 1)}:${today.getSeconds()}`;

  _.times(10, () => {
    return bcrypt.hash(String(faker.random.number({ min: 0, max: 10 })), 10, (err, hash) => {
      return Item.create({
        name: faker.commerce.productName(),
        barcode: faker.random.number({ min: 10000000, max: 99999999 }),
        barcodeType: faker.hacker.abbreviation(),
      }).then(item => {
        item.createNutrition({
          calories: faker.random.number({ min: 50, max: 400 }),
          protein: faker.random.number({ min: 0, max: 30 }),
          sugar: faker.random.number({ min: 0, max: 60 }),
          carbohydrates: faker.random.number({ min: 0, max: 50 }),
        });
      }).then(() => {
        User.create({
          email: faker.internet.email().toLowerCase(),
          password: hash,
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
        }).then(user => {
          user.createMealEntry({
            itemId: faker.random.number({ min: 0, max: 10 }),
            servingSize: faker.finance.amount(0.1, 2, 1),
            dateCreated: date,
            timeCreated: time,
          });
        });
      }).catch(err => {
        console.log('db.js sync error:', err);
      });
    });
  });

  return bcrypt.hash('a', 10, (err, hash) => {
    return User.create({
      firstName: 'Matty',
      lastName: 'D.',
      email: 'a',
      password: hash,
    }).then(user => {
      _.times(2, () => {
        user.createMealEntry({
          itemId: faker.random.number({ min: 0, max: 10 }),
          servingSize: faker.finance.amount(0.1, 2, 1),
          dateCreated: date,
          timeCreated: time,
        });
      });
      _.times(2, () => {
        user.createMealEntry({
          itemId: faker.random.number({ min: 0, max: 10 }),
          servingSize: faker.finance.amount(0.1, 2, 1),
          dateCreated: yesterdayDate,
          timeCreated: time,
        });
      });
    }).catch(err => {
      console.log('db.js test user sync error:', err);
    });
  });
});

// export default Conn;
module.exports = Conn;
