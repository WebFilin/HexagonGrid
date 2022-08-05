import { observer } from "mobx-react-lite";
import React from "react";
import { toJS } from "mobx";
import hexCordinate from "../../state/hexCordinate";
import style from "./InfoTable.module.scss";

const InfoTable = observer(() => {
  const mainDomains = toJS(hexCordinate.arrDomains);
  const allElem = toJS(hexCordinate.arrCoordinates);

  return (
    <div className={style.wrapper}>
      <p> Создано доменов: {mainDomains.length}</p>
      <p> Элементов всего: {allElem.length}</p>
    </div>
  );
});

export default InfoTable;
