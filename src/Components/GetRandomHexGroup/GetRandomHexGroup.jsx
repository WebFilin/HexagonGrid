import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import DomainsStore from "../../store/DomainsStore";

const GetRandomHexGroup = observer(() => {
  const isBtnAuto = DomainsStore.isBtnAuto;

  //   Генерируем хексы
  React.useEffect(() => {
    //   Коофициент рандома
    const ratio = toJS(DomainsStore.randomRatio);

    //Стек всех элементов сетки
    const arrCordMainHex = toJS(DomainsStore.arrCoordinates);

    const arrNeighbors = arrCordMainHex
      .map(({ id, vertical, horizontal }) => {
        if (Math.random() <= ratio) {
          const getNeighbors = DomainsStore.getNeighborsHex(
            vertical,
            horizontal
          );
          return { id: id, group: [...getNeighbors] };
        }
      })
      .filter(Boolean);

    DomainsStore.getVertexLinksRandom(arrNeighbors);
  }, [isBtnAuto]);

  return <></>;
});

export default GetRandomHexGroup;
