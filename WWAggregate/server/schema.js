const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLSchema,
} = require('graphql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const db = require('./db');
const JWT_SECRET = 'superDuperTopSecret'; // TODO - add to config to prevent githup upload
const JWT_OPTIONS = {
  expiresIn: '5m',
  issuer: 'WhoopMacros',
};

const User = new GraphQLObjectType({
  name: `User`,
  description: `This represents a user.`,
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve: (user) => user.id,
      },
      email: {
        type: GraphQLString,
        resolve: (user) => user.email,
      },
      password: {
        type: GraphQLString,
        resolve: (user) => user.password,
      },
      status: {
        type: GraphQLString,
        resolve: (user) => user.status,
      },
      jwt: {
        type: GraphQLString,
        resolve: (user) => user.jwt,
      },
      firstName: {
        type: GraphQLString,
        resolve: (user) => user.firstName,
      },
      lastName: {
        type: GraphQLString,
        resolve: (user) => user.lastName,
      },
      createdAt: {
        type: GraphQLString,
        resolve: (user) => user.createdAt,
      },
      updatedAt: {
        type: GraphQLString,
        resolve: (user) => user.updatedAt,
      },
    };
  }
});
const Item = new GraphQLObjectType({
  name: `Item`,
  description: `This represents an item.`,
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve: (item) => item.id,
      },
      name: {
        type: GraphQLString,
        resolve: (item) => item.name,
      },
      barcode: {
        type: GraphQLString,
        resolve: (item) => item.barcode,
      },
      barcodeType: {
        type: GraphQLString,
        resolve: (item) => item.barcodeType,
      },
      nutrition: {
        type: Nutrition,
        resolve: (item) => item.getNutrition(),
      },
      createdAt: {
        type: GraphQLString,
        resolve: (item) => item.createdAt,
      },
      updatedAt: {
        type: GraphQLString,
        resolve: (item) => item.updatedAt,
      },
    };
  }
});
const Nutrition = new GraphQLObjectType({
  name: `Nutrition`,
  description: `This represents an items nutrition`,
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve: (nutrition) => nutrition.id,
      },
      imageId: {
        type: GraphQLInt,
        resolve: (nutrition) => nutrition.imageId,
      },
      calories: {
        type: GraphQLInt,
        resolve: (nutrition) => nutrition.calories,
      },
      protein: {
        type: GraphQLInt,
        resolve: (nutrition) => nutrition.protein,
      },
      sugar: {
        type: GraphQLInt,
        resolve: (nutrition) => nutrition.sugar,
      },
      fat: {
        type: GraphQLInt,
        resolve: (nutrition) => nutrition.fat,
      },
      carbohydrates: {
        type: GraphQLInt,
        resolve: (nutrition) => nutrition.carbohydrates,
      },
      createdAt: {
        type: GraphQLString,
        resolve: (nutrition) => nutrition.createdAt,
      },
      updatedAt: {
        type: GraphQLString,
        resolve: (nutrition) => nutrition.updatedAt,
      },
    };
  }
});
const FoodEntry = new GraphQLObjectType({
  name: `FoodEntry`,
  description: `This represents a food entry`,
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve: (foodEntry) => foodEntry.id,
      },
      userId: {
        type: GraphQLInt,
        resolve: (foodEntry) => foodEntry.userId,
      },
      user: {
        type: User,
        resolve: (foodEntry) => db.models.item.findOne({ where: { id: foodEntry.itemId } }),
      },
      itemId: {
        type: GraphQLInt,
        resolve: (foodEntry) => foodEntry.itemId,
      },
      itemName: {
        type: GraphQLString,
        resolve: (foodEntry) => foodEntry.itemName,
      },
      item: {
        type: Item,
        resolve: (foodEntry) => db.models.item.findOne({ where: { id: foodEntry.itemId } }),
      },
      servingSize: {
        type: GraphQLInt,
        resolve: (foodEntry) => foodEntry.servingSize,
      },
      servingUnit: {
        type: GraphQLString,
        resolve: (foodEntry) => foodEntry.servingUnit,
      },
      dayCreated: {
        type: GraphQLString,
        resolve: (foodEntry) => foodEntry.dayCreated,
      },
      createdAt: {
        type: GraphQLString,
        resolve: (foodEntry) => foodEntry.createdAt,
      },
      updatedAt: {
        type: GraphQLString,
        resolve: (foodEntry) => foodEntry.updatedAt,
      },
    };
  }
});

const Query = new GraphQLObjectType({
  name: `Query`,
  description: `This is the root query.`,
  fields: () => {
    return {
      user: {
        type: User,
        args: {
          id: { type: GraphQLInt },
          firstName: { type: GraphQLString },
          lastName: { type: GraphQLString },
          email: { type: GraphQLString },
          status: { type: GraphQLString },
          jwt: { type: GraphQLString },
          createdAt: { type: GraphQLString },
          updatedAt: { type: GraphQLString },
        },
        resolve: (root, args, context) => db.models.user.findOne({ where: args }),
      },
      users: {
        type: new GraphQLList(User),
        args: {
          id: { type: GraphQLInt },
          firstName: { type: GraphQLString },
          lastName: { type: GraphQLString },
          email: { type: GraphQLString },
          status: { type: GraphQLString },
          jwt: { type: GraphQLString },
          createdAt: { type: GraphQLString },
          updatedAt: { type: GraphQLString },
        },
        resolve: (root, args, context) => db.models.user.findAll({ where: args }),
      },
      item: {
        type: Item,
        args: {
          id: { type: GraphQLInt },
          name: { type: GraphQLString },
          barcode: { type: GraphQLString },
          barcodeType: { type: GraphQLString },
          nutrition: { type: GraphQLString },
        },
        resolve: (root, args, context) => db.models.item.findOne({ where: args }),
      },
      items: {
        type: new GraphQLList(Item),
        args: {
          id: { type: GraphQLInt },
          name: { type: GraphQLString },
          barcode: { type: GraphQLString },
          barcodeType: { type: GraphQLString },
          nutrition: { type: GraphQLString },
        },
        resolve: (root, args, context) => db.models.item.findAll({ where: args }),
      },
      nutrition: {
        type: Nutrition,
        args: {
          id: { type: GraphQLInt },
          itemId: { type: GraphQLInt },
          calories: { type: GraphQLInt },
          sugar: { type: GraphQLInt },
          fat: { type: GraphQLInt },
          protein: { type: GraphQLInt },
          carbohydrates: { type: GraphQLInt },
        },
        resolve: (root, args, context) => db.models.nutrition.findOne({ where: args }),
      },
      foodEntries: {
        type: new GraphQLList(FoodEntry),
        args: {
          id: { type: GraphQLInt },
          userId: { type: GraphQLInt },
          itemId: { type: GraphQLInt },
          itemName: { type: GraphQLString },
          servingSize: { type: GraphQLInt },
          servingUnit: { type: GraphQLString },
          dayCreated: { type: GraphQLString },
          createdAt: { type: GraphQLString },
          updatedAt: { type: GraphQLString },
        },
        resolve: (root, args, context) => {
          console.log('foodEntries context:', context);
          console.log('foodEntries context.user:', context.user);
          if (args.itemName) args.itemName = { [Op.like]: `%${args.itemName}%` };
          return db.models.foodEntry.findAll({ where: args });
        }
      },
      // ...
    };
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'creates new mutations',
  fields() {
    return {
      signIn: {
        type: GraphQLString,
        args: {
          email: { type: GraphQLString },
          password: { type: GraphQLString },
          jwt: { type: GraphQLString },
        },
        resolve: async (root, { email, password, jwt }, context) => {
          console.log('signIn context.user:', context.user);
          if (jwt) {
            if (jwt.length < 30) return; // TODO - make this shit cleaner, wtf man
            const user = await db.models.user.findOne({ where: { jwt: jwt } });
            if (user) {
              let newToken = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
              user.jwt = newToken;
              await user.save();
              return newToken;
            } else {
              console.log('no user found with old jwt, returning null from signIn');
              return;
            }
          } else {
            const user = await db.models.user.findOne({ where: { email: args.email.toLowerCase() } });
            if (!user) throw new Error('Email not found');
            const validPassword = await bcrypt.compare(args.password, user.password);
            if (!validPassword) throw new Error('Incorrect password');
            let newToken = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
            user.jwt = newToken;
            await user.save();
            return user.jwt;
          }
        },
      },
      signUp: {
        type: GraphQLString,
        args: {
          email: { type: new GraphQLNonNull(GraphQLString) },
          password: { type: new GraphQLNonNull(GraphQLString) },
          firstName: { type: GraphQLString },
          lastName: { type: GraphQLString },
        },
        resolve: async (root, { email, password }, context) => {
          const existingUser = await db.models.user.findOne({ where: { email: email.toLowerCase() } });
          if (existingUser) throw new Error('Email already in use');
          // TODO - sanitize pass/email
          const hash = await bcrypt.hash(password, 10);

          let newUser = await db.models.user.create({
            email: email.toLowerCase(),
            password: hash,
            status: 'unverified',
          });
          if (!newUser) throw new Error('Failed to create new user');
          newUser.jwt = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET);
          await newUser.save();
          return newUser.jwt;
        },
      },
      addItem: {
        type: Item,
        args: {
          name: { type: new GraphQLNonNull(GraphQLString) },
          barcode: { type: GraphQLString },
          barcodeType: { type: GraphQLString },
          calories: { type: GraphQLInt },
          protein: { type: GraphQLInt },
          sugar: { type: GraphQLInt },
          fat: { type: GraphQLInt },
          carbohydrates: { type: GraphQLInt },
        },
        resolve: (root, args, context) => {
          console.log('context from addItem:', JSON.stringify(context));
          console.log('context.user after addItem:', context.user);
          return db.models.item.create({
            name: args.name,
            barcode: args.barcode || 'none',
            barcodeType: args.barcodeType || 'none',
          }).then(item => {
            return item.createNutrition({
              calories: args.calories,
              protein: args.protein,
              sugar: args.sugar,
              carbohydrates: args.carbohydrates,
            });
          }).catch(err => {
            console.log('err from server/schema.js', err);
          });
        }
      },
      addFoodEntry: {
        type: FoodEntry,
        args: {
          userId: { type: new GraphQLNonNull(GraphQLInt) },
          itemId: { type: new GraphQLNonNull(GraphQLInt) },
          itemName: { type: GraphQLString },
          servingSize: { type: GraphQLInt },
          servingUnit: { type: GraphQLString },
          dayCreated: { type: GraphQLString },
          createdAt: { type: GraphQLString },
          updatedAt: { type: GraphQLString },
        },
        resolve: async (root, args, context) => {
          const user = await db.models.user.findOne({ where: { id: args.userId } });
          if (!user) throw new Error('User not found, how are you here?');

          const item = await db.models.item.findOne({ where: { id: args.itemId } });
          const { name } = item;
          if (!user) throw new Error('User not found, how are you here?');

          const today = new Date();
          const date = `${today.getFullYear()}-${(today.getMonth() + 1)}-${today.getDate()}`;
          // return foodEntry with passed in userId and foodId association
          return user.createFoodEntry({
            itemId: args.itemId,
            itemName: args.itemName || name,
            servingSize: args.servingSize || 1,
            servingUnit: args.servingUnit,
            dayCreated: date,
          }).catch(err => {
            console.log('err creating footEntry:', err);
          });
        }
      },
      // ...
    }
  }
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
})

module.exports = Schema;
