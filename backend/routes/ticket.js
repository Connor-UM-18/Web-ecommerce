import { Router } from 'express';
import { TicketController } from '../controllers/ticket.js';

export const createTicketRouter = ({ticketModelo}) => {

    const ticketRouter = Router();

    const ticketController = new TicketController({ticketModelo});

    ticketRouter.get('/:id', ticketController.generate);


    return ticketRouter;
}