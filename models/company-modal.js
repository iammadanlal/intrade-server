const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var companySchema = new mongoose.Schema({
    nature_of_business:{
        type: require('../models/nature'),
        default: null
    },
    business_address:{
        type: require('../models/address'),
        default: null
    },
    communication_details:{
        type: require('../models/communication'),
        default: null
    },

    isVerified:{
        type: Schema.Types.Boolean,
        default: false
    }
},

{
    timestamps: true 
}


);

const Company= mongoose.model('Company',companySchema,'Company');
module.exports = Company;
