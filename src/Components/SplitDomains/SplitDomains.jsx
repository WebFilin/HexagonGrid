import React from "react";
import hexCordinate from "../../state/hexCordinate";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

const SplitDomains = observer(() => {
  const treeGraph = toJS(hexCordinate.treeGraph);
  React.useEffect(() => {
    const arrVertexRandom = toJS(hexCordinate.vertexLinksRandom);
    const arrVertexClick = toJS(hexCordinate.vertexLinksClick);
    const allVertex = [...arrVertexRandom, ...arrVertexClick];

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
      const colorGroup = hexCordinate.randomColor();

      // Структура одной группы в стеке доменов
      const objDomain = {
        colorDomain: colorGroup,
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
      const singleNode = allVertex.filter((node) => {
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

    checkDomain(treeGraph);
    handlerSingleNode();

    console.log(arrDomains);

    const collectionsHexs = toJS(hexCordinate.svgArea);
    const arrHexs = Array.from(collectionsHexs);

    arrHexs.forEach((hexElem) => {
      const hex = hexElem.firstChild;
      const hexTxt = hexElem.lastChild;
      const id = Number(hex.id);

      // Сброс стилей хексов
      hex.style = { fill: null, fillOpacity: 0.3 };
      // hexTxt.textContent = null;

      arrDomains.forEach((elem) => {
        if (elem.idDomain.includes(id)) {
          hex.style.fill = elem.colorDomain;
          hex.style.fillOpacity = 0.8;
          //  hexTxt.textContent = 1;
        }
      });
    });
  }, [treeGraph]);

  return <div></div>;
});

export default SplitDomains;
