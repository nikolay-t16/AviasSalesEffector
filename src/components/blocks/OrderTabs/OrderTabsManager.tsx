import OrderTabs from "./OrderTabs.tsx";
import {$order, OrderTypes, setOrder} from "../../../store/order.ts";
import {useStore} from "effector-react";

export const OrderTabsManager = () => {
    const items = [{label: "Дешевые", type: OrderTypes.CHEAP}, {label: "Быстрые", type: OrderTypes.FAST}];
    const selected = useStore($order);
    return <OrderTabs items={items} onSelect={setOrder} selected={selected}/>;
}