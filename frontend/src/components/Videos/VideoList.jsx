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
  Button,
} from "@mui/material";

const VideoList = () => {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);
  const limit = 5;

  const { videos, loading, error, totalPages } = useSelector(
    (state) => state.video
  );

  useEffect(() => {
    dispatch(fetchUserVideos({ page, limit }));
  }, [dispatch, page, limit]);

  const handleNextPage = () => {
    if (page < totalPages) setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        All Videos
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {videos?.length ? (
          videos.map((video) => (
            <Box key={video._id} sx={{ maxWidth: 300, marginRight: 2, mb: 2 }}>
              <Card>
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
            </Box>
          ))
        ) : (
          <Typography variant="body1">No videos available</Typography>
        )}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNextPage}
          disabled={page >= totalPages}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default VideoList;
