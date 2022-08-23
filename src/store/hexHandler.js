import { makeAutoObservable } from "mobx";

class hexCordinate {
  arrCoordinates = [];
  arrVertexs = [];
  hexVertex = null;
  hexClick = null;
  arrGraphTree = [];
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

  get handlerCreateHex() {
    return (this.isCreateMainhex = !this.isCreateMainhex);
  }

  //   Массив коррдинат хексов
  getArrCoordinates(arrCord) {
    this.arrCoordinates = arrCord;
  }

  //   Получаем хекс клика
  getHex(checkHex) {
    checkHex.setAttribute("value", 1);
    this.hexClick = checkHex;
  }

  //   Получаем id и группу соседий хекса
  getHexGroup(peak) {
    this.hexVertex = peak;
    this.arrVertexs.push(peak);
  }

  getVertexLinks(vertex) {
    this.arrVertexs = [...vertex];
  }

  //   Получаем все отрисованные хексы
  getSvgArea(area) {
    this.svgArea = area;
  }

  getDomainsStack(domains) {
    this.stackDomains = domains;
  }

  //   Удаляем хекс при клике по нему
  getRemoveID(hex) {
    this.removeHexId = Number(hex.id);
    hex.setAttribute("value", 0);

    const index = this.arrVertexs.findIndex((elem) => {
      return elem.id === this.removeHexId;
    });

    if (index !== -1) {
      this.arrVertexs.splice(index, 1);
    }
  }

  handlerBtnRandom(ratio) {
    this.randomRatio = ratio;
    this.isRandom = !this.isRandom;
  }

  getGraphTree(arrTree) {
    this.arrGraphTree = arrTree;
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
}

export default new hexCordinate();
