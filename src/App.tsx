import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "./components/Header";
import TaskTable from "./components/TaskTable";
import TaskPagination from "./components/TaskPagination";
import { AppState } from "./store";
import { showAlert } from "./store/alert";
import { setShouldUpdate, setTaskList, setTotalPages } from "./store/taskList";
import { getTasksPage } from "./apiLogic";
import { MAX_TASKS_PER_PAGE } from "./appConstants";
import LoginForm from "./components/LoginForm";
import AlertPopup from "./components/AlertPopup";
import TaskForm from "./components/TaskForm";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { page, sorting, direction, shouldUpdate, totalPages } = useSelector(
    (state: AppState) => state.taskListReducer
  );
  const { windowOpen: loginWindowOpen } = useSelector(
    (state: AppState) => state.loginReducer
  );
  const { windowOpen: taskEditWindowOpen } = useSelector(
    (state: AppState) => state.taskEditReducer
  );
  const { windowOpen: errorWindowOpen } = useSelector(
    (state: AppState) => state.alertReducer
  );

  useEffect(() => {
    const updateTaskList = async () => {
      try {
        const result = await getTasksPage({
          page,
          sorting: {
            sortField: sorting,
            sortDirection: direction,
          },
        });

        if ("errorMessage" in result) {
          dispatch(showAlert({ message: result.errorMessage, isError: true }));
          return;
        }

        const { tasks, totalTaskCount } = result.data;
        dispatch(setTaskList(tasks));
        const pages = Math.ceil(totalTaskCount / MAX_TASKS_PER_PAGE);
        if (totalPages !== pages) {
          dispatch(setTotalPages(pages));
        }
      } catch (e) {
        dispatch(showAlert({ isError: true }));
      }
    };
    dispatch(setShouldUpdate(false));
    updateTaskList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sorting, direction, shouldUpdate]);

  return (
    <div className="App">
      <Header />
      <TaskTable />
      <TaskPagination />
      {loginWindowOpen && <LoginForm />}
      {taskEditWindowOpen && <TaskForm />}
      {errorWindowOpen && <AlertPopup />}
    </div>
  );
};

export default App;
