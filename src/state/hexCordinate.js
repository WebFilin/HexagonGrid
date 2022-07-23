import { makeAutoObservable } from "mobx";

class hexCordinate {
  arrCoordinates = [];
  peakAndGroup = {};
  hexObj = null;
  arrDomains = [];
  svgArea = [];

  constructor() {
    makeAutoObservable(this);
  }

  //   Массив коррдинат хексов
  getArrCoordinates(arrCord) {
    this.arrCoordinates = arrCord;
  }

  //   Получаем хекс клика
  getHex(checkHex) {
    if (checkHex) {
      this.hexObj = checkHex;
    }
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
    const oldState = this.arrDomains[index].groupCord;
    this.arrDomains[index].hexId.push(hexID);
    this.arrDomains[index].groupCord = [...new Set([...oldState, ...nodeId])];
  }

  // Ищем пересечения в домене по ID
  checkElemInDomain(hexID) {
    return this.arrDomains.findIndex((domain) => {
      return domain.groupCord.includes(hexID);
    });
  }

  removeHexFromDomain(index, indexArrHexId, indexArrCord) {
    this.arrDomains[index].hexId.splice(indexArrHexId, 1);
    this.arrDomains[index].groupCord.splice(indexArrCord, 1);
  }

  //   Получаем все отрисованные хексы
  getSvgArea(area) {
    this.svgArea = area;
  }

  setHexValue(value) {
    this.hexValueTxt = value;
  }
}

export default new hexCordinate();
