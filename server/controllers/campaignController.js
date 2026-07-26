const Campaign = require("../models/Campaign"); // Make sure model path & casing match
 const Audience=require("../models/Audience")
 const Contact=require("../models/Contact")

// @desc    Create a new campaign
// @route   POST /api/campaign/create
// @access  Private (requires auth middleware)
const createCampaign = async (req, res) => {
  try {
    const { name, subject, content, audience } = req.body;

    const campaign = await Campaign.create({
      name,
      subject,
      content,
      audience,
      owner: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Campaign created successfully",
      campaign,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

import { sendEmail } from "../utils/sendEmail"; // or your path

const sendCampaign = async (req, res) => {
  try {
    console.log("send backend function called");
    const { id } = req.params;

    const campaign = await Campaign.findById(id);
    console.log("campaign con", campaign);

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }

    const audience = await Audience.findById(campaign.audience).populate("contacts");

    if (!audience || !audience.contacts || audience.contacts.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No contacts found in this audience",
      });
    }

    // Track results for each recipient
    const sendResults = [];

    for (const contact of audience.contacts) {
      try {
        const result = await sendEmail(
          contact.email,
          campaign.subject,
          campaign.content
        );
        sendResults.push({ email: contact.email, status: "success", result });
      } catch (emailErr) {
        console.error(`Failed to send email to ${contact.email}:, emailErr`);
        sendResults.push({ email: contact.email, status: "failed", error: emailErr.message });
      }
    }

    campaign.status = "Sent";
    await campaign.save();
    console.log("saved", campaign);

    return res.status(200).json({
      success: true,
      message: "Campaign process completed",
      results: sendResults
    });

  } catch (error) {
    // Return actual error message instead of generic string
    console.error("Detailed Send Campaign Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};
{/*const sendCampaign = async (req, res) => {
  try {
    console.log("send backend function called")
    const { id } = req.params;

    const campaign = await Campaign.findById(id);
    console.log("camaign con",campaign)

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }

    const audience = await Audience.findById(campaign.audience).populate("contacts");

    for (const contact of audience.contacts) {
      await sendEmail(
        contact.email,
        campaign.subject,
        campaign.content
      );
    }

    campaign.status = "Sent";
    await campaign.save();
    console.log("saved",campaign)

    return res.status(200).json({
      success: true,
      message: "Campaign sent successfully",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error ddd",
    });
  }
};
const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({
      owner: req.user.id,
    })
      .populate("audience");

    return res.status(200).json({
      success: true,
      message: "Campaigns fetched successfully",
      campaigns,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}; */}
 const updateCampaign = async (req, res) => {
  try {
    const { id } = req.params;

    const campaign = await Campaign.findOneAndUpdate(
      {
        _id: id,
        owner: req.user.id,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Campaign updated successfully",
      campaign,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const deleteCampaign = async (req, res) => {
  try {
    const { id } = req.params;

    const campaign = await Campaign.findOneAndDelete({
      _id: id,
      owner: req.user.id,
    });

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Campaign deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// IMPORTANT: Exporting as an object allows named imports in compaignRoutes.js
module.exports = {
  createCampaign,
  sendCampaign,
  getAllCampaigns,
  updateCampaign,
  deleteCampaign
};