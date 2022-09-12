import { observer } from "mobx-react-lite";
import React from "react";
import { toJS } from "mobx";
import { infoTableStore } from "../../store/infoTableStore";

const InfoTable = observer(() => {
  //   console.log(isDrow);

  //   const stackDomains = toJS(domainsStore.stackDomains);

  //   //   Хексы со значением 1
  //   const sumValueOne = stackDomains.reduce((sum, current) => {
  //     return sum + current.idDomain.length;
  //   }, 0);

  //   const infoRow = React.useMemo(() => {
  //    return {
  //       random: domainsStore.randomRatio.toFixed(2),
  //       amountDomains: stackDomains.length,
  //       nonSimplyDomain: "Написать",
  //       allHexs: domainsStore.arrCoordinates.length,
  //       aspectRatio: `${domainsStore.hexSideSize.L}; ${domainsStore.hexSideSize.M}; ${domainsStore.hexSideSize.N}`,
  //       sumHexValueOne: sumValueOne,
  //     };

  //   }, [stackDomains.length, sumValueOne]);

  //   React.useEffect(() => {
  //     console.log(infoRow);
  //   }, [isBtnRandom, infoRow]);

  //   console.log(infoRow);

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
  //            {elem.sumHexValueOne}
  //          </td>
  //        </tr>
  //      ))}
  //    </tbody>
  //  </table>
  //   );

  return <></>;
});

export default InfoTable;
