import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "../DialogTransition/styles";
import DialogTransition from "../DialogTransition";
import { AppState } from "../../store";
import { closeLoginWindow, setKey } from "../../store/login";
import { showAlert } from "../../store/alert";
import { authentication } from "../../apiLogic";

const schema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const defaultValues = {
  username: "",
  password: "",
};

const helperText = "Должно быть заполненно";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const { windowOpen } = useSelector((state: AppState) => state.loginReducer);
  const styles = useStyles();

  const { register, handleSubmit, errors } = useForm({
    defaultValues,
    resolver: joiResolver(schema),
  });

  const handleExit = () => {
    dispatch(closeLoginWindow());
  };

  const onSubmit = async (data: typeof defaultValues) => {
    const result = await authentication(data.username, data.password);
    if ("token" in result) {
      dispatch(setKey(result.token));
      dispatch(closeLoginWindow());
      dispatch(showAlert({ message: "Hello Admin", isError: false }));
    } else {
      dispatch(showAlert({ message: result.errorMessage, isError: true }));
    }
  };

  return (
    <Dialog
      fullScreen
      onClose={handleExit}
      open={windowOpen}
      className={styles.dialog}
      TransitionComponent={DialogTransition}
    >
      <div className={styles.formContainer}>
        <DialogTitle disableTypography className={styles.title}>
          <Typography variant="h6" className={styles.typography}>
            Login Form
          </Typography>

          <IconButton
            aria-label="close"
            className={styles.closeButton}
            onClick={handleExit}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent className={styles.content}>
            <TextField
              name="username"
              label="Login"
              error={Boolean(errors.username)}
              helperText={Boolean(errors.username) && helperText}
              inputRef={register({ required: true })}
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              error={Boolean(errors.password)}
              helperText={Boolean(errors.password) && helperText}
              inputRef={register({ required: true })}
            />
          </DialogContent>
          <DialogActions className={styles.action}>
            <Button type="submit" variant="contained" color="primary">
              authenticate
            </Button>
          </DialogActions>
        </form>
      </div>
    </Dialog>
  );
};

export default LoginForm;
