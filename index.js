const mongodb = require('mongodb');

const client = new mongodb.MongoClient('mongodb://localhost:27017');

const connectClient = async () => {
  await client.connect();
  console.log('Client connected!');
};

const getUsersCollection = () => {
  const db = client.db('JamieBunch-db');
  const col = db.collection('users');

  return col;
};

const getProductsCollection = () => {
  const db = client.db('JamieBunch-db');
  const col = db.collection('products');

  return col;
};

const insertUser = async () => {
  const col = getUsersCollection();
  await col.insertOne({
    first: 'Jamie',
    last: 'Bunch',
  });
  console.log('User inserted!');
};

const insertProduct = async (userId) => {
  const col = getProductsCollection();
  await col.insertOne({
    name: 'Fish',
    userId,
  });
  console.log('Product inserted!');
};

const getUsers = async () => {
  const col = getUsersCollection();
  const users = await col.find({}).toArray();

  return users;
};

const getProducts = async () => {
  const col = getProductsCollection();
  const products = await col.find({}).toArray();

  return products;
};

const getProductsByUserId = async (userId) => {
  const col = getProductsCollection();
  const products = await col.find({ userId }).toArray();

  return products;
};

const run = async () => {
  await connectClient();
  await insertUser();
  const users = await getUsers();
  const userId = users[0]._id;
  await insertProduct(userId);
  const products = await getProductsByUserId(userId);
  console.log(products);
  await client.close();
};

run().then();

// connectClient()
//   .then(() => insertUser())
//   .then(() => getUsers())
//   .then((users) => insertProduct(users[0]._id))
//   .then((users) => console.log(users))
//   .then(() => getUsers())
//   .then((users) => getProductsByUserId(users[0]._id))
//   .then((products) => console.log(products))
//   .then(() => client.close());