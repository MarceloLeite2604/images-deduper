
export interface StatusBarProperties {
  message?: string,
  progress?: number
};

export interface StatusBarContext {
  properties: StatusBarProperties,
  updateProperties: (properties?: StatusBarProperties) => void
}
