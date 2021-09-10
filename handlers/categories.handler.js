const NotFoundError = require('../error/notFound.error');
const ValidationError = require('../error/validation.error');
const { Category } = require('./../model/categories.model');


function getRootCategories(categoriesFromDB) {
  return categoriesFromDB.filter(item => !item.parent_id);
}

async function findSubCategory(id){
  if (id === null){
    return null;
  }

  const childCategoryDB = await Category.findOne({parent_id: id});
  if (childCategoryDB === null) {
    return null;
  }

  const category = childCategoryDB.toJSON();
  delete category.parent_id;
  category.subCategory = await findSubCategory(childCategoryDB._id);

  return category;
}

module.exports.categoryHandler = async (id = null) => {
  if (id && !Number(id)) {
    throw new ValidationError(400, 'not a valid query param type');
  }

  const query = {
    ...id && { _id: id}
  };

  const categoriesFromDB = await Category.find(query, { _v: false });
  if (categoriesFromDB.length === 0) {
    throw new NotFoundError(404, `listing not found:${id}`);
  }

  let rootCategories = {};

  if (!id) {
    rootCategories = getRootCategories(categoriesFromDB);
  } else {
    rootCategories = categoriesFromDB;
  }

  let categories = await Promise.all(rootCategories.map(async categoryDB => {
    const category = categoryDB.toJSON();
    delete category.parent_id;
    category.subCategory = await findSubCategory(categoryDB._id);
    return category;
  }))

  return categories;
}