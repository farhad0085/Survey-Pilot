import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third party
import * as Yup from 'yup';
import "yup-phone-lite"; // required for phone number validation
import { useFormik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import { useAuth } from 'contexts/AuthContext';
import { showSuccessMessage } from 'utils/toast';


export default function AuthRegister() {
  const { register } = useAuth();
  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      password: '',
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required('First name is required'),
      last_name: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      phone: Yup.string().phone("BD", "Invalid phone number").required('Phone Number is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError, setErrors }) => {
      try {
        await register({
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          phone: values.phone,
          password: values.password,
        });
        setSubmitting(false);
        showSuccessMessage("Registration successfull. Welcome to the portal!")
      } catch (err) {
        setErrors(err.response.data)
        setFieldError('submit', 'Registration failed. Please try again.');
        setSubmitting(false);
      }
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  const { errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values } = formik

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Stack spacing={1}>
            <InputLabel htmlFor="first_name-signup">First Name*</InputLabel>
            <OutlinedInput
              id="first_name-login"
              type="text"
              value={values.first_name}
              name="first_name"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="John"
              fullWidth
              error={Boolean(touched.first_name && errors.first_name)}
            />
          </Stack>
          {touched.first_name && errors.first_name && (
            <FormHelperText error id="helper-text-first_name-signup">
              {errors.first_name}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={1}>
            <InputLabel htmlFor="last_name-signup">Last Name*</InputLabel>
            <OutlinedInput
              fullWidth
              error={Boolean(touched.last_name && errors.last_name)}
              id="last_name-signup"
              type="text"
              value={values.last_name}
              name="last_name"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Doe"
              inputProps={{}}
            />
          </Stack>
          {touched.last_name && errors.last_name && (
            <FormHelperText error id="helper-text-last_name-signup">
              {errors.last_name}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <InputLabel htmlFor="phone-signup">Phone number</InputLabel>
            <OutlinedInput
              fullWidth
              error={Boolean(touched.phone && errors.phone)}
              id="phone-signup"
              value={values.phone}
              name="phone"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="+880"
              inputProps={{}}
            />
          </Stack>
          {touched.phone && errors.phone && (
            <FormHelperText error id="helper-text-phone-signup">
              {errors.phone}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
            <OutlinedInput
              fullWidth
              error={Boolean(touched.email && errors.email)}
              id="email-login"
              type="email"
              value={values.email}
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="demo@company.com"
              inputProps={{}}
            />
          </Stack>
          {touched.email && errors.email && (
            <FormHelperText error id="helper-text-email-signup">
              {errors.email}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <InputLabel htmlFor="password-signup">Password</InputLabel>
            <OutlinedInput
              fullWidth
              error={Boolean(touched.password && errors.password)}
              id="password-signup"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              name="password"
              autoComplete="new-password"
              onBlur={handleBlur}
              onChange={(e) => {
                handleChange(e);
                changePassword(e.target.value);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    color="secondary"
                  >
                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                  </IconButton>
                </InputAdornment>
              }
              placeholder="******"
              inputProps={{}}
            />
          </Stack>
          {touched.password && errors.password && (
            <FormHelperText error id="helper-text-password-signup">
              {errors.password}
            </FormHelperText>
          )}
          <FormControl fullWidth sx={{ mt: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" fontSize="0.75rem">
                  {level?.label}
                </Typography>
              </Grid>
            </Grid>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2">
            By Signing up, you agree to our &nbsp;
            <Link variant="subtitle2" component={RouterLink} to="#">
              Terms of Service
            </Link>
            &nbsp; and &nbsp;
            <Link variant="subtitle2" component={RouterLink} to="#">
              Privacy Policy
            </Link>
          </Typography>
        </Grid>
        {errors.submit && (
          <Grid item xs={12}>
            <FormHelperText error>{errors.submit}</FormHelperText>
          </Grid>
        )}
        <Grid item xs={12}>
          <AnimateButton>
            <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
              Create Account
            </Button>
          </AnimateButton>
        </Grid>
      </Grid>
    </form>
  );
}
