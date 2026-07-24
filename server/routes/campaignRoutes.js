const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/authMiddlewares");
const {createCampaign,
    sendCampaign,
    getAllCampaigns,
    updateCampaign,
    deleteCampaign} =require("../controllers/campaignController")

router.post("/send/:id",auth,sendCampaign)
router.get("/all", auth, getAllCampaigns);
router.post("/create", auth, createCampaign);
router.put("/update/:id",auth,updateCampaign)
router.delete("/delete/:id",auth,deleteCampaign)


module.exports = router;