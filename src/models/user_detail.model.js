import { query } from "../../../config/database.js";
class UserDetailModel {
    constructor(detail_id,name,image,intro,profile,phone,email) {
        this._detail_id = detail_id;
        this._name = name;
        this._image = image;
        this._intro = intro;
        this._profile = profile;
        this._phone = phone;
        this._email = email
    }
    get detailId(){
        return this._detail_id;
    }
    async create() {
        const sql = `INSERT INTO confession.user_detail (detail_id,name,image,intro,profile,phone,email) values ('${this._detail_id}',${this._name}','${this._image}','${this._intro}','${this._profile}','${this._phone}','${this._email}')`;
        console.log(sql);
        const res = await query(sql);
        return res;
    }
    static async getDetailById(detail_id) {
        const sql = `SELECT * FROM confession.user_detail where user_detail.detail_id = ${detail_id} and user_detail.deleted = 0;`
        const res = await query(sql);
        console.log(res);
        return res;
    }
    static async update(detail_id,name,image,intro,profile,phone,email) {
        const sql = `UPDATE confession.user_detail
        SET user_detail.image = ?, user_detail.name = ?, user_detail.intro = ?, user_detail.profile = ?,user_detail.phone = ?, user_detail.email = ?
        WHERE user_detail.detail_id = ?`;
        console.log(detail_id,name,image,intro,profile,phone,email);
        const res = await query(sql, [image,name,intro,profile,phone,email,detail_id])
        console.log(res,sql);
        return res;
    }
    static async delete(detail_id) {
        const sql = `Update confession.user_detail SET user_detail.deleted = 1 where user_detail.detail_id = ${detail_id}`
        const res = await query(sql, [detail_id])
        console.log(res);
        return res; 
    }
}

export default UserDetailModel