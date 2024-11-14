import React from "react";

export const TokkulProfitTableRow = ({
    getObjectById,
    totalTokkul,
    avarageGpPerTokkul,
    mithrilPrice,
    silverPrice,
    avarageMinsToSell,
    formatNumber,
    itemId,
    itemTokkuPrice,
    hourlyItemsBought = 294,
}) => {
    // cantidad de items a comprar
    const itemsQuantity = totalTokkul / itemTokkuPrice
    const item = getObjectById(itemId)
    return (
        <tr>
            {/* IMG */}
            <td>
                <a href={"https://prices.osrs.cloud/item/" + itemId} target="blank">
                    <img src={item?.image} alt="" />
                </a>
            </td>

            {/* EN CASO DE QUE NO HAYA NIGÚN CAMPO RELLENO */}

            <td style={{ display: totalTokkul > 0 ? "none" : "" }}>
                <span style={{ fontSize: "10px", color: "#888" }}>
                    {Math.floor(
                        (1794000 / itemTokkuPrice) * (item?.high * 0.99) -
                        (getObjectById(447)?.low * itemTokkuPrice +
                            getObjectById(442)?.low * itemTokkuPrice)
                    ).toLocaleString()}{" "}
                    <br />
                </span>
                <span>
                    {Math.floor(
                        item?.high * 0.99 -
                        ((getObjectById(447)?.low + getObjectById(442)?.low) / 23) * 72000
                    ).toLocaleString()}{" "}
                    <br />
                </span>
            </td>
            <td style={{ display: totalTokkul > 0 ? "none" : "" }}>
                <span style={{ fontSize: "10px", color: "#888" }}>
                    {Math.floor(
                        (1794000 / itemTokkuPrice) * (item?.high * 0.99) -
                        (getObjectById(447)?.high * itemTokkuPrice +
                            getObjectById(442)?.high * itemTokkuPrice)
                    ).toLocaleString()}{" "}
                    <br />
                </span>
                <span>
                    {Math.floor(
                        item?.high * 0.99 -
                        ((getObjectById(447)?.high + getObjectById(442)?.high) / 23) *
                        72000
                    ).toLocaleString()}{" "}
                    <br />
                </span>
            </td>
            <td style={{ display: totalTokkul > 0 ? "none" : "" }}>
                <span style={{ fontSize: "10px", color: "#888" }}>
                    {Math.floor(
                        (1794000 / itemTokkuPrice) * (item?.low * 0.99) -
                        (getObjectById(447)?.low * itemTokkuPrice +
                            getObjectById(442)?.low * itemTokkuPrice)
                    ).toLocaleString()}{" "}
                    <br />
                </span>
                <span>
                    {Math.floor(
                        item?.low * 0.99 -
                        ((getObjectById(447)?.low + getObjectById(442)?.low) / 23) * 72000
                    ).toLocaleString()}{" "}
                    <br />
                </span>
            </td>
            <td style={{ display: totalTokkul > 0 ? "none" : "" }}>
                <span style={{ fontSize: "10px", color: "#888" }}>
                    {Math.floor(
                        (1794000 / itemTokkuPrice) * (item?.low * 0.99) -
                        (getObjectById(447)?.high * itemTokkuPrice +
                            getObjectById(442)?.high * itemTokkuPrice)
                    ).toLocaleString()}{" "}
                    <br />
                </span>
                <span>
                    {Math.floor(
                        item?.low * 0.99 -
                        ((getObjectById(447)?.high + getObjectById(442)?.high) / 23) *
                        72000
                    ).toLocaleString()}{" "}
                    <br />
                </span>
            </td>

            {/* EN CASO DE QUE HAYA ALGÚN CAMPO RELLENO */}

            <td style={{ display: totalTokkul > 0 ? "" : "none" }}>
                <span>
                    x {Math.floor(itemsQuantity).toLocaleString()} <br />
                </span>
                <span style={{ fontSize: "10px", color: "#888" }}>
                    & {Math.floor(totalTokkul % itemTokkuPrice).toLocaleString()} tokkul <br />
                </span>
            </td>

            <td style={{ display: totalTokkul > 0 ? "" : "none" }}>
                <span style={{ fontSize: "10px", color: "#888" }}>
                    {formatNumber(Math.floor(
                        (1794000 / itemTokkuPrice) * (item?.high * 0.99) -
                        (mithrilPrice * itemTokkuPrice + silverPrice * itemTokkuPrice)
                    ))}{" "}
                    <br />
                </span>

                <span>
                    {formatNumber(Math.floor(
                        item?.high * 0.99 - avarageGpPerTokkul * itemTokkuPrice
                    ))}{" "}
                    <br />
                </span>
                <span style={{ fontSize: "10px", color: "#888" }}>
                    Total profit: <br />{" "}
                    {formatNumber(Math.floor(
                        (item?.high * 0.99 - avarageGpPerTokkul * itemTokkuPrice) *
                        Math.floor(itemsQuantity)
                    ))}{" "}
                    <br />
                </span>
            </td>

            <td style={{ display: totalTokkul > 0 ? "" : "none" }}>
                <span style={{ fontSize: "10px", color: "#888" }}>
                    {formatNumber(Math.floor(
                        (1794000 / itemTokkuPrice) * (item?.low * 0.99) -
                        (mithrilPrice * itemTokkuPrice + silverPrice * itemTokkuPrice)
                    ))}{" "}
                    <br />
                </span>

                <span>
                    {formatNumber(Math.floor(
                        item?.low * 0.99 - avarageGpPerTokkul * itemTokkuPrice
                    ))}{" "}
                    <br />
                </span>

                <span style={{ fontSize: "10px", color: "#888" }}>
                    Total profit: <br />{" "}
                    {formatNumber(Math.floor(
                        (item?.low * 0.99 - avarageGpPerTokkul * itemTokkuPrice) *
                        Math.floor(itemsQuantity)
                    ))}{" "}
                    <br />
                </span>
            </td>

            <td style={{ display: totalTokkul > 0 ? "" : "none" }}>
                <span style={{ fontSize: "10px", color: "#888" }}>
                    {Math.floor(((itemsQuantity) * 330) / 27 / 60) + "mins"} <br />
                </span>
                <span>
                    {Math.floor(
                        (((itemsQuantity) * 330) / 27 + avarageMinsToSell * 60) / 60
                    ) + "mins"}{" "}
                    <br />
                </span>
            </td>

            {/* GP/HR 5:30m un inventario de 27 items comprando 1 por hop y vendiendolos en el ge */}
            <td style={{ display: totalTokkul > 0 ? "" : "none" }}>
                <span style={{ fontSize: "10px", color: "#888" }}>
                    {formatNumber(
                        (3600 *
                            (item?.low * 0.99 - avarageGpPerTokkul * itemTokkuPrice) *
                            Math.floor(itemsQuantity)) /
                        (((itemsQuantity) * 3600) / hourlyItemsBought)
                    )}{" "}
                    <br />
                </span>
                <span>
                    {formatNumber(
                        (3600 *
                            (item?.low * 0.99 - avarageGpPerTokkul * itemTokkuPrice) *
                            Math.floor(itemsQuantity)) /
                        (((itemsQuantity) * 3600) / hourlyItemsBought + avarageMinsToSell * 60)
                    )}{" "}
                    <br />
                </span>
            </td>

            <td style={{ display: totalTokkul > 0 ? "" : "none" }}>
                <span>
                    {formatNumber(
                        (item?.low * 0.99 - avarageGpPerTokkul * itemTokkuPrice) *
                        Math.floor(itemsQuantity)
                    )}{" "}
                    <br />
                </span>
            </td>
        </tr>
    );
};

