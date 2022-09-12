import { makeAutoObservable } from "mobx";
import domainsStore from "./domainsStore";

export const infoTableStore = makeAutoObservable({
  get infoRow() {
    const sumValueOne = domainsStore.stackDomains.reduce((sum, current) => {
      return sum + current.idDomain.length;
    }, 0);

    return {
      amountDomains: domainsStore.stackDomains.length,
      sumHexValueOne: sumValueOne,
    };
  },

  addRowForTable: () => {
    console.log(infoTableStore.infoRow);
  },
});
