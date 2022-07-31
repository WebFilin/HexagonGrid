import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import hexCordinate from "../../state/hexCordinate";

const RandomDomains = observer(() => {
  const isRandom = hexCordinate.isRandom;

  //   Массив элементов DOM
  const arrElem = [];

  //  обьект кординат вокруг узла
  const nodeCord = [];

  React.useEffect(() => {
    const ratio = toJS(hexCordinate.randomRatio);
    const collectionsHexs = toJS(hexCordinate.svgArea);
    const arrHexs = Array.from(collectionsHexs);

    arrHexs.forEach((elem) => {
      const hexGroup = Array.from(elem.children);

      // Сброс стилей хексов
      hexGroup[0].style = { fill: null, fillOpacity: 0.3 };
      hexGroup[1].textContent = null;
      if (Math.random() <= ratio) {
        arrElem.push(hexGroup);
      }
    });
  }, [isRandom, arrElem]);

  React.useEffect(() => {
    arrElem.forEach((elemHex) => {
      const hexVert = Number(elemHex[0].getAttribute("vertical"));
      const hexHoriz = Number(elemHex[0].getAttribute("horizontal"));
      const hexID = Number(elemHex[0].id);

      //  Ищем соседий элементов
      const nodeID = hexCordinate.getNeighborsHex(hexVert, hexHoriz);

      const peak = { id: hexID, group: nodeID };
      nodeCord.push(peak);
    });
  }, [arrElem, nodeCord]);

  React.useEffect(() => {
    let domainsArr = [];

    arrElem.forEach((hex, index) => {
      const colorGroup = hexCordinate.randomColor();
      const hexID = Number(hex[0].id);
      const nodeID = nodeCord[index].group;
      const intersectIndex = intesect(hexID);

      const objDomain = {
        idDomain: colorGroup,
        id: [hexID],
        hexs: [hex],
        groupCord: [...nodeID],
      };

      if (intersectIndex !== -1) {
        addSubDomain(hex, nodeID, intersectIndex, hexID);
      } else {
        createDomen(objDomain);
      }
    });

    //  Ищем пересечения в узлах, возврашаем индекс домена в общем стейте
    function intesect(hexID) {
      return domainsArr.findIndex((domain) => {
        return domain.groupCord.includes(hexID);
      });
    }

    //  Создаем новый домен
    function createDomen(objDomain) {
      domainsArr.push(objDomain);
    }

    //  Создаем субдомен
    function addSubDomain(hex, nodeID, index, hexID) {
      const colorDomain = domainsArr[index].idDomain;
      const oldState = domainsArr[index].groupCord;

      domainsArr[index].groupCord = [...new Set([...oldState, ...nodeID])];
      domainsArr[index].hexs.push(hex);
      domainsArr[index].id.push(hexID);

      domainsArr[index].hexs.forEach((elem) => {
        elem[0].style.fill = colorDomain;
        elem[0].style.fillOpacity = 0.8;
        elem[1].textContent = 1;
      });
    }
  }, [arrElem, nodeCord]);

  return <div></div>;
});

export default RandomDomains;
