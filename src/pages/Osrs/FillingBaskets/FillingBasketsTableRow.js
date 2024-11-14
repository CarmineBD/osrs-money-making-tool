import React from "react";

export const FillingBasketsTableRow = ({
    getObjectById,
    inputs,
    outputs,
}) => {
    const filledBasketItem = getObjectById(outputs[0].itemId)
    const basketItem = getObjectById(inputs[0].itemId)
    const materialBasketItem = getObjectById(inputs[1].itemId)

    function formatNumber(numero) {
        const esNegativo = numero < 0;
        numero = Math.abs(numero);

        let resultado;

        if (numero >= 1000 && numero < 1000000) {
            // Eliminar los últimos 3 dígitos y añadir 'k'
            resultado = Math.floor(numero / 1000) + 'k';
        } else if (numero >= 1000000 && numero < 1000000000) {
            // Eliminar los últimos 4 dígitos, añadir '.' y 'm'
            const millones = Math.floor(numero / 100000) / 10; // Dividido entre 100000 para conservar el decimal
            resultado = millones.toFixed(1) + 'm';
        } else {
            // Si no cumple con las condiciones anteriores, devuelve el número tal cual
            resultado = numero.toString();
        }

        // Si el número original era negativo, añadir el signo negativo
        return esNegativo ? `-${resultado}` : resultado;
    }

    return (
        <tr>
            {/* IMG */}
            <td>
                <a href={"https://prices.osrs.cloud/item/" + outputs[0].itemId} target="blank">
                    <img src={filledBasketItem?.image} alt="" />
                </a>
            </td>

            {/* Profit/hr */}
            <td>
                <span style={{ fontSize: "10px", color: "#888" }}>
                    {formatNumber(Math.floor(((filledBasketItem.high * 0.99) - (materialBasketItem.low * 5) - basketItem.low) * 2400))}
                    <br />
                </span>
                <span>
                    {formatNumber(Math.floor(((filledBasketItem.low * 0.99) - (materialBasketItem.high * 5) - basketItem.high) * 2400))}
                    <br />
                </span>
            </td>

            {/* <td>
                {JSON.stringify(basketItem)}
            </td> */}

            {/* 
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
            </td> */}

        </tr>
    );
};

