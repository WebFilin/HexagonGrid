import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import hexHandler from "../../store/hexHandler";

const RandomDomains = observer(() => {
  // Кнопка авто
  const isRandom = hexHandler.isRandom;

  //   Генерируем домены
  React.useEffect(() => {
    //   Коофициент рандома
    const ratio = toJS(hexHandler.randomRatio);

    // Стек элементов
    const randomElem = [];

    //   Массив соседий хексов
    const arrNeighbors = [];

    //Стек всех элементов сетки
    const arrCordMainHex = toJS(hexHandler.arrCoordinates);

    arrCordMainHex.forEach((hexElem) => {
      if (Math.random() <= ratio) {
        randomElem.push(hexElem);
      }
    });

    randomElem.forEach((elemHex) => {
      // Получаем кординаты соседей
      const getNeighbors = hexHandler.getNeighborsHex(
        elemHex.vertical,
        elemHex.horizontal
      );
      // Добавляем обьект с вершинами и возможными связями в стек
      arrNeighbors.push({ id: elemHex.id,  group: [...getNeighbors] });
    });

    hexHandler.getVertexLinks(arrNeighbors);
  }, [isRandom]);

 

  return <div></div>;
});

export default RandomDomains;
