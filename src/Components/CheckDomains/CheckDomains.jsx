import React from "react";
import { toJS } from "mobx";
import domainsStore from "../../store/domainsStore";
import { observer } from "mobx-react-lite";

const CheckDomains = observer(() => {
  const arrVertexs = toJS(domainsStore.arrVertexs);

  React.useEffect(() => {
    // Подмножества графа
    const treesGraph = toJS(domainsStore.arrGraphTree);

    //  Узел выбранного хекса
    const nodeHex = toJS(domainsStore.hexVertex);

    //  Стек готовых доменов
    const arrDomains = [];

    //  Создаем домены по полученным графам автоматически
    if (treesGraph.length !== 0) {
      treesGraph.forEach((tree) => {
        arrDomains.push([...tree]);
      });
    }

    //  ОБрабатываем разбиение на домены
    function checkDomain(hexNode) {
      if (arrDomains.length === 0) {
        createDomain(hexNode);
      } else {
        checkSubDomain(hexNode);
      }
    }

    function checkSubDomain(hexNode) {
      // Получаем индекс домена в общем стейте
      const intersectIndex = arrDomains.findIndex((domain) => {
        return domain.some((id) => {
          return hexNode.group.includes(id);
        });
      });

      if (intersectIndex !== -1) {
        arrDomains[intersectIndex] = [
          ...new Set([...arrDomains[intersectIndex], hexNode.id]),
        ];
      } else {
        createDomain(hexNode);
      }
    }

    // Обрабатываем появление единичных доменов
    function handlerSingleNode() {
      const allNodeID = [];

      // Получаем все id из доменов
      arrDomains.forEach((node) => {
        allNodeID.push(...node);
      });

      // Ищем исключения
      const singleNode = arrVertexs.filter((node) => {
        if (!allNodeID.includes(node.id)) {
          return node;
        }
      });

      if (singleNode.length > 0) {
        singleNode.forEach((elem) => {
          createDomain(elem);
        });
      }
    }

    //  Создаем новый домен при клике
    function createDomain(hexID) {
      arrDomains.push([hexID.id]);
    }

    if (nodeHex !== null) {
      checkDomain(nodeHex);
    }

    handlerSingleNode();

    domainsStore.getDomainsStack(arrDomains);
  }, [arrVertexs]);

  return <div></div>;
});

export default CheckDomains;
