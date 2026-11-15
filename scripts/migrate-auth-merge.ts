import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
try {
  const result = await prisma.$runCommandRaw({
    update: "Users",
    updates: [{
      q: {}, multi: true,
      u: [{ $set: {
        status: { $ifNull: ["$status", { $cond: [{ $eq: ["$isBlocked", true] }, "LOCKED", { $cond: [{ $eq: ["$isActive", false] }, "INACTIVE", "ACTIVE"] }] }] },
        isDeleted: { $ifNull: ["$isDeleted", false] },
        mustChangePassword: { $ifNull: ["$mustChangePassword", false] },
        failedLoginAttempts: { $ifNull: ["$failedLoginAttempts", 0] },
        lockedUntil: { $ifNull: ["$lockedUntil", null] },
        lastLogin: { $ifNull: ["$lastLogin", null] },
        emailVerified: { $cond: [{ $eq: ["$isVerified", true] }, { $ifNull: ["$emailVerified", "$$NOW"] }, { $ifNull: ["$emailVerified", null] }] },
        createdAt: { $ifNull: ["$createdAt", "$$NOW"] },
        updatedAt: "$$NOW"
      }}]
    }]
  });
  console.log("Auth merge migration completed:", result);
} finally { await prisma.$disconnect(); }
