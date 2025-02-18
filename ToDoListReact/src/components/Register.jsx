import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Service from "../Service";
import { useState } from "react";
import Container from "@mui/material/Container";

export const Register = () => {
  const [userName, setUserName] = useState("userName");
  const [password, setPassword] = useState("123456");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await Service.register(userName, password);
    navigate("/task", { replace: true });
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: 400,
          padding: 4,
          boxShadow: 3,
          borderRadius: 3,
          bgcolor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "linear-gradient(to right, peachpuff, #0000ff75)", width: 56, height: 56 }}>
          <LockOutlinedIcon fontSize="large" />
        </Avatar>
        <Typography component="h1" variant="h4" sx={{ fontWeight: "bold", mb: 2, color: "primary.main" }}>
          הרשמה
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: "100%" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="userName"
            label="שם משתמש"
            name="userName"
            autoComplete="userName"
            autoFocus
            onChange={(event) => setUserName(event.target.value)}
            sx={{ "& .MuiInputLabel-root": { color: "primary.main" }, "& .MuiInputBase-root": { color: "primary.main" } }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="סיסמה"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
            sx={{ "& .MuiInputLabel-root": { color: "primary.main" }, "& .MuiInputBase-root": { color: "primary.main" } }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: "bold",
              background: "linear-gradient(to right, peachpuff, #0000ff75)", // כפתור עם גרדיאנט
              color: "white", // טקסט לבן בכפתור
              "&:hover": { background: "linear-gradient(to right, #0000ff75, peachpuff)" }, // שינוי צבע ב-hover
            }}
          >
            הרשמה
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/log" variant="body2" sx={{ fontSize: "1rem", color: "primary.main" }}>
                יש לך כבר חשבון? להתחברות
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
