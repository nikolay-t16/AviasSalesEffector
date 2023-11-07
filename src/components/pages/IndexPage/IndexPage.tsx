import styles from './IndexPage.module.scss';

import {TicketsFilterManager} from "../../blocks/TicketsFilter/TicketsFilterManager.tsx";
import {OrderTabsManager} from "../../blocks/OrderTabs/OrderTabsManager.tsx";
import TicketsListManager from "../../layouts/TicketsList/TicketsListManager.tsx";

function IndexPage() {
  return (
    <div className={styles.root}>
      <img className={styles.logo} src="/Logo.svg" width={82} alt="logo" />
      <form className={styles.form}>
        <div className={styles.formOrderTabs}>
          <OrderTabsManager />
        </div>
        <div className={styles.formFilter}>
          <TicketsFilterManager />
        </div>
        <div className={styles.formResults}>
          <TicketsListManager />
        </div>
      </form>
    </div>
  );
}
export default IndexPage;
