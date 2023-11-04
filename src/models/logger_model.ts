import winston from "winston";
import path from "path";

const logConfiguration = {
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, "logs/server.log"),
    }),
    new winston.transports.Console(),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
};

export const logger = winston.createLogger(logConfiguration);
