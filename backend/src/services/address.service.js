const Address = require("./address.model");
const User = require("../models/user.model.js");
const {
    ConflictError,
    NotFoundError,
    BadRequestError,
  } = require("../errors/errors.js");

const createAddress = async (userId, addressData) => {
    const user = await User.findById(userId);
    if(!user){
        throw new NotFoundError("User not found");
    }
    const address=new Address();
    address.pinCode=addressData.pinCode;
    address.flatHouseBuildingCompanyApartment=addressData.flatHouseBuildingCompanyApartment;
    address.areaStreetSectorVillage=addressData.areaStreetSectorVillage;
    address.landmark=addressData.areaStreetSectorVillage;
    address.townCity=addressData.townCity;
    address.state=addressData.state;
    address.user=userId;
    await address.save();
    user.address.push(address._id);
    await user.save();
    return address;
};

const getAllAddresses = async () => {
    return await Address.find();
};

const getAddressById = async (addressId) => {
    const address = await Address.findById(addressId);
    if(!address){
        throw new NotFoundError("Address not found");
    }
    return await Address.findById(addressId);
};

const updateAddress = async (userId, addressId, updateData) => {
    const user = await User.findById(userId);
    if(!user){
        throw new NotFoundError("User not found");
    }
    const address = await Address.findById(addressId);
    if(!address){
        throw new NotFoundError("Address not found");
    }
    return await Address.findByIdAndUpdate(addressId, updateData, { new: true });
};

const deleteAddress = async (userId, addressId) => {
    const user = await User.findById(userId);
    if(!user){
        throw new NotFoundError("User not found");
    }
    const address = await Address.findById(addressId);
    if(!address){
        throw new NotFoundError("Address not found");
    }
    await Address.findByIdAndDelete(addressId);
    user.address = user.address.filter(
        (id) => id.toString() !== addressId.toString()
    );
    await user.save();
    
    return address;
};

module.exports={createAddress, getAddressById, getAllAddresses, updateAddress, deleteAddress};
