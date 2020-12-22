/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, Theme } from "@material-ui/core";

import Box from "@material-ui/core/Box";
import { AppState } from "../../store";
import { hideAlert } from "../../store/alert";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: 500,
    margin: "auto",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const AlertPopup: React.FC = () => {
  const dispatch = useDispatch();
  const { isError, message } = useSelector(
    (state: AppState) => state.alertReducer
  );
  const styles = useStyles();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(hideAlert());
    }, 2000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box component="div" className={styles.container} zIndex="tooltip">
      {isError ? (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {message}
        </Alert>
      ) : (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          {message}
        </Alert>
      )}
    </Box>
  );
};

export default AlertPopup;
