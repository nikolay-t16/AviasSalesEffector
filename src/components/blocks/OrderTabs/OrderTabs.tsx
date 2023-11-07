
import styles from './OrderTabs.module.scss';
import OrderRadioInput from './OrderRadioInput/OrderRadioInput';
import {OrderTypes} from "../../../store/order.ts";

interface OrderTab {
  label: string;
  type:OrderTypes;
}
interface OrderTabsProps {
  items: OrderTab[];
  selected: OrderTypes;
  onSelect: (tab: OrderTypes) => void;
}

function OrderTabs({ items, selected, onSelect }: OrderTabsProps) {
  const arrTabsNode = items.map(({type,label}) => (
    <OrderRadioInput
      key={type}
      name="orderTabs"
      label={label}
      value={type}
      isChecked={selected === type}
      onClick={(val) => onSelect(val as OrderTypes)}
    />
  ));
  return <div className={styles.root}>{arrTabsNode}</div>;
}

export default OrderTabs
