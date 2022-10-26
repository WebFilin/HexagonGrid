import { toJS, autorun } from "mobx";
import React from "react";
import DomainsStore from "../../store/DomainsStore";

const GetInfoForTable = () => {
  const isBtnAuto = DomainsStore.isBtnAuto;

  React.useEffect(() => {
    const disposer = autorun(() => {
      const tableRow = DomainsStore.stackDomains;

      DomainsStore.infoTable(tableRow);
    });

    return () => {
      disposer();
    };
  }, [isBtnAuto]);

  return <div></div>;
};

export default GetInfoForTable;
