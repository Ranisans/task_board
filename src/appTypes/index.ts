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
  errorMessage?: string;
}

export interface IGetTasksPageResult extends IError {
  data?: {
    tasks: ITask[];
    total_task_count?: number;
  };
}

export interface IAuthenticationResult extends IError {
  token?: string;
}

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
