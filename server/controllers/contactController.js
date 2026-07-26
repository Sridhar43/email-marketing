import  Contact from "../models/Contact.js";

const streamifier = require("streamifier");

// Added 'const' to declare the variable properly
const createContact = async (req, res) => {
  try {
    const { name, email, phone, company, tags } = req.body;

    // Validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and Email are required",
      });
    }

    // Check duplicate email
    const existingContact = await Contact.findOne({ email });

    if (existingContact) {
      return res.status(400).json({
        success: false,
        message: "Contact already exists",
      });
    }

    // Create contact
    const contact = await Contact.create({
      name,
      email,
      phone,
      company,
      tags,
      owner: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Contact created successfully",
      contact,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};




 const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({
      owner: req.user.id,
    });

    return res.status(200).json({
      success: true,
      contacts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
  const updateContact = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Contact updated successfully",
      updatedContact,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



 const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    await Contact.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
;






const fs = require("fs");
const csv = require("csv-parser");

const importContacts = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a CSV file",
      });
    }

    const contacts = [];

fs.createReadStream(req.file.path)
  .pipe(csv())
.on("data", (row) => {
  const cleanRow = {};

  Object.keys(row).forEach((key) => {
    cleanRow[key.trim().replace(/^\uFEFF/, "")] = row[key];
  });

  contacts.push({
    name: cleanRow.name,
    email: cleanRow.email,
    phone: cleanRow.phone,
    company: cleanRow.company,
    owner: req.user.id,
  });
})
  
  .on("end", async () => {
    console.log("Contacts:", contacts);

    await Contact.insertMany(contacts);

    return res.status(200).json({
      success: true,
      message: "Contacts imported successfully",
    });
  });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Exported as an object to match the destructuring import
export { createContact,updateContact,getAllContacts ,deleteContact,importContacts};


