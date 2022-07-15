import { makeAutoObservable } from "mobx";

class hexCordinate {
  hexObj = null;

  arrCoordinates = [];

  constructor() {
    makeAutoObservable(this);
  }

  getHex(clickObj) {
    console.log(clickObj);
  }

  getArrCoordinates(arrCord) {
    this.arrCoordinates = arrCord;
  }
}

export default new hexCordinate();
