import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import hexHandler from "../../store/hexHandler";

const NotSimplyConnectDomain = observer(() => {
  // Кнопка авто
  const isRandom = hexHandler.isRandom;

  React.useEffect(() => {
    //   Все шестигранники сетки
    const arrCoordinates = toJS(hexHandler.arrCoordinates);

    // массив графов
    const arrGraphTree = toJS(hexHandler.arrGraphTree);

    const single = [];

    //  Получаем хексы вне доменов
    const hexOut = arrCoordinates.flat().filter((elem) => {
      return !arrGraphTree.includes(elem.id);
    });

    //  Все хексы с соседями по всем граням. Отсекаем карйнее хексы и входящие в домены
    const vertexHexOut = hexOut
      .map((elem) => {
        const hexVert = elem.vertical;
        const hexHoriz = elem.horizontal;
        const vertex = hexHandler.getNeighborsHex(hexVert, hexHoriz);
        const hexInDomain = !arrGraphTree.flat().includes(elem.id);

        if (hexInDomain && vertex.length === 6) {
          return { id: elem.id, vertex: [vertex] };
        }
      })
      .filter(Boolean);

    console.log(vertexHexOut);

    //  console.log(vertexHexOut);
    //  console.log(arrGraphTree);
  }, [isRandom]);

  return <div></div>;
});

export default NotSimplyConnectDomain;
