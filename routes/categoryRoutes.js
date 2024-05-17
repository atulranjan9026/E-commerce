import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  categoryControlller,
  createCategoryController,
  deleteCategoryCOntroller,
  singleCategoryController,
  updateCategoryController,
} from "./../controllers/categoryController.js";

const router = express.Router();

//routes
// create category
router.post(
  "/create-category",
  // isAdmin,
  // requireSignIn,
  createCategoryController,
  (req, res) => {
    console.log("Error in creating a new Category");
    return res.status(500).json({ message: "Server Error" });
  }
);
// General error-handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
});

// update category
router.put(
  "/update-category/:id",
  // isAdmin,
  // requireSignIn,
  updateCategoryController
);

//getALl category
router.get("/get-category", categoryControlller);

//single category/
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  // isAdmin,
  // requireSignIn,
  deleteCategoryCOntroller
);

export default router;
