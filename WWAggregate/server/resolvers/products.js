

module.exports = {
  Query: {
    products: (parent, args, {
      models
    }) => {
      return Object.values(models.products);
    },
    product: (parent, {
      id
    }, {
      models
    }) => {
      return models.products[id];
    }
  }
}
