const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/authMiddlewares");
const { createAudience, getAudienceById, getAllAudiences, updateAudience, deleteAudience } = require("../controllers/audienceController");

router.post("/create", auth, createAudience);
router.get("/all",auth,getAllAudiences)
router.get("/:id",auth,getAudienceById)

router.put("/update/:id",auth,updateAudience)
router.delete("/delete/:id",auth,deleteAudience)

module.exports = router;