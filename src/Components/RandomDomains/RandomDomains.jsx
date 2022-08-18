import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import hexCordinate from "../../state/hexCordinate";

const RandomDomains = observer(() => {
  const isRandom = hexCordinate.isRandom;

  //   Массив элементов для построения графов
  const arrElemGraph = [];

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

        //   !Визуальная отметка - удалить
        hex.style.fill = "red";
        arrElemGraph.push(hex);
      }
    });
  }, [isRandom, arrElemGraph]);

  React.useEffect(() => {
    //  Стек вершин графа
    const vertex = [];

    //  Ребра графа
    const edgesGraph = [];

    arrElemGraph.forEach((elemHex) => {
      const hexVert = Number(elemHex.getAttribute("vertical"));
      const hexHoriz = Number(elemHex.getAttribute("horizontal"));
      const hexID = Number(elemHex.id);

      // Получаем кординаты соседей
      const getNeighbors = hexCordinate.getNeighborsHex(hexVert, hexHoriz);
      // Добавляем обьект с вершинами и возможными связями в стек
      vertex.push({ id: hexID, edges: [...getNeighbors] });
    });

    //  Получаем только ребра графа
    while (vertex.length > 0) {
      const node = vertex.shift();

      vertex.forEach((elem) => {
        if (elem.edges.includes(node.id)) {
          const edges = [node.id, elem.id];
          edgesGraph.push(edges);
        }
      });
    }

    //  Формируем общий граф сетки
    function mainHexGraph(edges) {
      let nodeMap = {};

      //Динамически получаем связи узлов в общем графе
      edges.forEach((edge) => {
        let node1 = edge[0];
        let node2 = edge[1];

        if (!nodeMap[node1]) nodeMap[node1] = [node2];
        else nodeMap[node1].push(node2);

        if (!nodeMap[node2]) nodeMap[node2] = [node1];
        else nodeMap[node2].push(node1);
      });

      getNodesStart(nodeMap);
    }

    //  Точки входов в графы
    function getNodesStart(nodeMap) {
      let hexGraph = [];
      let nodes = Object.keys(nodeMap);

      // Крутимся пока все вершины не обработаны
      while (true) {
        // Стартовая точка обхода графа
        let startNode = +nodes.find((node) => !nodeMap[node].visited);
        //   Выходим если все вершины пройдены
        if (isNaN(startNode)) break;

        hexGraph.push(depthFirstSearch(startNode, nodeMap));
      }

      return hexGraph;
    }

    //Динамически собираем связанное дерево одного графа
    function depthFirstSearch(startNode, nodeMap, domainsGroup = []) {
      if (domainsGroup.includes(startNode)) return domainsGroup;

      //Динамически собираем дерево графа
      domainsGroup.push(startNode);

      // Помечаем пройденую вершину графа
      nodeMap[startNode].visited = true;

      // Рекрусивно обходим граф
      for (let i = 0; i < nodeMap[startNode].length; i++) {
        // Собираем узлы
        let connectedNode = nodeMap[startNode][i];
        depthFirstSearch(connectedNode, nodeMap, domainsGroup);
      }
    }
    mainHexGraph(edgesGraph);
  }, [arrElemGraph]);

  return <div></div>;
});

export default RandomDomains;
