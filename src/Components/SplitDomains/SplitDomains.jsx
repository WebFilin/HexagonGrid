import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import DomainsStore from "../../store/DomainsStore";

const SplitDomains = observer(() => {
  const arrVertexs = toJS(DomainsStore.arrVertexs);
  React.useEffect(() => {
    //  Список смежности графа
    let adjacencyList = [];

    //  Стек всех полученных графов
    const arrSearchTree = [];

    // Формируем список смежности узлов
    function createAdjacencyList() {
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
        arrSearchTree.push(createGraph(startNode, nodeMap));
      }
    }

    //Собираем дерево графа
    function createGraph(startNode, nodeMap, domainGroup = []) {
      // База рекрусии
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
      return domainGroup;
    }

    createAdjacencyList();
    mainHexGraph(adjacencyList);
    DomainsStore.getGraphTree(arrSearchTree);
  }, [arrVertexs]);

  return <></>;
});

export default SplitDomains;
