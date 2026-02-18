import db from "../config/db.ts";

export const UserModel = {
    create_user(nome:string,email:string,cpf:string,senha:string){
        const sql = "INSERT INTO User (name, email, cpf, password) VALUES (?,?,?,?)";
        return (db as any).query(sql,[nome,email,cpf,senha]);
    },
    
    get_user(search: "nome" | "email" | "CPF", query: string) {
        const sql = `SELECT * FROM User WHERE ${search} = ?`;
        return (db as any).query(sql, [query]);
    },

    async get_user_info(search: "nome" | "email" | "CPF", query: string, info: "password" | "id" | "name" | "email" | "CPF") {
        try {
            const [rows] = await this.get_user(search, query);
            return rows.length > 0 ? rows[0][info] : null;
        } catch (error) {
            throw error;
        }
    },

    update_password(search: "nome" | "email" | "CPF", query: string, NewPassword: string) {
        const sql = `UPDATE User SET password = ? WHERE ${search} = ?`;
        return (db as any).query(sql, [NewPassword, query]);
    }
};

export default UserModel;