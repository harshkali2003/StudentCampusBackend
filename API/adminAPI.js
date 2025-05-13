const app = require("./appImport");
const adminData = require("../Models/adminModel");
require("dotenv").config();

app.post("/admin/config", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const data = await adminData.findOne().select("-password"); 

      if (data) {
        console.log("Admin login success");
        return res.status(200).json(data);
      } else {
        return res.status(404).json({ message: "Admin data not found in DB" });
      }
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Error during admin login:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
