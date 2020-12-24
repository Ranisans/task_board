import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Typography from "@material-ui/core/Typography";
import { blue, green, red } from "@material-ui/core/colors";
import { useDispatch, useSelector } from "react-redux";

import { ITask } from "../../appTypes";
import { editTask } from "../../store/taskEdit";
import { AppState } from "../../store";

interface ITaskCard {
  data: ITask;
}

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 10,
  },
  cardHeader: {
    height: 65,
    boxSizing: "border-box",
  },
  avatar: {
    backgroundColor: red[500],
  },
  text: {
    whiteSpace: "pre-wrap",
    height: 90,
    overflowY: "auto",
  },
}));

const TaskCard: React.FC<ITaskCard> = (props: ITaskCard) => {
  const dispatch = useDispatch();
  const { data } = props;
  const { id, username, email, text, status, isTextChanged } = data;
  const styles = useStyles();
  const { isAuthenticated } = useSelector(
    (state: AppState) => state.loginReducer
  );

  const onClick = () => {
    if (isAuthenticated)
      dispatch(editTask({ id, text, email, status, username }));
  };

  return (
    <Card onClick={onClick} variant="outlined" className={styles.root}>
      <CardHeader
        className={styles.cardHeader}
        avatar={
          <Avatar aria-label="user" className={styles.avatar}>
            {username[0].toUpperCase()}
          </Avatar>
        }
        action={
          <div>
            {status ? <DoneAllIcon style={{ color: green[500] }} /> : null}
            {isTextChanged ? (
              <AssignmentIcon style={{ color: blue[500] }} />
            ) : null}
          </div>
        }
        title={username}
        subheader={email}
      />
      <CardContent>
        <Typography
          variant="body1"
          color="textPrimary"
          gutterBottom
          component="p"
          className={styles.text}
        >
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
