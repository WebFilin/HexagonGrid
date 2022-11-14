import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import DomainsStore from "../../store/DomainsStore";

const RandomDomains = observer(() => {
  const isBtnAuto = DomainsStore.isBtnAuto;

  //   Генерируем хексы
  React.useEffect(() => {
    //   Коофициент рандома
    const ratio = toJS(DomainsStore.randomRatio);

    //Стек всех элементов сетки
    const arrCordMainHex = toJS(DomainsStore.arrCoordinates);

    // Стек элементов
    const randomElem = arrCordMainHex
      .map((hexElem) => {
        return Math.random() <= ratio ? hexElem : null;
      })
      .filter(Boolean);

    // Стек готовых узлов
    const arrNeighbors = randomElem.map(({ id, vertical, horizontal }) => {
      // Получаем кординаты соседей
      const getNeighbors = DomainsStore.getNeighborsHex(vertical, horizontal);

      // Добавляем обьект с вершинами и возможными связями в стек
      return { id: id, group: [...getNeighbors] };
    });

    DomainsStore.getVertexLinksRandom(arrNeighbors);
  }, [isBtnAuto]);

  return <></>;
});

export default RandomDomains;
