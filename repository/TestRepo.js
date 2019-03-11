// EmpDetails models lives here
var EmpDetails  = require('../db/models/empdetails');

module.exports = {
    saveEmpDetails: function(empdetails,callback) {
       
        console.log(">>>  inside saveEmpDetails ");
        
          empdetails.save(function(err) {
            callback(err);
        });         
       
    },
    // continue adding more functions
    otherFunction: function() {

    }
}


//var myFunc1 = function() { ... };
//var myFunc2 = function() { ... };
//exports.myFunc1 = myFunc1;
//exports.myFunc2 = myFunc2;