import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Draggable,
} from "@material-ui/core";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  loginUserThunk,
  updateUsersListThunk,
} from "../../../store/modules/users/thunk";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useHistory } from "react-router-dom";

import { useStyles } from "./style/styles";

export const LoginPopup = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const users = useSelector((state) => state.UsersReducer);

  const schema = yup.object().shape({
    email: yup.string().email().required("Campo obrigatório"),
    password: yup.string().required("Campo obrigatório"),
  });

  const { register, handleSubmit, errors, setError } = useForm({
    resolver: yupResolver(schema),
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleForm = (loginData) => {
    console.log(loginData);
    dispatch(loginUserThunk(loginData, setError));
  };

  return (
    <Box>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.dialogStyle}
        // className={classes.formLogin}
        // onSubmit={handleSubmit(handleForm)}
      >
        <form className={classes.formLogin} onSubmit={handleSubmit(handleForm)}>
          <Box className={classes.inputArea}>
            <Box className={classes.inputField}>
              <TextField
                className={classes.input}
                variant="outlined"
                label="Email"
                name="email"
                margin="dense"
                type="string"
                inputRef={register}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Box>
            <Box className={classes.inputField}>
              <TextField
                className={classes.input}
                variant="outlined"
                label="Senha"
                name="password"
                margin="dense"
                inputRef={register}
                type="password"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Box>
          </Box>
          {/* <DialogActions className={classes.formBottom}>
            
            <Button
              className={classes.loginButton}
              type="submit"
              variant="outlined"
            >
              Logar
            </Button>
            <Button
              className={classes.loginButton}
              variant="outlined"
              onClick={handleClose}
            >
              Fechar
            </Button>
            <div className={classes.feedbackMessage}>
              <h2 style={{ color: "red", textAlign: "center" }}>
                {errors.userLogin?.message}
              </h2>
            </div>
          </DialogActions> */}
        </form>
      </Dialog>
    </Box>
  );
};
