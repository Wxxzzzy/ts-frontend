export interface CreateTicketCommand {
  ticketTitle: string;
  shortDescription?: string;
  ticketStatus?: number;
  teamId: number;
  assignedTo?: number;
}
