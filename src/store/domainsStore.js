import { autorun, makeAutoObservable, reaction, when } from "mobx";

class DomainsStore {
  arrCoordinates = [];
  arrVertexs = [];
  hexVertex = null;
  hexClick = null;
  arrGraphTree = [];
  stackDomains = [];
  arrDomainsColor = [];
  svgArea = [];
  isCreateMainHex = false;
  randomRatio = 0;
  hexSideSize = {
    L: 3,
    M: 5,
    N: 7,
  };
  isBtnAuto = false;
  rowTable = {};
  stackTable = [];

  constructor() {
    makeAutoObservable(this);
  }

  //   Управляем сторонами общей сетки
  getHexSideSize(axisL, axisM, axisN) {
    this.hexSideSize.L = axisL;
    this.hexSideSize.M = axisM;
    this.hexSideSize.N = axisN;
  }

  //Создать общую сетку по заданнам размерам
  getHandlerCreateMainHex() {
    this.isCreateMainHex = !this.isCreateMainHex;
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

  getVertexLinksRandom(vertex) {
    this.arrVertexs = [...vertex];
  }

  //   Получаем все отрисованные хексы
  getSvgArea(area) {
    this.svgArea = area;
  }

  getDomainsStack(domains) {
    this.stackDomains = domains;
  }

  handlerBtnRandom(ratio) {
    this.arrDomainsColor = [];
    this.randomRatio = ratio;
     this.isBtnAuto = !this.isBtnAuto;
    //   this.getInfoForTable();
    //  console.log(this.rowTable);
  }

  getInfo() {
    console.log(this.stackDomains.length);
  }
  //   getInfoForTable(row) {
  //    console.log(row)
  //     this.rowTable = row;
  //   }

  getGraphTree(arrTree) {
    this.arrGraphTree = arrTree;
  }

  getDomainColor(color) {
    this.arrDomainsColor.push(color);
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
    return result.map((elem) => {
      return elem.id;
    });
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
}

export default new DomainsStore();
