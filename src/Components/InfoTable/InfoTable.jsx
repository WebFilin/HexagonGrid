import { observer } from "mobx-react-lite";
import React from "react";
import { toJS } from "mobx";
import hexHandler from "../../store/hexHandler";
import style from "./InfoTable.module.scss";

const InfoTable = observer(() => {
  const infoTable = toJS(hexHandler.infoForTable);

  console.log(infoTable);
  return (
    <div className={style.wrapper}>
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
          {infoTable.map((elem, index) => (
            <tr key={index}>
              <td>{elem.random}</td>
              <td>{elem.domains}</td>
              <td>{elem.nonSimplyDomain}</td>
              <td>
                {elem.allHexs}({elem.aspectRatio}) {elem.valueOne}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default InfoTable;
