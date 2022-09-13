import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import domainsStore from "../../store/domainsStore";
import infoTableStore from "../../store/infoTableStore";
const NotSimplyConnectDomain = observer(() => {
  // Кнопка авто
  const isRandom = domainsStore.isBtnRandom;

  React.useEffect(() => {
    // массив графов
    const arrGraphTree = toJS(domainsStore.arrGraphTree);
    infoTableStore.getSumNonSimplyDomain();
    console.log(arrGraphTree);
  }, [isRandom]);

  //   React.useEffect(() => {
  //   Все шестигранники сетки
  //  const arrCoordinates = toJS(domainsStore.arrCoordinates);

  //  const  startNodeGraph = toJS(domainsStore.arrStartNodeGraph)

  //  Все хексы не входящие в домены
  //  const vertexHexOut = arrCoordinates
  //    .map((elem) => {
  //      const hexVert = elem.vertical;
  //      const hexHoriz = elem.horizontal;
  //      const vertex = domainsStore.getNeighborsHex(hexVert, hexHoriz);
  //      const hexOutDomain = !arrGraphTree.flat().includes(elem.id);

  //      if (hexOutDomain) {
  //        return { id: elem.id, vertex: [...vertex] };
  //      }
  //    })
  //    .filter(Boolean);

  //  console.log(vertexHexOut);
  //  console.log(arrGraphTree);
  //   }, [isRandom]);

  return <div></div>;
});

export default NotSimplyConnectDomain;
