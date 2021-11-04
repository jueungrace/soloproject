const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;

// user schema
const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, min: 4, max: 20, unique: true },
  password: { type: String, required: true, min: 4 },
  entries: [ {
    loved: Boolean,
    rating: Number,
    name: String,
    country: String,
    region: String,
    purchasedFrom: String,
    price: Number,
    brewingMethods: String,
    aroma: String,
    flavorAndFinish: String,
    notes: String,
  } ]
});

userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    return next();
  })
});

module.exports = mongoose.model('User', userSchema);