const categoriesRouter = require('express').Router();
const {sendAllCategories, sendCategoryCreated, sendCategoryUpdated, sendCategoryDeleted }= require('../controllers/categories');
const { checkAuth } = require('../middlewares/auth');
const {findAllCategories, checkIsCategoryExists, checkEmptyName, createCategory, updateCategory, deleteCategory }= require('../middlewares/categories');



categoriesRouter.get('/categories', findAllCategories, sendAllCategories);
categoriesRouter.post(
    '/categories', 
findAllCategories,
checkIsCategoryExists,
checkEmptyName, 
checkAuth,
createCategory,
 sendCategoryCreated, 
);
categoriesRouter.put(
  "/categories/:id",
  checkEmptyName,
  checkAuth,
  updateCategory,
  sendCategoryUpdated
);
  categoriesRouter.delete("/categories/:id",  checkAuth, deleteCategory, sendCategoryDeleted);
module.exports = categoriesRouter;