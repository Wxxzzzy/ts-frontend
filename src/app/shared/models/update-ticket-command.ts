export interface UpdateTicketCommand {
  id: number;
  ticketTitle: string;
  shortDescription: string;
  ticketStatus: number;
  teamId: number;
  ticketCreatorId: number;
  assignedToId: number;
}
