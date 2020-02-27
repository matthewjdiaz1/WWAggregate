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

const db = require('./db');

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
      firstName: {
        type: GraphQLString,
        resolve: (user) => user.firstName,
      },
      lastName: {
        type: GraphQLString,
        resolve: (user) => user.lastName,
      },
      mealEntries: {
        type: new GraphQLList(MealEntry),
        resolve: (user) => user.getMealEntry(),
      }
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
      }
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
      calories: {
        type: GraphQLString,
        resolve: (nutrition) => nutrition.calories,
      },
      protein: {
        type: GraphQLString,
        resolve: (nutrition) => nutrition.protein,
      },
      sugar: {
        type: GraphQLString,
        resolve: (nutrition) => nutrition.sugar,
      },
      carbohydrates: {
        type: GraphQLString,
        resolve: (nutrition) => nutrition.carbohydrates,
      },
    };
  }
});
const MealEntry = new GraphQLObjectType({
  name: `MealEntry`,
  description: `This represents a food entry`,
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve: (mealEntry) => mealEntry.id,
      },
      userId: {
        type: GraphQLInt,
        resolve: (mealEntry) => mealEntry.userId,
      },
      itemId: {
        type: GraphQLInt,
        resolve: (mealEntry) => mealEntry.itemId,
      },
      servingSize: {
        type: GraphQLString,
        resolve: (mealEntry) => mealEntry.servingSize,
      },
      dateCreated: {
        type: GraphQLString,
        resolve: (mealEntry) => mealEntry.dateCreated,
      },
      timeCreated: {
        type: GraphQLString,
        resolve: (mealEntry) => mealEntry.timeCreated,
      },
    };
  }
});

const Query = new GraphQLObjectType({
  name: `Query`,
  description: `This is a root query.`,
  fields: () => {
    return {
      user: {
        type: User,
        args: {
          id: { type: GraphQLInt },
          firstName: { type: GraphQLString },
          lastName: { type: GraphQLString },
          email: { type: GraphQLString },
        },
        resolve: (root, args) => db.models.user.findOne({ where: args }),
      },
      users: {
        type: new GraphQLList(User),
        args: {
          id: { type: GraphQLInt },
          firstName: { type: GraphQLString },
          lastName: { type: GraphQLString },
          email: { type: GraphQLString },
        },
        resolve: (root, args) => db.models.user.findAll({ where: args }),
      },
      items: {
        type: new GraphQLList(Item),
        args: {
          id: { type: GraphQLInt },
          name: { type: GraphQLString },
          barcode: { type: GraphQLString },
          barcodeType: { type: GraphQLString },
        },
        resolve: (root, args) => db.models.item.findAll({ where: args }),
      },
      nutrition: {
        type: new GraphQLList(Nutrition),
        args: {
          id: { type: GraphQLInt },
          calories: { type: GraphQLString },
          sugar: { type: GraphQLString },
          protein: { type: GraphQLString },
          carbohydrates: { type: GraphQLString },
        },
        resolve: (root, args) => db.models.nutrition.findAll({ where: args }),
      },
      mealEntries: {
        type: new GraphQLList(MealEntry),
        args: {
          id: { type: GraphQLInt },
          userId: { type: GraphQLInt },
          itemId: { type: GraphQLInt },
          servingSize: { type: GraphQLString },
          dateCreated: { type: GraphQLString },
          timeCreated: { type: GraphQLString },
        },
        resolve: (root, args) => db.models.mealEntry.findAll({ where: args }),
      },
    };
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'creates new mutations',
  fields() {
    return {
      addItem: {
        type: Item,
        args: {
          name: { type: new GraphQLNonNull(GraphQLString) },
          barcode: { type: new GraphQLNonNull(GraphQLString) },
          barcodeType: { type: new GraphQLNonNull(GraphQLString) },
          calories: { type: GraphQLString },
          protein: { type: GraphQLString },
          sugar: { type: GraphQLString },
          carbohydrates: { type: GraphQLString },
        },
        resolve: (_, args) => {
          return db.models.item.create({
            name: args.name,
            barcode: args.barcode,
            barcodeType: args.barcodeType,
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
      signIn: {
        type: User,
        args: {
          email: { type: new GraphQLNonNull(GraphQLString) },
          password: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: async (root, args, { secrets }) => {
          const user = await db.models.user.findOne({ where: { email: args.email.toLowerCase() } });
          if (!user) throw new Error('Email not found');

          const validPassword = await bcrypt.compare(args.password, user.password);
          if (!validPassword) throw new Error('Incorrect password');

          // Generate the jwt and add it to the user document being returned.
          // user.jwt = jwt.sign({ _id: user._id }, secrets.JWT_SECRET);
          return user;
        },
      },
      signUp: {
        type: User,
        args: {
          email: { type: new GraphQLNonNull(GraphQLString) },
          password: { type: new GraphQLNonNull(GraphQLString) },
          firstName: { type: new GraphQLNonNull(GraphQLString) },
          lastName: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: async (root, args) => {
          const existingUser = await db.models.user.findOne({ where: { email: args.email } });
          if (existingUser) throw new Error('Email already in used');
          const hash = await bcrypt.hash(args.password, 10);
          return db.models.user.create({
            email: args.email.toLowerCase(),
            password: hash,
            firstName: args.firstName,
            lastName: args.lastName,
          });
        },
      },
    }
  }
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
})

module.exports = Schema;
