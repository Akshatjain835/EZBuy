import jwt from 'jsonwebtoken'

const isAuthenticated = async (req, res, next) => {
  const authHeader  = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
    // console.log(token)

    if (!token)

      return res.status(401).json({
        success: false,
        message: "Unauthorised user!",
      });

  
    try {

      const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
        // console.log(decoded)
      req.user = decoded;
      req.id = decoded.userId;

      next();

    } catch (error) {

      res.status(401).json({
        success: false,
        message: "Unauthorised user!",
      });

    }
  };

  export default isAuthenticated