import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import domainsStore from "../../store/domainsStore";
import infoTableStore from "../../store/infoTableStore";
const NotSimplyConnectDomain = observer(() => {
  // Тригер для статистики - количество рандомных элементов
  //   const sumRandomID = infoTableStore.sumRandomID;
  const stackDomains = toJS(domainsStore.stackDomains);
  React.useEffect(() => {
   
    // Перебираем стетй доменов
     stackDomains.forEach((domain) => {
       const domainValue = domain.idDomain;

       // Отсекаем мелкие домены
       if (domainValue.length >= 6) {
         getNeighborsGraph(domainValue);
       }
     });

     //  Ищем соседей хексов в домене
     function getNeighborsGraph(domainValue) {
       console.log(domainValue);

       const stakNeighborsGraph = domainValue.map((id) => {
       });
     }

    //  infoTableStore.getSumNonSimplyDomain("Таки да");
  }, [stackDomains]);

  React.useEffect(() => {
    //   Все шестигранники сетки
    const arrCoordinates = toJS(domainsStore.arrCoordinates);

    // массив графов
    const arrGraphTree = toJS(domainsStore.arrGraphTree);

    //  Все хексы не входящие в домены
    const vertexHexOut = arrCoordinates
      .map((elem) => {
        const hexVert = elem.vertical;
        const hexHoriz = elem.horizontal;
        const vertex = domainsStore.getNeighborsHex(hexVert, hexHoriz);
        const hexOutDomain = !arrGraphTree.flat().includes(elem.id);

        if (hexOutDomain) {
          return { id: elem.id, vertex: [...vertex] };
        }
      })
      .filter(Boolean);

    // console.log(vertexHexOut);
    // console.log(arrGraphTree);
  }, []);

  //   React.useEffect(() => {
  //     //  console.log(stackDomains);

  //
  //   }, [stackDomains]);

  return <div></div>;
});

export default NotSimplyConnectDomain;
