import { StatusBarProperties } from '../shared/types';

type UpdateStatusMethodType = (properties: StatusBarProperties) => void;

let updateStatusMethod: UpdateStatusMethodType;

export const updateStatus = (properties: StatusBarProperties) => {
  if (!updateStatusMethod) {
    console.warn('Update status method is not ready yet.');
  }
  updateStatusMethod(properties);
};

export const initupdateStatusMethod = (updateStatusMethodCallback: UpdateStatusMethodType) => {
  if (!updateStatusMethod) {
    updateStatusMethod = updateStatusMethodCallback;
  }
};
