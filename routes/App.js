const router = require("express").Router();
const { UserController } = require("../Controllers/BackendController");
const { CategoryController } = require("../Controllers/BackendController");
const { SubCategoryController } = require("../Controllers/BackendController");
const { ProductController } = require("../Controllers/BackendController");
const { PermissionController } = require("../Controllers/BackendController");
const { RoleController } = require("../Controllers/BackendController");
const { FlashMiddleware } = require("../Middlewares/customFlashMiddleware");
//User Crud Starts
router.post("/create/user", UserController.create);
router.get("/user/listing", UserController.listing);
router.post("/user/verification", UserController.verification);
//User Crud Ends

//Category Crud Starts

router.post("/create/category", CategoryController.create);
router.get("/category/listing", CategoryController.listing);
// Category Crud Ends

// SubCategory Crud Starts

router.post("/create/subcategory", SubCategoryController.create);
router.get("/subcategory/listing", SubCategoryController.listing);

// SubCategory Crud Ends

// Product Crud Starts

router.post("/create/product", ProductController.create);
router.get("/product/listing", ProductController.listing);
// Product Crud Ends

// Permission Crud Starts
router.post("/create/permission", PermissionController.create);
router.get("/permission/listing", PermissionController.listing);
// Permission Crud Ends

// Role Crud Starts
router.post("/create/role", RoleController.create);
router.get("/role/listing", RoleController.listing);
module.exports = router;
