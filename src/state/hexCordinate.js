import { makeAutoObservable } from "mobx";

class hexCordinate {
  arrHexObj = [];
  arrCoordinates = [];
  arrHexGroup = [];
  hexObj = "";

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
    this.arrHexGroup = hexGroup;
  }
}

export default new hexCordinate();
