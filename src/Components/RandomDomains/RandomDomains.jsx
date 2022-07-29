import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import hexCordinate from "../../state/hexCordinate";

const RandomDomains = observer(() => {
  const isRandom = hexCordinate.isRandom;
  const ratio = 0.5;

  //   Массив элементов DOM
  const arrElem = [];

  //  обьект кординат вокруг узла
  const nodeCord = [];

  React.useEffect(() => {
    const collectionsHexs = toJS(hexCordinate.svgArea);
    const arrHexs = Array.from(collectionsHexs);

    arrHexs.forEach((elem) => {
      const hexGroup = Array.from(elem.children);

      // Сброс стилей хексов
      hexGroup[0].style = { fill: null, fillOpacity: 0.3 };
      // hexGroup[1].textContent = 0;
      if (Math.random() <= ratio) {
        arrElem.push(hexGroup[0]);
      }
    });
  }, [isRandom, arrElem]);

  React.useEffect(() => {
    // массив координат всей сетки
    const arrCoordinates = toJS(hexCordinate.arrCoordinates);

    arrElem.forEach((elemHex) => {
      const hexVert = Number(elemHex.getAttribute("vertical"));
      const hexHoriz = Number(elemHex.getAttribute("horizontal"));
      const hexID = Number(elemHex.id);

      //  Ищем соседий элементов
      // const result = arrCoordinates.filter((elem) => {
      //   return (
      //     (elem.horizontal === hexHoriz - 1 && elem.vertical === hexVert) ||
      //     (elem.horizontal === hexHoriz - 1 && elem.vertical === hexVert + 1) ||
      //     (elem.vertical === hexVert + 1 && elem.horizontal === hexHoriz) ||
      //     (elem.horizontal === hexHoriz + 1 && elem.vertical === hexVert) ||
      //     (elem.horizontal === hexHoriz + 1 && elem.vertical === hexVert - 1) ||
      //     (elem.vertical === hexVert - 1 && elem.horizontal === hexHoriz)
      //   );
      // });

      // const neighborsHex = hexCordinate.getNeighborsHex(hexVert, hexHoriz);

      const nodeID = hexCordinate.getNeighborsHex(hexVert, hexHoriz);

      // console.log(nodeID);

      // const nodeID = neighborsHex.map((elem) => {

      //    console.log(toJS(elem.id))
      //   return elem.id;
      // });

      const peak = { id: hexID, group: nodeID };
      nodeCord.push(peak);
    });

    //  console.log(nodeCord);
  }, [arrElem, nodeCord]);

  React.useEffect(() => {
    arrElem.forEach((el) => {
      el.style.fill = "red";
    });

    let domainsArr = [];

    arrElem.forEach((hex, index) => {
      const colorGroup = hexCordinate.randomColor();
      const hexID = Number(hex.id);
      const nodeID = nodeCord[index].group;
      // const intersectIndex = intesect(hexID);

      // console.log(hexID);
      // console.log("Индекс пересечения " + intersectIndex);

      const objDomain = {
        idDomain: colorGroup,
        id: [hexID],
        hexs: [hex],
        groupCord: [...nodeID],
      };

      // if (intersectIndex !== -1) {
      //   addSubDomain(hex, nodeID, intersectIndex, hexID);
      // } else {
      //   createDomen(objDomain);
      // }
      //  });

      //  Ищем пересечения в узлах, возврашаем индекс домена в общем стейте
      //  function intesect(hexID) {
      //    return domainsArr.findIndex((domain) => {
      //      return domain.groupCord.includes(hexID);
      //    });
      //  }

      //  Создаем новый домен
      //  function createDomen(objDomain) {
      //    domainsArr.push(objDomain);
      //  }

      //  Создаем субдомен
      //  function addSubDomain(hex, nodeID, index, hexID) {
      //    const colorDomain = domainsArr[index].idDomain;
      //    const oldState = domainsArr[index].groupCord;

      //    domainsArr[index].groupCord = [...new Set([...oldState, ...nodeID])];
      //    domainsArr[index].hexs.push(hex);
      //    domainsArr[index].id.push(hexID);

      //    domainsArr[index].hexs.forEach((elem) => {
      //      elem.style.fill = colorDomain;
      //      elem.style.fillOpacity = 0.8;
    });
    //  }

    //  console.log(domainsArr);
  }, [arrElem, nodeCord]);

  return <div></div>;
});

export default RandomDomains;
