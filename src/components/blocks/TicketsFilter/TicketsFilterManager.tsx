import {useStore} from "effector-react"
import {$filter, FilterTypes, toggleFilter, toggleFilterAll} from "../../../store/filter.ts";
import TicketsFilter, {TicketsFilterItem} from "./TicketsFilter.tsx";

export const TicketsFilterManager = () => {
    const filter = useStore($filter);

    const filterItems: TicketsFilterItem[] = [
        {
            key: "ALL", label: 'Все', isChecked: filter["ALL"], onChange: () => toggleFilterAll()

        },
        {
            key: FilterTypes.NO_TRANSFER,
            label: 'Без пересадок',
            isChecked: filter[FilterTypes.NO_TRANSFER],
            onChange: () => toggleFilter(FilterTypes.NO_TRANSFER)
        },
        {
            key: FilterTypes.TRANSFER_1,
            label: '1 пересадка',
            isChecked: filter[FilterTypes.TRANSFER_1],
            onChange: () => toggleFilter(FilterTypes.TRANSFER_1)
        },
        {
            key: FilterTypes.TRANSFER_2,
            label: '2 пересадка',
            isChecked: filter[FilterTypes.TRANSFER_2],
            onChange: () => toggleFilter(FilterTypes.TRANSFER_2)
        },
        {
            key: FilterTypes.TRANSFER_3,
            label: '3 пересадка',
            isChecked: filter[FilterTypes.TRANSFER_3],
            onChange: () => toggleFilter(FilterTypes.TRANSFER_3)
        },
    ]

    return <TicketsFilter filterItems={filterItems}/>
}