import { observer } from "mobx-react-lite";
import React from "react";
import DomainsStore from "../../store/DomainsStore";

const InfoForTable = observer(() => {
  const isBtnAuto = DomainsStore.isBtnAuto;

  React.useEffect(() => {
    const gridRatio = DomainsStore.hexSideSize;
    setTimeout(() => {
      DomainsStore.handlerInfoTable({
        random: DomainsStore.randomRatio,
        amountDomains: DomainsStore.stackDomains.length,
        nonSimplyDomain: DomainsStore.sumNonSingleLinkedDomain,
        allHexs: DomainsStore.arrCoordinates.length,
        hexGridRatio: `${gridRatio.L}; ${gridRatio.N}; ${gridRatio.M};`,
        sumHexValueOne: DomainsStore.arrVertexs.length,
      });
    }, 0);
  }, [isBtnAuto]);

  return <div></div>;
});

export default InfoForTable;
