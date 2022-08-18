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

    // Формируем список единичной смежностей узлов
    for (let i = 0; i < arrNodes.length; i++) {
      const prevID = arrNodes[i].id;

      for (let j = i + 1; j < arrNodes.length; j++) {
        const edges = arrNodes[j].edges;
        const currID = arrNodes[j].id;
        if (edges.includes(prevID)) {
          edgesGraph.push([prevID, currID]);
        }
      }
    }

    //  Формируем общий граф всей сетки
    function mainHexGraph(edges) {
      const nodeMap = {};

      //Динамически получаем связи подгрупп в общем графе
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
        let linkNode = nodeMap[startNode][i];
        depthFirstSearch(linkNode, nodeMap, domainGroup);
      }

      checkDomain(domainGroup);
    }

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
        id: colorGroup,
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

      // Обрабатываем элементы появляющиеся в хвосте графа
      // Обрезаем повтрения рекрусии
      if (intersect !== -1) {
        const oldState = arrDomains[intersect].idDomain;

        arrDomains[intersect].idDomain = [
          ...new Set([...oldState, ...domainGroup]),
        ];
      } else {
        createDomain(...domainGroup);
      }
    }

    //  Вызываем цепочку построения доменов
    mainHexGraph(edgesGraph);

    // Обрабатываем единичные домены
    function handlerSingleNode() {
      const allNodeID = [];

      // Получаем все id из доменов
      arrDomains.forEach((node) => {
        allNodeID.push(...node.idDomain);
      });

      // Ищем исключения
      const singleNode = arrElemGraph.filter((node) => {
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

    handlerSingleNode();
  }, [arrElemGraph, arrDomains]);

  // Раскрашиваем элементы в цвета доменов
  React.useEffect(() => {
    const collectionsHexs = toJS(hexCordinate.svgArea);
    const arrHexs = Array.from(collectionsHexs);

    arrHexs.forEach((hexElem) => {
      const hex = hexElem.firstChild;
      const hexTxt = hexElem.lastChild;
      const id = Number(hex.id);

      // Сброс стилей хексов
      hex.style = { fill: null, fillOpacity: 0.3 };
      hexTxt.textContent = null;

      arrDomains.forEach((elem) => {
        if (elem.idDomain.includes(id)) {
          hex.style.fill = elem.id;
          hex.style.fillOpacity = 0.8;
          hexTxt.textContent = 1;
        }
      });
    });
  }, [arrElemGraph, arrDomains]);

  return <div></div>;
});

export default RandomDomains;
