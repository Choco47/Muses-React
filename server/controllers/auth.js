import User from "../models/user";
import { hashPassword, comparePassword } from "../helpers/auth";
import jwt from "jsonwebtoken"
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// async function so that can use, try and catch if err
export const register = async (req,res)=>{
    //send response to client
    try{
        //validation
        //console.log(req.body);
        const { name, email, password } = req.body;
        if (!name) {
          return res.json({
            error: "Name is required",
          });
        }
        if (!password || password.length < 6) {
          return res.json({
            error: "Password is required and should be 6 characters long",
          });
        }
        //check exist email
        const exist = await User.findOne({ email });
        if (exist) {
          return res.json({
            error: "Email is taken",
          });
        }
        // cuz we cannot save the plain password so we need to hash password send to DB
        const hashedPassword = await hashPassword(password);

        //create account in stripe
        const customer = await stripe.customers.create({
          email,
        });
        
        ////////////////////////////////////////////////////////
        //Demo parts
        console.log("stripe customer created on signup",customer)

        try {
          const user = await new User({
            name,
            email,
            password: hashedPassword,
            //stripe id
            stripe_customer_id: customer.id,
          }).save();

        //console.log(user);
        //if not use ._doc it will show the mongodb object
        // create signed token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
          });

        //   console.log(user);
        const { password, ...rest } = user._doc;
        return res.json({
          token,
          user: rest,
        });
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };

  export const login = async (req, res) => {
    try {
      // check email
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.json({
          error: "No user found",
        });
      }
      // check password
      const match = await comparePassword(req.body.password, user.password);
      if (!match) {
        return res.json({
          error: "Wrong password",
        });
      }
      // create signed token
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
  
      const { password, ...rest } = user._doc;
  
      res.json({
        token,
        user: rest,
      });
    } catch (err) {
      console.log(err);
    }
  };