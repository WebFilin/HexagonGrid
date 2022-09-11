import React from "react";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import DomainsStore from "../../store/DomainsStore";
import StoreTable from "../../store/StoreTable";

const ColorazeDomains = observer(() => {
  const arrDomains = toJS(DomainsStore.stackDomains);

  React.useEffect(() => {
    const collectionsHexs = toJS(DomainsStore.svgArea);
    const arrHexs = Array.from(collectionsHexs);

    arrHexs.forEach((hexElem) => {
      const hex = hexElem.firstChild;
      const hexTxt = hexElem.lastChild;
      const id = Number(hex.id);

      // Сброс стилей хексов
      hex.style = { fill: null, fillOpacity: 0.3 };
      //  hexTxt.textContent = null;
      hex.setAttribute("value", 0);

      arrDomains.forEach((elem, index) => {
        // Задаем цвета доменов
        if (!elem.hasOwnProperty("colorDomain")) {
          elem.colorDomain = setDomainColor();
          DomainsStore.getDomainColor(elem.colorDomain);
        }

        if (elem.idDomain.includes(id)) {
          const color = toJS(DomainsStore.arrDomainsColor);
          hex.style.fill = color[index];
          hex.style.fillOpacity = 0.8;
          hex.setAttribute("value", 1);
          //  hexTxt.textContent = 1;
        }
      });
    });

    function setDomainColor() {
      return (
        "#" +
        (Math.random().toString(16) + "000000").substring(2, 8).toUpperCase()
      );
    }
    StoreTable.getAmountDomains(arrDomains);
  }, [arrDomains]);

  return <div></div>;
});

export default ColorazeDomains;
