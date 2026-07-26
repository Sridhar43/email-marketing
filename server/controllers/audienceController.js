import  Audience from "../models/Audience.js";

exports.createAudience = async (req, res) => {
  try {
    const { name, description, contacts } = req.body;

    const audience = await Audience.create({
      name,
      description,
      contacts,
      owner: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Audience created successfully",
      audience,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



exports.getAudienceById = async (req, res) => {
  try {
    const audience = await Audience.findById(req.params.id)
      .populate("contacts");

    if (!audience) {
      return res.status(404).json({
        success: false,
        message: "Audience not found",
      });
    }

    return res.status(200).json({
      success: true,
      audience,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
exports.getAllAudiences = async (req, res) => {
  try {
    const audiences = await Audience.find({
      owner: req.user.id,
    }).populate("contacts");

    return res.status(200).json({
      success: true,
      audiences,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.updateAudience = async (req, res) => {
  try {
    const { id } = req.params;

    const audience = await Audience.findOneAndUpdate(
      {
        _id: id,
        owner: req.user.id,
      },
      req.body,
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Audience updated successfully",
      audience,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
exports.deleteAudience = async (req, res) => {
  try {
    const { id } = req.params;

    const audience = await Audience.findOneAndDelete({
      _id: id,
      owner: req.user.id,
    });

    if (!audience) {
      return res.status(404).json({
        success: false,
        message: "Audience not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Audience deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};