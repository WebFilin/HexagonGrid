import React from "react";
import { toJS } from "mobx";
import DomainsStore from "../../store/DomainsStore";
import { observer } from "mobx-react-lite";

const CheckDomains = observer(() => {
  const arrVertexs = toJS(DomainsStore.arrVertexs);

  React.useEffect(() => {
    // Подмножества графа - сгрупированные домены
    const treesGraph = toJS(DomainsStore.arrGraphTree);

    const allNodeID = treesGraph.flat();

    //  Одиночные домены
    const singleDomains = [];

    // Ищем исключения
    arrVertexs.filter(({ id }) => {
      return !allNodeID.includes(id) ? singleDomains.push([id]) : false;
    });

    // Передаем стек всех доменов, с множеством элементов в графе так и одиночных
    DomainsStore.getDomainsStack([...singleDomains, ...treesGraph]);
  }, [arrVertexs]);

  return <></>;
});

export default CheckDomains;
