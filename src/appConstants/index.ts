export enum ESortFields {
  ID = "id",
  USERNAME = "username",
  EMAIL = "email",
  STATUS = "status",
}

export const Sorting = [
  { label: "Id", value: ESortFields.ID },
  { label: "User", value: ESortFields.USERNAME },
  { label: "Email", value: ESortFields.EMAIL },
  { label: "Status", value: ESortFields.STATUS },
];

export enum ESortDirection {
  ASC = "asc",
  DESC = "desc",
}

export enum EServerStatus {
  OK = "ok",
  ERROR = "error",
}

export enum ETaskStatus {
  OPEN = 0,
  CLOSED = 10,
}

export const MAX_TASKS_PER_PAGE = 3;

export const AUTH_KEY = "token";
