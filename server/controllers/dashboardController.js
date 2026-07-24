const Contact = require("../models/Contact");
const Audience = require("../models/Audience");
const Campaign = require("../models/Campaign");

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