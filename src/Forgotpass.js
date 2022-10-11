import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Modal from "@mui/material/Modal";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const theme = createTheme();

export default function ForgetApply() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const jsondata = {
      email: data.get("email"),
      question: data.get("question"),
      anwser: data.get("anwser"),
    };

    fetch("http://localhost:7777/api/forget", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsondata),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          localStorage.setItem("token-apply", data.token);
          handleOpen();
          alert("Apply successful");
        } else {
          alert("Apply failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSubmitNewPassword = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (data.get("newPassword") !== data.get("confirmPassword")) {
      return alert("Confirm Password is not correct!");
    }

    const jsondata = {
      newpassword: data.get("newPassword"),
      token: localStorage.getItem("token-apply"),
    };

    fetch("http://localhost:7777/api/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsondata),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          alert("Change Password successful");
          localStorage.removeItem("token");
          window.location = "/";
        } else {
          alert("Change Password failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const [question, setQuestion] = React.useState("");

  const handleChange = (event) => {
    setQuestion(event.target.value);
    console.log(question);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Question
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    name="question"
                    id="question"
                    value={question}
                    label="Question"
                    onChange={handleChange}
                  >
                    <MenuItem value={"age"}>What's your age?</MenuItem>
                    <MenuItem value={"birthday"}>
                      What's your birthday?
                    </MenuItem>
                    <MenuItem value={"team"}>
                      What's your favorite team?
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="anwser"
                  label="Anwser"
                  name="anwser"
                  autoComplete="anwser"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Apply
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Are you remember password account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography component="h1" variant="h5">
              Enter New Password
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmitNewPassword}
              sx={{ mt: 3 }}
            >
              <Typography component="h4" variant="h10">
                Password should be at least 6 characters
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="newPassword"
                    label="New Password"
                    type="password"
                    id="newPassword"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm New Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="confirmPassword"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Apply
              </Button>
            </Box>
          </Box>
        </Modal>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
