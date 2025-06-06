import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).send("kindly login")
    }

    jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
        if (err) {
            return res.status(403).send("you are not allowed to do this")


        }
        req.userId = payload.id;
        req.isSeller = payload.isSeller;
        next();
    });
}

