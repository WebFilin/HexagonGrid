import { makeAutoObservable } from "mobx";

class hexCordinate {
  arrCoordinates = [];
  peakAndGroup = {
    hexId: null,
    group: null,
  };
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

  //   Добавляем ID состоявляющие домен, сортируем на уникальность
  addSubDomain(nodeId, index, hexID) {
    console.log(index);

    const oldState = this.arrDomains[index].groupCord;

    this.arrDomains[index].hexId.push(hexID);
    this.arrDomains[index].groupCord = [...new Set([...oldState, ...nodeId])];
  }
}

export default new hexCordinate();
