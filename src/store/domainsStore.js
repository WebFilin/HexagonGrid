import { makeAutoObservable } from "mobx";

class DomainsStore {
  arrCoordinates = [];
  arrVertexs = [];
  hexVertex = null;
  hexClick = null;
  arrGraphTree = [];
  stackDomains = [];
  stackDomainsColor = [];
  svgArea = [];
  isCreateMainHex = false;
  randomRatio = 0;
  hexSideSize = {
    L: 3,
    M: 5,
    N: 7,
  };
  isBtnAuto = false;
  sumNonSingleLinkedDomain = 0;
  stackTable = [];
  isLoader = false;

  constructor() {
    makeAutoObservable(this);
  }

  //   Управляем сторонами общей сетки
  getHexSideSize(valueL, valueN, valueM) {
    this.hexSideSize.L = valueL;
    this.hexSideSize.M = valueM;
    this.hexSideSize.N = valueN;
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
  handlerClickHex(checkHex) {
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
    this.handlerDomainColor();
  }

  handlerBtnAuto(ratio) {
    this.stackDomainsColor = [];
    this.randomRatio = ratio;
    this.isBtnAuto = !this.isBtnAuto;
  }

  getNonLinkedDomains(nonLinked) {
    this.sumNonSingleLinkedDomain = nonLinked;
  }

  handlerInfoTable(tableRow) {
    if (this.stackDomains.length > 0) {
      if (this.stackTable.length < 10) {
        this.stackTable.push(tableRow);
      } else {
        this.stackTable.shift();
        this.stackTable.push(tableRow);
      }
    }
  }

  getGraphTree(arrTree) {
    this.arrGraphTree = arrTree;
  }

  handlerDomainColor() {
    this.stackDomains.forEach((elem, index) => {
      const checkColor = this.stackDomainsColor.findIndex(({ id }) => {
        return id === index;
      });

      if (checkColor === -1) {
        this.stackDomainsColor.push({ id: index, color: this.createColor() });
      }
    });
  }

  handlerLoader(value) {
    this.isLoader = value;
  }

  //   Поиск соседий хекса
  getNeighborsHex(hexVert, hexHoriz) {
    const stackID = [];

    this.arrCoordinates.filter(({ id, horizontal, vertical }) => {
      if (
        (horizontal === hexHoriz - 1 && vertical === hexVert) ||
        (horizontal === hexHoriz - 1 && vertical === hexVert + 1) ||
        (vertical === hexVert + 1 && horizontal === hexHoriz) ||
        (horizontal === hexHoriz + 1 && vertical === hexVert) ||
        (horizontal === hexHoriz + 1 && vertical === hexVert - 1) ||
        (vertical === hexVert - 1 && horizontal === hexHoriz)
      ) {
        stackID.push(id);
      }
    });

    return stackID;
  }

  //   Удаляем хекс при клике по нему
  handlerRemoveID(hex) {
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

  createColor() {
    return (
      "#" +
      (Math.random().toString(16) + "000000").substring(2, 8).toUpperCase()
    );
  }
}

export default new DomainsStore();
