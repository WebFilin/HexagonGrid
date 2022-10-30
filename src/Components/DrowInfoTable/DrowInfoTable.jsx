import { observer } from "mobx-react-lite";
import React from "react";
import DomainsStore from "../../store/DomainsStore";
import { toJS } from "mobx";

const DrowInfoTable = observer(() => {
  const stackTable = toJS(DomainsStore.stackTable);

  return (
    <div>
      {stackTable.map((elem) => (
        <div>{elem}</div>
      ))}
    </div>
  );
});

export default DrowInfoTable;
