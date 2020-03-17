
const models = require("../models")
const jwt = require("jsonwebtoken");


const { todos } = models

const delete_todo = (req, res) => {
    const { is_active, todo_id, updated_at } = req.body
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
                    updated_by: auth_data.user_profile[0].profile_id,
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
                    message: "Todo Deleted",
                    data
                })
            }).catch(err => {
                console.log(err)
            })

        }
    })

}

module.exports = delete_todo