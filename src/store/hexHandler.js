import { makeAutoObservable } from "mobx";

class hexCordinate {
  arrCoordinates = [];
  arrVertexs = [];
  hexVertex = null;
  hexClick = null;
  arrGraphTree = [];
  stackDomains = [];
  arrDomainsColor = [];
  svgArea = [];
  isRandom = false;
  isCreateMainhex = false;
  randomRatio = 0;
  hexSideSize = {
    L: 3,
    M: 5,
    N: 7,
  };

  infoForTable = [];

  constructor() {
    makeAutoObservable(this);
  }

  //   Управляем сторонами общей сетки
  getHexSideSize(axisL, axisM, axisN) {
    this.hexSideSize.L = axisL;
    this.hexSideSize.M = axisM;
    this.hexSideSize.N = axisN;
  }

  getHandlerCreateHex() {
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

    // Сброс стилей хексов
    hex.style.fill = null;
    hex.style.fillOpacity = 0.3;

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
    this.clearDomaincolor();
    this.getInfoForTable();
  }

  getGraphTree(arrTree) {
    this.arrGraphTree = arrTree;
  }

  getDomainColor(color) {
    this.arrDomainsColor.push(color);
  }

  clearDomaincolor() {
    this.arrDomainsColor = [];
  }

  getInfoForTable() {
    const info = {
      random: this.randomRatio.toFixed(2),
      domains: this.stackDomains.length,
      nonSimplyDomain: "Реализовать",
      allHexs: this.arrCoordinates.length,
      aspectRatio: `${this.hexSideSize.L}; ${this.hexSideSize.M}; ${this.hexSideSize.N}`,
      valueOne: this.arrGraphTree.flat().length,
    };

    if (this.infoForTable.length < 10) {
      this.infoForTable.push(info);
    } else {
      this.infoForTable.push(info);
      this.infoForTable.shift();
    }
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

  setDomainColor() {
    return (
      "#" +
      (Math.random().toString(16) + "000000").substring(2, 8).toUpperCase()
    );
  }
}

export default new hexCordinate();
