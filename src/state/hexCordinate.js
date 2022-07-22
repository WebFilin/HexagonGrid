import { makeAutoObservable } from "mobx";

class hexCordinate {
  arrCoordinates = [];
  peakAndGroup = {};
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

  // Ищем пересечения в домене по ID
  checkElemInDomain(hexID) {
    return this.arrDomains.findIndex((domain) => {
      return domain.groupCord.includes(hexID);
    });
  }

  //   Добавляем ID состоявляющие домен, сортируем на уникальность
  addSubDomain(nodeId, index, hexID) {
    const oldState = this.arrDomains[index].groupCord;
    this.arrDomains[index].hexId.push(hexID);
    this.arrDomains[index].groupCord = [...new Set([...oldState, ...nodeId])];
  }
}

export default new hexCordinate();
