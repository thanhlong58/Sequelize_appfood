import express  from'express';

import mysql2 from 'mysql2'
import cors from 'cors'


import rootRoutes from './Routes/rootRoutes.js';

const app = express();

app.use(express.json()); //hàm gọi middleware  chuyển đổi cấu trúc json để backend nhặn được

app.use(cors())

app.listen(8080);




//api 
//tham số 1 : định nghĩa  endpoint, params,
//tham số 2 : request, response
app.get("/demo/:id/:email",(req,res)=> {
    // từ đường dẫn params
       // + query string : 
     

    //    let {id,email} = req.query

       // + query params
       let {id,email} = req.params





    

    //nhận json : body 

    let {hoTen,phone } = req.body;

    

   res.status(200).send({id,email,hoTen,phone})
})

// const conn  = mysql2.createConnection({
//   host :"localhost",
//   user: "root",
//   password:"1234",
//   database: "db_nodejs33",
//   port : "3306"
// })

//http:localhost:8080/api           /food/get-food
app.use("/api",rootRoutes)












