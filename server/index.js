import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from "dotenv"
import cors from 'cors'
import connectDB from './config/connectDB.js'
import userRouter from './routes/user.route.js'
import productRouter from './routes/admin/product.route.js'
import shopProductRouter from './routes/shop/products.route.js'
import cartRouter from './routes/shop/cart.route.js'

dotenv.config()

const app=express();
const PORT=process.env.PORT || 5000;

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "DELETE", "PUT"],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
      ],
      credentials: true,
    })
  );

  app.use('/api/user',userRouter)
  app.use('/api/admin/products',productRouter)
  app.use('/api/shop/products',shopProductRouter)
  app.use('/api/shop/cart',cartRouter)

  app.get("/", (req, res) => {
    res.send("API is running...");
  });
  

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is now running on port ${PORT}`)
    })
})