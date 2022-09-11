import { makeAutoObservable } from "mobx";
import DomainsStore from "./DomainsStore";

class StoreForTable {
  constructor() {
    makeAutoObservable(this);
  }

  infoRowForTable = {
    //  random: this.randomRatio.toFixed(2),
    amountDomains: this.amountDomains,
    nonSimplyDomain: this.nonSimplyDomain,
    //  allHexs: this.arrCoordinates.length,
    aspectRatio: this.hexSideSize,
    amountValueOne: this.amountValueOne,
  };

  //   amountDomains = 0;
  //   amountValueOne = 0;
  //   nonSimplyDomain = "Написать";
  arrTable = [];

  getAmountDomains(arrDomains) {
    //  this.amountDomains = arrDomains.length;
    //  this.amountValueOne = arrDomains.reduce((sum, current) => {
    //    return sum + current.idDomain.length;
    //  }, 0);

    this.infoRowForTable.amountDomains = arrDomains.length;
  }

  //   Управляем стеком для отображения таблицы доменов
  //   drowInfoTable() {
  //  console.log(this.amountDomains);
  //  console.log(this.amountValueOne);
  //  console.log(DomainsStore.hexSideSize);

  //  const infoRowForTable = {
  //    random: this.randomRatio.toFixed(2),
  //    amountDomains: this.stackDomains.length,
  //    nonSimplyDomain: this.nonSimplyDomain,
  //    allHexs: this.arrCoordinates.length,
  //    aspectRatio: this.hexSideSize,
  //    amountValueOne: this.arrVertexs.length,
  //  };
  //  if (this.arrTable.length < 10) {
  //    this.arrTable.push(infoRowForTable);
  //  } else {
  //    this.arrTable.shift();
  //    this.arrTable.push(infoRowForTable);
  //  }
  //   }

  drowInfoTable() {
    const infoRowForTable = {
      random: this.randomRatio.toFixed(2),
      amountDomains: this.amountDomains,
      nonSimplyDomain: this.nonSimplyDomain,
      allHexs: this.arrCoordinates.length,
      aspectRatio: this.hexSideSize,
      amountValueOne: this.amountValueOne,
    };

    console.log(infoRowForTable);

    //      if (this.arrTable.length < 10) {
    //        this.arrTable.push(infoRowForTable);
    //      } else {
    //        this.arrTable.shift();
    //        this.arrTable.push(infoRowForTable);
    //      }
    //   }
  }
}

export default new StoreForTable();
