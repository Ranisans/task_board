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

export const MAX_TASKS_PER_PAGE = 3;
