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

    function getHexConnectDomains() {
      // Находим количество пересечений сторон у хексов
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

      // Хексы вне домена и с пересечением домена 4 и больше
      arrRepeats.forEach((objRepeats) => {
        for (let key of Object.keys(objRepeats)) {
          if (!arrIdDomains.includes(Number(key)) && objRepeats[key] >= 4) {
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
      console.log(hexCord);
    }

    getHexConnectDomains();
    //   infoTableStore.getSumNonSimplyDomain("Таки да");
  }, [stackDomains]);

  return <div></div>;
});

export default NotSimplyConnectDomain;
