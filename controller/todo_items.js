
const models = require("../models")
const jwt = require("jsonwebtoken");


const { todos } = models

const todo_items = (req, res) => {

    jwt.verify(req.token, "secretKey", (err, auth_data) => {
        if (err) {
            console.log("error1", err)
            res.json({
                status: 403,
                data: null
            })
        }
        else {
            todos.findAll({
                where: {
                    created_by: auth_data.user_profile[0].profile_id,
                    is_active: true,
                    is_completed: false
                },
                attributes: ["todo_id", "todo_name", "is_completed", "expiry_date", "created_by", "updated_by", "is_active", "created_at", "updated_at"]
            }).then(data => {
                res.json({
                    status: 200,
                    message: "All todos",
                    data
                })
            }).catch(err => {
                console.log(err)
            })
        }
    })

}

module.exports = todo_items