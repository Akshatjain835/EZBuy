import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from "dotenv"
import cors from 'cors'
import connectDB from './config/connectDB.js'
import userRouter from './routes/user.route.js'
import productRouter from './routes/admin/product.route.js'
import shopProductRouter from './routes/shop/products.route.js'
import cartRouter from './routes/shop/cart.route.js'
import addressRouter from './routes/shop/address.route.js'
import orderRouter from './routes/shop/order.route.js'
import adminOrderRouter from './routes/admin/order.route.js'
import searchRouter from './routes/shop/search.route.js'
import reviewRouter from './routes/shop/review.route.js'
import featureRouter from './routes/common/feature.route.js'

dotenv.config()

const app=express();
const PORT=process.env.PORT || 5000;

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
      origin:process.env.CLIENT_URL,
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
  app.use('/api/admin/orders',adminOrderRouter)
  
  app.use('/api/shop/products',shopProductRouter)
  app.use('/api/shop/cart',cartRouter)
  app.use('/api/shop/address',addressRouter)
  app.use('/api/shop/order',orderRouter)
  app.use('/api/shop/search',searchRouter)
  app.use('/api/shop/review',reviewRouter)

  app.use('/api/common/feature',featureRouter);

  app.get("/", (req, res) => {
    res.send("API is running...");
  });
  

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is now running on port ${PORT}`)
    })
})