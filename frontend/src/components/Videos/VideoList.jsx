import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserVideos } from "../../redux/slices/videoSlice";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

const VideoList = () => {
  const dispatch = useDispatch();
  const { videos, loading, error } = useSelector((state) => state.video);

  useEffect(() => {
    dispatch(fetchUserVideos());
  }, [dispatch]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 5 }}>
      {videos.map((video) => (
        <Card key={video._id} sx={{ mb: 2 }}>
          <CardMedia component="video" src={video.url} controls />
          <CardContent>
            <Typography variant="h5" component="h2">
              {video.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {video.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default VideoList;
