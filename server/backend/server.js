const express = require("express");
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..' ,'build')));
const corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));

const db = require("./models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

const tutorials = require("./controllers/controller.js");

app.get("/:id", tutorials.find);
app.get("/suggestions/:searchPhrase", tutorials.suggestions);
app.get("/details/:watchmodeId", tutorials.details);
app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
