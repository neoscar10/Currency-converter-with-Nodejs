// FIRST run npm i in you console to install all required libraries

// importing required libraries
import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

// put in your API key
// get you API key from https://app.exchangerate-api.com
const youAPIKey = "";

const app = express();
// port number of choice
const port = 3000; 

// express.static to show location of static files and then the normal config for bodyParser middlewere
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));




// get rout for the home page
app.get('/', (req, res)=>{
    res.render('index.ejs');
})

// post rout for the home page
app.post('/', async (req, res)=>{
  // getting hold of from and to name values from the form
  const from = req.body.from;
  const to = req.body.to;

  // using axios to make the get req to the rout and inserting you API key
  // look at the console log for response.data to understand the structure of the data
    try {
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${youAPIKey}/latest/${from}`);
        const rate = response.data.conversion_rates[to]
        console.log(response.data);
        res.render('index.ejs', {
          rate: rate,
          to: to,
          from: from
        });
      } catch (error) {
        console.error(error);
        res.render('index.ejs', {
          error: "Unable to retrieve exchange rate"
        })
      }
})








app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
})