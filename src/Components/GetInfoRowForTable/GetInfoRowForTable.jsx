import React from "react";
import infoTableStore from "../../store/infoTableStore";
import domainsStore from "../../store/domainsStore";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
// import NotSimplyConnectDomain from "../NotSimplyConnectDomain/NotSimplyConnectDomain";
const GetInfoRowForTable = observer(() => {
  // Тригер для статистики - количество рандомных элементов
  const sumRandomID = infoTableStore.sumRandomID;

  React.useEffect(() => {
    const sumDomains = domainsStore.stackDomains.length;
    const randomRatio = domainsStore.randomRatio.toFixed(2);
    const nonSimplyDomain = infoTableStore.nonSimplyDomain;
    const allHexs = domainsStore.arrCoordinates.length;
    const sideRatio = toJS(domainsStore.hexSideSize);

    const infoRow = {
      random: randomRatio,
      amountDomains: sumDomains,
      nonSimplyDomain: nonSimplyDomain,
      allHexs: allHexs,
      aspectRatio: `(${sideRatio.L}; ${sideRatio.M}; ${sideRatio.N})`,
      sumHexValueOne: sumRandomID,
    };

    if (sumRandomID > 0) {
      infoTableStore.handlerInfoTable(infoRow);
    }
  }, [sumRandomID]);
  return <>{/* {sumRandomID > 0 ? <NotSimplyConnectDomain /> : null} */}</>;
});

export default GetInfoRowForTable;
