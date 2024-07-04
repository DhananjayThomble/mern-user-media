import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../redux/slices/userSlice";
import {
  Box,
  Typography,
  Avatar,
  Button,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

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
  );
};

export default Profile;
