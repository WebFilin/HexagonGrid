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
  const nodeElemID = [];

  React.useEffect(() => {
    const ratio = toJS(hexCordinate.randomRatio);
    const collectionsHexs = toJS(hexCordinate.svgArea);
    const arrHexs = Array.from(collectionsHexs);

    arrHexs.forEach((elem) => {
      const hexGroup = Array.from(elem.children);

      // Сброс стилей хексов
      hexGroup[0].style = { fill: null, fillOpacity: 0.3 };
      // hexGroup[1].textContent = null;
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

      // const peak = { id: hexID, group: nodeID };
      nodeCord.push(nodeID);
      nodeElemID.push(hexID);

      elemHex[0].style.fill = "red";
    });
  }, [arrElem, nodeCord, nodeElemID]);

  React.useEffect(() => {
    const arrResult = [];

   //  nodeCord.forEach((node) => {
   //    nodeElemID.forEach((id) => {
   //      const intersect = node.includes(id);

   //      if (intersect) {
       
   //       arrResult.push(id)
   //       // nodeCord.pop()


   //       //  console.log(id);
   //      }
   //    });
   //  });

   //  console.log(arrResult);

    //  let intersection = nodeElemID.filter((id) =>
    //    nodeCord.some((group) => group.includes(id))
    //  );

    //  console.log(intersection);

    // console.log(nodeCord)
    // console.log(nodeElemID)
  }, [nodeCord, nodeElemID]);

  return <div></div>;
});

export default RandomDomains;
