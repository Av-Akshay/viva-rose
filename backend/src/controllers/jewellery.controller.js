const jewelleryService = require("../services/jewellery.service.js");
const logger = require("../configs/winston.config.js");

// Controller for creating a new Property
const createJewellery = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const propertyData = req.body;
    const files = req.files;
    const jewellery = await jewelleryService.createJewellery(
      userId,
      propertyData,
      files
    );
    logger.info(
      "User ID:" +
        `${userId}` +
        " has posted Jewellery ID:" +
        `${jewellery._id}` +
        " successfully"
    );
    res.status(201).json({
      success: true,
      data: jewellery,
    });
  } catch (error) {
    //console.log(error);
    next(error);
  }
};

const getJewelleryById= async(req, res, next) =>{
    try{
        const jewelleryId=req.params.id;
        const jewellery= await jewelleryService.getJewelleryById(jewelleryId);
        res.status(200).json({
            success: true,
            data: jewellery,
          });
    }
    catch(error){
        next(error);
    }
}

const searchJewellery= async(req, res, next) =>{
    try{
        const filters = {
            jewelleryCode: req.query.jewelleryCode,
            jewelleryName: req.query.jewelleryName,
            jewelleryType: req.query.jewelleryType,
            material: req.query.material,
            colour: req.query.colour,
            availability: req.query.availability,
          };
      
          // Access sorting parameters from the query
          const sortBy = req.query.sortBy; // price or dateListed
          const sortOrder = req.query.sortOrder === "High to Low" ? -1 : 1; // 'desc' for descending, 'asc' or default for ascending
        const jewellery= await jewelleryService.searchJewellery(filters, sortBy, sortOrder);
        res.status(200).json({
            success: true,
            data: jewellery,
          });
    }
    catch(error){
      //console.log(error);
      next(error);
    }
};

// Update user by ID
const updateJewellery = async (req, res, next) => {
    try {
      const updatedJewellery = await jewelleryService.updateJewellery(req.user.id, req.params.id, req.body, req.files);
      logger.info(
        "Jewellery id:" + `${updatedJewellery._id}` + " has been updated successfully"
      );
      res.status(200).json({
        success: true,
        data: updatedJewellery,
      });
    } catch (error) {
      //console.log(error);
      next(error);
    }
  };
  
  // Delete user by ID
  const deleteJewellery = async (req, res, next) => {
    try {
      const jewellery = await jewelleryService.deleteJewellery(req.user.id, req.params.id);
      logger.info(
        "Jewellery id:" + `${req.params.id}` + " has been deleted successfully"
      );
      res.status(200).json({ message: "Jewellery deleted successfully", jewellery });
    } catch (error) {
      next(error);
    }
  };

module.exports ={createJewellery, getJewelleryById, searchJewellery, updateJewellery, deleteJewellery};