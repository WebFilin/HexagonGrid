import { makeAutoObservable } from "mobx";
import domainsStore from "./domainsStore";
import tableStore from "./tableStore";

class mainStore {
  constructor() {
    makeAutoObservable(
      (this.domainsStore = new domainsStore()),
      (this.tableStore = new tableStore())
    );
  }
}

export default new mainStore();
