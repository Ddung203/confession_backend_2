import express from 'express'
import { getUserDetailById, createUserDetail,updateUserdetail,deleteUserDetail } from '../controllers/user_detail.controller.js'

const route = express.Router()

const useDetailRouter = (app) => {
    route.post('/detail/create', createUserDetail)
    route.get('/detail/:id', getUserDetailById)
    route.patch('/detail/update/:id',updateUserdetail)
    route.delete('/detail/delete/:id', deleteUserDetail)

    app.use('/api/v1', route)
}

export default useDetailRouter;