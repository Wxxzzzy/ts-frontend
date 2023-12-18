export interface UpdateTicketCommand {
  id: number;
  ticketTitle: string;
  shortDescription: string;
  ticketStatus: number;
  teamId: number;
  assignedToId: number;
}
