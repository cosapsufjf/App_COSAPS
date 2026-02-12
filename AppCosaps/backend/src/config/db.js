import mysql from "mysql2";

const db = mysql.createConnection({
    host: "0.0.0.0",
    user: "root",
    password: "root",
    database: "appcosaps",
    port: 3306
});

db.connect((err)=>{
    if (err)
    {
        console.log(err.stack)
        return;
    }
    console.log("Conectado ao banco de dados");
})

export default db;