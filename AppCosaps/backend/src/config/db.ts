import mysql from "mysql2/promise";

const { createPool} = mysql;
const db = createPool({
    host: "localhost",
    user: "testecosaps",
    password: "pswd123",
    database: "appcosaps",
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
});


export default db;