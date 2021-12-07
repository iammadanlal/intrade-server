const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var addressSchema = new mongoose.Schema({
    
        addressLine1: {
            type: Schema.Types.String,
            lowercase: true,
            default: null
        },
        addressLine2: {
            type: Schema.Types.String,
            lowercase: true,
            default: null
        },
        city: {
            type: Schema.Types.String,
            lowercase: true,
            required: true
        },
        state: {
            type: Schema.Types.String,
            lowercase: true,
            required: true
        },
        country: {
            type: Schema.Types.String,
            lowercase: true,
            required: true
        },
        pincode: {
            type: Schema.Types.String,
            lowercase: true,
            default: null
        },
       
    }
);


module.exports = addressSchema;
