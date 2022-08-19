import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import hexCordinate from "../../state/hexCordinate";

const SplitDomains = observer(() => {
  const arrVertexRandom = toJS(hexCordinate.vertexLinksRandom);
  const arrVertexClick = toJS(hexCordinate.vertexLinksClick);

  React.useEffect(() => {
    const allVertex = [...arrVertexRandom, ...arrVertexClick];

    //  Список смежности графа
    let adjacencyList = [];

    const arrDomains = [];

    function createAdjacencyList() {
      adjacencyList = [];
      // Формируем список смежности узлов
      for (let i = 0; i < allVertex.length; i++) {
        const prevID = allVertex[i].id;

        for (let j = i + 1; j < allVertex.length; j++) {
          const edges = allVertex[j].group;
          const currID = allVertex[j].id;

          if (edges.includes(prevID)) {
            adjacencyList.push([prevID, currID]);
          }
        }
      }
    }

    //Динамически получаем связи подгрупп в общем графе
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

    //Динамически собираем связанное дерево одного графа
    function depthFirstSearch(startNode, nodeMap, domainGroup = []) {
      if (domainGroup.includes(startNode)) return domainGroup;

      //Динамически собираем дерево графа
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
      checkDomain(domainGroup);
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
      const colorGroup = hexCordinate.randomColor();

      // Структура одной группы в стеке доменов
      const objDomain = {
        colorDomain: colorGroup,
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
      const singleNode = allVertex.filter((node) => {
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

    //  Вызываем цепочку построения доменов
    createAdjacencyList();
    mainHexGraph(adjacencyList);
    handlerSingleNode();

    hexCordinate.getDomainsStack(arrDomains);
  }, [arrVertexRandom, arrVertexClick]);

  return <div></div>;
});

export default SplitDomains;
