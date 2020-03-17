
const models = require("../models")
const jwt = require("jsonwebtoken");


const { todos } = models

const updated_todo = (req, res) => {
    const { id } = req.params
    const { todo_id, todo_name, expiry_date, updated_at } = req.body
    jwt.verify(req.token, "secretKey", (err, auth_data) => {
        if (err) {
            console.log(err)
            res.json({
                status: 403,
                data: null
            })
        }
        else {
            todos.update(
                {
                    todo_name,
                    expiry_date,
                    updated_at
                },
                {
                    where: {
                        todo_id: todo_id,
                        updated_by: auth_data.user_profile[0].profile_id
                    }
                },
                {
                    multi: true
                }
            ).then(data => {
                res.json({
                    status: 200,
                    message: "Todo updated",
                    data
                })
            }).catch(err => {
                console.log(err)
            })
        }
    })

}

module.exports = updated_todo