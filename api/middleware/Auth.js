const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // ตรวจสอบว่ามี Authorization header พร้อม Bearer token หรือไม่
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // แยก token ออกจาก Authorization header
      token = req.headers.authorization.split(" ")[1];

      // ตรวจสอบ JWT token ด้วย secret key
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);  // ตรวจสอบว่า SECRET เป็นค่าเดียวกับที่ตั้งใน .env

      // เพิ่มข้อมูลผู้ใช้ลงใน request object
      req.user = await User.findById(decodedToken.id).select("-password");

      // ส่งไปยัง next middleware
      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: "Token is not valid!" }); // หากตรวจสอบไม่ผ่าน
    }
  }

  if (!token) {
    // หากไม่มี token
    res.status(401).json({ message: "Not authorized, token is missing!" });
  }
});

module.exports = protect;
