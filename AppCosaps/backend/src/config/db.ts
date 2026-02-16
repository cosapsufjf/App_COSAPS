import mysql from "mysql2/promise";

const { createPool} = mysql;
const db = createPool({
    host: "0.0.0.0",
    user: "root",
    password: "root",
    database: "appcosaps",
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
});


export default db;