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
    // ID узла
    const vertex = [];

    const arrHexID = [];

    //  Стек ребер графа
    const relationships = [];

    arrElem.forEach((elemHex) => {
      const hexVert = Number(elemHex.getAttribute("vertical"));
      const hexHoriz = Number(elemHex.getAttribute("horizontal"));
      const hexID = Number(elemHex.id);
      elemHex.style.fill = "red";

      //  Ищем соседий элементов
      const neighborsHexID = hexCordinate.getNeighborsHex(hexVert, hexHoriz);

      const peack = { id: hexID, group: [...neighborsHexID] };

      vertex.push(peack);
      arrHexID.push(hexID);

      checkEdges(hexID);
    });

    //  Получаем ребра графа
    function checkEdges(hexID) {
      vertex.forEach((elem) => {
        if (elem.group.includes(hexID)) {
          relationships.push([elem.id, hexID]);
        }
      });
    }

    //  Строим матрицу смежности
    const matrix = getMatrix(arrHexID, relationships);

    function getMatrix(nodes, edges) {
      const matrix = [];

      nodes.forEach(() => {
        const row = [];

        nodes.forEach(() => {
          row.push(0);
        });
        matrix.push(row);
      });

      for (const [a, b] of edges) {
        // console.log( matrix[a][b])

        //   console.log([a, b]);
        //   console.log(edges);
        //   console.log(matrix);

        //    matrix[a][b] = 1;
        //    matrix[b][a] = 1;

        if (matrix[(a, b)]) {
          matrix[a][b] = 1;
          matrix[b][a] = 1;
        }
      }

      // console.log(matrix);
      return matrix;
    }

    console.log(matrix);

    //  console.log(relationships);
    //  console.log(arrHexID);
  }, [arrElem, isRandom]);

  return <div></div>;
});

export default RandomDomains;
