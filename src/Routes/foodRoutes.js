import express from 'express'
import { findFood, getFood } from '../Controllers/foodcontrollers.js'


// /food/get-food",getFood

//nơi định nghía api 
//GET, POST , PUT, DELETE

const foodRoutes  = express.Router()


foodRoutes.get('/get-food',getFood)
foodRoutes.get('/find-food',findFood)



export default foodRoutes