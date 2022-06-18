import expressJWT from "express-jwt"

//middleware will allow the record to flow to the next stage

// verify if this token is valid or not
export const requireSignin = expressJWT({
    secret:process.env.JWT_SECRET,
    algorithms:["HS256"],
});