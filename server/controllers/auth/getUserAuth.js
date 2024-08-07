import generateUserId from "./generateID.js";
import generatePasscode from "./generatePasscode.js";
import pool from "../../config/db.js";
import { getStatusDetails } from "../../utils/getStatusDetails.js";

export const getUserAuth = async (req, res) => {
  try {
    let userId;
    let isUnique = false;

    // Check if userId is unique, generate a new one if it's not
    while (!isUnique) {
      userId = generateUserId();
      const [rows] = await pool.query('SELECT userId FROM user WHERE userId = ?', [userId]);
      if (rows.length === 0) isUnique = true;

    }

    const passcode = generatePasscode();

    res.json({ userId, passcode, resId: 'OK' });
  } catch (error) {
    const statusDetail = getStatusDetails('500');
    res.status(statusDetail.statusCode).json({ ...statusDetail, message: "Database Error", error });
  }
};
