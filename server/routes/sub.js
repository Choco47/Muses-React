import express from "express";

const router = express.Router();

import {
    prices,
    createSubscription,
    subscriptionStatus,
    subscriptions,
    customerPortal,
  } from "../controllers/subs";
// middleware will allow the record to flow to the next stage
import { requireSignin } from "../middlewares";



//create endpoint function
router.get("/prices", prices);
router.post("/create-subscription", requireSignin, createSubscription);
router.get("/subscription-status", requireSignin, subscriptionStatus);
router.get("/subscriptions", requireSignin, subscriptions);
router.get("/customer-portal", requireSignin, customerPortal);

//export the route then import in server.js
module.exports = router;
