import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../redux/slices/userSlice";
import {
  Box,
  Typography,
  Avatar,
  Button,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit] = useState(5);

  useEffect(() => {
    dispatch(fetchUserProfile({ page, limit }));
  }, [dispatch, page, limit]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  const handleEditProfile = () => {
    navigate("/profile/edit");
  };

  const handleNextPage = () => {
    if (profile.videos.length >= limit) setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  return (
    <>
      <Box sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
        <Avatar
          src={profile?.avatar}
          alt="Avatar"
          sx={{ width: 100, height: 100, mx: "auto" }}
        />
        <Typography variant="h5" component="h1" gutterBottom>
          {profile?.firstname} {profile?.lastname}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Email: {profile?.email}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Bio: {profile?.bio}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Mobile Number: {profile?.mobileNumber}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleEditProfile}
        >
          Edit Profile
        </Button>
      </Box>
      <Box sx={{ mt: 5, overflowX: "auto" }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Uploaded Videos
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
          {profile?.videos?.length ? (
            profile.videos.map((video) => (
              <Box key={video._id} sx={{ maxWidth: 200, marginRight: 2 }}>
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
            <Typography variant="body1">No videos uploaded</Typography>
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
            disabled={!profile || profile.videos.length < limit}
          >
            Next
          </Button>
        </Box>
        <Button
          component={Link}
          to="/videos/upload"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Add Video
        </Button>
        <Button
          component={Link}
          to={`/${profile?.firstname}-${profile?.lastname}/videos`}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          View All Videos
        </Button>
      </Box>
    </>
  );
};

export default Profile;
