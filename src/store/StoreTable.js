import { makeAutoObservable } from "mobx";

class StoreForTable {
  constructor() {
    makeAutoObservable(this);
  }

  amountDomains = 0;
  amountValueOne = 0;
  nonSimplyDomain = "Написать";

  arrTable = [];

  getAmountDomains(arrDomains) {
    this.amountDomains = arrDomains.length;
    this.amountValueOne = arrDomains.reduce((sum, current) => {
      return sum + current.idDomain.length;
    }, 0);
  }

  //   Управляем стеком для отображения таблицы доменов
  drowInfoTable() {
    console.log(this.amountDomains);
    console.log(this.amountValueOne);

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
  }
}

export default new StoreForTable();
