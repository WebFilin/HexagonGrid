import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import domainsStore from "../../store/domainsStore";
import GetEmptyAreaInDomain from "../GetEmptyAreaInDomain/GetEmptyAreaInDomain";

const CheckHexConnectDomains = observer(({ isBtnRandom }) => {
  // Стек для передачи связей
  const [arrHexConnect, setArrHexConnect] = React.useState([]);

  console.log(isBtnRandom);

  React.useEffect(() => {
    const stackDomains = toJS(domainsStore.stackDomains);
    const arrHexRandom = toJS(domainsStore.arrVertexs);

    //  Стек связей доменов
    const stackConnect = [];

    //  ID входящие в домен
    stackDomains.forEach((domain, numDomain) => {
      //  Отсекаем короткие домены
      if (domain.length >= 6) {
        getNeighborsDomain(domain, numDomain);
      }
    });

    //  Получаем список соседей для длинных доменов
    function getNeighborsDomain(currDomain, numDomain) {
      // Получаем хексы вокруг домена
      const arrNeighbors = currDomain.map((idInDomain) => {
        const [id, group] = arrHexRandom.filter((elem) => {
          if (elem.id === idInDomain) {
            return elem;
          }
        });

        return { ...id, ...group };
      });

      // Стек всех соседий домена
      const neighborID = arrNeighbors
        .map((domain) => {
          return domain.group;
        })
        .flat();

      // Получаем количество связей между хексами и доменом
      const objIntersectHexs = neighborID.reduce((acc, id) => {
        acc[id] = (acc[id] || 0) + 1;
        return acc;
      }, {});

      // Собираем узлы хексов вокруг домена
      const arrIntersectHexs = Object.entries(objIntersectHexs).map(
        ([key, value]) => {
          const idHex = Number(key);

          //  Соседи элементов
          const neighbors = getNeighbors(idHex);
          return { id: idHex, link: value, neighbors: neighbors };
        }
      );

      stackConnect.push({
        hexLink: arrIntersectHexs,
        currDomain: currDomain,
        numDomain: numDomain,
      });

      setArrHexConnect(stackConnect);
      console.log(stackConnect);
    }

    function getNeighbors(id) {
      //Стек всех элементов сетки
      const arrCordMainHex = toJS(domainsStore.arrCoordinates);

      const hexCord = arrCordMainHex.find((hex) => {
        return hex.id === id;
      });

      // Находим всех соседий хекса
      const hexConnect = domainsStore.getNeighborsHex(
        hexCord.vertical,
        hexCord.horizontal
      );
      return hexConnect;
    }
  }, [isBtnRandom]);

  return (
    <div>
      <GetEmptyAreaInDomain hexConnect={arrHexConnect} />
    </div>
  );
});

export default CheckHexConnectDomains;
