export enum ETicketStatus {
  Open = 1,
  InProgress = 2,
  Resolved = 3,
}

export const TicketStatusDictionary: {
  [key in ETicketStatus]: 'Open' | 'In Progress' | 'Resolved';
} = {
  [ETicketStatus.Open]: 'Open',
  [ETicketStatus.InProgress]: 'Resolved',
  [ETicketStatus.Resolved]: 'Resolved',
};

export const TicketStatusIconsDict: {
  [key in ETicketStatus]: 'bug' | 'file-group' | 'success-standard';
} = {
  [ETicketStatus.Open]: 'bug',
  [ETicketStatus.InProgress]: 'file-group',
  [ETicketStatus.Resolved]: 'success-standard',
};
