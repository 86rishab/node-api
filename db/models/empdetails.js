var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EmpSchema   = new Schema({
    name: {
        type: String,
        minlength: [2, 'Please enter atleast 2 characters !!!'],
        maxlength: 30,
        required: true
    },
    age: {
        type: Number,
        min: [18, 'you cant be registered as employee!'],
        max: 65,
        required: true
    },
    department: {
        type: String,
        minlength: [5, 'Please enter Department Name properly !!!'],
        maxlength: 15,
        required: true
    },
    address: {
        addressLine1: {
            type: String,
            required: true
        },
        addressLine2: String,
        state: String,
        country: {
            type: String,
            required: true
        }
    }
});

module.exports = mongoose.model('EmpDetails', EmpSchema);