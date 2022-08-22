import React from "react";
import { toJS } from "mobx";
import hexHandler from "../../store/hexHandler";

function CheckDomains(treeGraph) {
  const arrVertexs = toJS(hexHandler.arrVertexs);

  //  Стек готовых доменов
  const arrDomains = [];

  //  ОБрабатываем разбиение на домены
  function checkDomain(domainGroup) {
    if (arrDomains.length === 0) {
      createDomain(...domainGroup);
    } else {
      checkSubDomain(domainGroup);
    }
  }

  function createDomain(domainGroup) {
    // Структура одной группы в стеке доменов
    const objDomain = {
      idDomain: [domainGroup],
    };

    arrDomains.push(objDomain);
  }

  function checkSubDomain(domainGroup) {
    // Получаем индекс домена в общем стейте
    const intersect = arrDomains.findIndex((domain) => {
      return domain.idDomain.some((id) => {
        return domainGroup.includes(id);
      });
    });

    if (intersect !== -1) {
      const oldState = arrDomains[intersect].idDomain;

      arrDomains[intersect].idDomain = [
        ...new Set([...oldState, ...domainGroup]),
      ];
    } else {
      createDomain(...domainGroup);
    }
  }

  // Обрабатываем единичные домены
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
        createDomain(elem.id);
      });
    }
  }

  handlerSingleNode();
  return <div></div>;
}

export default CheckDomains;
