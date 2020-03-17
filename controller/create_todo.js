
const models = require("../models")
const jwt = require("jsonwebtoken");
const uuidv4 = require("uuid/v4");


const { todos } = models

const create_todo = (req, res) => {
    const { todo_name, is_completed, expiry_date, is_active, created_at, updated_at } = req.body
    jwt.verify(req.token, "secretKey", (err, auth_data) => {
        if (err) {
            console.log(err)
            res.json({
                status: 403,
                data: null
            })
        }
        else {
            todos.create({
                todo_id: uuidv4(),
                todo_name,
                is_completed,
                expiry_date,
                created_by: auth_data.user_profile[0].profile_id,
                updated_by: auth_data.user_profile[0].profile_id,
                is_active,
                created_at,
                updated_at
            }).then(data => {
                res.json({
                    status: 200,
                    message: "Todo created",
                    data
                })
            }).catch(err => {
                console.log(err)
            })
        }
    })

}

module.exports = create_todo