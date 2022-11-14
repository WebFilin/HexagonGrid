import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import DomainsStore from "../../store/DomainsStore";

const RandomDomains = observer(() => {
  // Кнопка авто
  const isBtnAuto = DomainsStore.isBtnAuto;

  //   Генерируем хексы
  React.useEffect(() => {
    //   Коофициент рандома
    const ratio = toJS(DomainsStore.randomRatio);

    // Стек элементов
    const randomElem = [];

    // Стек готовых узлов
    const arrNeighbors = [];

    //Стек всех элементов сетки
    const arrCordMainHex = toJS(DomainsStore.arrCoordinates);

    arrCordMainHex.forEach((hexElem) => {
      if (Math.random() <= ratio) {
        randomElem.push(hexElem);
      }
    });
    randomElem.forEach((elemHex) => {
      // Получаем кординаты соседей
      const getNeighbors = DomainsStore.getNeighborsHex(
        elemHex.vertical,
        elemHex.horizontal
      );
      // Добавляем обьект с вершинами и возможными связями в стек
      arrNeighbors.push({ id: elemHex.id, group: [...getNeighbors] });
    });

    DomainsStore.getVertexLinksRandom(arrNeighbors);
  }, [isBtnAuto]);

  return <></>;
});

export default RandomDomains;
