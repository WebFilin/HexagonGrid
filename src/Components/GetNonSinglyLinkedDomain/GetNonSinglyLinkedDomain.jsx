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
          return getEmptyArea(allConnectDomain, domain);
        }
      })
      .filter(Boolean);

    function getEmptyArea(allConnectDomain, domain) {
      // Старотовый хекс области
      const startHex = getStartHex(allConnectDomain);

      // Проверяем количество связей с доменом конкретного хекса
      // если 1 - домен разомкнут и не является недосвязным
      const checkedLinksForHex = checkHexLink(startHex, allConnectDomain);
      console.log(checkedLinksForHex);

      const neighborsHex = getEmptyNeighbors(startHex, domain);
      console.log(neighborsHex);
      // function checkArea(hex, emptyArea = []) {}

      // checkArea(startHex);

      // console.log(startHex + " || " + neighborsHex);
    }

    //  console.log("Недосвязанный домены");
    //  console.log(nonLinkedDomain);
    // DomainsStore.getNonLinkedDomains(nonLinkedDomain.length);
  }, [isBtnAuto]);

  // Количество связей каждого найденного хекса соседа в свободной области
  function checkHexLink(idHex, allConnectDomain) {
    const arrNode = allConnectDomain.find(([key, value]) => {
      return Number(key) === idHex;
    });
    return arrNode[1];
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

    //  console.log(
    //    Object.entries(sumIntersectsHexDomain).map(([key, value]) => [
    //      Number(key),
    //      value,
    //    ])
    //  );

    return Object.entries(sumIntersectsHexDomain).map(([key, value]) => [
      Number(key),
      value,
    ]);
  }

  return <></>;
});

export default GetNonSinglyLinkedDomain;
