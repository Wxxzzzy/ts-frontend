export enum ENotificationType {
  Success = 1,
  Info = 2,
  Error = 3,
}

export const NotificationTypeDictionary: {
  [key in ENotificationType]: 'success' | 'info' | 'error';
} = {
  [ENotificationType.Success]: 'success',
  [ENotificationType.Info]: 'info',
  [ENotificationType.Error]: 'error',
};
