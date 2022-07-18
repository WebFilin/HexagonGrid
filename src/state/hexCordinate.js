import { makeAutoObservable } from "mobx";

class hexCordinate {
  arrCoordinates = [];
  peakAndGroup = null;
  hexObj = null;
  arrDomains = [
    {
      idDomain: "red",
      hexId: [],
      groupCord: [21, 22, 29, 31, 38, 39],
    },
    {
      idDomain: "green",
      hexId: [],
      groupCord: [40, 50, 60],
    },
  ];

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

  createDomen(hexDomain) {
    this.arrDomains.push(hexDomain);
  }

  //   Добавляем ID состоявляющие домен, сортируем на уникальность
  addSubDomain(peakAndGroup) {
    //  console.log("Индекс элемента ");
    //  console.log(this.arrDomains[index]);

    const oldState = this.arrDomains[0].groupCord;
    const newState = peakAndGroup.group;

    this.arrDomains[0].hexId.push(peakAndGroup.hexId);
    //  this.arrDomains[0].groupCord = [...new Set(this.uniquIdHex)];
    this.arrDomains[0].groupCord = [...new Set([...oldState, ...newState])];

    console.log(this.arrDomains[0].groupCord);
  }
}

export default new hexCordinate();
