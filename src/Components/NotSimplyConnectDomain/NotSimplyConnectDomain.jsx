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

    //  Массив отсортированных доменов с соедями
    const arrNeighborsDomains = [];

    //  ID входящие в домен
    const arrIdDomains = [];

    const emptyArea = [];

    const sumSimplyConnect = [];

    //  Отсекаем меленькие домены
    stackDomains.map((elem) => {
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

    // Находим количество пересечений сторон с доменом у хексов
    function getHexConnectDomains() {
      const arrRepeats = arrNeighborsDomains.map((domain) => {
        const arrNeighbors = domain.map((elem) => {
          return elem.group;
        });

        const repeats = arrNeighbors.flat().reduce((acc, elem) => {
          acc[elem] = (acc[elem] || 0) + 1;
          return acc;
        }, {});
        return repeats;
      });

      // Хексы вне домена но со связями в домене от 3
      arrRepeats.forEach((objRepeats) => {
        for (let key of Object.keys(objRepeats)) {
          const intersect = arrIdDomains.includes(Number(key));
          const repeats = objRepeats[key];
          if (!intersect && repeats >= 3) {
            getSimplyConnect(Number(key));
          }
        }
      });
    }

    //  Проверяем недосвязную область домена
    function getSimplyConnect(id) {
      const hexCord = arrCordMainHex.find((elem) => {
        return elem.id === id;
      });

      // Ищем соседий выбранного узла
      const getNeighbors = domainsStore.getNeighborsHex(
        hexCord.vertical,
        hexCord.horizontal
      );

      if (getNeighbors.length > 4) {
        emptyArea.push({ id: id, group: [...getNeighbors] });
      }
    }

    // Проверяем пустые области
    function checkEmptyArea() {
      console.log(stackDomains);
      emptyArea.forEach((elem) => {
        const elemNeighbors = elem.group;
        console.log(elemNeighbors);
      });
    }

    getHexConnectDomains();
    checkEmptyArea();
    infoTableStore.getSumNonSimplyDomain("-");
  }, [stackDomains]);

  return <div></div>;
});

export default NotSimplyConnectDomain;
