export interface INewTask {
  username: string;
  email: string;
  text: string;
}

export interface ITask extends INewTask {
  id: number;
  status: number;
}

export interface IError {
  errorMessage: string;
}

interface IGetTasksPageResult {
  data: {
    tasks: ITask[];
    totalTaskCount: number;
  };
}

export type TGetTasksPageResult = IError | IGetTasksPageResult;

export interface IAuthenticationResult {
  token: string;
}

export type TAuthenticationResult = IError | IAuthenticationResult;

export interface IEditTask {
  id: number;
  text: string;
  taskStatus: number;
  token: string;
}

export interface IEditTaskResult {
  status: boolean;
  tokenExpired?: boolean;
}
