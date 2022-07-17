import { makeAutoObservable } from "mobx";

class hexCordinate {
  arrCoordinates = [];
  peakAndGroup = null;
  hexObj = null;

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

  //   Находим элементы - соседи хекса
  getHexGroup(hexGroup) {
    this.peakAndGroup = hexGroup;
  }

  addHexInDomen(hexDomain) {
    console.log(hexDomain);
  }
}

export default new hexCordinate();
