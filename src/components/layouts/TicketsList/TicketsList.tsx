import {BeatLoader} from 'react-spinners';
import styles from './TicketsList.module.scss';
import TicketComponent from '../../blocks/TicketComponent/TicketComponent';
import {TicketData} from "../../../helpers/AviaSales.ts";

type TicketsListProps = {
    isFetching: boolean,
    tickets: TicketData[];
    showAddMoreTickets: boolean
    addMoreTickets: () => void;
    errorMessage: string;
};

const TicketsList = ({
                         isFetching,
                         tickets,
                         showAddMoreTickets,
                         addMoreTickets,
                         errorMessage,
                     }: TicketsListProps) => {
    return (
        <div>
            {errorMessage !== '' ? <div className={styles.error}>{errorMessage}</div> : null}
            {isFetching && <BeatLoader/>}
            {!tickets.length && <div>Рейсов, подходящих под заданные фильтры, не найдено</div>}
            {tickets.length && tickets.map((ticket) => (<div key={ticket.id} className={styles.ticket}>
                <TicketComponent {...ticket}/>
            </div>))}

            {showAddMoreTickets && (
                <button
                    className={styles.buttonMore}
                    type="button"
                    onClick={() => {
                        addMoreTickets();
                    }}
                >
                    Еще
                </button>
            )}
        </div>
    );
};

export default TicketsList;
