import { where } from "sequelize"
import sequelize from "../Models/index.js"
import initModels from "../Models/init-models.js"
import { Sequelize } from "sequelize"

const Op = Sequelize.Op

const model  = initModels(sequelize)


//R => get all 
const getUser = async (req,res) => {
    //SELECT * FROM user => list object ngoặc vuông bao ngoặc nhọn
    let data  = await model.user.findAll()
   //SELECT * FROM user join
    data  = await model.food.findAll({
        include: ["type"]
    })

    //SELECT * FROM user where user_id  = 1 LIMIT 1 
    res.send(data)
}


//R => get by id 
const getUserById = async (req,res) => {
  
    let {id} = req.params;


    //SELECT * FROM user where user_id  = 1 LIMIT 1 
    let data = await model.user.findOne({
        where : {user_id : id}
    })
    res.send(data)
}



//CUD 
const createUser = async (req,res) => {
    try {
        let {full_name,email,pass_word} = req.body
        let checkEmail  = await model.user.findAll( {
            where : {
                email
            }
        })
    
        if (checkEmail.length > 0) {
            res.send('Email đã tồn tại');
            return;
    
        }
     
      await  model.user.create({full_name,email,pass_word});
    
      res.send('Thêm mới thành công ')
    }catch(exp) {
        res.status(500).send("lỗi BE")
    }

}


const updateUser = async (req,res) => {

    let {id} = req.params;
    let {full_name,email,pass_word} = req.body

    //check trùng email

  await  model.user.update({full_name,email,pass_word},{where:{user_id: id}} )

    res.send('Cập nhật thành công')
}


const deleteUser = async (req,res) => {
    let {id} = req.params;
   await model.user.destroy({where : {user_id : id}})

   res.send('xóa thành công')
    
}

//tìm user
const getUserByName = async (req,res) => {
    
    let {fullName} = req.params;
    let data = await model.user.findAll(
        {where : {
            full_name :  {
                [Op.like] : `%${fullName}%`
            }
        }}
    )

    res.send(data)
}





export {getUser,getUserById,createUser,updateUser,deleteUser,getUserByName}