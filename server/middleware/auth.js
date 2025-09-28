

// server/middleware/auth.js
import { clerkClient } from "@clerk/express";

export const protectAdmin = async (req, res, next) => {
  try {
    const { userId } = req.auth(); // ✅ not a function

    if (!userId) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    // fetch user from Clerk
    const user = await clerkClient.users.getUser(userId);

    // check role from metadata (public or private)
    const role = user.publicMetadata.role || user.privateMetadata.role || "user";

    if (role !== "admin") {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    // ✅ allow request to continue
    req.user = user;
    next();
  } catch (error) {
    console.error("protectAdmin error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
