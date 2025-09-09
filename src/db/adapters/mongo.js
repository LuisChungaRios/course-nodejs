const mongoose = require('mongoose');
const url = process.env.MONGO_URL || `mongodb://root:example@mongo:27017/${process.env.MONGO_INITDB_DATABASE}?authSource=admin`;
console.log('MongoDB URL:', url);
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true }
});
let User;

module.exports = {
  connect: async () => {
    await mongoose.connect(url);
    User = mongoose.models.User || mongoose.model('User', userSchema);
    console.log('MongoDB connected');
    // name of collection is 'users'
    console.log('Collection name:', User.collection.collectionName);
  },
  disconnect: async () => { await mongoose.disconnect(); },
  createUser: async (data) => {
    const u = new User(data);
    await u.save();
    return u.toObject();
  },
  getUsers: async () => {
    console.log('Fetching all users from MongoDB');
    return await User.find().lean();
  },
  getUserById: async (id) => {
    return await User.findById(id).lean();
  },
  updateUser: async (id, data) => {
    return await User.findByIdAndUpdate(id, data, { new: true, lean: true });
  },
  deleteUser: async (id) => {
    await User.findByIdAndDelete(id);
    return { deleted: true };
  }
};
