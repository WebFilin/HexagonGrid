import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import DomainsStore from "../../store/DomainsStore";

const GetNonSinglyLinkedDomain = observer(() => {
  const isBtnAuto = DomainsStore.isBtnAuto;
  const arrCoordinates = toJS(DomainsStore.arrCoordinates);

  React.useEffect(() => {
    const stackDomains = toJS(DomainsStore.stackDomains);

    stackDomains.forEach((domain) => {
      const sumConnect = getSumConnectDomains(domain);
      // Если есть 6 пересечений - домен не может быть недосвязным
      const sixIntersect = Object.values(sumConnect).includes(6);

      // Отсекаем мелкие домены
      if (domain.length >= 6 && !sixIntersect) {
        const startHex = getEmptyHex(sumConnect);
        getEmptyArea(startHex, domain, sumConnect);
      }
    });
  }, [isBtnAuto]);

  //   Получаем пустую область в домене
  function getEmptyArea(startHex, domain, sumConnect) {
    function depthFirstSearch(hex, emptyArea = []) {
      // Добавляем стартовый хекс в массив
      if (emptyArea.includes(hex)) return emptyArea;
      emptyArea.push({ hex: hex, visited: false });

      for (let i = 0; i < emptyArea.length; i++) {
        const emptyHex = emptyArea[i].hex;
        let isVisited = emptyArea[i].visited;

        //   Если вершина не посещалась то идем дальше
        if (!isVisited) {
          // Получаем соседей хекса
          const neighbors = getNeighbors(emptyHex);

          //  Количество связей каждого хекса с доменом
          const hexLink = getHexLinkInDomain(emptyHex, sumConnect);

          if (neighbors.length > 4 && hexLink > 1) {
            // Отмечаем узел как пройденный
            isVisited = true;

            // Соседи хекса не входящие в домен
            const emptyNeighbors = getEmptyNeighbors(neighbors, domain);

            emptyNeighbors.forEach((elem) => {
              //   depthFirstSearch(elem, emptyArea);
              console.log(elem);
            });
          } else {
            return false;
          }
        }
      }
    }

    depthFirstSearch(startHex);
  }

  // Соседи хексов не входящие в домен
  function getEmptyNeighbors(neighbors, domain) {
    return neighbors.filter((id) => !domain.includes(id));
  }

  //  Количество связей с доменом конкретного хекса
  function getHexLinkInDomain(hexID, sumConnect) {
    // Получаем хекс с пересечением с доменом больше 1
    const arrHex = Object.entries(sumConnect).find(([key, value]) => {
      return Number(key) === hexID;
    });
    return Number(arrHex[1]);
  }

  //  Стартовый хекс для поиска свободной зоны
  function getEmptyHex(sumConnect) {
    // Получаем хекс с пересечением с доменом от трех
    const arrHex = Object.entries(sumConnect).find(([key, value]) => {
      return value >= 3;
    });
    return Number(arrHex[0]);
  }

  //   Получаем соседий хекса
  function getNeighbors(hexId) {
    const findeHex = arrCoordinates.find((elem) => {
      return elem.id === hexId;
    });
    return DomainsStore.getNeighborsHex(findeHex.vertical, findeHex.horizontal);
  }

  //   Находим количество связей хексов с доменом
  function getSumConnectDomains(currDomain) {
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

    return sumIntersectsHexDomain;
  }

  return <></>;
});

export default GetNonSinglyLinkedDomain;
