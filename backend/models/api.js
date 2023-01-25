const mongoose = require('mongoose');

const apiSchema = mongoose.Schema({
    id: { type: String },
    itemName: { type: String, required: true },
    dateOfService: { type: Date, required: true },
    ownerName: { type: String, required: true },
    venderName: { type: String, required: true },
    createdOn: { type: Date, required: true }
});

module.exports = mongoose.model('table', apiSchema);