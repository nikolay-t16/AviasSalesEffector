import {createStore, createEvent} from 'effector';

export enum OrderTypes {
    CHEAP = "CHEAP",
    FAST = "FAST",
}

export const setOrder = createEvent<OrderTypes>()

export const $order = createStore<OrderTypes>(OrderTypes.CHEAP)
    .on(setOrder, (_, type) => type);