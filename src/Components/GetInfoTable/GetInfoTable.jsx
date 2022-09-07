import { observer } from "mobx-react-lite";
import React from "react";
import { toJS } from "mobx";
import hexHandler from "../../store/hexHandler";
import style from "./getInfoTable.module.scss";
import DrowInfoTable from "../DrowInfoTable/DrowInfoTable";

const InfoTable = observer(() => {
  const amountDomains = toJS(hexHandler.stackDomains);

  React.useEffect(() => {
    const randomValue = toJS(hexHandler.randomRatio).toFixed(2);

    const nonSimplyDomain = "Реализовать";
    const allHexs = toJS(hexHandler.arrCoordinates);
    const gridAspectRatio = toJS(hexHandler.hexSideSize);
    const hexsValueOne = toJS(hexHandler.arrVertexs.length);

    if (amountDomains.length > 0) {
      const infoRow = {
        random: randomValue,
        domains: amountDomains.length,
        nonSimplyDomain: nonSimplyDomain,
        allHexs: allHexs.length,
        aspectRatio: `${gridAspectRatio.L}; ${gridAspectRatio.M}; ${gridAspectRatio.N}`,
        valueOne: hexsValueOne,
      };
      hexHandler.getInfoTable(infoRow);
    }
  }, [amountDomains]);

  return (
    <div className={style.wrapper}>
      {amountDomains.length > 0 ? <DrowInfoTable /> : null}
    </div>
  );
});

export default InfoTable;
