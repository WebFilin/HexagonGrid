import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import DomainsStore from "../../store/DomainsStore";

const GetNonSinglyLinkedDomain = observer(() => {
  const isBtnAuto = DomainsStore.isBtnAuto;

  React.useEffect(() => {
    const stackDomains = toJS(DomainsStore.stackDomains);

    stackDomains.forEach((domain) => {
      // Отсекаем мелкие домены
      if (domain.length >= 6) {
        const sumConnect = getSumConnectDomains(domain);

        // Если есть шесть пересечений - домен не может быть недосвязным, отбрасываем
        const sixIntersect = Object.values(sumConnect).includes(6);

        if (!sixIntersect) {
          checkEmptyArea(sumConnect, domain);
        }
      }
    });
  }, [isBtnAuto]);

  //   Получаем свободную область в домене
  function checkEmptyArea(sumConnect, domain) {
    // Получаем хекс с пересечением с доменом от трех
    const arrHex = Object.entries(sumConnect).find(([key, value]) => {
      return value >= 3;
    });

    //  Стартовый хекс для поиска свободной зоны
    const startHexId = Number(arrHex[0]);

    console.log(startHexId);

    //  console.log(sumConnect);
    //  console.log(domain);
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
