
const models = require("../models")
const jwt = require("jsonwebtoken");


const { todos } = models

const complete_todo = (req, res) => {
    const { todo_id, is_active, is_completed, updated_at } = req.body
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
                    is_completed,
                    is_active,
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
                    message: "Todo Completed",
                    data
                })
            }).catch(err => {
                console.log(err)
            })
        }
    })

}

module.exports = complete_todo