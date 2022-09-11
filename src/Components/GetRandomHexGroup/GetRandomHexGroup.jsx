import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import DomainsStore from "../../store/DomainsStore";

const RandomDomains = observer(() => {
  // Кнопка авто
  const isRandom = DomainsStore.isRandom;

  //   Генерируем домены
  React.useEffect(() => {
    //   Коофициент рандома
    const ratio = toJS(DomainsStore.randomRatio);

    // Стек элементов
    const randomElem = [];

    //   Массив соседий хексов
    const arrNeighbors = [];

    //Стек всех элементов сетки
    const arrCordMainHex = toJS(DomainsStore.arrCoordinates);

    arrCordMainHex.forEach((hexElem) => {
      if (Math.random() <= ratio) {
        randomElem.push(hexElem);
      }
    });

    //  ! Тестовое убрать
    //  randomElem.push(
    //    arrCordMainHex[8],
    //    arrCordMainHex[9],
    //    arrCordMainHex[10],
    //    arrCordMainHex[11],
    //    arrCordMainHex[16],
    //    arrCordMainHex[25],
    //    arrCordMainHex[11],
    //    arrCordMainHex[16],
    //    arrCordMainHex[25],
    //    arrCordMainHex[34],
    //    arrCordMainHex[35],
    //    arrCordMainHex[36],
    //    arrCordMainHex[28],
    //    arrCordMainHex[19],

    // Второй домен
    //    arrCordMainHex[13],
    //    arrCordMainHex[21],
    //    arrCordMainHex[30],
    //    arrCordMainHex[39],
    //    arrCordMainHex[32],
    //    arrCordMainHex[23],
    //    arrCordMainHex[14],
    //    arrCordMainHex[41],
    //    arrCordMainHex[48],
    //    arrCordMainHex[56]
    //  );

    randomElem.forEach((elemHex) => {
      // Получаем кординаты соседей
      const getNeighbors = DomainsStore.getNeighborsHex(
        elemHex.vertical,
        elemHex.horizontal
      );
      // Добавляем обьект с вершинами и возможными связями в стек
      arrNeighbors.push({ id: elemHex.id, group: [...getNeighbors] });
    });

    DomainsStore.getVertexLinks(arrNeighbors);
  }, [isRandom]);

  return <div></div>;
});

export default RandomDomains;
