const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var communicationSchema = new mongoose.Schema({
    
        email1: {
            type: Schema.Types.String,
            lowercase: true,
            default: null
        },
        phone1: {
            type: Schema.Types.String,
            default: null
            
        },
       mobile: {
            type: Schema.Types.String,
            lowercase: true,
            default: null
            // required: true
        },
        email2: {
            type: Schema.Types.String,
            default: null
            // required: true
        },
        phone2: {
            type: Schema.Types.String,
            default: null
            // required: true
        },
       mobile2: {
        type: Schema.Types.String,
        default: null
        },
       
    }
);

module.exports = communicationSchema;
