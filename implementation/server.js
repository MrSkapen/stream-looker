const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
