import { observer } from "mobx-react-lite";
import React from "react";
import { toJS } from "mobx";
import DomainsStore from "../../store/DomainsStore";
import style from "./drowTable.module.scss";

const DrowInfoTable = observer(() => {
  //   console.log(DomainsStore.stackDomains);

  const isBtnRandom = DomainsStore.isBtnRandom;

  console.log(DomainsStore.stackDomains);

  //   React.useEffect(() => {
  //     console.log(DomainsStore.stackDomains);
  //   }, [DomainsStore.stackDomains]);

  //   const arrDomains = toJS(DomainsStore.stackDomains);
  //   console.log(DomainsStore.stackDomains);

  //   console.log( isBtnRandom)

  //   const arrTable = toJS(tableStore.arrTable);
  //   const isTable = tableStore.isDrowTable;

  //   console.log(mainStore);

  //  console.log(isTable);

  //   React.useLayoutEffect(() => {
  //     console.log(toJS(tableStore.tableRow));
  //   }, [isTable]);

  //   const tableDrow = (
  //     <table className={style.table_body}>
  //       <thead className={style.table_title}>
  //         <tr>
  //           <th rowSpan="2">Вероятность</th>
  //           <th colSpan="2">Количество доменов в решётке</th>
  //           <th rowSpan="2">
  //             Количество ячеек в решётке (L;N;M), из них имеющих значение 1
  //           </th>
  //         </tr>
  //         <tr>
  //           <th>Всего</th>
  //           <th>Из них неодносвязных</th>
  //         </tr>
  //       </thead>

  //       <tbody className={style.table_content}>
  //         {arrTable.map((elem, index) => (
  //           <tr key={index}>
  //             <td>{elem.random}</td>
  //             <td>{elem.amountDomains}</td>
  //             <td>{elem.nonSimplyDomain}</td>
  //             <td>
  //               {elem.allHexs} {elem.aspectRatio} {elem.sumHexValueOne}
  //             </td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   );

  return (
    <div className={style.wrapper}>
      {/* {arrTable.length > 0 ? tableDrow : null} */}
    </div>
  );
});

export default DrowInfoTable;
