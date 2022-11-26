import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

const userSchema = mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    empType: {type: String, required: true},
    gender: {type: String, required: true},
    doj: {type: Date, required: true},
    address: {type: String, required: true},
    zip: {type: Number, required: true},
    city: {type: String, required: true},
    phone: {type: Number, required: true},
})

autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, 'user')

const user = mongoose.model('Employee', userSchema);

export default user;