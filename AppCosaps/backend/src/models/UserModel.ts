import db from "../config/db.ts";

export const UserModel = {
    create_user(nome:string,email:string,cpf:string,senha:string){
        const sql = "INSERT INTO Usuarios (name, email, cpf, senha) VALUES (?,?,?,?)";
        return (db as any).query(sql,[nome,email,cpf,senha]);
    },
    
    get_user(search: "nome" | "email" | "cpf", query: string) {
        const sql = `SELECT * FROM Usuarios WHERE ${search} = ?`;
        return (db as any).query(sql, [query]);
    },

    async get_user_info(search: "nome" | "email" | "cpf", query: string, info: "senha" | "id" | "name" | "email" | "cpf") {
        try {
            const [rows] = await this.get_user(search, query);
            return rows.length > 0 ? rows[0][info] : null;
        } catch (error) {
            throw error;
        }
    },

    update_password(search: "nome" | "email" | "cpf", query: string, NewPassword: string) {
        const sql = `UPDATE Usuarios SET senha = ? WHERE ${search} = ?`;
        return (db as any).query(sql, [NewPassword, query]);
    }
};

export default UserModel;