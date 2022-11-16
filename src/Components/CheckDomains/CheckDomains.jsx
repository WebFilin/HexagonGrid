import React from "react";
import { toJS } from "mobx";
import DomainsStore from "../../store/DomainsStore";
import { observer } from "mobx-react-lite";

const CheckDomains = observer(() => {
  const arrVertexs = toJS(DomainsStore.arrVertexs);

  React.useEffect(() => {
    // Подмножества графа
    const treesGraph = toJS(DomainsStore.arrGraphTree);

    //  Стек готовых доменов
    const arrDomains = [...treesGraph];

    // Обрабатываем появление единичных доменов
    function handlerSingleNode() {
      const allNodeID = arrDomains.flat();

      // Ищем исключения
      arrVertexs.filter(({ id }) => {
        if (!allNodeID.includes(id)) {
          //  Создаем новый домен
          arrDomains.push([id]);
        }
      });
    }

    handlerSingleNode();
    DomainsStore.getDomainsStack(arrDomains);
  }, [arrVertexs]);

  return <></>;
});

export default CheckDomains;
