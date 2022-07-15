import { makeAutoObservable, toJS } from "mobx";

class hexCordinate {
  hexObj = null;
  arrCoordinates = [];
  hexGroup = null;

  constructor() {
    makeAutoObservable(this);
  }

  getHexGroup(checkHex) {
    const hexVert = Number(checkHex.getAttribute("vertical"));
    const hexHoriz = Number(checkHex.getAttribute("horizontal"));

    this.result = this.arrCoordinates.filter((elem) => {
      return (
        (elem.horizontal === hexHoriz - 1 && elem.vertical === hexVert) ||
        (elem.horizontal === hexHoriz - 1 && elem.vertical === hexVert + 1) ||
        (elem.vertical === hexVert + 1 && elem.horizontal === hexHoriz) ||
        (elem.horizontal === hexHoriz + 1 && elem.vertical === hexVert) ||
        (elem.horizontal === hexHoriz + 1 && elem.vertical === hexVert - 1) ||
        (elem.vertical === hexVert - 1 && elem.horizontal === hexHoriz)
      );
    });

    this.hexGroup = this.result;

    console.log(this.hexGroup);
    //  console.log(toJS(result));
  }
  getArrCoordinates(arrCord) {
    this.arrCoordinates = arrCord;
  }
}

export default new hexCordinate();
