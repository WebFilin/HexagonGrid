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
        const sumConnect = getSumConnectDomains(domain);

        //   Если есть 6 пересечений - домен недосвязный, возврашаем сразу
        const sixLinks = checkSixLinks(sumConnect);

        if (sixLinks) {
          return Number(sixLinks[0]);
        } else {
          return getEmptyArea(sumConnect);
        }
      })
      .filter(Boolean);

    function getEmptyArea(sumConnect) {
      // Старотовый хекс области
      const startHex = getStartHex(sumConnect);
      return "fffffff";
    }

    console.log("Недосвязанный домены");
    console.log(nonLinkedDomain);
    // DomainsStore.getNonLinkedDomains(nonLinkedDomain.length);
  }, [isBtnAuto]);

  //   Проверяем наличие 6 пересечений
  function checkSixLinks(sumConnect) {
    return Object.entries(sumConnect).find(([key, value]) => {
      return value === 6;
    });
  }

  //   Стартовый хекс пустой области
  function getStartHex(sumConnect) {
    return Object.entries(sumConnect).find(([key, value]) => {
      return value >= 4;
    });
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
