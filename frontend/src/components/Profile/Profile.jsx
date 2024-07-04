import React, { useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  // for editing profile
  const handleEditProfile = () => {
    // navigate to edit profile page
    navigate("/profile/edit");
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
        <Box sx={{ display: "flex", flexDirection: "row" }}>
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
