const Address = require("./address.model");

const createAddress = async (addressData) => {
    const address=new Address();
    address.pinCode=addressData.pinCode;
    address.flatHouseBuildingCompanyApartment=addressData.flatHouseBuildingCompanyApartment;
    address.areaStreetSectorVillage=addressData.areaStreetSectorVillage;
    address.landmark=addressData.areaStreetSectorVillage;
    address.townCity=addressData.townCity;
    address.state=addressData.state;
    await address.save();
    return address;
};

const getAllAddresses = async () => {
    return await Address.find();
};

const getAddressById = async (id) => {
    return await Address.findById(id);
};

const updateAddress = async (id, updateData) => {
    return await Address.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteAddress = async (id) => {
    const address = await Product.findById(id);
    if(!address){
        throw new NotFoundError("address not found");
    }
    await Address.findByIdAndDelete(id);
    return address;
};

module.exports={createAddress, getAddressById, getAllAddresses, updateAddress, deleteAddress};
