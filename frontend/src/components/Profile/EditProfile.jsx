import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { fetchUserProfile } from "../../redux/slices/userSlice";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";

const EditProfileSchema = Yup.object().shape({
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  bio: Yup.string().required("Bio is required"),
  mobileNumber: Yup.string().required("Mobile number is required"),
});

const EditProfile = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_REACT_APP_API_URL}/user/profile`,
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Profile updated successfully");
    } catch (error) {
      alert(error.response.data.error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Profile
      </Typography>
      <Formik
        initialValues={{
          firstname: profile?.firstname || "",
          lastname: profile?.lastname || "",
          bio: profile?.bio || "",
          mobileNumber: profile?.mobileNumber || "",
        }}
        validationSchema={EditProfileSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box sx={{ mb: 2 }}>
              <Field
                name="firstname"
                as={TextField}
                label="First Name"
                fullWidth
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Field
                name="lastname"
                as={TextField}
                label="Last Name"
                fullWidth
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Field name="bio" as={TextField} label="Bio" fullWidth />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Field
                name="mobileNumber"
                as={TextField}
                label="Mobile Number"
                fullWidth
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              fullWidth
            >
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EditProfile;
