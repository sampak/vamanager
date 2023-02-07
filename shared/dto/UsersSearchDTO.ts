export enum UsersSearchOrder {
  LATEST = "LATEST",
  OLDEST = "OLDEST",
}

export interface UsersSearchDTO {
  name: string;
  orderBy: UsersSearchOrder;
}
