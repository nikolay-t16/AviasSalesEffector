import {combine, createEvent, createStore} from "effector";
import {$tickets} from "../../../store/tickets.ts";
import {$order, OrderTypes} from "../../../store/order.ts";
import {$filter} from "../../../store/filter.ts";

export const addMoreTickets = createEvent()

const $renderCount = createStore(5).on(addMoreTickets, (state) => state + 5);

const $filteredTickets = combine($tickets, $order, $filter, ({tickets}, order, filter) => {
    if (Object.values(filter).every((v) => v === false)) return [];

    let filteredTickets = tickets;
    if (!filter.ALL) {
        filteredTickets = filteredTickets.filter((ticket) => {
            const stopsCount = ticket.segments[0].stops.length + ticket.segments[1].stops.length;
            if (filter.NO_TRANSFER && stopsCount === 0) return true;
            if (filter.TRANSFER_1 && stopsCount === 1) return true;
            if (filter.TRANSFER_2 && stopsCount === 2) return true;
            if (filter.TRANSFER_3 && stopsCount === 3) return true;

            return false;
        });
    }

    return filteredTickets.sort((fistTicket, secondTicket) => {
        if (order === OrderTypes.CHEAP) {
            if (fistTicket.price < secondTicket.price) return -1;
            if (fistTicket.price > secondTicket.price) return 1;
            return 0;
        }

        const fistTicketDuration = fistTicket.segments[0].duration + fistTicket.segments[1].duration;
        const secondTicketDuration = secondTicket.segments[0].duration + secondTicket.segments[1].duration;

        if (fistTicketDuration < secondTicketDuration) return -1;
        if (fistTicketDuration > secondTicketDuration) return 1;
        return 0;
    });
});

export const $ticketsList = combine($filteredTickets, $renderCount, $order, (tickets, renderCount) => {
    return tickets.slice(0, renderCount);
});

export const $showAddMoreTicketsBtn = combine($filteredTickets, $renderCount, (tickets, renderCount) =>
    tickets.length > renderCount)