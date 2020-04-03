const sequelize = require('sequelize');
const faker = require('faker');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { RDS } = require('./config');

const Conn = new sequelize(
  RDS.database,
  RDS.user,
  RDS.password,
  {
    dialect: 'postgres',
    host: RDS.host,
  },
);

const User = Conn.define('user', {
  email: { type: sequelize.STRING },
  password: { type: sequelize.STRING },
  status: { type: sequelize.STRING },
  jwt: { type: sequelize.STRING },
  firstName: { type: sequelize.STRING },
  lastName: { type: sequelize.STRING },
  createdAt: { type: sequelize.DATE },
  updatedAt: { type: sequelize.DATE },
});
const Item = Conn.define('item', {
  name: { type: sequelize.STRING },
  barcode: { type: sequelize.STRING },
  barcodeType: { type: sequelize.STRING },
  createdAt: { type: sequelize.DATE },
  updatedAt: { type: sequelize.DATE },
});
const Nutrition = Conn.define('nutrition', {
  calories: { type: sequelize.INTEGER },
  protein: { type: sequelize.INTEGER },
  carbohydrates: { type: sequelize.INTEGER },
  fat: { type: sequelize.INTEGER },
  sugar: { type: sequelize.INTEGER },
  createdAt: { type: sequelize.DATE },
  updatedAt: { type: sequelize.DATE },
});
const FoodEntry = Conn.define('foodEntry', {
  userId: { type: sequelize.INTEGER },
  itemId: { type: sequelize.INTEGER },
  itemName: { type: sequelize.STRING },
  servingSize: { type: sequelize.INTEGER }, // TODO - investigate FLOAT here
  servingUnit: { type: sequelize.STRING },
  dayCreated: { type: sequelize.STRING },
  createdAt: { type: sequelize.DATE },
  updatedAt: { type: sequelize.DATE },
});

// Associations
Item.hasOne(Nutrition);
User.hasMany(FoodEntry);
Item.hasMany(FoodEntry);

const resetDB = () => {
  Conn.sync({ force: true }).then(() => {
    const today = new Date();
    const date = `${today.getFullYear()}-${(today.getMonth() + 1)}-${today.getDate()}`;
    const yesterdayDate = `${today.getFullYear()}-${(today.getMonth() + 1)}-${today.getDate() - 1}`;
    const time = `${today.getHours()}:${(today.getMinutes() + 1)}:${today.getSeconds()}`;

    _.times(10, () => {
      return bcrypt.hash(String('testpass'), 10, (err, hash) => {
        return Item.create({
          name: faker.commerce.productName(),
          barcode: `test-${faker.random.number({ min: 10000000, max: 99999999 })}`,
          barcodeType: faker.hacker.abbreviation(),
        }).then(item => {
          item.createNutrition({
            calories: faker.random.number({ min: 50, max: 400 }),
            protein: faker.random.number({ min: 0, max: 60 }),
            carbohydrates: faker.random.number({ min: 0, max: 150 }),
            fat: faker.random.number({ min: 0, max: 35 }),
            sugar: faker.random.number({ min: 0, max: 60 }),
          });
        }).then(() => {
          User.create({
            email: faker.internet.email().toLowerCase(),
            password: hash,
            status: 'verified',
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            // jwt: jwt.sign({ id: '666', exp: Math.floor(Date.now() / 1000) + (60 * 60) /* exp in 1h */ }, 'shhhhh'),
          })
          // .then(user => {
          //   user.createFoodEntry({
          //     itemId: faker.random.number({ min: 0, max: 10 }),
          //     servingSize: faker.finance.amount(0.1, 2, 1),
          //     dateCreated: date,
          //     timeCreated: time,
          //   });
          // });
        }).catch(err => {
          console.log(err);
        });
      });
    });

    return bcrypt.hash('', 10, (err, hash) => {
      return User.create({
        id: 420,
        firstName: 'Matty',
        lastName: 'D.',
        email: '',
        password: hash,
        status: 'admin',
        jwt: 'test',
      }).catch(err => {
        console.log(err);
      });
    });
  });
};

// resetDB();

module.exports = Conn;
