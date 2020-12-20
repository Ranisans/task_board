import { EServerStatus, ESortDirection, ESortFields } from "../appConstants";
import {
  IAuthenticationResult,
  IEditTask,
  IEditTaskResult,
  IError,
  IGetTasksPageResult,
  INewTask,
} from "../appTypes";

interface IGetTasksPage {
  page: number;
  sorting?: {
    sortField: ESortFields;
    sortDirection: ESortDirection;
  };
}

type TGetTasksPage = (data: IGetTasksPage) => Promise<IGetTasksPageResult>;

const URL_API = process.env.API_URL;
const { DEVELOPER_NAME } = process.env;
const errorMessage: IError = {
  errorMessage: "Something goes wrong",
};

export const getTasksPage: TGetTasksPage = async (data) => {
  const { page, sorting } = data;
  let getUrl = `${URL_API}/?developer=${DEVELOPER_NAME}?page=${page}`;
  try {
    if (sorting) {
      getUrl = `${getUrl}?sort_direction=${sorting.sortDirection}`;
    }

    const response = await fetch(getUrl);

    if (response.ok) {
      const result = await response.json();
      const { status, message } = result;
      if (status === EServerStatus.OK) {
        return {
          data: {
            tasks: message.tasks,
            total_task_count: message.total_task_count,
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
  try {
    const response = await fetch(`${URL_API}/?developer=${DEVELOPER_NAME}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    });

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
) => Promise<IAuthenticationResult>;

export const authentication: TAuthentication = async (username, password) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

  try {
    const response = await fetch(
      `${URL_API}/login?developer=${DEVELOPER_NAME}`,
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
  try {
    const response = await fetch(
      `${URL_API}/edit/:${id}?developer=${DEVELOPER_NAME}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          text,
          status: taskStatus,
          token,
        }),
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
        return { status: false, tokenExpired: true };
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
