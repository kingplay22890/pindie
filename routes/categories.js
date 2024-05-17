const categoriesRouter = require('express').Router();
const {sendAllCategories, sendCategoryCreated, sendCategoryUpdated, sendCategoryDeleted }= require('../controllers/categories');
const {findAllCategories, checkIsCategoryExists, checkEmptyName, createCategory, updateCategory, deleteCategory }= require('../middlewares/categories');



categoriesRouter.get('/categories', findAllCategories, sendAllCategories);
categoriesRouter.post(
    '/categories', 
findAllCategories,
checkIsCategoryExists,
checkEmptyName,
createCategory,
 sendCategoryCreated, 
);
categoriesRouter.put(
    "/categories/:id",
    updateCategory,
    sendCategoryUpdated
  );
  categoriesRouter.delete("/categories/:id", deleteCategory, sendCategoryDeleted);
module.exports = categoriesRouter;