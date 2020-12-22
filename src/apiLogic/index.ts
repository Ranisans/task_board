import { EServerStatus, ESortDirection, ESortFields } from "../appConstants";
import {
  IEditTask,
  IEditTaskResult,
  IError,
  TGetTasksPageResult,
  INewTask,
  TAuthenticationResult,
} from "../appTypes";

interface IGetTasksPage {
  page: number;
  sorting: {
    sortField: ESortFields;
    sortDirection: ESortDirection;
  };
}

type TGetTasksPage = (data: IGetTasksPage) => Promise<TGetTasksPageResult>;

const { REACT_APP_DEVELOPER_NAME, REACT_APP_API_URL } = process.env;
const errorMessage: IError = {
  errorMessage: "Something goes wrong",
};

export const getTasksPage: TGetTasksPage = async (data) => {
  const { page, sorting } = data;
  let getUrl = `${REACT_APP_API_URL}/?developer=${REACT_APP_DEVELOPER_NAME}&page=${page}`;
  getUrl = `${getUrl}&sort_field=${sorting.sortField}&sort_direction=${sorting.sortDirection}`;

  try {
    const response = await fetch(getUrl, { cache: "reload" });

    if (response.ok) {
      const result = await response.json();
      const { status, message } = result;
      if (status === EServerStatus.OK) {
        return {
          data: {
            tasks: message.tasks,
            totalTaskCount: message.total_task_count,
          },
        };
      }
      return { errorMessage: message || errorMessage.errorMessage };
    }
    return errorMessage;
  } catch (e) {
    return errorMessage;
  }
};

type TAddTask = (data: INewTask) => Promise<boolean>;

export const addTask: TAddTask = async (data) => {
  const { username, email, text } = data;
  const formData = new FormData();
  formData.append("username", username);
  formData.append("email", email);
  formData.append("text", text);

  try {
    const response = await fetch(
      `${REACT_APP_API_URL}/create/?developer=${REACT_APP_DEVELOPER_NAME}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const result = await response.json();
      const { status } = result;
      return status === EServerStatus.OK;
    }
    return false;
  } catch (e) {
    return false;
  }
};

type TAuthentication = (
  username: string,
  password: string
) => Promise<TAuthenticationResult>;

export const authentication: TAuthentication = async (username, password) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

  try {
    const response = await fetch(
      `${REACT_APP_API_URL}/login?developer=${REACT_APP_DEVELOPER_NAME}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const result = await response.json();
      const { status, message } = result;

      if (status === EServerStatus.OK) {
        return { token: message.token };
      }
      return { errorMessage: message.password };
    }
    return errorMessage;
  } catch (e) {
    return errorMessage;
  }
};

type TEditTask = (data: IEditTask) => Promise<IEditTaskResult>;

export const editTask: TEditTask = async (data) => {
  const { id, text, taskStatus, token } = data;
  const formData = new FormData();
  formData.append("token", token);
  formData.append("text", text);
  formData.append("status", `${taskStatus}`);

  try {
    const response = await fetch(
      `${REACT_APP_API_URL}/edit/${id}?developer=${REACT_APP_DEVELOPER_NAME}`,
      {
        method: "POST",
        body: formData,
      }
    );
    if (response.ok) {
      const result = await response.json();
      const { status, message } = result;
      if (status === EServerStatus.OK) {
        return {
          status: true,
        };
      }
      if (message.token) {
        return { status: false, message: message.token };
      }
    }
    return {
      status: false,
    };
  } catch (e) {
    return {
      status: false,
    };
  }
};
