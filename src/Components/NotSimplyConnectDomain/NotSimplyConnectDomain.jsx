import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import domainsStore from "../../store/domainsStore";
import infoTableStore from "../../store/infoTableStore";
const NotSimplyConnectDomain = observer(() => {
  const stackDomains = toJS(domainsStore.stackDomains);
  React.useEffect(() => {
    const arrHexRandom = toJS(domainsStore.arrVertexs);
    const arrCoordinates = toJS(domainsStore.arrCoordinates);

    //  Получаем массив для анализа повтора связей
    //  const arrFlatNeighbors = arrHexRandom
    //    .map((elem) => {
    //      return elem.group;
    //    })
    //    .flat();

    //  const arrRepeats = arrFlatNeighbors.reduce(function (acc, el) {
    //    acc[el] = (acc[el] || 0) + 1;
    //    return acc;
    //  }, {});

    //  console.log(arrRepeats);

    //  console.log(arrFlatNeighbors);

    //  console.log(arrCoordinates);

    const arrNeighborsGraph = [];

    //  Отсекаем меленькие домены
    stackDomains.map((elem) => {
      const domain = elem.idDomain;
      if (domain.length >= 6) {
        getNeighbors(domain);
      }
    });

    //  Получаем список соседей отсортированных графов
    function getNeighbors(domain) {
      const arrNeighbors = [];
      domain.map((idInDomain) => {
        return arrHexRandom.filter((elem) => {
          if (elem.id === idInDomain) {
            return arrNeighbors.push(elem);
          }
        });
      });
      arrNeighborsGraph.push(arrNeighbors);
    }

    console.log(arrNeighborsGraph);

    //  infoTableStore.getSumNonSimplyDomain("Таки да");
  }, [stackDomains]);

  React.useEffect(() => {
    //   Все шестигранники сетки
    //  const arrCoordinates = toJS(domainsStore.arrCoordinates);
    // массив графов
    //  const arrGraphTree = toJS(domainsStore.arrGraphTree);
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
    // console.log(vertexHexOut);
    // console.log(arrGraphTree);
  }, []);

  return <div></div>;
});

export default NotSimplyConnectDomain;
