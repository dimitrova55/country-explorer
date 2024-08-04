import express from "express"
import axios from "axios"
import bodyParser from "body-parser"
import dotenv from 'dotenv'

dotenv.config();

const app = express();
const port = 3000;
const api_key = process.env.API_Key; 

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/", async(req, res) => {
    
    try {
        const response_country = await axios.get(`https://restcountries.com/v3.1/name/${req.body.country}`);
        // console.log(response_country.data[0].name.common);
        // console.log(response_country.data[0].capital[0]);
        const country_code = response_country.data[0].cca2;
        //console.log(country_code);
        

        if(req.body.year){
            const response_calendar = await axios.get(
                `https://calendarific.com/api/v2/holidays?` +
                `&api_key=${api_key}` +
                `&country=${country_code}` +
                `&year=${req.body.year}` +
                `&month=${req.body.month}`
              );
              // console.log(response_calendar.data.response.holidays[0]);
              res.render("index.ejs", {
                country: response_country.data[0],
                calendar: response_calendar.data.response.holidays
              });
        } else {
            res.render("index.ejs", {country: response_country.data[0]});
        }        
    } catch (error) {
        console.log(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}.`);
})
