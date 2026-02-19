import * as uuid from "uuid";

const UUID_VERSION = 4;

export const createId = (): string => {
  return uuid[`v${UUID_VERSION}`]();
};
