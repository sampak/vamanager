export enum IKeys {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

export interface DefaultResponse {
  key: IKeys;
  value: string;
}
