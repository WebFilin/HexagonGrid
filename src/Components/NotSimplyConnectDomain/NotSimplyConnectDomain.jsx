import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import hexHandler from "../../store/hexHandler";

const NotSimplyConnectDomain = observer(() => {
  // Кнопка авто
  const isRandom = hexHandler.isRandom;

  // массив графов
  const arrGraphTree = toJS(hexHandler.arrGraphTree);

  React.useEffect(() => {
    //   Все шестигранники сетки
    const arrCoordinates = toJS(hexHandler.arrCoordinates);

    const single = [];

    //  Получаем хексы вне доменов
    const hexOut = arrCoordinates.flat().filter((elem) => {
      return !arrGraphTree.includes(elem.id);
    });

    //  Все элементы с соседями по всем граням. Отсекаем карйнее хексы
    const vertexHexOut = hexOut
      .map((elem) => {
        const hexVert = elem.vertical;
        const hexHoriz = elem.horizontal;
        const vertex = hexHandler.getNeighborsHex(hexVert, hexHoriz);

        const graphFlat = arrGraphTree.flat();

        if (!graphFlat.includes(elem.id) && vertex.length === 6) {
          return { id: elem.id, edges: [...vertex] };
        }
      })
      .filter(Boolean);

    console.log(vertexHexOut);

    //  console.log(vertexHexOut);
    //  console.log(arrGraphTree);
  }, [isRandom, arrGraphTree]);

  return <div></div>;
});

export default NotSimplyConnectDomain;
