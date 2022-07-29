import { makeAutoObservable } from "mobx";

class hexCordinate {
  arrCoordinates = [];
  peakAndGroup = {};
  hexObj = null;
  arrDomains = [];
  svgArea = [];
  isRandom = false;

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

  getHexRandom(arrElem) {
    this.arrHexRandom = arrElem;
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

  getHexAutoCheckObj(hexObj) {
    this.hexAutoCheckObj = hexObj;
  }

  setHexValue(value) {
    this.hexValueTxt = value;
  }

  handlerBtnRandom() {
    this.isRandom = !this.isRandom;
  }

  //   Поиск соседий хекса
  getNeighborsHex(hexVert, hexHoriz) {
    const result = this.arrCoordinates.filter((elem) => {
      return (
        (elem.horizontal === hexHoriz - 1 && elem.vertical === hexVert) ||
        (elem.horizontal === hexHoriz - 1 && elem.vertical === hexVert + 1) ||
        (elem.vertical === hexVert + 1 && elem.horizontal === hexHoriz) ||
        (elem.horizontal === hexHoriz + 1 && elem.vertical === hexVert) ||
        (elem.horizontal === hexHoriz + 1 && elem.vertical === hexVert - 1) ||
        (elem.vertical === hexVert - 1 && elem.horizontal === hexHoriz)
      );
    });

    //  Отсекаем лишние формируем обьект c ID соседних узлов
    const nodeID = result.map((elem) => {
      return elem.id;
    });

    return nodeID;
  }

  randomColor() {
    return (
      "#" +
      (Math.random().toString(16) + "000000").substring(2, 8).toUpperCase()
    );
  }
}

export default new hexCordinate();
