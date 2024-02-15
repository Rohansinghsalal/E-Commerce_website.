import jwt from "jsonwebtoken";

// creating token and saving in cookie
export const sendCookie = (user, res, message, statusCode = 200) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        // sameSite:process.env.NODE_ENV=="Development"?"lax":"none",
        // secure:process.env.NODE_ENV=="Development"?true:false
    };
    res.status(statusCode)
        .cookie("token", token, options)
        .send({
            success: true,
            message,
            user,
            token,
        });
};
