import { StatusBarProperties } from '../../../../shared/types';

export interface StatusBarContext {
  properties: StatusBarProperties,
  updateProperties: (properties: StatusBarProperties) => void
}
