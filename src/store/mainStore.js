import { makeAutoObservable } from "mobx";
import DomainsStore from "./DomainsStore";
import TableStore from "./TableStore";

class mainStore {
  constructor() {
    this.DomainsStore = new DomainsStore(this);
    this.tableStore = new TableStore(this);
  }
}

export default new mainStore();
