require('./database.connection');
const { Category } = require('./../model/categories.model');

const categoryData = [
  {
    _id: "1",
    name: "category name1",
    parent_id: null
  },
  {
    _id: "2",
    name: "category name2",
    parent_id: "1"
  },
  {
    _id: "3",
    name: "category name3",
    parent_id: "2"
  },
  {
    _id: "4",
    name: "category name4",
    parent_id: "3"
  },
  {
    _id: "5",
    name: "category name5",
    parent_id: "4"
  },
  {
    _id: "6",
    name: "category name6",
    parent_id: "5"
  },
  {
    _id: "7",
    name: "category name7",
    parent_id: "6"
  },
  {
    _id: "8",
    name: "category name8",
    parent_id: null
  },
  {
    _id: "9",
    name: "category name9",
    parent_id: "8"
  },
];

(async () => {
  try {
    Category.insertMany(categoryData, (err,doc) => {
      console.log('done seeding');
      process.exit();
    });
  } catch (error) {
    console.log(error)
  }
})();
