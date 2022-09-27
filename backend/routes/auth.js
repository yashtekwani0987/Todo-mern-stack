import express from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../models/User.js";

const router = express.Router();

const JWT_SCRET = '21384#$!^%&*&GHG'
router.post("/createuser", async (req, res) => {
  try {
    
    let success =false
    const userexist = await User.findOne({ email: req.body.email });
    if (!userexist) {
        const salt = await bcrypt.genSalt(10);
        const secpassword = await bcrypt.hash(req.body.password , salt)
        
        const user = await User({
        name: req.body.name,
        email: req.body.email,
        password: secpassword,
      });
      user.save();
      const data = {
        user:{
            id:user.id
        }
      }
      success = true
      const authtoken = jwt.sign(data , JWT_SCRET)
      res.send({success , authtoken})
      } else {
      res.send({success})
      // res.send("User already exist");
    }
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/loginuser' , async(req,res)=>{
     try {
      let success = false
      // console.log(success)
        const {email , password} = req.body
        const userexist = await User.findOne({email})
      
        if(userexist===null){
            res.send({success})
        }
        if(userexist.email!==null){
          const ispassword = await bcrypt.compare(password , userexist.password)
          
          
          if(ispassword){
        success = true
        const data = {
            user:{
                id:userexist.id
            }
          }
          const authtoken = jwt.sign(data , JWT_SCRET)
          res.send({ success ,authtoken})
                
            }
            else{
              res.send({success})
            }
            
        }
        
     } catch (error) {
        console.log(error.message)
     }       

})

export default router;
