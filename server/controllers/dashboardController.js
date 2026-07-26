import  Contact from "../models/Contact.js"
 import Audience from "../models/Audience.js";
import  Campaign from "../models/Campaign.js";

exports.getDashboardStats = async (req, res) => {
  try {
    const totalContacts = await Contact.countDocuments({
      owner: req.user.id,
    });

    const totalAudiences = await Audience.countDocuments({
      owner: req.user.id,
    });

    const totalCampaigns = await Campaign.countDocuments({
      owner: req.user.id,
    });

    res.status(200).json({
      success: true,
      stats: {
        totalContacts,
        totalAudiences,
        totalCampaigns,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};