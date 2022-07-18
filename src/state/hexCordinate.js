import { makeAutoObservable } from "mobx";

class hexCordinate {
  arrCoordinates = [];
  peakAndGroup = null;
  hexObj = null;
  arrDomains = [];

  constructor() {
    makeAutoObservable(this);
  }

  //   Массив коррдинат хексов
  getArrCoordinates(arrCord) {
    this.arrCoordinates = arrCord;
  }

  //   Получаем хекс клика
  getHex(checkHex) {
    this.hexObj = checkHex;
  }

  //   Находим элементы - соседи хекса
  getHexGroup(hexGroup) {
    this.peakAndGroup = hexGroup;
  }

  createDomen(hexDomain) {
    this.arrDomains.push(hexDomain);
  }

  addSubDomain(peakAndGroup) {
    this.arrDomains[0].hexId.push(peakAndGroup.hexId);
    this.arrDomains[0].groupCord.push(...peakAndGroup.group);
    //  console.log(peakAndGroup.hexId);
    //  console.log(this.arrDomains);
  }
}

export default new hexCordinate();
