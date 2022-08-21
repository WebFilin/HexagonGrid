import { makeAutoObservable } from "mobx";

class hexCordinate {
  arrCoordinates = [];
  vertexLinksClick = [];
  vertexLinksRandom = [];
  hexClick = null;
  stackDomains = [];
  svgArea = [];
  isRandom = false;
  isCreateMainhex = false;
  randomRatio = 0;
  hexSideSize = {
    L: 3,
    M: 5,
    N: 7,
  };

  constructor() {
    makeAutoObservable(this);
  }

  //   Управляем сторонами общей сетки
  getHexSideSize(axisL, axisM, axisN) {
    this.hexSideSize.L = axisL;
    this.hexSideSize.M = axisM;
    this.hexSideSize.N = axisN;
  }

  handlerCreateHex() {
    this.isCreateMainhex = !this.isCreateMainhex;
  }

  //   Массив коррдинат хексов
  getArrCoordinates(arrCord) {
    this.arrCoordinates = arrCord;
  }

  //   Получаем хекс клика
  getHex(checkHex) {
    this.hexClick = checkHex;
  }

  getHexGroup(peak) {
    this.vertexLinksClick.push(peak);
  }

  getHexRandom(arrElem) {
    this.arrHexRandom = null;
    this.hexClick = null;

    this.arrHexRandom = arrElem;
  }

  getVertexLinks(vertex) {
    this.vertexLinksRandom = [...vertex];
  }

  //   Получаем все отрисованные хексы
  getSvgArea(area) {
    this.svgArea = area;
  }

  getHexAutoCheckObj(hexObj) {
    this.hexAutoCheckObj = hexObj;
  }

  getDomainsStack(domains) {
    this.stackDomains = domains;
  }

  //   Удаляем хекс при клике по нему
  getRemoveID(hex) {
    this.removeHexId = Number(hex.id);
    hex.setAttribute("value", 0);
    console.log(hex);

    const indexClick = this.vertexLinksClick.findIndex((elem) => {
      return elem.id === this.removeHexId;
    });

    if (indexClick !== -1) {
      this.vertexLinksClick.splice(indexClick, 1);
    }

    const indexRandom = this.vertexLinksRandom.findIndex((elem) => {
      return elem.id === this.removeHexId;
    });

    if (indexRandom !== -1) {
      this.vertexLinksRandom.splice(indexRandom, 1);
    }

    console.log(indexRandom);
  }

  handlerBtnRandom(ratio) {
    this.randomRatio = ratio;
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
