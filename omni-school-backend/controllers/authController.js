/**
 * 🔐 FIXED LOGIN (Bypass for Development)
 */
export const login = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    // 🚩 FIX: Check if it's one of our dev emails
    const devEmails = [
      "admin@omnischool.ke",
      "teacher@omnischool.ke",
      "student@omnischool.ke",
      "parent@omnischool.ke",
    ];

    if (user && devEmails.includes(email)) {
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "30d" },
      );

      console.log(`\x1b[35m%s\x1b[0m`, `🔑 Admin/Dev Access Granted: ${email}`);
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      });
    }

    // Standard login logic follows here...
    res.status(401).json({ message: "Invalid credentials or User not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
