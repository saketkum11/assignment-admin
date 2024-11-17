import { connectToMongoos } from "./db/db.js";
import dotenv from "dotenv";
import { app } from "./app.js";
dotenv.config({
    path: "./.env",
  });
connectToMongoos()
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log("Server Started ", process.env.PORT);
    })
  )
  .catch((error) => {
    console.error("Mongo db Connection Failed:", error);
  });
