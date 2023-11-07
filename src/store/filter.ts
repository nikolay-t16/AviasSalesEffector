import {createStore, createEvent} from 'effector';

export enum FilterTypes {
    NO_TRANSFER = "NO_TRANSFER",
    TRANSFER_1 = "TRANSFER_1",
    TRANSFER_2 = "TRANSFER_2",
    TRANSFER_3 = "TRANSFER_3",
}


type FilterData = Record<FilterTypes, boolean>;
type FilterRendered = Record<FilterTypes | "ALL", boolean>;

export const toggleFilter = createEvent<FilterTypes>();
export const toggleFilterAll = createEvent();

const $filterBase = createStore<FilterData>({
    [FilterTypes.NO_TRANSFER]: true,
    [FilterTypes.TRANSFER_1]: true,
    [FilterTypes.TRANSFER_2]: true,
    [FilterTypes.TRANSFER_3]: true,
})
    .on(toggleFilter, (filter, filterType) => {
            return ({...filter, [filterType]: !filter[filterType]})
        }
    ).on(toggleFilterAll, (filter) => {
        const allActive = Object.values(filter).every((v) => v);
        const newFilter = {...filter}
        for (const key in newFilter) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            newFilter[key] = !allActive;
        }
        return newFilter
    });


export const $filter = $filterBase.map<FilterRendered>((filter) => {
    const allActive = Object.values(filter).every((v) => v);
    return {...filter, ALL: allActive}
})
