const models = require("../models")
const uuidv4 = require("uuid/v4");

const { users, user_profiles } = models


const register = async (req, res) => {
    const { email, contact_number, user_name } = req.body
    try {
        const users_data = await users.create({
            user_id: uuidv4(),
            email,
            password: `12345678`,
            is_active: true,
            created_at: new Date(),
            updated_at: new Date()
        });
        const profiles_data = await user_profiles.create({
            profile_id: uuidv4(),
            user_id: users_data.user_id,
            user_name,
            email: users_data.email,
            contact_number,
            is_active: users_data.is_active,
            created_at: new Date(),
            updated_at: new Date()
        });

        if (profiles_data) {
            res.json({
                type: "Success",
                status: 200,
                message: "Successfully Registered",
                user_profile: profiles_data
            });
        }

    }
    catch (err) {
        console.log(err);
        res.json({
            type: "Error",
            status: 404,
            message: "Unsuccessfull Registration",
            user_profile: err
        });


    }
}

module.exports = register