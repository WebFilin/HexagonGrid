import { observer } from "mobx-react-lite";
import React from "react";
import { toJS } from "mobx";
import hexHandler from "../../store/hexHandler";
import style from "./drowInfoTable.module.scss";

const DrowInfoTable = observer(() => {
  const arrTable = toJS(hexHandler.arrTable);

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
            <td>{elem.sumDomains}</td>
            <td>{elem.nonSimplyDomain}</td>
            <td>
              {elem.allHexs}({elem.aspectRatio}) {elem.valueForOne}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className={style.wrapper}>{arrTable.length > 0 ? table : null}</div>
  );
});

export default DrowInfoTable;
