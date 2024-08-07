import { getStatusDetails } from "../utils/getStatusDetails.js";
export const authMiddleware = (req, res, next) => {

    if (!req.session.userId) {
        const statusDetail = getStatusDetails(401)
        return res.status(Number(statusDetail.statusCode)).json({ ...statusDetail, responseCode: '0000A' });
    }
    next();
};
