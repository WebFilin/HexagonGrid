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
    this.arrHexGroup.push(hexGroup);
  }

  addHexInGrop(hex) {
    this.arrHexObj.push(hex);
  }

  removeHexInGrop(hex) {
    this.arrHexObj.pop(hex);
  }
}

export default new hexCordinate();
