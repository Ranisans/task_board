import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Joi from "joi";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import { green } from "@material-ui/core/colors";

import DialogTransition from "../DialogTransition";
import useStyles from "../DialogTransition/styles";
import { AppState } from "../../store";
import { AUTH_KEY, ETaskStatus } from "../../appConstants";
import { addTask, editTask } from "../../apiLogic";
import { closeTaskEditWindow } from "../../store/taskEdit";
import { showAlert } from "../../store/alert";
import { setShouldUpdate } from "../../store/taskList";
import { openLoginWindow, resetKey } from "../../store/login";

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  username: Joi.string().required(),
  text: Joi.string().required(),
});

const TaskForm: React.FC = () => {
  const dispatch = useDispatch();
  const { windowOpen, taskData } = useSelector(
    (state: AppState) => state.taskEditReducer
  );

  const styles = useStyles();

  let defaultValues = {
    username: "",
    email: "",
    text: "",
  };

  if (taskData) {
    defaultValues = {
      username: taskData.username,
      email: taskData.email,
      text: taskData.text,
    };
  }

  const { register, handleSubmit, errors } = useForm({
    defaultValues,
    resolver: joiResolver(schema),
  });

  const onClose = () => {
    dispatch(closeTaskEditWindow());
  };

  const [taskStatus, setTaskStatus] = useState(
    taskData?.status || ETaskStatus.OPEN
  );

  const handleStatus = () => {
    if (taskStatus) {
      setTaskStatus(ETaskStatus.OPEN);
    } else {
      setTaskStatus(ETaskStatus.CLOSED);
    }
  };

  const onSubmit = async (data: typeof defaultValues) => {
    const authKey = localStorage.getItem(AUTH_KEY);
    if (!taskData) {
      // new task
      const result = await addTask(data);
      if (!result) {
        dispatch(showAlert({ isError: true }));
        return;
      }
    } else if (authKey) {
      // edit existed if have token
      const result = await editTask({
        id: taskData.id,
        text: data.text,
        token: authKey,
        taskStatus,
      });
      if (!result.status) {
        dispatch(showAlert({ message: result.message, isError: true }));
        return;
      }
    } else {
      // have no token
      dispatch(showAlert({ message: "You have no rights!", isError: true }));
      onClose();
      dispatch(resetKey());
      dispatch(openLoginWindow());
      return;
    }
    dispatch(showAlert({ message: "Well done!", isError: false }));
    dispatch(setShouldUpdate(true));
    onClose();
  };

  return (
    <Dialog
      fullScreen
      onClose={onClose}
      open={windowOpen}
      className={styles.dialog}
      TransitionComponent={DialogTransition}
    >
      <div className={styles.formContainer}>
        <DialogTitle disableTypography className={styles.title}>
          <Typography variant="h6" className={styles.typography}>
            {!taskData ? "Create Task" : "Edit Task"}
          </Typography>
          {taskStatus ? <DoneAllIcon style={{ color: green[500] }} /> : null}

          <IconButton
            aria-label="close"
            className={styles.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent className={styles.content}>
            <TextField
              label="User Name"
              variant="outlined"
              name="username"
              error={Boolean(errors.username)}
              helperText={Boolean(errors.username) && "Username should be set"}
              InputProps={{ readOnly: Boolean(taskData) }}
              inputRef={register({ required: true })}
            />
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              error={Boolean(errors.email)}
              helperText={
                Boolean(errors.email) && "Email should be set in correct format"
              }
              InputProps={{ readOnly: Boolean(taskData) }}
              inputRef={register({ required: true })}
            />
            <TextField
              label="Task Text"
              variant="outlined"
              multiline
              rows={4}
              name="text"
              error={Boolean(errors.text)}
              helperText={Boolean(errors.text) && "Should write task"}
              inputRef={register({ required: true })}
            />
          </DialogContent>
          <DialogActions className={styles.action}>
            {!taskData ? null : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleStatus}
              >
                Change Status
              </Button>
            )}
            <Button variant="contained" color="primary" type="submit">
              {!taskData ? "Create" : "Update"}
            </Button>
          </DialogActions>
        </form>
      </div>
    </Dialog>
  );
};

export default TaskForm;
