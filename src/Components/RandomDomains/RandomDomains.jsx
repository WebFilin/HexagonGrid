import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import hexCordinate from "../../state/hexCordinate";

const RandomDomains = observer(() => {
  const isRandom = hexCordinate.isRandom;

  //   Массив элементов для построения графов
  const arrElemGraph = [];
  const arrDomains = [];

  React.useEffect(() => {
    // Рандомайзер
    const ratio = toJS(hexCordinate.randomRatio);

    // Все элементы сетки
    const arrCordMainHex = toJS(hexCordinate.arrCoordinates);

    arrCordMainHex.forEach((hexElem) => {
      if (Math.random() <= ratio) {
        arrElemGraph.push(hexElem);
      }
    });
  }, [isRandom, arrElemGraph]);

  React.useEffect(() => {
    //  Стек вершин графа
    const arrNodes = [];

    //  Ребра графа
    const edgesGraph = [];

    arrElemGraph.forEach((elemHex) => {
      // Получаем кординаты соседей
      const getNeighbors = hexCordinate.getNeighborsHex(
        elemHex.vertical,
        elemHex.horizontal
      );
      // Добавляем обьект с вершинами и возможными связями в стек
      arrNodes.push({ id: elemHex.id, edges: [...getNeighbors] });
    });

    //  Получаем только ребра графа
    while (arrNodes.length > 0) {
      const node = arrNodes.shift();

      console.log(node);

      arrNodes.forEach((elem) => {
        if (elem.edges.includes(node.id)) {
          edgesGraph.push([node.id, elem.id]);
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

    // Находим точки входов в графы динамически
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
        let connectedNode = nodeMap[startNode][i];
        depthFirstSearch(connectedNode, nodeMap, domainGroup);
      }

      checkDomain(domainGroup);
    }

    function checkDomain(domainGroup) {
      if (arrDomains.length === 0) {
        createDomain(domainGroup);
      } else {
        checkSubDomain(domainGroup);
      }
    }

    function createDomain(domainGroup) {
      const colorGroup = hexCordinate.randomColor();

      // Структура одной группы в стеке доменов
      const objDomain = {
        idDomain: colorGroup,
        groupCord: [...domainGroup],
      };

      arrDomains.push(objDomain);
    }

    function checkSubDomain(domainGroup) {
      // Получаем индекс домена в общем стейте
      const intersect = arrDomains.findIndex((domain) => {
        return domain.groupCord.some((id) => {
          return domainGroup.includes(id);
        });
      });

      // Обрабатываем элементы появляющиеся в хвосте графа
      // Обрезаем повтрения рекрусии
      if (intersect !== -1) {
        const oldState = arrDomains[intersect].groupCord;

        arrDomains[intersect].groupCord = [
          ...new Set([...oldState, ...domainGroup]),
        ];
      } else {
        createDomain(domainGroup);
      }
    }

    //  Вызываем цепочку построения доменов
    mainHexGraph(edgesGraph);

    console.log(arrDomains);
  }, [arrElemGraph, arrDomains]);

  //   Цвета доменов
  React.useEffect(() => {
    const collectionsHexs = toJS(hexCordinate.svgArea);
    const arrHexs = Array.from(collectionsHexs);

    //  !Времянка для отладки
    arrHexs.forEach((hexElem) => {
      const hex = hexElem.firstChild;
      hex.style = { fill: null, fillOpacity: 0.3 };
    });

    arrElemGraph.forEach((elem) => {
      arrHexs.forEach((hexElem) => {
        const hex = hexElem.firstChild;

        const id = Number(hex.id);

        if (elem.id === id) {
          hex.style.fill = "red";
        }
      });
    });
  }, [arrElemGraph, arrDomains]);

  return <div></div>;
});

export default RandomDomains;
