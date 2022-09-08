import { observer } from "mobx-react-lite";
import React from "react";
import { toJS } from "mobx";
import hexHandler from "../../store/hexHandler";
import style from "./getInfoTable.module.scss";
import DrowInfoTable from "../DrowInfoTable/DrowInfoTable";

const InfoTable = observer(() => {
  const isRandom = toJS(hexHandler.isRandom);

  React.useEffect(() => {

  }, [isRandom]);



  
  return (
    <div className={style.wrapper}>{/* {isDrowTable && "hf,jnftn" } */}</div>
  );
});

export default InfoTable;
