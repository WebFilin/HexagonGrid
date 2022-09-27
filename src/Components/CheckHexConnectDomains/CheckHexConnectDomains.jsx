import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import domainsStore from "../../store/domainsStore";
import GetEmptyAreaInDomain from "../GetEmptyAreaInDomain/GetEmptyAreaInDomain";

const CheckHexConnectDomains = observer(({ isBtnRandom }) => {
  // Обьект для передачи связей
  const [objHexConnect, setObjHexConnect] = React.useState([]);

  React.useEffect(() => {
    const stackDomains = toJS(domainsStore.stackDomains);
    const arrHexRandom = toJS(domainsStore.arrVertexs);

    const stackConnect = [];

    //  ID входящие в домен
    stackDomains.forEach((elem, numDomain) => {
      const domain = elem.idDomain;

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
      const intersectHexs = neighborID.reduce((acc, id) => {
        acc[id] = (acc[id] || 0) + 1;
        return acc;
      }, {});

      stackConnect.push({
        hexs: intersectHexs,
        currDomain: currDomain,
        numDomain: numDomain,
      });

      setObjHexConnect(stackConnect);
    }
  }, [isBtnRandom]);

  return (
    <div>
      <GetEmptyAreaInDomain hexConnect={objHexConnect} />
    </div>
  );
});

export default CheckHexConnectDomains;
