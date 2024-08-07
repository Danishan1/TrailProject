import pool from "../../config/db.js";

export const verifyUser = async (req, res) => {
    const { userId } = req.body;
    const query = `SELECT userId, name FROM user WHERE userId = ?`;
    try {

        const [result] = await pool.query(query, [userId])

        if (result.length > 0) res.json({ responseId: "00021", userId: result[0].userId, name: result[0].name, message: "Success" })
        else res.json({ responseId: "00022", message: "User Do not exist." })
    } catch (err) {
        res.status(500).json({ responseId: "00023", message: "Server error", err })

    }
}