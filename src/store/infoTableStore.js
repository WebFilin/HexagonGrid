import { makeAutoObservable } from "mobx";
import domainsStore from "./domainsStore";

class infoTableStore {
  sumRandomID = 0;
  nonSimplyDomain = "Расчитать";
  arrTable = [];
  constructor() {
    makeAutoObservable(this);
  }

  getSumRandomId(sumID) {
    this.sumRandomID = sumID;
  }

  getInfoRowForTable(infoRow) {
    this.arrTable.push(infoRow);
  }
}

export default new infoTableStore();
