import UserDetailModel from "../models/user_detail.model.js";
//create detail user when not have infor
const createUserDetail = async (req,res,next) => {
    const {id,name,image,intro,profile,phone,email} = req.body;
    if(!id || isNaN(id)) {
        next(400)
    }
    try {
        const detailcheck = await UserDetailModel.getDetailById(id);
        if(detailcheck.length > 0) {
            return res.status(200).json({
                statuscode: 200,
                message: "User detail already exist"
            })
        }
        const userDetail = new UserDetailModel(id,name,image,intro,profile,phone,email)
        const result = userDetail.create();
        console.log(result);
        if(result) {
            res.status(200).json({
                statuscode: 200,
                message: "Update detail information successfully!",
                data: userDetail.getDetail(detail_id)[0]
            })
        }
    } catch(err) {
        console.log("Error when create user detail ", err.message);
        next(err)
    } finally {
        next();
    }
}
//get user detail by id
const getUserDetailById = async (req,res,next) => {
    const id = req.params.id;
    if(!id || isNaN(id)) {
        next(400);
    }
    try {
        const result = await UserDetailModel.getDetailById(id);
        if(result.length < 1 || !result) {
            return res.status(200).json({
                statuscode: 200,
                message: "User Detail not exits!"
            })
        }
        return res.status(200).json({
            statuscode: 200,
            message: "Get detail user id successfully!",
            data: result[0]
        })
    } catch(err) {
        console.log('Error while getting user by userId' + err.message);
        next(err)
    }
}
// update user detail by id
const updateUserdetail = async (req,res,next) => {
    const id = req.params.id;
    const {name,image,intro,profile,phone,email} = req.body;
    if(!id || isNaN(id)) {
        next(400);
    }
    try {
        const detailcheck = await UserDetailModel.getDetailById(id)
        if(detailcheck.length < 1 || !detailcheck) {
            return res.status(200).json({
                statuscode: 200,
                message: "User detail not exits"
            })
        }
        const result = await UserDetailModel.update(id,name || detailcheck[0].name,image || detailcheck[0].image,intro || detailcheck[0].intro,profile || detailcheck[0].profile,phone || detailcheck[0].phone,email || detailcheck[0].email)
        if(result.changedRows < 1 || !result) {
            return res.status(200).json({
                statuscode: 200,
                message: "Update user detail unsuccessfully!"
            })
        }
        return res.status(200).json({
            statuscode: 200,
            message: "Update user detail successfully!"
        })
    } catch(err) {
        console.log("Error when update user detail", err.message);
        next(err)
    } finally {
        next();
    }
}

//delete user detail
const deleteUserDetail = async (req,res,next) => {
    const id = req.params.id;
    if(!id || isNaN(id)) {
        next(400);
    }
    try {
        const detailcheck = await UserDetailModel.getDetailById(id)
        if(detailcheck.length < 1 || !detailcheck) {
            return res.status(200).json({
                statuscode: 200,
                message: "User detail not exits."
            })
        }
        const result = await UserDetailModel.delete(id);
        if(!result || result.affectedRows == 0) {
            return res.status(200).json({
                statuscode: 204,
                message: "Delete user detail unsuccess!"
            })
        }
        return res.status(200).json({
            statuscode: 200,
            message: "Delete user detail succesfully!"
        })
    } catch(err) {
        console.log("Error when delete user", err.message)
        next(err);
    } finally {
        next();
    }
}
export {
    createUserDetail,
    getUserDetailById,
    updateUserdetail,
    deleteUserDetail
}