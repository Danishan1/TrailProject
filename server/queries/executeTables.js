import tablePaths from "../tableCreation/sequenceOfExecution.js";
import pool from "../config/db.js";
import fs from "fs"

export const executeTables = async () => {
    let conn;
    try {
        conn = await pool.getConnection()


        for (const filePath of tablePaths) {

            const sql = fs.readFileSync(filePath, "utf-8");
            await conn.query(sql);
            console.log("Excecuted Successfully:", filePath)
        }
        console.log("All Tables Created Successfully")
    } catch (err) {
        console.log("Error on Executing tables \n\n", err)

    } finally {
        if (conn) conn.release();
    }
};

