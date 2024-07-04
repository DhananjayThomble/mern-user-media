import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreateAccountSchema = Yup.object().shape({
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobileNumber: Yup.string().required("Mobile number is required"),
});

const CreateAccount = () => {
  const [formStatus, setFormStatus] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/auth/create-account`,
        values
      );
      setFormStatus({
        message: "Account created successfully",
        type: "success",
      });
      resetForm();
      // redirect to /login
      navigate("/login");
    } catch (error) {
      console.log(error);
      setFormStatus({
        message: error.response?.data?.error || "An error occurred",
        type: "error",
      });
      setSubmitting(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Create Account
      </Typography>
      {formStatus.message && (
        <Alert severity={formStatus.type} sx={{ mb: 2 }}>
          {formStatus.message}
        </Alert>
      )}
      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          email: "",
          mobileNumber: "",
        }}
        validationSchema={CreateAccountSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, touched, errors }) => (
          <Form>
            <Box sx={{ mb: 2 }}>
              <Field
                name="firstname"
                as={TextField}
                label="First Name"
                fullWidth
                error={touched.firstname && !!errors.firstname}
                helperText={<ErrorMessage name="firstname" />}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Field
                name="lastname"
                as={TextField}
                label="Last Name"
                fullWidth
                error={touched.lastname && !!errors.lastname}
                helperText={<ErrorMessage name="lastname" />}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Field
                name="email"
                as={TextField}
                label="Email"
                fullWidth
                error={touched.email && !!errors.email}
                helperText={<ErrorMessage name="email" />}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Field
                name="mobileNumber"
                as={TextField}
                label="Mobile Number"
                fullWidth
                error={touched.mobileNumber && !!errors.mobileNumber}
                helperText={<ErrorMessage name="mobileNumber" />}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              fullWidth
            >
              Create Account
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateAccount;
