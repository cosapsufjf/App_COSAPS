import AppImages from "../conf/GetImages";
export type AppImageKeys = keyof typeof AppImages;
export type AppImageValues = (typeof AppImages)[keyof typeof AppImages];