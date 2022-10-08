import { makeAutoObservable } from "mobx";

class tableStore {
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

    //     const allDomains = domainsStore.stackDomains;
    //     const allHexs = domainsStore.arrCoordinates.length;
    //     const sideRatio = domainsStore.hexSideSize;
    //     const sumHexValueOne = allDomains
    //       .map((elem) => {
    //         return elem.idDomain;
    //       })
    //       .flat();
    //     const infoRow = {
    //       random: domainsStore.randomRatio.toFixed(2),
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

export default new tableStore();
