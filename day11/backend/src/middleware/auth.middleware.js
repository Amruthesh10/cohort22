const blackModel = require("../models/blacklistToken.model")
const jwt = require("jsonwebtoken")
const redis=require("../config/cache")

async function authUser(req, res, next) {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        // 🔥 Check if token is blacklisted
        const isBlacklisted = await redis.get(token)

        if (isBlacklisted) {
            return res.status(401).json({
                message: "Token expired. Please login again."
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded
        next()

    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}

module.exports = {authUser}