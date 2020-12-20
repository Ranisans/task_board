import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

import { useSelector } from "react-redux";
import TaskCard from "../TaskCard";
import { AppState } from "../../store";

const useStyles = makeStyles(() => ({
  root: {
    margin: 10,
  },
}));

const Index: React.FC = () => {
  const { taskList } = useSelector((state: AppState) => state.taskListReducer);
  const styles = useStyles();

  return (
    <div aria-label="task table" className={styles.root}>
      {taskList.map((taskData) => (
        <TaskCard data={taskData} key={taskData.id} />
      ))}
    </div>
  );
};

export default Index;
