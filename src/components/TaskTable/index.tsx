import React, { useMemo } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

import { useSelector } from "react-redux";
import TaskCard from "../TaskCard";
import { AppState } from "../../store";

const useStyles = makeStyles(() => ({
  root: {
    margin: 10,
  },
}));

const TaskTable: React.FC = () => {
  const { taskList } = useSelector((state: AppState) => state.taskListReducer);
  const styles = useStyles();

  const memoizedValue = useMemo(
    () =>
      taskList.map((taskData) => (
        <TaskCard data={taskData} key={taskData.id} />
      )),
    [taskList]
  );

  return (
    <div aria-label="task table" className={styles.root}>
      {memoizedValue}
    </div>
  );
};

export default TaskTable;
