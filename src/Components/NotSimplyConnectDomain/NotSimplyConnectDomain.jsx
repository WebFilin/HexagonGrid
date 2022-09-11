import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import DomainsStore from "../../store/DomainsStore";

const NotSimplyConnectDomain = observer(() => {
  // Кнопка авто
  const isRandom = DomainsStore.isRandom;

  React.useEffect(() => {
    //   Все шестигранники сетки
    const arrCoordinates = toJS(DomainsStore.arrCoordinates);

    // массив графов
    const arrGraphTree = toJS(DomainsStore.arrGraphTree);

    //  Все хексы не входящие в домены
    const vertexHexOut = arrCoordinates
      .map((elem) => {
        const hexVert = elem.vertical;
        const hexHoriz = elem.horizontal;
        const vertex = DomainsStore.getNeighborsHex(hexVert, hexHoriz);
        const hexOutDomain = !arrGraphTree.flat().includes(elem.id);

        if (hexOutDomain) {
          return { id: elem.id, vertex: [...vertex] };
        }
      })
      .filter(Boolean);

    //  console.log(vertexHexOut);
    //  console.log(arrGraphTree);
  }, [isRandom]);

  return <div></div>;
});

export default NotSimplyConnectDomain;
