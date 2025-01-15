const { NotFoundError, BadRequestError, ConflictError } = require("../errors/errors");
const userService = require("./user.service.js");
const Jewellery = require("../models/jewellery.model.js");
const {uploadImages, deleteImages} = require('../utils/image.upload.util.js');

const createJewellery = async (userId, jewelleryData, files) => {
    var jewelleryCodeString='VRSJ';
    function generateJewelleryCode() {
      let id;
      do {
        id = Math.floor(100000000 + Math.random() * 900000000);
      } while (id % 10 === 0);
      return id;
    }   
    const user= await userService.getUserById(userId);
    // Ensure the user has the 'admin' role
    if (user.role !== 'Admin') {
        throw new BadRequestError('Only admins can create jewellerys');
    }
    const imageURLs = await uploadImages(files);
    const jewellery = new Jewellery();
    jewellery.jewelleryCode= jewelleryCodeString+generateJewelleryCode();
    jewellery.jewelleryName=jewelleryData.jewelleryName;
    jewellery.genderCategory=jewelleryData.genderCategory;
    jewellery.jewelleryType=jewelleryData.jewelleryType;
    // jewellery.material=jewelleryData.material;
    jewellery.colour=jewelleryData.colour;
    // jewellery.length=jewelleryData.length;
    // jewellery.width=jewelleryData.width;
    // jewellery.height=jewelleryData.height;
    jewellery.materialWeight=jewelleryData.materialWeight;
    jewellery.stockCount=jewelleryData.stockCount;
    jewellery.price=jewelleryData.price;            
    jewellery.stockStatus=jewelleryData.stockStatus;
    jewellery.description=jewelleryData.description;
    jewellery.jewelleryImages=imageURLs;
    
    await jewellery.save();
    return jewellery;
};

const getJewelleryById = async (jewelleryId) => {
    const jewellery = await Jewellery.findById(jewelleryId);
    if(!jewellery){
        throw new NotFoundError("Jewellery not found");
    }
    return jewellery;
};

const searchJewellery = async (filters, sortBy, sortOrder) => {
    const query = {};

    // Apply filters
    if (filters.jewelleryCode) query.jewelleryCode = filters.jewelleryCode;
    if (filters.jewelleryName) query.jewelleryName = filters.jewelleryName;
    if (filters.jewelleryType) query.jewelleryType = filters.jewelleryType;
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
  if (sortBy == 'price') {
    sortCriteria.price=sortOrder;
  } else if (sortBy === 'rating') {
    sortCriteria.price=sortOrder;
 }
  
  // Query database with filters and sorting
  const filteredJewellerys = await Jewellery.find(query).sort(sortCriteria).select('-reviews').exec();
  console.log(filteredJewellerys.length);
  
  if (!filteredJewellerys || filteredJewellerys.length === 0) {
    throw new NotFoundError('No jewellerys found matching the criteria.');
  }
  // const filteredPropertiesResponse = encrypt(JSON.stringify(filteredProperties), process.env.ENCRYPTION_KEY);
  // return filteredPropertiesResponse;
  return filteredJewellerys;
    // const review = await Jewellery.find();
    // if(!review){
    //     throw new NotFoundError("Review not found");
    // }
    // return review;
};

const updateJewellery = async (userId, jewelleryId, jewelleryData, files) => {
    const user= await userService.getUserById(userId);
    // Ensure the user has the 'admin' role
    if (user.role !== 'Admin') {
        throw new BadRequestError('Only admins can update jewellerys');
    }
    const jewellery = await Jewellery.findById(jewelleryId);
    if(!jewellery){
        throw new NotFoundError("Jewellery not found");
    }
    if(jewelleryData.jewelleryCode){
        jewellery.jewelleryCode=jewelleryData.jewelleryCode;
    }
    if(jewelleryData.jewelleryName){
        jewellery.jewelleryName=jewelleryData.jewelleryName;
    }
    if(jewelleryData.jewelleryType){
        jewellery.jewelleryType=jewelleryData.jewelleryType;
    }
    if(jewelleryData.material){
        jewellery.material=jewelleryData.material;
    }
    if(jewelleryData.genderCategory){
        jewellery.genderCategory=jewelleryData.genderCategory;
    }
    if(jewelleryData.color){
        jewellery.color=jewelleryData.color;
    }
    if(jewelleryData.materialWeight){
        jewellery.materialWeight=jewelleryData.materialWeight;
    }
    if(jewelleryData.stockCount){
        jewellery.stockCount=jewelleryData.stockCount;
    }
    if(jewelleryData.price){
        jewellery.price=jewelleryData.price;
    }
    if(jewelleryData.stockStatus){
        jewellery.stockStatus=jewelleryData.stockStatus;
    }
    if(jewelleryData.description){
        jewellery.description=jewelleryData.description;
    }
    if(files){
        const imageURLs = await uploadImages(files);
        jewellery.jewelleryImages=imageURLs;
    }
    await jewellery.save();

    return jewellery;
};

const deleteJewellery = async (userId, jewelleryId) => {
    const user= await userService.getUserById(userId);
    // Ensure the user has the 'admin' role
    if (user.role !== 'Admin') {
        throw new BadRequestError('Only admins can delete jewellerys');
    }
    const jewellery = await Jewellery.findById(jewelleryId);
    if(!jewellery){
        throw new NotFoundError("Jewellery not found");
    }
    // Delete associated images from Cloudinary
    if (jewellery.jewelleryImages && jewellery.jewelleryImages.length > 0) {
    //console.log(property.images.length);
       await deleteImages(jewellery.jewelleryImages);
    }
    await Jewellery.findByIdAndDelete(jewelleryId);
    
    return jewellery;
};

module.exports = {
    createJewellery,
    searchJewellery,
    getJewelleryById,
    updateJewellery,
    deleteJewellery,
};
