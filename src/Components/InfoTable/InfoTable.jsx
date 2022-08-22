import { observer } from "mobx-react-lite";
import React from "react";
import { toJS } from "mobx";
import hexHandler from "../../store/hexHandler";
import style from "./InfoTable.module.scss";

const InfoTable = observer(() => {
  const mainDomains = toJS(hexHandler.stackDomains);
  const allElem = toJS(hexHandler.arrCoordinates);

  return (
    <div className={style.wrapper}>
      <p> Создано доменов: {mainDomains.length}</p>
      <p> Элементов всего: {allElem.length}</p>
    </div>
  );
});

export default InfoTable;
