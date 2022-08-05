import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import hexCordinate from "../../state/hexCordinate";

const RandomDomains = observer(() => {
  const isRandom = hexCordinate.isRandom;

  //   Массив элементов DOM
  const arrElem = [];

  React.useEffect(() => {
    const ratio = toJS(hexCordinate.randomRatio);
    const collectionsHexs = toJS(hexCordinate.svgArea);
    const arrHexs = Array.from(collectionsHexs);

    arrHexs.forEach((elem) => {
      const hex = elem.firstChild;
      const hexTxt = elem.lastChild;

      // Сброс стилей хексов
      hex.style = { fill: null, fillOpacity: 0.3 };
      // hexTxt.textContent = null;

      if (Math.random() <= ratio) {
        //   hexTxt.textContent = hex.id;
        arrElem.push(hex);
      }
    });
  }, [isRandom, arrElem]);

  React.useEffect(() => {
    //  обьект кординат вокруг узла
    const nodeRelationships = [];

    // ID узла
    const vertexID = [];
    const colorGroup = hexCordinate.randomColor();

    arrElem.forEach((elemHex) => {
      const hexVert = Number(elemHex.getAttribute("vertical"));
      const hexHoriz = Number(elemHex.getAttribute("horizontal"));
      const hexID = Number(elemHex.id);
      elemHex.style.fill = "red";

      //  Ищем соседий элементов
      const relationships = hexCordinate.getNeighborsHex(hexVert, hexHoriz);

      nodeRelationships.push(relationships);
      vertexID.push(hexID);
    });

    console.log(nodeRelationships);
    console.log(vertexID);
  }, [arrElem]);

  return <div></div>;
});

export default RandomDomains;
