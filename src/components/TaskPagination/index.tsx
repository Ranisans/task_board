import React, { ChangeEvent } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { useDispatch, useSelector } from "react-redux";

import { AppState } from "../../store";
import { setPage } from "../../store/taskList";

const TaskPagination: React.FC = () => {
  const dispatch = useDispatch();
  const { page, totalPages } = useSelector(
    (state: AppState) => state.taskListReducer
  );

  const handleChangePage = (
    event: ChangeEvent<unknown> | null,
    newPage: number
  ) => {
    dispatch(setPage(newPage));
  };

  return (
    <Pagination
      count={totalPages}
      page={page}
      size="small"
      onChange={handleChangePage}
      showFirstButton
      showLastButton
    />
  );
};

export default TaskPagination;
