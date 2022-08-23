import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import hexHandler from "../../store/hexHandler";

const SplitDomains = observer(() => {
  const arrVertexs = toJS(hexHandler.arrVertexs);

  React.useEffect(() => {
    //  Список смежности графа
    let adjacencyList = [];

    //  Стек всех найденных деревьев при рекрусии
    const arrSearchTree = [];

    //  Результируюший стек деревьев графа
    const resArrTree = [];

    // Формируем список смежности узлов
    function createAdjacencyList() {
      adjacencyList = [];
      for (let i = 0; i < arrVertexs.length; i++) {
        const prevID = arrVertexs[i].id;

        for (let j = i + 1; j < arrVertexs.length; j++) {
          const edges = arrVertexs[j].group;
          const currID = arrVertexs[j].id;

          if (edges.includes(prevID)) {
            adjacencyList.push([prevID, currID]);
          }
        }
      }
    }

    //Получаем связи подгрупп в общем графе
    function mainHexGraph(edges) {
      const nodeMap = {};

      edges.forEach((edge) => {
        let node1 = edge[0];
        let node2 = edge[1];

        if (!nodeMap[node1]) {
          nodeMap[node1] = [node2];
        } else {
          nodeMap[node1].push(node2);
        }

        if (!nodeMap[node2]) {
          nodeMap[node2] = [node1];
        } else {
          nodeMap[node2].push(node1);
        }
      });

      getNodesStart(nodeMap);
    }

    // Находим точки входов в графы
    function getNodesStart(nodeMap) {
      let hexGraph = [];
      let nodes = Object.keys(nodeMap);

      // Крутимся пока все вершины не обработаны
      while (true) {
        // Стартовая точка обхода графа - если не посещалась
        let startNode = +nodes.find((node) => !nodeMap[node].visited);
        if (isNaN(startNode)) break;
        hexGraph.push(depthFirstSearch(startNode, nodeMap));
      }
      return hexGraph;
    }

    //Собираем дерево графа
    function depthFirstSearch(startNode, nodeMap, domainGroup = []) {
      if (domainGroup.includes(startNode)) return domainGroup;

      //Добавляем стартовые точки
      domainGroup.push(startNode);

      // Помечаем пройденую вершину графа
      nodeMap[startNode].visited = true;

      // Рекрусивно обходим граф
      for (let i = 0; i < nodeMap[startNode].length; i++) {
        // Собираем узлы
        let linkNode = nodeMap[startNode][i];
        depthFirstSearch(linkNode, nodeMap, domainGroup);
      }
      arrSearchTree.push(domainGroup);
    }

    //  Удаляем дубликаты деревьев после рекрусии
    function removeDuplicatesTree(arrSearchTree) {
      const arrString = arrSearchTree.map((elem) => elem.join(","));
      const uniqueString = new Set(arrString);
      uniqueString.forEach((elem) => {
        const arrNum = elem.split(",").map((num) => {
          return Number(num);
        });
        resArrTree.push(arrNum);
      });
    }

    //  Вызываем цепочку построения доменов
    createAdjacencyList();
    mainHexGraph(adjacencyList);
    removeDuplicatesTree(arrSearchTree);
    hexHandler.getGraphTree(resArrTree);
  }, [arrVertexs]);

  return <div></div>;
});

export default SplitDomains;
