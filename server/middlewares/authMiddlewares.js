import  jwt from  "jsonwebtoken";

exports.auth = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token Missing",
      });
    }

    // Remove "Bearer " from the token
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Token Invalid",
    });
  }
}