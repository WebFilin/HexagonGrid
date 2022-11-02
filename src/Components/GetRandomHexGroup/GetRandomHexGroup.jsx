import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import domainsStore from "../../store/DomainsStore";

const RandomDomains = observer(() => {
  // Кнопка авто
  const isBtnAuto = domainsStore.isBtnAuto;

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
      arrCordMainHex[31],
      //
    ];

    //  randomElem.push(...test);

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

    domainsStore.getVertexLinksRandom(arrNeighbors);
  }, [isBtnAuto]);

  return <></>;
});

export default RandomDomains;
