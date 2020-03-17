const verify_token = (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader) {
        res.json({
            status: 403,
            type: "Un authorized"
        })
    }
    else {
        const bearer = bearerHeader.split(" ")
        const bearerToken = bearer[1];
        req.token = bearerToken
        next()
    }
}
module.exports = verify_token