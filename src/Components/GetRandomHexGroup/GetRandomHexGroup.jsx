import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import domainsStore from "../../store/domainsStore";
import GetInfoRowForTable from "../GetInfoRowForTable/GetInfoRowForTable";
import CheckHexConnectDomains from "../CheckHexConnectDomains/CheckHexConnectDomains";

const RandomDomains = observer(() => {
  // Кнопка авто
  const isBtnRandom = domainsStore.isBtnRandom;

  //   Генерируем домены
  React.useEffect(() => {
    //   Коофициент рандома
    const ratio = toJS(domainsStore.randomRatio);

    // Стек элементов
    const randomElem = [];

    //   Массив соседий хексов
    const arrNeighbors = [];

    //Стек всех элементов сетки
    const arrCordMainHex = toJS(domainsStore.arrCoordinates);

    //  ! Тестовое убрать
    const test = [
      arrCordMainHex[8],
      arrCordMainHex[7],
      arrCordMainHex[9],
      arrCordMainHex[10],
      arrCordMainHex[15],
      arrCordMainHex[24],
      arrCordMainHex[33],
      arrCordMainHex[45],
      //
      arrCordMainHex[28],
      arrCordMainHex[19],
      //
      arrCordMainHex[37],
      arrCordMainHex[44],
      arrCordMainHex[43],
      arrCordMainHex[42],

      // arrCordMainHex[52],
      // arrCordMainHex[45],
      // arrCordMainHex[43],
      // arrCordMainHex[50],
      //
      arrCordMainHex[13],
      arrCordMainHex[21],
      arrCordMainHex[30],
      arrCordMainHex[39],
      arrCordMainHex[32],
      arrCordMainHex[23],
      arrCordMainHex[14],
      arrCordMainHex[41],
      arrCordMainHex[48],
      arrCordMainHex[49],

      //
    ];

    const test2 = [
      arrCordMainHex[8],
      arrCordMainHex[9],
      arrCordMainHex[18],
      arrCordMainHex[26],
      arrCordMainHex[25],
      arrCordMainHex[16],
      arrCordMainHex[19],
      arrCordMainHex[28],
      arrCordMainHex[36],
      arrCordMainHex[35],

      //
      arrCordMainHex[6],
      arrCordMainHex[5],
      arrCordMainHex[12],
      arrCordMainHex[21],
      arrCordMainHex[22],
      arrCordMainHex[14],

      //
      arrCordMainHex[56],
      arrCordMainHex[55],
      arrCordMainHex[47],
      arrCordMainHex[39],
      arrCordMainHex[40],
      arrCordMainHex[49],
    ];

   //   randomElem.push(...test2);
   //   randomElem.push(...test);

    arrCordMainHex.forEach((hexElem) => {
      if (Math.random() <= ratio) {
        randomElem.push(hexElem);
      }
    });

    randomElem.forEach((elemHex) => {
      // Получаем кординаты соседей
      const getNeighbors = domainsStore.getNeighborsHex(
        elemHex.vertical,
        elemHex.horizontal
      );
      // Добавляем обьект с вершинами и возможными связями в стек
      arrNeighbors.push({ id: elemHex.id, group: [...getNeighbors] });
    });

    domainsStore.getVertexLinks(arrNeighbors);
  }, [isBtnRandom]);

  return (
    <>
      <CheckHexConnectDomains isBtnRandom={isBtnRandom} />
      <GetInfoRowForTable isBtnRandom={isBtnRandom} />
    </>
  );
});

export default RandomDomains;
