import {createStore, createEffect} from 'effector';
import AviaSales, {TicketData} from "../helpers/AviaSales.ts";

export interface Tickets {
    tickets: TicketData[];
    errorsCount: number;
    error?: string;
    isFetched: boolean;
}

const aviaSales = new AviaSales();
export const fetchTickets = createEffect(() => aviaSales.fetchTickets())

export const $tickets = createStore<Tickets>({tickets: [], errorsCount: 0, isFetched: false})
    .on(fetchTickets.failData, (store, error) => ({
            ...store,
            error: error.message,
            errorsCount: store.errorsCount + 1
        })
    )
    .on(fetchTickets.doneData, (store, {tickets, stop: isFetched}) => ({
        ...store, tickets: [...store.tickets, ...tickets], isFetched, errorsCount: 0, error: ""
    }));
$tickets.watch(({isFetched, errorsCount}) => {
    if (!isFetched && errorsCount < 5) fetchTickets();
});
