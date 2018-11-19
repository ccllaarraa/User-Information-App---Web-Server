
//app js is the back end, what is gonna be printed has to be put on the ejs files

const express = require('express');
var bodyParser = require('body-parser');
const app = express();
let fs = require('fs');

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//route 1
app.get("/", function(req,res){
	fs.readFile('users.json', function (err, data ) { //could this fs.readfile be in the index.ejs file instead? why not?
  		if (err) {
  		throw err;}; //err if err
  var obj = JSON.parse(data); 
res.render("index.ejs", {user: obj} );
	});	 
});

//route 2
app.get("/searchbar", function (req, res){ 
	res.render ("searchbar");	
})


//route 3
app.post("/searchresult", function (req, res){
	fs.readFile('users.json', function (err, data ) { 
  		if (err) {
  		throw err}; //err if err
	var obj = JSON.parse(data);
	// render (is a function) (the results page and then pass in {newdata: req.body, user: obj})	
	res.render("searchresult", {newData: req.body, user: obj}); 
	// newdata and object get compared, post request with a start and an end, body is qwhateva in the searchbar 
	})
});




//route 4
app.get("/typeYourself", function (req,res){
	res.render("typeYourself");
})

//route 5
app.post('/', function (req, res) {
    fs.readFile('./users.json', (err, data) => {
        if (err) {throw err}
        	//first convert json file
        const obj = JSON.parse(data);
         //create a new variable that is gonna include the new data
        let newUser = { //to add user
            firstname: req.body.searchFirstName,
            lastname: req.body.searchLastName,
            email: req.body.searchEmail,
        }
        //now push new user to the array in .json file
        obj.push(newUser);
//convert it to a legible format for json by stringifying it
        let newJson = JSON.stringify(obj, null, 2);//2 is the space

        fs.writeFile('./users.json', newJson, (err, data) => {
            if (err) {throw err}
        })
    })
    res.redirect('/');
});


//autocomplete
//request from searchbar.ejs, aka ajax post request
app.post("/invisibleURL", function (req,res){ //5
 // console.log(req.body.search) //.search to specify the value (and not the key "search :") from our object searchField
     fs.readFile('./users.json', (err, data) => { //6
        if (err) {throw err}
          //first convert json file
        const obj = JSON.parse(data); 
       // console.log(obj)
         let result = [];
       obj.forEach(function (element) { //7 
       //foreach always needs a parameter, that we called here "element"
         // console.log(element.firstname);
       
         if (element.firstname.startsWith(req.body.search) || element.lastname.startsWith(req.body.search) ) { 
          //console.log("success")
           result.push(element);  //8
       console.log(result);

     }
       

       })
      res.send(result);
      });


})

//5. we type app.post, and the console log to check if we receive the file , req.body
//6. we chekc the json file with the fsreadfile
//7. we compare the typed stuff and json
//8. you push it

app.listen(3000, function () {
   console.log('Example app listening on port 3000!')
 })



