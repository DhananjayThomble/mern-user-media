import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { login } from "../../redux/slices/authSlice";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  firstname: Yup.string().required("First name is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(login(values)).finally(() => {
      setSubmitting(false);
    });
    navigate("/profile");
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <Formik
        initialValues={{ firstname: "", password: "" }}
        validationSchema={LoginSchema}
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
                name="password"
                as={TextField}
                label="Password"
                type="password"
                fullWidth
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting || loading}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
