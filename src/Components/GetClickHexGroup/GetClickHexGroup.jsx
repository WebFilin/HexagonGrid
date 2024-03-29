import { observer } from "mobx-react-lite";
import React from "react";
import { toJS } from "mobx";
import DomainsStore from "../../Store/DomainsStore";

const GetHexGroup = observer(() => {
  //   Выбранный хекс получаем или при клике или рандомом
  let hex = toJS(DomainsStore.hexClick);

  // Обработчик клика ищем его соседей
  React.useEffect(() => {
    if (hex) {
      const hexVert = Number(hex.getAttribute("vertical"));
      const hexHoriz = Number(hex.getAttribute("horizontal"));
      const hexID = Number(hex.id);

      // Ищем соседий хекса
      const getNeighbors = DomainsStore.getNeighborsHex(hexVert, hexHoriz);

      // Составляем узел
      const peak = { id: hexID, group: [...getNeighbors] };
      DomainsStore.getHexGroup(peak);
    }
  }, [hex]);

  return <></>;
});

export default GetHexGroup;
