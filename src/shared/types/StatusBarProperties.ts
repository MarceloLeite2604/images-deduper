export interface StatusBarProperties {
  message?: string,
  progress?: number
};

export type UpdateStatusCallback = (properties: StatusBarProperties) => void;