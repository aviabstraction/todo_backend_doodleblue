const models = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req, res) => {
    const { email, password } = req.body;
    const {
        users,
        user_profiles
    } = models;

    try {

        const found_user = await users.findAll({
            where: {
                email
            }
        })
        if (!found_user) {
            res.json({
                type: "error",
                status: 404,
                message: "User not found",
                data: null,
                token: null
            });
        }
        else {
            if (found_user[0].password == password) {
                const user_profile = await user_profiles.findAll({
                    where: {
                        user_id: found_user[0].user_id
                    }
                })

                jwt.sign({ user_profile }, "secretKey", ((err, token) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        res.json({
                            type: "Success",
                            status: 200,
                            message: "Successfully Logged in",
                            token: token
                        })
                    }
                })
                )

            }
        }
    } catch (error) {
        console.log(error, "error")
        res.json({
            type: "error",
            status: 404,
            message: "User not found",
            data: error,
            token: null
        });
    }
};

module.exports = login;
