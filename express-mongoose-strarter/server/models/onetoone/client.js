const mongoose = require('mongoose');

const authorModel = mongoose.Schema({
    clientName: {
        type: String,
        required: '{PATH} is required!'
    },
    website: {
        type: String
    },
    customer:
        { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    vendor: 
        { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Author', authorModel);