import express from "express";
import mongoose from "mongoose";
import config from "./config.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads"));
// app.use(cors());

const corsOptions = {
  origin: "https://mern-prj1.netlify.app",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/videos", videoRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
