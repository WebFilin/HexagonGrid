import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import hexCordinate from "../../state/hexCordinate";

const RandomDomains = observer(() => {
  const isRandom = hexCordinate.isRandom;
  const collectionsHexs = toJS(hexCordinate.svgArea);
  //   Массив элементов DOM
  const arrElem = [];

  React.useEffect(() => {
    const ratio = toJS(hexCordinate.randomRatio);

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
  }, [isRandom, arrElem, collectionsHexs]);

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
    const matrix = getMatrix(relationships);

    function getMatrix(edges) {
      // Матрица смежности
      const matrix = [];

      // Максимальная длинна матрицы
      const maxLength = collectionsHexs.length;

      for (let i = 0; i < maxLength; i++) {
        const row = [];

        for (let j = 0; j < maxLength; j++) {
          row.push(0);
        }
        matrix.push(row);
      }

      // Заполняем матрицу на пересечениях
      for (const [a, b] of edges) {
        matrix[a][b] = 1;
        matrix[b][a] = 1;
      }

      return matrix;
    }

    console.log(matrix);
  }, [arrElem, collectionsHexs]);

  return <div></div>;
});

export default RandomDomains;
