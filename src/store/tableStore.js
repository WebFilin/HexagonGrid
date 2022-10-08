import { makeAutoObservable } from "mobx";
import DomainsStore from "./DomainsStore";

class TableStore {
  nonSimplyDomain = null;
  arrTable = [];
  isDrowTable = false;
  allDomains = [];

  constructor() {
    makeAutoObservable(this);
  }

  getSumNonSimplyDomain(value) {
    this.nonSimplyDomain = value;
  }

  getSumDomains(domains) {
    this.allDomains = domains;
    console.log(this.allDomains);
  }

  handlerInfoTable() {
    this.isDrowTable = !this.isDrowTable;

    console.log(DomainsStore.arrGraphTree);

    //     const allDomains = DomainsStore.stackDomains;
    //     const allHexs = DomainsStore.arrCoordinates.length;
    //     const sideRatio = DomainsStore.hexSideSize;
    //     const sumHexValueOne = allDomains
    //       .map((elem) => {
    //         return elem.idDomain;
    //       })
    //       .flat();
    //     const infoRow = {
    //       random: DomainsStore.randomRatio.toFixed(2),
    //       amountDomains: allDomains.length,
    //       nonSimplyDomain: this.nonSimplyDomain,
    //       allHexs: allHexs,
    //       aspectRatio: `(${sideRatio.L}; ${sideRatio.M}; ${sideRatio.N})`,
    //       sumHexValueOne: sumHexValueOne.length,
    //     };
    //     if (this.arrTable.length < 10) {
    //       this.arrTable.push(infoRow);
    //     } else {
    //       this.arrTable.shift();
    //       this.arrTable.push(infoRow);
    //     }
  }
}

export default new TableStore();
