import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import DomainsStore from "../../store/DomainsStore";

const GetNonSinglyLinkedDomain = observer(() => {
  const isBtnAuto = DomainsStore.isBtnAuto;
  const arrCoordinates = toJS(DomainsStore.arrCoordinates);

  React.useEffect(() => {
    const stackDomains = toJS(DomainsStore.stackDomains);

    //  Проверяем наличие пустой области в домене
    const nonLinkedDomain = stackDomains
      .map((domain) => {
        // Количество связей свободных хексов с доменом
        const allConnectDomain = getAllConnectDomains(domain);

        //   Если есть 6 пересечений - домен недосвязный, возврашаем сразу
        const sixLinks = checkSixLinks(allConnectDomain);

        if (sixLinks) {
          return Number(sixLinks[0]);
        } else {
          // Если есть пустая область проверяем домен на разомкнутость
          return getEmptyArea(allConnectDomain, domain);
        }
      })
      .filter(Boolean);

    function getEmptyArea(allConnectDomain, domain) {
      //  Стартовая точка обхода области в домене
      const startNode = getStartHex(allConnectDomain);

      // Получаем пустую область
      console.log(checkArea(startNode, domain, allConnectDomain));
    }

    function checkArea(hexId, domain, allConnectDomain, emptyArea = []) {
      // Проверяем повторы в emptyArea
      const checkRepeat = emptyArea.some((elem) => {
        return elem.hex === hexId;
      });

      // Если элемент уже в массиве возврашаем домен сразу - база рекрусии
      if (checkRepeat) {
        return emptyArea;
      }

      // Проверяем количество связей хекса с доменом
      const linksForHex = checkHexLink(hexId, allConnectDomain);

      // Если связей больше 1 формируем узел графа свободной области домена
      if (linksForHex > 1) {
        emptyArea.push({ hex: hexId, visited: false });
      } else {
        return;
      }

      emptyArea.forEach((elem) => {
        if (!elem.visited) {
          // Получаем соседей хекса вне домена
          const neighborsHex = getEmptyNeighbors(elem.hex, domain);

          neighborsHex.forEach((id) => {


            
            checkArea(id, domain, allConnectDomain, emptyArea);
          });
        }
        //   Отмечаем посешенные узлы
        elem.visited = true;
      });

      return emptyArea;
    }
    //  console.log("Недосвязанный домены");
    //   console.log(nonLinkedDomain);
    // DomainsStore.getNonLinkedDomains(nonLinkedDomain.length);
  }, [isBtnAuto]);

  // Количество связей каждого найденного хекса соседа в свободной области
  function checkHexLink(idHex, allConnectDomain) {
    const arrNode = allConnectDomain.find(([key, value]) => {
      return key === idHex;
    });
    if (arrNode) {
      return arrNode[1];
    }
  }

  //   Проверяем наличие 6 пересечений в области
  function checkSixLinks(allConnectDomain) {
    return allConnectDomain.find(([key, value]) => {
      return value === 6;
    });
  }

  //   Стартовый хекс пустой области
  function getStartHex(allConnectDomain) {
    const arrNode = allConnectDomain.find(([key, value]) => {
      return value >= 4;
    });
    return arrNode[0];
  }

  //   Получаем соседей хекса внутри области
  function getEmptyNeighbors(startHex, domain) {
    const hexCord = arrCoordinates.find((hex) => {
      return hex.id === startHex;
    });
    const neighbors = DomainsStore.getNeighborsHex(
      hexCord.vertical,
      hexCord.horizontal
    );
    return neighbors.filter((id) => !domain.includes(id));
  }

  //   Находим количество связей хексов с доменом
  function getAllConnectDomains(currDomain) {
    const arrHexRandom = toJS(DomainsStore.arrVertexs);

    // Получаем хексы домена с его соседями
    const arrNeighbors = currDomain.map((idInDomain) => {
      const [id, group] = arrHexRandom.filter((elem) => {
        if (elem.id === idInDomain) {
          return elem;
        }
      });
      return { ...id, ...group };
    });

    // Стек всех соседий домена
    const neighborDomainID = arrNeighbors
      .map((domain) => {
        return domain.group;
      })
      .flat();

    // Хексы не входящие в домен
    const emptyHex = neighborDomainID.filter((id) => {
      return !currDomain.includes(id);
    });

    // Получаем количество связей между хексами и доменом
    const sumIntersectsHexDomain = emptyHex.reduce((acc, id) => {
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(sumIntersectsHexDomain).map(([key, value]) => [
      Number(key),
      value,
    ]);
  }

  return <></>;
});

export default GetNonSinglyLinkedDomain;
