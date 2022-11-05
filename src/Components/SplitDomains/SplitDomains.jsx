import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import domainsStore from "../../store/DomainsStore";

const SplitDomains = observer(() => {
  const arrVertexs = toJS(domainsStore.arrVertexs);

  React.useEffect(() => {
    //  Список смежности графа
    let adjacencyList = [];

    //  Стек всех найденных деревьев при рекрусии
    const arrSearchTree = new Set();

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
      const nodes = Object.keys(nodeMap);

      while (true) {
        // Стартовая точка обхода графа - если не посещалась
        const startNode = Number(nodes.find((node) => !nodeMap[node].visited));

        if (isNaN(startNode)) break;
        createGraph(startNode, nodeMap);
      }
    }

    //Собираем дерево графа
    function createGraph(startNode, nodeMap, domainGroup = []) {
      if (domainGroup.includes(startNode)) return domainGroup;

      //Добавляем стартовую точку
      domainGroup.push(startNode);

      // Помечаем пройденую вершину графа
      nodeMap[startNode].visited = true;

      // обходим граф
      for (let i = 0; i < nodeMap[startNode].length; i++) {
        // Собираем узлы
        let linkNode = nodeMap[startNode][i];
        createGraph(linkNode, nodeMap, domainGroup);
      }
      arrSearchTree.add(domainGroup);
    }

    createAdjacencyList();
    mainHexGraph(adjacencyList);
    domainsStore.getGraphTree(arrSearchTree);
  }, [arrVertexs]);

  return <></>;
});

export default SplitDomains;
