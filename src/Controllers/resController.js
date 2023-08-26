import sequelize from "../Models/index.js"
import initModels from "../Models/init-models.js"
import { Sequelize } from "sequelize"

const model = initModels (sequelize)

const { like_res, user, restaurant,rate_res,order } = model;
//chức năng like
const likeRes = async (req, res) => {
  const { user_id, res_id } = req.body; 
  const currentDate = new Date();

  try {
  
    const existingLike = await like_res.findOne({
      where: {
        user_id,
        res_id,
      },
    });

    if (existingLike) {
      return res.status(400).json({ message: "User has already liked this restaurant." });
    }

   
    await like_res.create({
      user_id,
      res_id,
      date_like : currentDate
    });

    return res.status(201).json({ message: "Restaurant liked successfully." });
  } catch (error) {
    console.error("Error liking restaurant:", error);
    return res.status(500).json({ message: "An error occurred while liking the restaurant." });
  }
};


//chức năng unlike
const unlikeRes = async (req, res) => {
  const { user_id, res_id } = req.body;

  try {
   
    const existingLike = await like_res.findOne({
      where: {
        user_id,
        res_id,
      },
    });

    if (!existingLike) {
      return res.status(400).json({ message: "User has not liked this restaurant." });
    }

   
    await existingLike.destroy();

    return res.status(200).json({ message: "Restaurant unliked successfully." });
  } catch (error) {
    console.error("Error unliking restaurant:", error);
    return res.status(500).json({ message: "An error occurred while unliking the restaurant." });
  }
};


//lấy danh sách like theo nhà hàng


const getLikesForRestaurant = async (req, res) => {
  const { res_id } = req.params; 

  try {
    const likes = await like_res.findAll({
      where: {
        res_id,
      },
      include: [
        {
          model: user,
          as: 'user', 
        },
      ],
    });

    return res.status(200).json(likes);
  } catch (error) {
    console.error("Error fetching likes for restaurant:", error);
    return res.status(500).json({ message: "An error occurred while fetching likes for the restaurant." });
  }
};

//lấy danh sách like theo user  

const getRestaurantsLikedByUser = async (req, res) => {
  const { user_id } = req.params; 

  try {
    const likedRestaurants = await like_res.findAll({
      where: {
        user_id,
      },
      include: [
        {
          model: restaurant,
          as: 're', 
        },
      ],
    });

    
    const restaurantList = likedRestaurants.map((like) => like.re);

    return res.status(200).json(restaurantList);
  } catch (error) {
    console.error("Error fetching restaurants liked by the user:", error);
    return res.status(500).json({ message: "An error occurred while fetching restaurants liked by the user." });
  }
};

//lấy danh sách like theo nhà hàng và user 

const getLikesByUserAndRestaurant = async (req, res) => {
  const { user_id, res_id } = req.params; 

  try {
   
    const userLikes = await like_res.findAll({
      where: {
        user_id,
        res_id,
      },
      include: [
        {
          model: restaurant,
          as: 're', 
        },
        {
          model: user,
          as: 'user', 
        },
      ],
    });

   
    const likedRestaurants = await like_res.findAll({
      where: {
        user_id,
      },
      include: [
        {
          model: restaurant,
          as: 're', 
        },
      ],
    });

    return res.status(200).json({ userLikes, likedRestaurants });
  } catch (error) {
    console.error("Error fetching likes and liked restaurants:", error);
    return res.status(500).json({ message: "An error occurred while fetching likes and liked restaurants." });
  }
};






//thêm đánh giá nhà hàng

const rateRestaurant = async (req, res) => {
  const { user_id, res_id, amount } = req.body; 
  const currentDate = new Date();

  try {
  
    if (amount > 5) {
      return res.status(400).json({ message: "Rating cannot be greater than 5." });
    }

   
    const existingRating = await rate_res.findOne({
      where: {
        user_id,
        res_id,
      },
    });

    if (existingRating) {
    
      await existingRating.update({ amount, date_rate: currentDate });
    } else {
     
      await rate_res.create({
        user_id,
        res_id,
        amount,
        date_rate: currentDate,
      });
    }

    return res.status(201).json({ message: "Restaurant rated successfully." });
  } catch (error) {
    console.error("Error rating restaurant:", error);
    return res.status(500).json({ message: "An error occurred while rating the restaurant." });
  }
};


//lấy danh sách đánh giá theo nhà hàng

const getRateByRes = async (req,res) => {
  const {res_id} = req.params;

  try {
    const rates = await rate_res.findAll({
      where: {
        res_id,
      },
      include: [
        {
          model: user,
          as: 'user', 
        },
      ],
    });

    return res.status(200).json(rates);
  } catch (error) {
    console.error("Error fetching likes for restaurant:", error);
    return res.status(500).json({ message: "An error occurred while fetching likes for the restaurant." });
  }

}


//lấy danh sách đánh giá theo user

const getRatebyUser =  async(req,res) => {
  const { user_id } = req.params; 

  try {
    const ratedRestaurants = await rate_res.findAll({
      where: {
        user_id,
      },
      include: [
        {
          model: restaurant,
          as: 're', 
        },
      ],
    });

    
    const restaurantList = ratedRestaurants.map((rate) => rate.re);

    return res.status(200).json(restaurantList);
  } catch (error) {
    console.error("Error fetching restaurants liked by the user:", error);
    return res.status(500).json({ message: "An error occurred while fetching restaurants liked by the user." });
  }
}

//lấy danh sách đánh giá nhà hàng theo user và id 

const getRatings = async (req, res) => {
  const { user_id, res_id } = req.params;

  try {
    let ratings;

    if (user_id && res_id) {
      
      ratings = await rate_res.findAll({
        where: {
          user_id,
          res_id,
        },
        include: [
          {
            model: restaurant,
            as: 're', 
          },
          {
            model: user,
            as: 'user', 
          },
        ],
      });
    } else if (user_id) {
    
      ratings = await rate_res.findAll({
        where: {
          user_id,
        },
        include: [
          {
            model: restaurant,
            as: 're', 
          },
        ],
      });
    } else if (res_id) {
     
      ratings = await rate_res.findAll({
        where: {
          res_id,
        },
        include: [
          {
            model: user,
            as: 'user', 
          },
        ],
      });
    } else {
      return res.status(400).json({ message: "Please provide either user_id or res_id as a path parameter." });
    }

    return res.status(200).json(ratings);
  } catch (error) {
    console.error("Error fetching ratings:", error);
    return res.status(500).json({ message: "An error occurred while fetching ratings." });
  }
};


//order 
const orderFood = async (req, res) => {
  const { user_id, food_id, amount, code, arr_sub_id } = req.body;

  try {
  
    const existingOrder = await order.findOne({
      where: {
        user_id,
        food_id,
      },
    });

    if (existingOrder) {
     
      await existingOrder.update({ amount, code, arr_sub_id });
    } else {
     
      await order.create({
        user_id,
        food_id,
        amount,
        code,
        arr_sub_id,
      });
    }

    return res.status(201).json({ message: "Order placed successfully." });
  } catch (error) {
    console.error("Error placing order:", error);
    return res.status(500).json({ message: "An error occurred while placing the order." });
  }
};



export {likeRes,unlikeRes,getLikesForRestaurant,getRestaurantsLikedByUser,getLikesByUserAndRestaurant ,rateRestaurant,getRateByRes,getRatebyUser,getRatings,orderFood}