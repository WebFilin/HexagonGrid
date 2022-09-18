import React from "react";
import infoTableStore from "../../store/infoTableStore";
import domainsStore from "../../store/domainsStore";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
const GetInfoRowForTable = observer((isBtnRandom) => {
  React.useEffect(() => {
    const allDomains = toJS(domainsStore.stackDomains);
    const randomRatio = domainsStore.randomRatio.toFixed(2);
    const nonSimplyDomain = infoTableStore.nonSimplyDomain;
    const allHexs = domainsStore.arrCoordinates.length;
    const sideRatio = toJS(domainsStore.hexSideSize);
    const sumHexValueOne = allDomains
      .map((elem) => {
        return elem.idDomain;
      })
      .flat();

    const infoRow = {
      random: randomRatio,
      amountDomains: allDomains.length,
      nonSimplyDomain: nonSimplyDomain,
      allHexs: allHexs,
      aspectRatio: `(${sideRatio.L}; ${sideRatio.M}; ${sideRatio.N})`,
      sumHexValueOne: sumHexValueOne.length,
    };

    if (allDomains.length > 0) {
      infoTableStore.handlerInfoTable(infoRow);
    }
  }, [isBtnRandom]);
  return <></>;
});

export default GetInfoRowForTable;
