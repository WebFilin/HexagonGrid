import { makeAutoObservable } from "mobx";

class hexCordinate {
  arrCoordinates = [];
  peakAndGroup = null;
  hexObj = null;
  arrDomains = [];
  uniquIdHex = [];

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

  //   Добавляем ID состоявляющие домен, сортируем на уникальность
  addSubDomain(peakAndGroup) {
    this.uniquIdHex.push(...peakAndGroup.group);

    this.arrDomains[0].hexId.push(peakAndGroup.hexId);
    this.arrDomains[0].groupCord = [...new Set(this.uniquIdHex)];

    //  console.log(this.arrDomains[0].groupCord);
  }
}

export default new hexCordinate();
