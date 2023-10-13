import { getUserDetailById, updateUserdetail, createUserDetail, deleteUserDetail} from '../controllers/user_detail.controller.js'
import express from 'express'

const route = express.Router()

const useDetailRoute = (app) => {
    route.post('/detail/create', createUserDetail)
    route.get('/detail/:id', getUserDetailById)
    route.patch('/detail/update/:id',updateUserdetail)
    route.delete('/detail/delete/:id', deleteUserDetail)
    app.use('/api/v1', route)
}

export default useDetailRoute;