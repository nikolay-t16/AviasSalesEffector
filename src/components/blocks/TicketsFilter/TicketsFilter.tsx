import styles from './TicketsFilter.module.scss';


export type TicketsFilterItem = {
  key: string;
  label: string;
  isChecked: boolean;
  onChange: () => void;
};

type TicketsFilterProps = {
  filterItems: TicketsFilterItem[];
};

function TicketsFilter({ filterItems }: TicketsFilterProps) {
  const itemsNode = Array.from(filterItems).map(({ label, isChecked, key, onChange }) => (
    <label key={key} className={styles.item}>
      <input onChange={() => onChange()} className={styles.itemInput} type="checkbox" checked={isChecked} />
      <span className={styles.itemCheckmark} />
      <span className={styles.itemLabel}>{label}</span>
    </label>
  ));
  return (
    <div className={styles.root}>
      <div className={styles.tittle}>Количество пересадок</div>
      {itemsNode}
    </div>
  );
}

export default TicketsFilter;
