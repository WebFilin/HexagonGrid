import { makeAutoObservable } from "mobx";

class infoTableStore {
  sumRandomID = 0;
  nonSimplyDomain = "Раcсчитать";
  arrTable = [];
  constructor() {
    makeAutoObservable(this);
  }

  getSumRandomId(sumID) {
    this.sumRandomID = sumID;
  }

  getSumNonSimplyDomain(value) {
    this.nonSimplyDomain = value;
  }

  handlerInfoTable(infoRow) {
    if (this.arrTable.length < 10) {
      this.arrTable.push(infoRow);
    } else {
      this.arrTable.shift();
      this.arrTable.push(infoRow);
    }
  }
}

export default new infoTableStore();
