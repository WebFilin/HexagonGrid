import { makeAutoObservable } from "mobx";

class hexCordinate {
  arrCoordinates = [];
  hexGroup = [];
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
    this.hexGroup = hexGroup;
  }

  addHexInDomen(hexDomain) {
    console.log(hexDomain);
  }
}

export default new hexCordinate();
