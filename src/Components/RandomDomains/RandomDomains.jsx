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

  // ID узла
  //   const nodeElemID = [];

  React.useEffect(() => {
    const ratio = toJS(hexCordinate.randomRatio);
    const collectionsHexs = toJS(hexCordinate.svgArea);
    const arrHexs = Array.from(collectionsHexs);

    arrHexs.forEach((elem) => {
      const hex = elem.firstChild;
      const hexTxt = elem.lastChild;

      // Сброс стилей хексов
      hex.style = { fill: null, fillOpacity: 0.3 };
      hexTxt.textContent = null;

      if (Math.random() <= ratio) {
        hexTxt.textContent = hex.id;
        arrElem.push(hex);
      }
    });
  }, [isRandom, arrElem]);

  React.useEffect(() => {
    arrElem.forEach((elemHex) => {
      const hexVert = Number(elemHex.getAttribute("vertical"));
      const hexHoriz = Number(elemHex.getAttribute("horizontal"));
      const hexID = Number(elemHex.id);
      elemHex.style.fill = "red";

      //  Ищем соседий элементов
      const nodeID = hexCordinate.getNeighborsHex(hexVert, hexHoriz);

      const peak = { id: hexID, group: nodeID };
      nodeCord.push(peak);
      // nodeElemID.push(hexID);
    });
  }, [arrElem, nodeCord]);

  React.useEffect(() => {
    let domainsArr = [];
    const colorGroup = hexCordinate.randomColor();
  }, [arrElem, nodeCord]);

  return <div></div>;
});

export default RandomDomains;
