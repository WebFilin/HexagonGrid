import React from "react";
import { toJS } from "mobx";
import DomainsStore from "../../store/DomainsStore";
import { observer } from "mobx-react-lite";

const CheckDomains = observer(() => {
  const arrVertexs = toJS(DomainsStore.arrVertexs);

  React.useEffect(() => {
    // Подмножества графа
    const treesGraph = toJS(DomainsStore.arrGraphTree);

    //  Узел выбранного хекса
    const nodeHex = toJS(DomainsStore.hexVertex);

    //  Стек готовых доменов
    const arrDomains = [];

    //  Создаем домены по полученным графам автоматически
    if (treesGraph.length !== 0) {
      treesGraph.map((tree) => {
        const objDomain = {
          idDomain: [...tree],
        };

        arrDomains.push(objDomain);
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
      const intersect = arrDomains.findIndex((domain) => {
        return domain.idDomain.some((id) => {
          return hexNode.group.includes(id);
        });
      });

      if (intersect !== -1) {
        const oldState = arrDomains[intersect].idDomain;

        arrDomains[intersect].idDomain = [
          ...new Set([...oldState, hexNode.id]),
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
        allNodeID.push(...node.idDomain);
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
      const objDomain = {
        idDomain: [hexID.id],
      };
      arrDomains.push(objDomain);
    }

    if (nodeHex !== null) {
      checkDomain(nodeHex);
    }
    handlerSingleNode();

    DomainsStore.getDomainsStack(arrDomains);
  }, [arrVertexs]);

  return <div></div>;
});

export default CheckDomains;
