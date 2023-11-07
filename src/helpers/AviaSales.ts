import {nanoid} from "nanoid";

export type TicketSegmentData = {
    date: string;
    destination: string;
    duration: number;
    origin: string;
    stops: string[];
};

export type TicketData = {
    id: string;
    carrier: string;
    price: number;
    segments: TicketSegmentData[];
};

class AviaSales {
    protected readonly API_PATH = 'https://aviasales-test-api.kata.academy/';

    protected readonly API_GET_SEARCH_ID_PATH = 'search';

    protected readonly API_GET_TICKETS_PATH = 'tickets';

    protected searchId: string | null = null;

    protected makeQueryString = (params: Record<string, string | null>) => {
        return Object.keys(params)
            .map((key: string) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key]!)}`)
            .join('&');
}
    protected async fetch<T>(
        path: string,
        getParams: Record<string, string | null> = {},
        method: string = 'GET',
        postParams: object = {},
    ): Promise<T> {
        const queryString = this.makeQueryString(getParams);
        const apiPath = `${this.API_PATH}${path}?${queryString}`;
        const params: RequestInit = {method};
        if (method !== 'GET') {
            params.body = JSON.stringify(postParams);
            params.headers = {'Content-Type': 'application/json;charset=utf-8'};
        }
        const response = await fetch(apiPath, params).catch(() => {
            throw new Error('connection error');
        });
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        return response.json().then();
    }

    protected async fetchSearchId() {
        return this.fetch<{ searchId: string }>(this.API_GET_SEARCH_ID_PATH).then((result) => result.searchId);
    }

    protected async initSearchId() {
        this.searchId = await this.fetchSearchId();
    }

    public async fetchTickets(): Promise<{ tickets: TicketData[]; stop: boolean }> {
        if (this.searchId === null) {
            await this.initSearchId();
        }
        return this.fetch<{
            tickets: TicketData[];
            stop: boolean
        }>(this.API_GET_TICKETS_PATH, {searchId: this.searchId}).then(({tickets, stop}) => {
            const ticketsWithId = tickets.map((v) => ({...v, id: nanoid()}))
            return {tickets: ticketsWithId, stop}
        });
    }
}

export default AviaSales;
