import { observer } from "mobx-react-lite";
import React, { useMemo } from "react";
import { toJS } from "mobx";
import infoTableStore from "../../store/infoTableStore";
import style from "./drowTable.module.scss";

const DrowTable = observer(() => {
  const arrTable = toJS(infoTableStore.arrTable);

  console.log(arrTable);

  const table = (
    <table className={style.table_body}>
      <thead className={style.table_title}>
        <tr>
          <th rowSpan="2">Вероятность</th>
          <th colSpan="2">Количество доменов в решётке</th>
          <th rowSpan="2">
            Количество ячеек в решётке (L;N;M), из них имеющих значение 1
          </th>
        </tr>
        <tr>
          <th>Всего</th>
          <th>Из них неодносвязных</th>
        </tr>
      </thead>

      <tbody className={style.table_content}>
        {arrTable.map((elem, index) => (
          <tr key={index}>
            <td>{elem.random}</td>
            <td>{elem.amountDomains}</td>
            <td>{elem.nonSimplyDomain}</td>
            <td>
              {elem.allHexs} {elem.aspectRatio} {elem.sumHexValueOne}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return <>{arrTable.length > 0 ? table : null}</>;
});

export default DrowTable;
