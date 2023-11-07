import TicketsList from "./TicketsList.tsx";
import {useStore} from "effector-react";
import {$showAddMoreTicketsBtn, $ticketsList, addMoreTickets} from "./TicketsListStore.ts";
import {useEffect} from "react";
import {fetchTickets} from "../../../store/tickets.ts";

const TicketsListManager = () => {
    const showAddMoreTicketsBtn = useStore($showAddMoreTicketsBtn)
    const tickets = useStore($ticketsList)
    const pending = useStore(fetchTickets.pending);
    useEffect(() => {
        fetchTickets();
    }, [])
    return (

        <TicketsList tickets={tickets} errorMessage={""} addMoreTickets={() => addMoreTickets()}
                     showAddMoreTickets={showAddMoreTicketsBtn} isFetching={pending}/>
    );
};

export default TicketsListManager;
