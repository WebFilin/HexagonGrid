import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import domainsStore from "../../store/domainsStore";
import infoTableStore from "../../store/infoTableStore";
const NotSimplyConnectDomain = observer(() => {
  const stackDomains = toJS(domainsStore.stackDomains);
  // Тригер для статистики - количество рандомных элементов
  //  const sumRandomID = infoTableStore.sumRandomID;

  //  console.log(sumRandomID)
  React.useEffect(() => {
    // const stackDomains = toJS(domainsStore.stackDomains);
    const arrHexRandom = toJS(domainsStore.arrVertexs);

    //Стек всех элементов сетки
    const arrCordMainHex = toJS(domainsStore.arrCoordinates);

    //  Массив отсортированных доменов с соcедями
    const arrNeighborsDomains = [];

    //  ID входящие в домен
    const arrIdDomains = [];

    //  Список связности
    let adjacencyListEmptyArea = [];

    // Все недосвязные домены
    const sumEmptyAreas = [];

    //  Отсекаем меленькие домены
    stackDomains.forEach((elem) => {
      const domain = elem.idDomain;
      if (domain.length >= 6) {
        getNeighborsDomain(domain);
        arrIdDomains.push(...domain);
      }
    });

    //  Получаем список соседей для отсортированных доменов
    function getNeighborsDomain(domain) {
      const arrNeighbors = [];

      // Получаем соседей хексов в домене
      domain.forEach((idInDomain) => {
        return arrHexRandom.filter((elem) => {
          if (elem.id === idInDomain) {
            return arrNeighbors.push(elem);
          }
        });
      });
      arrNeighborsDomains.push(arrNeighbors);
    }

    // Находим количество пересечений сторон с доменом у свободных хексов
    function getHexConnectDomains() {
      // Стек всех соседий домена
      let neighborsGroup = [];

      const arrRepeats = arrNeighborsDomains.map((domain) => {
        const arrNeighbors = domain.map((elem) => {
          return elem.group;
        });

        const repeats = arrNeighbors.flat().reduce((acc, elem) => {
          acc[elem] = (acc[elem] || 0) + 1;
          return acc;
        }, {});

        neighborsGroup.push(...arrNeighbors.flat());

        return repeats;
      });

      // Хексы вне домена но со связями c доменом от 3
      arrRepeats.forEach((objRepeats) => {
        const stackEmptyHexId = [];

        for (let prop in objRepeats) {
          const intersect = arrIdDomains.includes(Number(prop));
          const repeats = objRepeats[prop];

          if (!intersect && repeats >= 3) {
            if (repeats === 6) {
              checkSixIntersect(Number(prop));
            } else {
              stackEmptyHexId.push(Number(prop));
            }
          }
        }

        // Если 6 пересечений у элемента то домен недосвязный
        function checkSixIntersect(id) {
          const uniqueElem = [...new Set(neighborsGroup)];
          if (sumEmptyAreas.length > 0 && uniqueElem.includes(id)) {
            return false;
          } else {
            sumEmptyAreas.push(id);
          }
        }

        getHexConnect(stackEmptyHexId);
      });

      console.log(sumEmptyAreas);
    }

    // Получаем всех соседий недосвязных хексов
    function getHexConnect(stackEmptyHexId) {
      const emptyNeighbors = [];

      stackEmptyHexId.forEach((id) => {
        const hexCord = arrCordMainHex.find((elem) => {
          return elem.id === id;
        });

        // Ищем соседий выбранного узла
        const getNeighbors = domainsStore.getNeighborsHex(
          hexCord.vertical,
          hexCord.horizontal
        );
        emptyNeighbors.push({ id: id, group: [...getNeighbors] });
      });
      checkEmptyArea(emptyNeighbors);
    }

    function checkEmptyArea(emptyNeighbors) {
      // console.log(emptyNeighbors);

      // Форируем список связности пустой области внутри домена
      adjacencyListEmptyArea = [];

      for (let i = 0; i < emptyNeighbors.length; i++) {
        const prevID = emptyNeighbors[i].id;

        for (let j = i + 1; j < emptyNeighbors.length; j++) {
          const group = emptyNeighbors[j].group;
          const currID = emptyNeighbors[j].id;

          if (group.includes(prevID)) {
            adjacencyListEmptyArea.push([prevID, currID]);
          }
        }
      }

      const emptyArea = [...new Set(adjacencyListEmptyArea.flat())];

      // console.log(emptyArea);
    }

    getHexConnectDomains();

    infoTableStore.getSumNonSimplyDomain("-");
  }, [stackDomains]);

  return <div></div>;
});

export default NotSimplyConnectDomain;
