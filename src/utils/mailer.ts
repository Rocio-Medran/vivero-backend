import nodemailer from "nodemailer";
import { env } from "../config/env";

export const mailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.smtpUser,
    pass: env.smtpPass
  }
});
