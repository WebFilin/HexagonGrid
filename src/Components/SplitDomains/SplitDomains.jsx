import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import hexHandler from "../../store/hexHandler";

const SplitDomains = observer(() => {
  const arrVertexs = toJS(hexHandler.arrVertexs);

  // Стек отсортированных подмножеств общего графа
  const [arrTrees, setArrTrees] = React.useState([]);

  React.useEffect(() => {
    //  Список смежности графа
    let adjacencyList = [];

    //  Стек готовых доменов
    const arrDomains = [];

    //  Стек всех найденных деревьев при рекрусии
    const arrSearchTree = [];

    function createAdjacencyList() {
      adjacencyList = [];
      // Формируем список смежности узлов
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

      // Проверяем и раздиляем домены
      // checkDomain(domainGroup);

      arrSearchTree.push(domainGroup);
    }

    //  ОБрабатываем разбиение на домены
    function checkDomain(domainGroup) {
      if (arrDomains.length === 0) {
        createDomain(...domainGroup);
      } else {
        checkSubDomain(domainGroup);
      }
    }

    function createDomain(domainGroup) {
      // Структура одной группы в стеке доменов
      const objDomain = {
        idDomain: [domainGroup],
      };

      arrDomains.push(objDomain);
    }

    function checkSubDomain(domainGroup) {
      // Получаем индекс домена в общем стейте
      const intersect = arrDomains.findIndex((domain) => {
        return domain.idDomain.some((id) => {
          return domainGroup.includes(id);
        });
      });

      if (intersect !== -1) {
        const oldState = arrDomains[intersect].idDomain;

        arrDomains[intersect].idDomain = [
          ...new Set([...oldState, ...domainGroup]),
        ];
      } else {
        createDomain(...domainGroup);
      }
    }

    // Обрабатываем единичные домены
    function handlerSingleNode() {
      const allNodeID = [];

      // Получаем все id из доменов
      arrDomains.forEach((node) => {
        allNodeID.push(...node.idDomain);
      });

      // Ищем исключения
      const singleNode = arrVertexs.filter((node) => {
        if (!allNodeID.includes(node.id)) {
          return node;
        }
      });

      if (singleNode.length > 0) {
        singleNode.forEach((elem) => {
          createDomain(elem.id);
        });
      }
    }

    function removeRepeatsSearchTree() {
      arrSearchTree.forEach((elem) => {
        console.log(elem);
      });
    }

    //  Вызываем цепочку построения доменов
    createAdjacencyList();
    mainHexGraph(adjacencyList);
    removeRepeatsSearchTree();
    handlerSingleNode();
    hexHandler.getDomainsStack(arrDomains);
  }, [arrVertexs]);

  return <div></div>;
});

export default SplitDomains;
