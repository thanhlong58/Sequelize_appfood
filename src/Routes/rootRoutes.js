import express from 'express';
import foodRoutes from './foodRoutes.js';
import userRoutes from './userRoutes.js';
import resRoutes from './resRoutes.js';



//quản lý tên đối tượng endpoint
const rootRoutes = express.Router();

rootRoutes.use("/food",foodRoutes)

//quản lý đối tượng user

rootRoutes.use('/user',userRoutes)

//quản lý dối tượng nhà hàng 

rootRoutes.use('/restaurant',resRoutes)


export default rootRoutes