import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient();
const email=(process.env.ADMIN_EMAIL||"").trim().toLowerCase();
const password=process.env.ADMIN_PASSWORD||"";
const firstName=process.env.ADMIN_FIRST_NAME||"Site";
const lastName=process.env.ADMIN_LAST_NAME||"Administrator";
if(!email) throw new Error("ADMIN_EMAIL is required.");
if(password.length<12||!/[a-z]/.test(password)||!/[A-Z]/.test(password)||!/\d/.test(password)||!/[^A-Za-z0-9]/.test(password)) throw new Error("ADMIN_PASSWORD must be 12+ chars with upper/lowercase, number and symbol.");
try{const existing=await prisma.users.findUnique({where:{email}});if(existing){console.log("A CMS user with this email already exists.");process.exitCode=0;}else{const user=await prisma.users.create({data:{firstName,lastName,email,password:await bcrypt.hash(password,12),emailVerified:new Date(),status:"ACTIVE"}});console.log(`Created CMS user ${user.email}`);}}finally{await prisma.$disconnect();}
