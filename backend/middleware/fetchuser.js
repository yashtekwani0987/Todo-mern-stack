import jwt from "jsonwebtoken";

const JWT_SCRET = "21384#$!^%&*&GHG";
const fetchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send("please login with valid token");
  } else {
    try {
      const data = jwt.verify(token, JWT_SCRET);
      req.user = data.user
      next()
    } catch (error) {
      console.log(error.message);
    }
  }
};


export default fetchuser
