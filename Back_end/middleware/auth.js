import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: "Not authorized. Login again." });
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", token_decode);  // Debug log
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log("Error:", error);
        res.json({ success: false, message: "Invalid token." });
    }
};

export default authMiddleware;
