import { observer } from "mobx-react-lite";
import React from "react";
import { autorun, toJS } from "mobx";
import DomainsStore from "../../store/DomainsStore";
import StoreTable from "../../store/StoreTable";
import style from "./drowInfoTable.module.scss";

const DrowInfoTable = observer(() => {
  const isRandom = DomainsStore.isRandom;
  const Tab = StoreTable.amountDomains;
  React.useEffect(() => {
    autorun(() => {
      console.log("Таблица " + Tab);
    });
  });

  //   const table = (

  //  <table className={style.table_body}>
  //    <thead className={style.table_title}>
  //      <tr>
  //        <th rowSpan="2">Вероятность</th>
  //        <th colSpan="2">Количество доменов в решётке</th>
  //        <th rowSpan="2">
  //          Количество ячеек в решётке (L;N;M), из них имеющих значение 1
  //        </th>
  //      </tr>
  //      <tr>
  //        <th>Всего</th>
  //        <th>Из них неодносвязных</th>
  //      </tr>
  //    </thead>

  //    <tbody className={style.table_content}>
  //      {arrTable.map((elem, index) => (
  //        <tr key={index}>
  //          <td>{elem.random}</td>
  //          <td>{elem.amountDomains}</td>
  //          <td>{elem.nonSimplyDomain}</td>
  //          <td>
  //            {elem.allHexs}{" "}
  //            {`(${elem.aspectRatio.L}; ${elem.aspectRatio.M}; ${elem.aspectRatio.N})`}{" "}
  //            {elem.amountValueOne}
  //          </td>
  //        </tr>
  //      ))}
  //    </tbody>
  //  </table>
  //   );

  return (
    <div className={style.wrapper}>
      {/* {arrTable.length > 0 ? table : null} */}

      {/* {arrTable} */}
    </div>
  );
});

export default DrowInfoTable;
