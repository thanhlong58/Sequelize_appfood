import express  from 'express';
import { getLikesForRestaurant, likeRes, unlikeRes,getRestaurantsLikedByUser,getLikesByUserAndRestaurant,rateRestaurant,getRateByRes,getRatebyUser, orderFood, getRatings } from '../Controllers/resController.js';

const resRoutes = express.Router()

//Câu1
//like

resRoutes.post('/like',likeRes)


//unlike
resRoutes.post('/unlike',unlikeRes)


//lấy danh sách like theo nhà hàng

resRoutes.get("/:res_id/likes", getLikesForRestaurant);


// lấy danh sách like theo user 

resRoutes.get("/:user_id/like-by-user",getRestaurantsLikedByUser)

//lấy danh sách like theo nhà hàng và user 
resRoutes.get('/:user_id/:res_id/get-likes-list',getLikesByUserAndRestaurant)



//Câu 2 
//thêm đánh giá 
resRoutes.post("/rate-restaurant",rateRestaurant)
//lấy danh sách đánh giá theo nhà hàng
resRoutes.get("/:res_id/rate-by-res",getRateByRes)
//lấy danh sách đánh giá theo user 
resRoutes.get('/:user_id/rate-by-user',getRatebyUser)
//lấy danh sách đánh giá theo nhà hàng và user 
resRoutes.get('/:user_id/:res_id/get-rating',getRatings)


//câu 3 
//thêm order 

resRoutes.post('/order',orderFood)  







export default resRoutes