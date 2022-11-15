import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import DomainsStore from "../../store/DomainsStore";

const GetNonSinglyLinkedDomain = observer(() => {
  const isBtnAuto = DomainsStore.isBtnAuto;

  React.useEffect(() => {
    // Кординаты рештки хексов
    const arrCoordinates = toJS(DomainsStore.arrCoordinates);

    //  Сформированные домены в решетке
    const stackDomains = toJS(DomainsStore.stackDomains);

    //  Проверяем наличие пустой области в домене
    const nonLinkedDomain = stackDomains
      .map((domain) => {
        // Количество связей свободных хексов с доменом
        const allConnectDomain = getAllConnectDomains(domain);

        //   Если есть 6 пересечений - домен недосвязный, возврашаем сразу
        const sixLinks = checkSixLinks(allConnectDomain);

        if (sixLinks) {
          return [Number(sixLinks[0])];
        } else {
          // Проверяем область домена на разомкнутость
          return getEmptyArea(allConnectDomain, domain);
        }
      })
      .filter((arr) => {
        if (arr.length > 0) {
          return arr.some((elem) => {
            return !isNaN(elem);
          });
        }
      });

    function getEmptyArea(allConnectDomain, domain) {
      //  Стартовая точка обхода области в домене
      const startNode = getStartHex(allConnectDomain);

      // Очередь узлов области
      let queueNode = [];
      queueNode.push(startNode);

      // Стек повторных id элементов
      let repeatStackHexId = [];

      while (queueNode.length > 0) {
        // Текущий хекс
        const currentHex = queueNode.shift();

        //   Проверяем повторные хексы
        const checkReapets = !repeatStackHexId.includes(currentHex);

        // Проверяем количество связей хекса с доменом
        const linksForHex = checkHexLink(currentHex, allConnectDomain);

        // Получаем всех соседей хекса
        const neighborsHex = getEmptyNeighbors(currentHex, domain);

        // Если связь с доменом 1 то область в домене открытая, прерываем цикл
        if (linksForHex === 1) {
          return (queueNode = []);
        }

        //  Если связей больше, есть соседи и хекс не повторялся продолжаем проверку
        else if (checkReapets && neighborsHex) {
          // Если соседей  <= 4 - выход в край рещетки- домен открытый
          if (neighborsHex.length <= 4) {
            return (queueNode = []);
          }

          const emptyNeighbors = neighborsHex.filter(
            (id) => !domain.includes(id)
          );

          // Добавляем хекс в контрольный массив для исключения повторов
          repeatStackHexId.push(currentHex);

          // Добавляем в очередь на проверку каждого соседа
          emptyNeighbors.forEach((id) => {
            return queueNode.push(id);
          });
        }
      }

      return repeatStackHexId;
    }

    //   Получаем соседей хекса внутри области
    function getEmptyNeighbors(startHex) {
      if (startHex) {
        const hexCord = arrCoordinates.find((hex) => {
          return hex.id === startHex;
        });

        const neighbors = DomainsStore.getNeighborsHex(
          hexCord.vertical,
          hexCord.horizontal
        );
        return neighbors;
      }
    }

    DomainsStore.getNonLinkedDomains(nonLinkedDomain.length);
  }, [isBtnAuto]);

  // Количество связей каждого найденного хекса - соседа в свободной области
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

    if (arrNode) {
      return arrNode[0];
    }
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
