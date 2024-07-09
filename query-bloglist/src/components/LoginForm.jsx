import { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    await handleLogin({ username, password });

    setUsername("");
    setPassword("");
  };

  return (
    <>
      <Box
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <TextField
          type="text"
          name="username"
          id="username"
          onChange={({ target }) => setUsername(target.value)}
          label="username"
          size="small"
          required
        />
        <br />
        <TextField
          type="password"
          name="password"
          id="password"
          onChange={({ target }) => setPassword(target.value)}
          label="password"
          size="small"
          required
        />
        <br />
        <Button type="submit" variant="outlined">
          login
        </Button>
      </Box>
    </>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
