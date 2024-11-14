import React from 'react';

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

export const CraftingRow = ({ getObjectById, inputItems, outputItems }) => {
  const principalOutputItem = getObjectById(outputItems[0].id);

  const lowPriceInputItems = inputItems.reduce(
    (acc, item) => acc + getObjectById(item.id).low * item.quantity,
    0
  );

  const highPriceInputItems = inputItems.reduce(
    (acc, item) => acc + getObjectById(item.id).high * item.quantity,
    0
  );

  const lowPriceOutputItems = Math.floor(
    outputItems.reduce(
      (acc, item) => acc + getObjectById(item.id).low * 0.99 * item.quantity,
      0
    )
  );

  const highPriceOutputItems = Math.floor(
    outputItems.reduce(
      (acc, item) => acc + getObjectById(item.id).high * 0.99 * item.quantity,
      0
    )
  );

  return (
    <tr>
      {/* IMG */}
      <td>
        <a
          href={'https://prices.osrs.cloud/item/' + outputItems[0].id}
          target="blank"
        >
          <img
            src={principalOutputItem?.image}
            alt=""
            title={principalOutputItem.name}
          />
        </a>
        {/* <p>{JSON.stringify(principalOutputItem)}</p> */}
      </td>

      <td>
        <span>{lowPriceOutputItems.toLocaleString()}</span>
      </td>
      <td>
        <span>{highPriceOutputItems.toLocaleString()}</span>
      </td>
      <td>
        <span>{formatNumber(highPriceOutputItems - lowPriceInputItems)}</span>
        <br />
        <span style={{ fontSize: '10px', color: '#888' }}>
          {(
            ((highPriceOutputItems - lowPriceInputItems) * 100) /
            highPriceOutputItems
          ).toFixed(1) + ' %'}
        </span>
      </td>
      <td>
        <span>{formatNumber(highPriceOutputItems - highPriceInputItems)}</span>
      </td>
      <td>
        <span>{formatNumber(lowPriceOutputItems - lowPriceInputItems)}</span>
      </td>
      <td>
        <span>{formatNumber(lowPriceOutputItems - highPriceInputItems)}</span>
      </td>
    </tr>
  );
};
