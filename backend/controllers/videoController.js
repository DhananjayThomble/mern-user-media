import Video from "../models/videoModel.js";
import multer from "multer";
import path from "path";
import User from "../models/userModel.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/videos/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 6 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /mp4/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(
      new Error(
        "File upload only supports the following filetypes - " + filetypes
      )
    );
  },
}).single("video");

export const uploadVideo = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const { title, description } = req.body;
    // const url = req.file.path;
    const baseUrl =
      process.env.BASE_URL || `${req.protocol}://${req.get("host")}/`;
    const url = baseUrl + req.file.path.replace(/\\/g, "/");

    // console.log('user:', req.user.id);

    try {
      const newVideo = new Video({
        title,
        description,
        url,
        user: req.user.id,
      });
      await newVideo.save();

      await User.findByIdAndUpdate(req.user.id, {
        $push: { videos: newVideo._id },
      });

      res.status(201).json(newVideo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

export const getUserVideos = async (req, res) => {
  try {
    // Default values if not provided
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const videos = await Video.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    const totalVideos = await Video.countDocuments({ user: req.user.id });

    res.json({
      videos,
      totalPages: Math.ceil(totalVideos / limit),
      currentPage: page,
      totalVideos,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
