import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { uploadVideo } from "../../redux/slices/videoSlice";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const UploadVideoSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  file: Yup.mixed().required("File is required"),
});

const UploadVideo = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.video);
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(uploadVideo(values))
      .unwrap()
      .then(() => {
        navigate("/profile"); // Navigate after successful upload
      })
      .catch((error) => {
        alert("upload failed");
        console.error("Upload failed:", error);
        // Optionally, handle the error more gracefully here, e.g., setting an error state to display to the user
      })
      .finally(() => {
        setSubmitting(false); // Always stop submitting, regardless of the outcome
      });
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Upload Video
      </Typography>
      <Formik
        initialValues={{ title: "", description: "", file: null }}
        validationSchema={UploadVideoSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <Box sx={{ mb: 2 }}>
              <Field name="title" as={TextField} label="Title" fullWidth />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Field
                name="description"
                as={TextField}
                label="Description"
                fullWidth
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <input
                name="file"
                type="file"
                accept="video/mp4"
                onChange={(event) => {
                  setFieldValue("file", event.currentTarget.files[0]);
                }}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting || loading}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : "Upload"}
            </Button>
            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {'Upload Failed'}
              </Typography>
            )}
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default UploadVideo;
