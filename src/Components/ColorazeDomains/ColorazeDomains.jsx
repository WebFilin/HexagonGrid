import React from "react";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import DomainsStore from "../../Store/DomainsStore";

const ColorazeDomains = observer(() => {
  const arrDomains = toJS(DomainsStore.stackDomains);

  React.useEffect(() => {
    const collectionsHexs = toJS(DomainsStore.svgArea);
    const arrHexs = Array.from(collectionsHexs);
    const stackDomainsColor = toJS(DomainsStore.stackDomainsColor);

    arrDomains.forEach((domain, index) => {
      domain.forEach((hexID) => {
        const svgHex = arrHexs.find(({ firstChild }) => {
          return Number(firstChild.id) === hexID;
        });

        const hex = svgHex.firstChild;
        const hexTxt = svgHex.lastChild;

        const colorDomain = stackDomainsColor[index].color;
        const colorOpacity = 0.8;

        hex.style.cssText = `fill:${colorDomain}; fill-opacity: ${colorOpacity};`;
      //   hexTxt.textContent = 1;
      });
    });
  }, [arrDomains]);

  return <></>;
});

export default ColorazeDomains;
