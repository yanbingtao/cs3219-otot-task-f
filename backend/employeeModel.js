var mongoose = require('mongoose');
// Setup schema
var employeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: String,
    gender: String,
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Contact model
var Contact = module.exports = mongoose.model('contact', employeeSchema);
module.exports.get = function (callback, limit) {
    Contact.find(callback).limit(limit);
}