import { makeAutoObservable } from "mobx";

class hexCordinate {
  arrCoordinates = [];
  vertexLinksClick = [];
  hexClick = null;
  treeGraph = [];
  vertexLinksRandom = [];
  arrDomains = [];
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

  setHexValue(value) {
    this.hexValueTxt = value;
  }

  handlerBtnRandom(ratio) {
    this.randomRatio = ratio;
    this.isRandom = !this.isRandom;
  }

  getTreeGraph(tree) {
    //  console.log(tree);
    this.treeGraph = tree;
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
