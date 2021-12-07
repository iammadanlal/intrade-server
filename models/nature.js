const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var natureSchema = new mongoose.Schema({
    
        businessName: {
            type: Schema.Types.String,
            required: true
        },
        category: {
            type: Schema.Types.String,
            required: true
        },
        contactNo: {
            type: Schema.Types.String,
            default:null
        },
        membershipType: {
            type: Schema.Types.String,
            default: null
    
        },
        companyType: {
            type: Schema.Types.String,
            required: true
        },
        website: {
            type: Schema.Types.String,
            default: null
        },
        listingType: {
            type: Schema.Types.String,
            default: null
          
        },
        remarks: {
            type: Schema.Types.String,
            default: null
            
        },
       
    }
);


module.exports = natureSchema;
