const { NotFoundError, BadRequestError, ConflictError } = require("../errors/errors");
const userService = require("./user.service.js");
const Jewellery = require("../models/jewellery.model.js");
const {uploadImages, deleteImages} = require('../utils/image.upload.util.js');
const JsSearch = require("js-search");

const generateJewelleryCode = async()=> {
    let id;
    do {
      id = Math.floor(100000000 + Math.random() * 900000000);
    } while (id % 10 === 0);
    return id;
  }

const createJewellery = async (userId, jewelleryData, files) => {
    var jewelleryCodeString='VRSJ';
    let jewelleryCode=0;
    let jewelleryCodeCheck=[];
    do {
        jewelleryCode = await generateJewelleryCode();
    
        // Check if the generated jewellery code already exists
        jewelleryCodeCheck = await Jewellery.find({ jewelleryCode });
    } while (jewelleryCodeCheck.length > 0); // Repeat if the jewellery code already exists


    const user= await userService.getUserById(userId);
    // Ensure the user has the 'admin' role
    if (user.role !== 'Admin') {
        throw new BadRequestError('Only admins can create jewellerys');
    }
    const imageURLs = await uploadImages(files);
    const jewellery = new Jewellery();
    jewellery.jewelleryCode= jewelleryCodeString+jewelleryCode;
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
    jewellery.avgRating=5;      
    jewellery.stockStatus=jewelleryData.stockStatus;
    jewellery.description=jewelleryData.description;
    jewellery.jewelleryImages=imageURLs;
    
    await jewellery.save();
    return jewellery;
};

const getJewelleryById = async (jewelleryId) => {
    const jewellery = await Jewellery.findById(jewelleryId).populate({
        path: "reviews",
        populate: {
          path: "userId",
          select: ["profilePic", "name", "createdAt"]
        }
      });
    if(!jewellery){
        throw new NotFoundError("Jewellery not found");
    }
    return jewellery;
};

const searchJewellery = async (filters, sortBy, sortOrder, searchQuery) => {
    const query = {};

    // Apply filters
    if (filters.jewelleryCode) query.jewelleryCode = filters.jewelleryCode;
    if (filters.jewelleryName) query.jewelleryName = { $regex: new RegExp(filters.jewelleryName, "i") }; // Case-insensitive partial match
    if (filters.jewelleryType) query.jewelleryType = filters.jewelleryType;
    if (filters.availability === "exclude out of stock") {
        query.stockStatus = "in-stock";
    }

    // Advanced price filter (minPrice, maxPrice, or exactPrice)
    if (filters.minPrice || filters.maxPrice || filters.exactPrice) {
        query.price = {};
        if (filters.minPrice) query.price.$gte = filters.minPrice;
        if (filters.maxPrice) query.price.$lte = filters.maxPrice;
        if (filters.exactPrice) query.price = filters.exactPrice;
    }

    // Rating filter
    if (filters.rating === "4.0 and above") {
        query.avgRating = { $gte: 4 };
    } else if (filters.rating === "3.0 and above") {
        query.avgRating = { $gte: 3 };
    }

    // Define sorting
    const sortCriteria = {};
    if (sortBy) sortCriteria[sortBy] = sortOrder;

    // Query database with filters and sorting
    const filteredJewellerys = await Jewellery.find(query)
        .sort(sortCriteria)
        .populate({
            path: "reviews",
            populate: {
                path: "userId",
                select: ["profilePic", "name", "createdAt"],
            },
        })
        .exec();

    if (!filteredJewellerys || filteredJewellerys.length === 0) {
        throw new Error("No jewellery found matching the criteria.");
    }

    // If a search query is provided, use js-search for in-memory searching
    let finalResults = filteredJewellerys;
    if (searchQuery) {
        // Tokenize search input into words
        const searchTokens = searchQuery.split(" ");

        // Initialize js-search
        const searchEngine = new JsSearch.Search("jewelleryCode"); // Use a unique field for indexing

        // Configure search indexing fields
        searchEngine.indexStrategy = new JsSearch.AllSubstringsIndexStrategy(); // More flexible substring matching
        searchEngine.sanitizer = new JsSearch.LowerCaseSanitizer();
        searchEngine.searchIndex = new JsSearch.TfIdfSearchIndex();

        // Add weighted searchable fields
        searchEngine.addIndex("jewelleryName"); // High priority
        searchEngine.addIndex("description"); // Medium priority
        searchEngine.addIndex("material"); // Medium priority
        searchEngine.addIndex("genderCategory"); // Low priority
        searchEngine.addIndex("colour"); // Low priority

        // Add the filtered results to the search index
        searchEngine.addDocuments(filteredJewellerys);

        // Perform the search for each token and merge results
        const searchResults = searchTokens.reduce((results, token) => {
            const partialResults = searchEngine.search(token);
            return [...results, ...partialResults];
        }, []);

        // Deduplicate and combine search results
        const uniqueSearchResults = Array.from(
            new Map(
                searchResults.map((item) => [item._id.toString(), item])
            ).values()
        );

        // Combine filtered and search results
        finalResults = uniqueSearchResults.filter((item) =>
            filteredJewellerys.some((j) => j._id.toString() === item._id.toString())
        );

        // Append additional search results that weren't in filtered results
        const searchResultIds = new Set(finalResults.map((item) => item._id.toString()));
        finalResults = [
            ...finalResults,
            ...uniqueSearchResults.filter((item) => !searchResultIds.has(item._id.toString())),
        ];
    }

    // Return final combined results
    return finalResults;
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
