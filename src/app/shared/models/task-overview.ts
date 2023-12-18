export interface TaskOverview {
  id: number;
  ticketTitle: string;
  shortDescription: string;
  ticketStatus: number;
  teamId: number;

  assignedToId?: number;
  assignedToName?: string;
  creatorName: string;
}
