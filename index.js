//Core or Third party dependencies

const express = require("express");
const Sequelize = require("sequelize");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
require("dotenv").config();
const register = require("./controller/register")
const login = require("./controller/login")
const create_todo = require("./controller/create_todo")
const update_todo = require("./controller/update_todo")
const complete_todo = require("./controller/complete_todo")

const delete_todo = require("./controller/delete_todo")
const todo_items = require("./controller/todo_items")
const verify_token = require("./middleware/verify_token")

// Importing controllers


//Instantiate app through express
const app = express();

//cors
app.use(cors());

//logs
app.use(logger("dev"));

//Basic setup needed for parsing forms
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));




//Router


//default route
app.get('/', (req, res) =>
    res.send('Welcome to backend of Todo APP!')
)
//register 
app.post("/register", register)
//login
app.post("/login", login)
//create_todo
app.post("/create/todo", verify_token, create_todo)
//update_todo
app.put("/update/todo", verify_token, update_todo)
//delete todo
app.put("/delete/todo", verify_token, delete_todo)
//complete_todo
app.put("/complete/todo", verify_token, complete_todo)
//get_todos
app.get("/todos", verify_token, todo_items)




//Port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server Listening on Port ${PORT}`));
