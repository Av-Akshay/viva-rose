const { NotFoundError, BadRequestError, ConflictError } = require("../errors/errors");
const userService = require("./user.service.js");
const Product = require("../models/product.model.js");
const {uploadImages, deleteImages} = require('../utils/image.upload.util.js');

const createProduct = async (userId, productData, files) => {
    var productCodeString='VRSJ';
    function generateProductCode() {
      let id;
      do {
        id = Math.floor(100000000 + Math.random() * 900000000);
      } while (id % 10 === 0);
      return id;
    }   
    const user= await userService.getUserById(userId);
    // Ensure the user has the 'admin' role
    if (user.role !== 'Admin') {
        throw new BadRequestError('Only admins can create products');
    }
    const imageURLs = await uploadImages(files);
    const product = new Product();
    product.productCode= productCodeString+generateProductCode();
    product.productName=productData.productName;
    product.genderCategory=productData.genderCategory;
    product.productType=productData.productType;
    // product.material=productData.material;
    product.colour=productData.colour;
    // product.length=productData.length;
    // product.width=productData.width;
    // product.height=productData.height;
    product.materialWeight=productData.materialWeight;
    product.stockCount=productData.stockCount;
    product.price=productData.price;            
    product.stockStatus=productData.stockStatus;
    product.description=productData.description;
    product.productImages=imageURLs;
    
    await product.save();
    return product;
};

const getProductById = async (productId) => {
    const product = await Product.findById(productId);
    if(!product){
        throw new NotFoundError("Product not found");
    }
    return product;
};

const searchProducts = async (filters, sortBy, sortOrder) => {
    const query = {};

    // Apply filters
    if (filters.productCode) query.productCode = filters.productCode;
    if (filters.productName) query.productName = filters.productName;
    if (filters.productType) query.productType = filters.productType;
    if(filters.availability=="exclude out of stock"){
        query.stockStatus='in-stock';
    }

    // Budget filter (minPrice and maxPrice)
    if (filters.minPrice || filters.maxPrice) {
    query.price = {};
    if (filters.minPrice) query.price.$gte = filters.minPrice;
    if (filters.maxPrice) query.price.$lte = filters.maxPrice;
   }

   if(filters.rating==='4.0 and above'){
    query.rating.$gte=4;
   }
   else if(filters.rating==='3.0 and above'){
    query.rating.$gte=3;
   }

  // Define sorting
  let sortCriteria = {};
  if (sortBy === 'price') {
    if(sortOrder==='Low to High'){
        sortCriteria.price = 'asc';
    }
    else if(sortOrder==='High to Low'){
        sortCriteria.price='desc';
    }
  } else if (sortBy === 'rating') {
    if(sortOrder==='Low to High'){
        sortCriteria.ratingReview.rating = 'asc';
    }
    else if(sortOrder==='High to Low'){
        sortCriteria.ratingReview.rating='desc';
    }
 }
  
  // Query database with filters and sorting
  const filteredProducts = await Product.find(query).sort(sortCriteria).select('-ratingReview').exec();
  console.log(filteredProducts.length);
  
  if (!filteredProducts || filteredProducts.length === 0) {
    throw new NotFoundError('No products found matching the criteria.');
  }
  // const filteredPropertiesResponse = encrypt(JSON.stringify(filteredProperties), process.env.ENCRYPTION_KEY);
  // return filteredPropertiesResponse;
  return filteredProducts;
    // const review = await Product.find();
    // if(!review){
    //     throw new NotFoundError("Review not found");
    // }
    // return review;
};

const updateProduct = async (userId, productId, productData, files) => {
    const user= await userService.getUserById(userId);
    // Ensure the user has the 'admin' role
    if (user.role !== 'Admin') {
        throw new BadRequestError('Only admins can update products');
    }
    const product = await Product.findById(productId);
    if(!product){
        throw new NotFoundError("Product not found");
    }
    if(productData.productCode){
        product.productCode=productData.productCode;
    }
    if(productData.productName){
        product.productName=productData.productName;
    }
    if(productData.productType){
        product.productType=productData.productType;
    }
    if(productData.material){
        product.material=productData.material;
    }
    if(productData.genderCategory){
        product.genderCategory=productData.genderCategory;
    }
    if(productData.color){
        product.color=productData.color;
    }
    if(productData.materialWeight){
        product.materialWeight=productData.materialWeight;
    }
    if(productData.stockCount){
        product.stockCount=productData.stockCount;
    }
    if(productData.price){
        product.price=productData.price;
    }
    if(productData.stockStatus){
        product.stockStatus=productData.stockStatus;
    }
    if(productData.description){
        product.description=productData.description;
    }
    if(files){
        const imageURLs = await uploadImages(files);
        product.productImages=imageURLs;
    }
    await product.save();

    return product;
};

const deleteProduct = async (userId, productId) => {
    const user= await userService.getUserById(userId);
    // Ensure the user has the 'admin' role
    if (user.role !== 'Admin') {
        throw new BadRequestError('Only admins can delete products');
    }
    const product = await Product.findById(productId);
    if(!product){
        throw new NotFoundError("Product not found");
    }
    // Delete associated images from Cloudinary
    if (product.productImages && product.productImages.length > 0) {
    //console.log(property.images.length);
       await deleteImages(product.productImages);
    }
    await Product.findByIdAndDelete(productId);
    
    return product;
};

module.exports = {
    createProduct,
    searchProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};