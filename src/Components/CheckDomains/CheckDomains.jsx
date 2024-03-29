import React from "react";
import { toJS } from "mobx";
import DomainsStore from "../../Store/DomainsStore";
import { observer } from "mobx-react-lite";

const CheckDomains = observer(() => {
  const arrVertexs = toJS(DomainsStore.arrVertexs);

  React.useEffect(() => {
    // Подмножества графа - сгрупированные домены
    const treesGraph = toJS(DomainsStore.arrGraphTree);

    //  Одиночные домены
    const singleDomains = [];

    // Ищем исключения
    arrVertexs.filter(({ id }) => {
      return !treesGraph.flat().includes(id) ? singleDomains.push([id]) : false;
    });

    // Передаем стек всех доменов, с множеством элементов в графе так и одиночных
    const allDomains = [...singleDomains, ...treesGraph];

    //  Преключаем прелоадер
    DomainsStore.getDomainsStack(allDomains);
    DomainsStore.handlerLoader(false);
  }, [arrVertexs]);

  return <></>;
});

export default CheckDomains;
