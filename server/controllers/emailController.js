import   sendEmail from "../utils/sendEmail.js";

const sendTestEmail = async (req, res) => {
  try {
    const { email } = req.body;

    await sendEmail(
      email,
      "Welcome!",
      "<h1>Welcome to our Email Marketing App 🚀</h1>"
    );

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
};
export {sendTestEmail}