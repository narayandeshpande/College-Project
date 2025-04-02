import jwt from "jsonwebtoken";
export const createTokenAndSaveCookie = (user_id, res) => {
  try {
    if (!process.env.JWT_TOKEN) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign({ user_id }, process.env.JWT_TOKEN, {
      expiresIn: "10d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure only in production
      sameSite: "none",
      path: "/", // Ensure it's accessible across the site
      maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
    });

  } catch (error) {
    console.error("Error creating token:", error);
  }
};
