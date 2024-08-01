import express from "express"
import axios from "axios"
import bodyParser from "body-parser"

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/", async(req, res) => {
    
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${req.body.country}`);
        // console.log(response.data[0].name.common);
        // console.log(response.data[0].capital[0]);
        res.render("index.ejs", {data: response.data[0]})
    } catch (error) {
        console.log(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}.`);
})
