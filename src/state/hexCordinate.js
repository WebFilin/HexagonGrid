import { makeAutoObservable, toJS } from "mobx";

class hexCordinate {
  hexObj = null;
  arrCoordinates = [];
  hexGroup = null;

  constructor() {
    makeAutoObservable(this);
  }

  getHexGroup(checkHex) {
    this.hexVert = Number(checkHex.getAttribute("vertical"));
    this.hexHoriz = Number(checkHex.getAttribute("horizontal"));

    this.result = this.arrCoordinates.filter((elem) => {
      return (
        (elem.horizontal === this.hexHoriz - 1 &&
          elem.vertical === this.hexVert) ||
        (elem.horizontal === this.hexHoriz - 1 &&
          elem.vertical === this.hexVert + 1) ||
        (elem.vertical === this.hexVert + 1 &&
          elem.horizontal === this.hexHoriz) ||
        (elem.horizontal === this.hexHoriz + 1 &&
          elem.vertical === this.hexVert) ||
        (elem.horizontal === this.hexHoriz + 1 &&
          elem.vertical === this.hexVert - 1) ||
        (elem.vertical === this.hexVert - 1 &&
          elem.horizontal === this.hexHoriz)
      );
    });

    this.hexGroup = this.result;
  }
  getArrCoordinates(arrCord) {
    this.arrCoordinates = arrCord;
  }
}

export default new hexCordinate();
