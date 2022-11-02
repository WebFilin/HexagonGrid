import { autorun } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import DomainsStore from "../../store/DomainsStore";

const GetInfoForTable = React.memo(() => {
  const [tableRow, setTableRow] = React.useState({});
  const isBtnAuto = DomainsStore.isBtnAuto;

  //   Собираем строку таблицы
  React.useEffect(() => {
    return autorun(() =>
      setTableRow({
        random: null,
        amountDomains: DomainsStore.stackDomains.length,
        nonSimplyDomain: "Написать",
        allHexs: DomainsStore.arrCoordinates.length,
        hexGridRatio: `(${DomainsStore.hexSideSize.L}; ${DomainsStore.hexSideSize.N}; ${DomainsStore.hexSideSize.M})`,
        sumHexValueOne: DomainsStore.stackDomains.flat().length,
      })
    );
  }, []);

  React.useEffect(() => {
    if (tableRow.hasOwnProperty("amountDomains")) {
      tableRow.random = DomainsStore.randomRatio;
      DomainsStore.handlerInfoTable(tableRow);
    }
  }, [isBtnAuto]);

  return <></>;
});

export default GetInfoForTable;
