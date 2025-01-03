const productService = require("../services/product.service.js");
const Product=require("../models/product.model.js");

const logger = require("../configs/winston.config.js");

// Controller for creating a new Property
const createProduct = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const propertyData = req.body;
    const files = req.files;
    //console.log(req?.user);
    const product = await productService.createProduct(
      userId,
      propertyData,
      files
    );
    logger.info(
      "User ID:" +
        `${userId}` +
        " has posted Product ID:" +
        `${product._id}` +
        " successfully"
    );
    return res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    //console.log(error);
    next(error);
  }
};

const getProductById= async(req, res, next) =>{
    try{
        const productId=req.body.productId;
        const product= await Product.getProductById(productId);
        return res.status(200).json({
            success: true,
            data: product,
          });
    }
    catch(error){
        next(error);
    }
}

const searchProducts= async(req, res, next) =>{
    try{
        const filters = {
            productCode: req.query.productCode,
            productName: req.query.productName,
            productType: req.query.productType,
            material: req.query.material,
            colour: req.query.colour,
            stockStatus: req.query.stockStatus,
          };
      
          // Access sorting parameters from the query
          const sortBy = req.query.sortBy; // price or dateListed
          const sortOrder = req.query.sortOrder === "desc" ? -1 : 1; // 'desc' for descending, 'asc' or default for ascending
        const product= await Product.searchProducts(filters, sortBy, sortOrder);
        return res.status(200).json({
            success: true,
            data: product,
          });
    }
    catch(error){
        next(error);
    }
}

// Update user by ID
const updateProduct = async (req, res, next) => {
    try {
      const updatedProduct = await productService.updateProduct(req.user.id, req.body.productId, req.body);
      logger.info(
        "Product id:" + `${updatedProduct._id}` + " has been updated successfully"
      );
      res.status(200).json({
        success: true,
        data: updatedProduct,
      });
    } catch (error) {
      //console.log(error);
      next(error);
    }
  };
  
  // Delete user by ID
  const deleteProduct = async (req, res, next) => {
    try {
      await productService.deleteProduct(req.user.id, req.body.productId);
      logger.info(
        "Product id:" + `${req.body.productId}` + " has been deleted successfully"
      );
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      next(error);
    }
  };

module.exports ={createProduct, getProductById, searchProducts, updateProduct, deleteProduct};