var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var multer  = require('multer');
// create our router
var router = express.Router();

var empRepo = require('../repository/TestRepo.js');

// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// STORING FILES ON FILE LOCATION
var upload = multer({ dest: 'fileUploads/' })
// EmpDetails models lives here
var EmpDetails  = require('../db/models/empdetails');

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	
	res.json({ message: 'hooray! welcome to our api!' });	
});


router.post('/addEmpDetails', jsonParser, function(req, res) {
	console.log(">>> Inside  addEmpDetails flow");
	var errHandling = function (err){
		if(err!==null && err.errors){
		res.status(400);
		res.send(err);
		}else{
			res.json({ message: 'Successfully added !!' });
		}
	}
	//creating empdetails object
	var empdetails = new EmpDetails();
	empdetails.name = req.body.name;
	empdetails.age= req.body.age;
	empdetails.department= req.body.department;
	empdetails.address.addressLine1 = req.body.address.addressLine1;
	empdetails.address.state = req.body.address.state;
	empdetails.address.country = req.body.address.country;
	console.log(">>> Employee object created from request");
	empRepo.saveEmpDetails(empdetails,errHandling);
		
});
// FILE UPLOAD
router.post('/uploadFile', upload.single('test') ,function(req, res) {
	console.log("file size >>>"+ req.file.originalname);
	//console.log("file size >>>"+ req.body);
	res.json(" File uploaded to S3!!");	
});


router.get('/readFile', function(req, res) {
	var config = require('../resources/test.json');
	res.json(config);	
});

module.exports = router;