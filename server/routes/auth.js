import express from "express";
import { register , login } from "../controllers/auth";

const router = express.Router();

//create endpoint
router.post("/register", register);
router.post("/login", login);

//export the route then import in server.js
module.exports = router;
