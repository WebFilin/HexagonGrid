import { autorun, when } from "mobx";
import { observer, useLocalObservable } from "mobx-react-lite";
import React from "react";
import DomainsStore from "../../store/DomainsStore";
import DrowInfoTable from "../DrowInfoTable/DrowInfoTable";

const GetInfoForTable = observer(() => {
  const isBtnAuto = DomainsStore.isBtnAuto;

  //  console.log(DomainsStore.stackDomains.length);

  React.useEffect(() => {
    DomainsStore.getInfo();
  }, [isBtnAuto]);

  return (
    <div>
      <DrowInfoTable />
    </div>
  );
});

export default GetInfoForTable;
