import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import hexCordinate from "../../state/hexCordinate";

const RandomDomains = observer(() => {
  // Кнопка авто
  const isRandom = hexCordinate.isRandom;

  //   Генерируем домены
  React.useEffect(() => {
    //   Коофициент рандома
    const ratio = toJS(hexCordinate.randomRatio);

    // Стек элементов
    const randomElem = [];

    //   Массив соседий хексов
    const arrNeighbors = [];

    //Стек всех элементов сетки
    const arrCordMainHex = toJS(hexCordinate.arrCoordinates);

    arrCordMainHex.forEach((hexElem) => {
      if (Math.random() <= ratio) {
        randomElem.push(hexElem);
      }
    });

    randomElem.forEach((elemHex) => {
      // Получаем кординаты соседей
      const getNeighbors = hexCordinate.getNeighborsHex(
        elemHex.vertical,
        elemHex.horizontal
      );
      // Добавляем обьект с вершинами и возможными связями в стек
      arrNeighbors.push({ id: elemHex.id,  group: [...getNeighbors] });
    });

    hexCordinate.getVertexLinks(arrNeighbors);
  }, [isRandom]);

 

  return <div></div>;
});

export default RandomDomains;
