import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Osrs.css';
import TokkulProfitTable from './Tokkul/Calculator/TokkulProfitTable';
import { FillingBasketsTable } from './FillingBaskets/FillingBasketsTable';
import { CraftingTable } from './CraftingTable/CraftingTable';

const OsrsTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // Estado para el contador

  useEffect(() => {
    actualizarPrecios(); // Llama a la función al inicio

    const intervalo = setInterval(() => {
      actualizarPrecios();
      setTimeLeft(60); // Reinicia el contador a 60 segundos tras cada actualización
    }, 60000);

    const countdown = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000); // Actualiza el tiempo restante cada segundo

    return () => {
      clearInterval(intervalo);
      clearInterval(countdown);
    };
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/data/osrs')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los datos de Osrs:', error);
      });
  }, []);

  const getObjectById = (id) => {
    return data.find((item) => item.id === id);
  };

  const actualizarPrecios = async () => {
    setIsLoading(true);
    try {
      const mappingResponse = await axios.get(
        'https://prices.runescape.wiki/api/v1/osrs/mapping'
      );
      const latestResponse = await axios.get(
        'https://prices.runescape.wiki/api/v1/osrs/latest'
      );

      const mappingData = mappingResponse.data;
      const latestData = latestResponse.data.data;

      const combinedData = mappingData.map((item) => {
        const id = item.id.toString();
        const { icon, ...rest } = item;
        const image = `https://secure.runescape.com/m=itemdb_oldschool/obj_sprite.gif?id=${id}`;

        return {
          ...rest,
          ...latestData[id],
          image,
        };
      });

      setData(combinedData);
    } catch (error) {
      console.error('Error al obtener los datos de Osrs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (data.length === 0) {
    return <img src="../../../../public/assets/loading.gif" alt="" />; // Muestra un mensaje de carga mientras se obtiene la data
  }

  function tiempoTranscurrido(desdeTiempoUnix) {
    const ahora = Math.floor(Date.now() / 1000); // Obtener el tiempo actual en segundos
    const diferencia = ahora - desdeTiempoUnix;

    const dias = Math.floor(diferencia / (60 * 60 * 24));
    const horas = Math.floor((diferencia % (60 * 60 * 24)) / (60 * 60));
    const minutos = Math.floor((diferencia % (60 * 60)) / 60);

    let resultado = '';

    if (dias > 0) {
      resultado += `${dias}d `;
    }
    if (horas > 0) {
      resultado += `${horas}h `;
    }
    if (minutos > 0) {
      resultado += `${minutos}m`;
    }

    // Eliminar el espacio extra al final si hay algún componente de tiempo
    if (resultado.endsWith(' ')) {
      resultado = resultado.slice(0, -1);
    }

    return resultado;
  }

  return (
    <div className="osrs">
      <button onClick={actualizarPrecios} disabled={isLoading}>
        {isLoading ? 'Actualizando...' : 'Actualizar Precios'}
      </button>

      <p>Próxima actualización en: {timeLeft} segundos</p>

      <TokkulProfitTable getObjectById={getObjectById}></TokkulProfitTable>

      <h2>Buy table</h2>
      <table style={{ marginBottom: '4rem' }}>
        <thead>
          <th>img</th>
          <th>low price</th>
          <th>high price</th>
          <th>tokkul cost</th>
          <th>gp/tokkul low</th>
          <th>gp/tokkul high</th>
          <th>Last insta sell</th>
          <th>Last insta buy</th>
        </thead>
        <tbody>
          <tr>
            <td>
              <a href="https://prices.osrs.cloud/item/6568" target="blank">
                <img src={getObjectById(6568)?.image} alt="" />
              </a>
            </td>
            <td>{getObjectById(6568)?.low.toLocaleString()}</td>
            <td>{getObjectById(6568)?.high.toLocaleString()}</td>
            <td>{(78000).toLocaleString()}</td>
            <td>{(getObjectById(6568)?.low / 78000).toFixed(2)}</td>
            <td>{(getObjectById(6568)?.high / 78000).toFixed(2)}</td>
            <td>{tiempoTranscurrido(getObjectById(6568)?.highTime)}</td>
            <td>{tiempoTranscurrido(getObjectById(6568)?.lowTime)}</td>
          </tr>
          <tr>
            <td>
              <a href="https://prices.osrs.cloud/item/21298" target="blank">
                <img src={getObjectById(21298)?.image} alt="" />
              </a>
            </td>
            <td>{getObjectById(21298)?.low.toLocaleString()}</td>
            <td>{getObjectById(21298)?.high.toLocaleString()}</td>
            <td>{(73216).toLocaleString()}</td>
            <td>{(getObjectById(21298)?.low / 73216).toFixed(2)}</td>
            <td>{(getObjectById(21298)?.high / 73216).toFixed(2)}</td>
            <td>{tiempoTranscurrido(getObjectById(21298)?.lowTime)}</td>
            <td>{tiempoTranscurrido(getObjectById(21298)?.highTime)}</td>
          </tr>
          <tr>
            <td>
              <a href="https://prices.osrs.cloud/item/21301" target="blank">
                <img src={getObjectById(21301)?.image} alt="" />
              </a>
            </td>
            <td>{getObjectById(21301)?.low.toLocaleString()}</td>
            <td>{getObjectById(21301)?.high.toLocaleString()}</td>
            <td>{(109200).toLocaleString()}</td>
            <td>{(getObjectById(21301)?.low / 109200).toFixed(2)}</td>
            <td>{(getObjectById(21301)?.high / 109200).toFixed(2)}</td>
            <td>{tiempoTranscurrido(getObjectById(21301)?.lowTime)}</td>
            <td>{tiempoTranscurrido(getObjectById(21301)?.highTime)}</td>
          </tr>
          <tr>
            <td>
              <a href="https://prices.osrs.cloud/item/21304" target="blank">
                <img src={getObjectById(21304)?.image} alt="" />
              </a>
            </td>
            <td>{getObjectById(21304)?.low.toLocaleString()}</td>
            <td>{getObjectById(21304)?.high.toLocaleString()}</td>
            <td>{(87100).toLocaleString()}</td>
            <td>{(getObjectById(21304)?.low / 87100).toFixed(2)}</td>
            <td>{(getObjectById(21304)?.high / 87100).toFixed(2)}</td>
            <td>{tiempoTranscurrido(getObjectById(21304)?.lowTime)}</td>
            <td>{tiempoTranscurrido(getObjectById(21304)?.highTime)}</td>
          </tr>
          <tr>
            <td>
              <a href="https://prices.osrs.cloud/item/21279" target="blank">
                <img src={getObjectById(21279)?.image} alt="" />
              </a>
            </td>
            <td>{getObjectById(21279)?.low.toLocaleString()}</td>
            <td>{getObjectById(21279)?.high.toLocaleString()}</td>
            <td>{(269516).toLocaleString()}</td>
            <td>{(getObjectById(21279)?.low / 269516).toFixed(2)}</td>
            <td>{(getObjectById(21279)?.high / 269516).toFixed(2)}</td>
            <td>{tiempoTranscurrido(getObjectById(21279)?.lowTime)}</td>
            <td>{tiempoTranscurrido(getObjectById(21279)?.highTime)}</td>
          </tr>

          <tr>
            <td>
              <a href="https://prices.osrs.cloud/item/6571" target="blank">
                <img src={getObjectById(6571)?.image} alt="" />
              </a>
            </td>
            <td>{getObjectById(6571)?.low.toLocaleString()}</td>
            <td>{getObjectById(6571)?.high.toLocaleString()}</td>
            <td>{(260000).toLocaleString()}</td>
            <td>{(getObjectById(6571)?.low / 260000).toFixed(2)}</td>
            <td>{(getObjectById(6571)?.high / 260000).toFixed(2)}</td>
            <td>{tiempoTranscurrido(getObjectById(6571)?.lowTime)}</td>
            <td>{tiempoTranscurrido(getObjectById(6571)?.highTime)}</td>
          </tr>
        </tbody>
      </table>

      <h2>Sell table</h2>
      <table style={{ marginBottom: '4rem' }}>
        <thead>
          <th>img</th>
          <th>low price</th>
          <th>high price</th>
          <th>tokkul sold price</th>
          <th>tokkul/gp low</th>
          <th>tokkul/gp high</th>
        </thead>
        <tbody>
          <tr>
            <td>
              <a href="https://prices.osrs.cloud/item/447" target="blank">
                <img src={getObjectById(447)?.image} alt="" />
              </a>
            </td>
            <td>{getObjectById(447)?.low.toLocaleString()}</td>
            <td>{getObjectById(447)?.high.toLocaleString()}</td>
            <td>{(16).toLocaleString()}</td>
            <td>{(getObjectById(447)?.low / 16).toFixed(2)}</td>
            <td>{(getObjectById(447)?.high / 16).toFixed(2)}</td>
          </tr>

          <tr>
            <td>
              <a href="https://prices.osrs.cloud/item/442" target="blank">
                <img src={getObjectById(442)?.image} alt="" />
              </a>
            </td>
            <td>{getObjectById(442)?.low.toLocaleString()}</td>
            <td>{getObjectById(442)?.high.toLocaleString()}</td>
            <td>{(7).toLocaleString()}</td>
            <td>{(getObjectById(442)?.low / 7).toFixed(2)}</td>
            <td>{(getObjectById(442)?.high / 7).toFixed(2)}</td>
          </tr>
          <tr>
            <td>
              <a href="https://prices.osrs.cloud/item/444" target="blank">
                <img src={getObjectById(444)?.image} alt="" />
              </a>
            </td>
            <td>{getObjectById(444)?.low.toLocaleString()}</td>
            <td>{getObjectById(444)?.high.toLocaleString()}</td>
            <td>{(7).toLocaleString()}</td>
            <td>{(getObjectById(444)?.low / 15).toFixed(2)}</td>
            <td>{(getObjectById(444)?.high / 15).toFixed(2)}</td>
          </tr>
          <tr>
            <td>
              <a href="https://prices.osrs.cloud/item/562" target="blank">
                <img src={getObjectById(562)?.image} alt="" />
              </a>
            </td>
            <td>{getObjectById(562)?.low.toLocaleString()}</td>
            <td>{getObjectById(562)?.high.toLocaleString()}</td>
            <td>{(9).toLocaleString()}</td>
            <td>{(getObjectById(562)?.low / 9).toFixed(2)}</td>
            <td>{(getObjectById(562)?.high / 9).toFixed(2)}</td>
          </tr>

          <tr>
            <td>
              <a href="https://prices.osrs.cloud/item/560" target="blank">
                <img src={getObjectById(560)?.image} alt="" />
              </a>
            </td>
            <td>{getObjectById(560)?.low.toLocaleString()}</td>
            <td>{getObjectById(560)?.high.toLocaleString()}</td>
            <td>{(18).toLocaleString()}</td>
            <td>{(getObjectById(560)?.low / 18).toFixed(2)}</td>
            <td>{(getObjectById(560)?.high / 18).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <h2>Crafting Jewellery</h2>
      <table style={{ marginBottom: '4rem' }}>
        <thead>
          <th>img</th>
          <th>low price</th>
          <th>high price</th>
          <th>low materials cost</th>
          <th>high materials cost</th>
          <th>B.L. ▼ - S.H. ▲</th>
          <th>B.H. ▲ - S.H. ▲</th>
          <th>B.L. ▼ - SL. ▼</th>
          <th>B.H. ▲ - SL. ▼</th>
        </thead>
        <tbody>
          <tr>
            <td>
              <a href="https://prices.osrs.cloud/item/19553" target="blank">
                <img src={getObjectById(19553)?.image} alt="" />
              </a>
            </td>
            <td>{getObjectById(19553)?.low.toLocaleString()}</td>
            <td>{getObjectById(19553)?.high.toLocaleString()}</td>
            <td>
              {(
                getObjectById(564)?.low +
                getObjectById(2357)?.low +
                getObjectById(6573)?.low +
                getObjectById(19529)?.low +
                getObjectById(566)?.low * 20 +
                getObjectById(565)?.low * 20
              ).toLocaleString()}
            </td>
            <td>
              {(
                getObjectById(564)?.high +
                getObjectById(2357)?.high +
                getObjectById(6573)?.high +
                getObjectById(19529)?.high +
                getObjectById(566)?.high * 20 +
                getObjectById(565)?.high * 20
              ).toLocaleString()}
            </td>
            <td>
              {Math.floor(
                getObjectById(19553)?.high * 0.99 -
                  (getObjectById(564)?.low +
                    getObjectById(2357)?.low +
                    getObjectById(6573)?.low +
                    getObjectById(19529)?.low +
                    getObjectById(566)?.low * 20 +
                    getObjectById(565)?.low * 20)
              ).toLocaleString()}
            </td>
            <td>
              {Math.floor(
                getObjectById(19553)?.high * 0.99 -
                  (getObjectById(564)?.high +
                    getObjectById(2357)?.high +
                    getObjectById(6573)?.high +
                    getObjectById(19529)?.high +
                    getObjectById(566)?.high * 20 +
                    getObjectById(565)?.high * 20)
              ).toLocaleString()}
            </td>
            <td>
              {Math.floor(
                getObjectById(19553)?.low * 0.99 -
                  (getObjectById(564)?.low +
                    getObjectById(2357)?.low +
                    getObjectById(6573)?.low +
                    getObjectById(19529)?.low +
                    getObjectById(566)?.low * 20 +
                    getObjectById(565)?.low * 20)
              ).toLocaleString()}
            </td>
            <td>
              {Math.floor(
                getObjectById(19553)?.low * 0.99 -
                  (getObjectById(564)?.high +
                    getObjectById(2357)?.high +
                    getObjectById(6573)?.high +
                    getObjectById(19529)?.high +
                    getObjectById(566)?.high * 20 +
                    getObjectById(565)?.high * 20)
              ).toLocaleString()}
            </td>
          </tr>
          <tr>
            <td>
              <a href="https://prices.osrs.cloud/item/19547" target="blank">
                <img src={getObjectById(19547)?.image} alt="" />
              </a>
            </td>
            <td>{getObjectById(19547)?.low.toLocaleString()}</td>
            <td>{getObjectById(19547)?.high.toLocaleString()}</td>
            <td>
              {(
                getObjectById(564)?.low +
                getObjectById(2357)?.low +
                getObjectById(6573)?.low +
                getObjectById(19529)?.low +
                getObjectById(566)?.low * 20 +
                getObjectById(565)?.low * 20
              ).toLocaleString()}
            </td>
            <td>
              {(
                getObjectById(564)?.high +
                getObjectById(2357)?.high +
                getObjectById(6573)?.high +
                getObjectById(19529)?.high +
                getObjectById(566)?.high * 20 +
                getObjectById(565)?.high * 20
              ).toLocaleString()}
            </td>
            <td>
              {Math.floor(
                getObjectById(19547)?.high * 0.99 -
                  (getObjectById(564)?.low +
                    getObjectById(2357)?.low +
                    getObjectById(6573)?.low +
                    getObjectById(19529)?.low +
                    getObjectById(566)?.low * 20 +
                    getObjectById(565)?.low * 20)
              ).toLocaleString()}
            </td>
            <td>
              {Math.floor(
                getObjectById(19547)?.high * 0.99 -
                  (getObjectById(564)?.high +
                    getObjectById(2357)?.high +
                    getObjectById(6573)?.high +
                    getObjectById(19529)?.high +
                    getObjectById(566)?.high * 20 +
                    getObjectById(565)?.high * 20)
              ).toLocaleString()}
            </td>
            <td>
              {Math.floor(
                getObjectById(19547)?.low * 0.99 -
                  (getObjectById(564)?.low +
                    getObjectById(2357)?.low +
                    getObjectById(6573)?.low +
                    getObjectById(19529)?.low +
                    getObjectById(566)?.low * 20 +
                    getObjectById(565)?.low * 20)
              ).toLocaleString()}
            </td>
            <td>
              {Math.floor(
                getObjectById(19547)?.low * 0.99 -
                  (getObjectById(564)?.high +
                    getObjectById(2357)?.high +
                    getObjectById(6573)?.high +
                    getObjectById(19529)?.high +
                    getObjectById(566)?.high * 20 +
                    getObjectById(565)?.high * 20)
              ).toLocaleString()}
            </td>
          </tr>

          <tr>
            <td>
              <a href="https://prices.osrs.cloud/item/19550" target="blank">
                <img src={getObjectById(19550)?.image} alt="" />
              </a>
            </td>
            <td>{getObjectById(19550)?.low.toLocaleString()}</td>
            <td>{getObjectById(19550)?.high.toLocaleString()}</td>
            <td>
              {(
                getObjectById(564)?.low +
                getObjectById(2357)?.low +
                getObjectById(6573)?.low +
                getObjectById(19529)?.low +
                getObjectById(566)?.low * 20 +
                getObjectById(565)?.low * 20
              ).toLocaleString()}
            </td>
            <td>
              {(
                getObjectById(564)?.high +
                getObjectById(2357)?.high +
                getObjectById(6573)?.high +
                getObjectById(19529)?.high +
                getObjectById(566)?.high * 20 +
                getObjectById(565)?.high * 20
              ).toLocaleString()}
            </td>
            <td>
              {Math.floor(
                getObjectById(19550)?.high * 0.99 -
                  (getObjectById(564)?.low +
                    getObjectById(2357)?.low +
                    getObjectById(6573)?.low +
                    getObjectById(19529)?.low +
                    getObjectById(566)?.low * 20 +
                    getObjectById(565)?.low * 20)
              ).toLocaleString()}
            </td>
            <td>
              {Math.floor(
                getObjectById(19550)?.high * 0.99 -
                  (getObjectById(564)?.high +
                    getObjectById(2357)?.high +
                    getObjectById(6573)?.high +
                    getObjectById(19529)?.high +
                    getObjectById(566)?.high * 20 +
                    getObjectById(565)?.high * 20)
              ).toLocaleString()}
            </td>
            <td>
              {Math.floor(
                getObjectById(19550)?.low * 0.99 -
                  (getObjectById(564)?.low +
                    getObjectById(2357)?.low +
                    getObjectById(6573)?.low +
                    getObjectById(19529)?.low +
                    getObjectById(566)?.low * 20 +
                    getObjectById(565)?.low * 20)
              ).toLocaleString()}
            </td>
            <td>
              {Math.floor(
                getObjectById(19550)?.low * 0.99 -
                  (getObjectById(564)?.high +
                    getObjectById(2357)?.high +
                    getObjectById(6573)?.high +
                    getObjectById(19529)?.high +
                    getObjectById(566)?.high * 20 +
                    getObjectById(565)?.high * 20)
              ).toLocaleString()}
            </td>
          </tr>

          <tr>
            <td>
              <a href="https://prices.osrs.cloud/item/19544" target="blank">
                <img src={getObjectById(19544)?.image} alt="" />
              </a>
            </td>
            <td>{getObjectById(19544)?.low.toLocaleString()}</td>
            <td>{getObjectById(19544)?.high.toLocaleString()}</td>
            <td>
              {(
                getObjectById(564)?.low +
                getObjectById(2357)?.low +
                getObjectById(6573)?.low +
                getObjectById(19529)?.low +
                getObjectById(566)?.low * 20 +
                getObjectById(565)?.low * 20
              ).toLocaleString()}
            </td>
            <td>
              {(
                getObjectById(564)?.high +
                getObjectById(2357)?.high +
                getObjectById(6573)?.high +
                getObjectById(19529)?.high +
                getObjectById(566)?.high * 20 +
                getObjectById(565)?.high * 20
              ).toLocaleString()}
            </td>
            <td>
              {Math.floor(
                getObjectById(19544)?.high * 0.99 -
                  (getObjectById(564)?.low +
                    getObjectById(2357)?.low +
                    getObjectById(6573)?.low +
                    getObjectById(19529)?.low +
                    getObjectById(566)?.low * 20 +
                    getObjectById(565)?.low * 20)
              ).toLocaleString()}
            </td>
            <td>
              {Math.floor(
                getObjectById(19544)?.high * 0.99 -
                  (getObjectById(564)?.high +
                    getObjectById(2357)?.high +
                    getObjectById(6573)?.high +
                    getObjectById(19529)?.high +
                    getObjectById(566)?.high * 20 +
                    getObjectById(565)?.high * 20)
              ).toLocaleString()}
            </td>
            <td>
              {Math.floor(
                getObjectById(19544)?.low * 0.99 -
                  (getObjectById(564)?.low +
                    getObjectById(2357)?.low +
                    getObjectById(6573)?.low +
                    getObjectById(19529)?.low +
                    getObjectById(566)?.low * 20 +
                    getObjectById(565)?.low * 20)
              ).toLocaleString()}
            </td>
            <td>
              {Math.floor(
                getObjectById(19544)?.low * 0.99 -
                  (getObjectById(564)?.high +
                    getObjectById(2357)?.high +
                    getObjectById(6573)?.high +
                    getObjectById(19529)?.high +
                    getObjectById(566)?.high * 20 +
                    getObjectById(565)?.high * 20)
              ).toLocaleString()}
            </td>
          </tr>
          <tr>
            <td>
              <a href="https://prices.osrs.cloud/item/6585" target="blank">
                <img src={getObjectById(6585)?.image} alt="" />
              </a>
            </td>
            <td>{getObjectById(6585)?.low.toLocaleString()}</td>
            <td>{getObjectById(6585)?.high.toLocaleString()}</td>
            <td>
              {(
                getObjectById(564)?.low +
                getObjectById(2357)?.low +
                getObjectById(6573)?.low
              ).toLocaleString()}
            </td>
            <td>
              {(
                getObjectById(564)?.high +
                getObjectById(2357)?.high +
                getObjectById(6573)?.high
              ).toLocaleString()}
            </td>
            <td>
              {Math.floor(
                getObjectById(6585)?.high * 0.99 -
                  (getObjectById(564)?.low +
                    getObjectById(2357)?.low +
                    getObjectById(6573)?.low)
              ).toLocaleString()}
            </td>
            <td>
              {Math.floor(
                getObjectById(6585)?.high * 0.99 -
                  (getObjectById(564)?.high +
                    getObjectById(2357)?.high +
                    getObjectById(6573)?.high)
              ).toLocaleString()}
            </td>
            <td>
              {Math.floor(
                getObjectById(6585)?.low * 0.99 -
                  (getObjectById(564)?.low +
                    getObjectById(2357)?.low +
                    getObjectById(6573)?.low)
              ).toLocaleString()}
            </td>
            <td>
              {Math.floor(
                getObjectById(6585)?.low * 0.99 -
                  (getObjectById(564)?.high +
                    getObjectById(2357)?.high +
                    getObjectById(6573)?.high)
              ).toLocaleString()}
            </td>
          </tr>

          <tr>
            <td>
              <a href="https://prices.osrs.cloud/item/11133" target="blank">
                <img src={getObjectById(11133)?.image} alt="" />
              </a>
            </td>
            <td>{getObjectById(11133)?.low.toLocaleString()}</td>
            <td>{getObjectById(11133)?.high.toLocaleString()}</td>
            <td>
              {(
                getObjectById(564)?.low +
                getObjectById(2357)?.low +
                getObjectById(6573)?.low
              ).toLocaleString()}
            </td>
            <td>
              {(
                getObjectById(564)?.high +
                getObjectById(2357)?.high +
                getObjectById(6573)?.high
              ).toLocaleString()}
            </td>
            <td>
              {Math.floor(
                getObjectById(11133)?.high * 0.99 -
                  (getObjectById(564)?.low +
                    getObjectById(2357)?.low +
                    getObjectById(6573)?.low)
              ).toLocaleString()}
            </td>
            <td>
              {Math.floor(
                getObjectById(11133)?.high * 0.99 -
                  (getObjectById(564)?.high +
                    getObjectById(2357)?.high +
                    getObjectById(6573)?.high)
              ).toLocaleString()}
            </td>
            <td>
              {Math.floor(
                getObjectById(11133)?.low * 0.99 -
                  (getObjectById(564)?.low +
                    getObjectById(2357)?.low +
                    getObjectById(6573)?.low)
              ).toLocaleString()}
            </td>
            <td>
              {Math.floor(
                getObjectById(11133)?.low * 0.99 -
                  (getObjectById(564)?.high +
                    getObjectById(2357)?.high +
                    getObjectById(6573)?.high)
              ).toLocaleString()}
            </td>
          </tr>

          <tr>
            <td>
              <a href="https://prices.osrs.cloud/    tem/6583" target="blank">
                <img src={getObjectById(6583)?.image} alt="" />
              </a>
            </td>
            <td>{getObjectById(6583)?.low.toLocaleString()}</td>
            <td>{getObjectById(6583)?.high.toLocaleString()}</td>
            <td>
              {(
                getObjectById(564)?.low +
                getObjectById(2357)?.low +
                getObjectById(6573)?.low
              ).toLocaleString()}
            </td>
            <td>
              {(
                getObjectById(564)?.high +
                getObjectById(2357)?.high +
                getObjectById(6573)?.high
              ).toLocaleString()}
            </td>
            <td>
              {Math.floor(
                getObjectById(6583)?.high * 0.99 -
                  (getObjectById(564)?.low +
                    getObjectById(2357)?.low +
                    getObjectById(6573)?.low)
              ).toLocaleString()}
            </td>
            <td>
              {Math.floor(
                getObjectById(6583)?.high * 0.99 -
                  (getObjectById(564)?.high +
                    getObjectById(2357)?.high +
                    getObjectById(6573)?.high)
              ).toLocaleString()}
            </td>
            <td>
              {Math.floor(
                getObjectById(6583)?.low * 0.99 -
                  (getObjectById(564)?.low +
                    getObjectById(2357)?.low +
                    getObjectById(6573)?.low)
              ).toLocaleString()}
            </td>
            <td>
              {Math.floor(
                getObjectById(6583)?.low * 0.99 -
                  (getObjectById(564)?.high +
                    getObjectById(2357)?.high +
                    getObjectById(6573)?.high)
              ).toLocaleString()}
            </td>
          </tr>

          <tr>
            <td>
              <a href="https://prices.osrs.cloud/item/11128" target="blank">
                <img src={getObjectById(11128)?.image} alt="" />
              </a>
            </td>
            <td>{getObjectById(11128)?.low.toLocaleString()}</td>
            <td>{getObjectById(11128)?.high.toLocaleString()}</td>
            <td>
              {(
                getObjectById(564)?.low +
                getObjectById(2357)?.low +
                getObjectById(6573)?.low
              ).toLocaleString()}
            </td>
            <td>
              {(
                getObjectById(564)?.high +
                getObjectById(2357)?.high +
                getObjectById(6573)?.high
              ).toLocaleString()}
            </td>
            <td>
              {Math.floor(
                getObjectById(11128)?.high * 0.99 -
                  (getObjectById(564)?.low +
                    getObjectById(2357)?.low +
                    getObjectById(6573)?.low)
              ).toLocaleString()}
            </td>
            <td>
              {Math.floor(
                getObjectById(11128)?.high * 0.99 -
                  (getObjectById(564)?.high +
                    getObjectById(2357)?.high +
                    getObjectById(6573)?.high)
              ).toLocaleString()}
            </td>
            <td>
              {Math.floor(
                getObjectById(11128)?.low * 0.99 -
                  (getObjectById(564)?.low +
                    getObjectById(2357)?.low +
                    getObjectById(6573)?.low)
              ).toLocaleString()}
            </td>
            <td>
              {Math.floor(
                getObjectById(11128)?.low * 0.99 -
                  (getObjectById(564)?.high +
                    getObjectById(2357)?.high +
                    getObjectById(6573)?.high)
              ).toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Emblems</h2>
      <table style={{ marginBottom: '4rem' }}>
        <thead>
          <th>img</th>
          <th>low price</th>
          <th>high price</th>
          <th>low profit</th>
          <th>high profit</th>
          <th>Last insta sell</th>
          <th>Last insta buy</th>
        </thead>
        <tbody>
          <tr>
            <td>
              <a href="https://prices.osrs.cloud/item/21807" target="blank">
                <img src={getObjectById(21807)?.image} alt="" />
              </a>
            </td>
            <td>{getObjectById(21807)?.low.toLocaleString()}</td>
            <td>{getObjectById(21807)?.high.toLocaleString()}</td>
            <td>
              {(500000 - getObjectById(21807)?.low).toLocaleString()}
              <br />
              {(
                ((500000 - getObjectById(21807)?.low) * 100) /
                getObjectById(21807)?.low
              ).toLocaleString() + '%'}
              <br />
              {((500000 - getObjectById(21807)?.low) * 27).toLocaleString() +
                ' /inv'}{' '}
              <br />
            </td>
            <td>
              {(500000 - getObjectById(21807)?.high).toLocaleString()}
              <br />
              {(
                ((500000 - getObjectById(21807)?.high) * 100) /
                getObjectById(21807)?.high
              ).toLocaleString() + '%'}
              <br />
              {((500000 - getObjectById(21807)?.high) * 27).toLocaleString() +
                ' /inv'}{' '}
              <br />
            </td>
            <td>{tiempoTranscurrido(getObjectById(21807)?.highTime)}</td>
            <td>{tiempoTranscurrido(getObjectById(21807)?.lowTime)}</td>
          </tr>

          <tr>
            <td>
              <a href="https://prices.osrs.cloud/item/21810" target="blank">
                <img src={getObjectById(21810)?.image} alt="" />
              </a>
            </td>
            <td>{getObjectById(21810)?.low.toLocaleString()}</td>
            <td>{getObjectById(21810)?.high.toLocaleString()}</td>
            <td>
              {(1000000 - getObjectById(21810)?.low).toLocaleString()}
              <br />
              {(
                ((1000000 - getObjectById(21810)?.low) * 100) /
                getObjectById(21810)?.low
              ).toLocaleString() + '%'}
              <br />
              {((1000000 - getObjectById(21810)?.low) * 27).toLocaleString() +
                ' /inv'}{' '}
              <br />
            </td>
            <td>
              {(1000000 - getObjectById(21810)?.high).toLocaleString()}
              <br />
              {(
                ((1000000 - getObjectById(21810)?.high) * 100) /
                getObjectById(21810)?.high
              ).toLocaleString() + '%'}
              <br />
              {((1000000 - getObjectById(21810)?.high) * 27).toLocaleString() +
                ' /inv'}{' '}
              <br />
            </td>
            <td>{tiempoTranscurrido(getObjectById(21810)?.highTime)}</td>
            <td>{tiempoTranscurrido(getObjectById(21810)?.lowTime)}</td>
          </tr>
          <tr>
            <td>
              <a href="https://prices.osrs.cloud/item/21813" target="blank">
                <img src={getObjectById(21813)?.image} alt="" />
              </a>
            </td>
            <td>{getObjectById(21813)?.low.toLocaleString()}</td>
            <td>{getObjectById(21813)?.high.toLocaleString()}</td>
            <td>
              {(2000000 - getObjectById(21813)?.low).toLocaleString()}
              <br />
              {(
                ((2000000 - getObjectById(21813)?.low) * 100) /
                getObjectById(21813)?.low
              ).toLocaleString() + '%'}
              <br />
              {((2000000 - getObjectById(21813)?.low) * 27).toLocaleString() +
                ' /inv'}{' '}
              <br />
            </td>
            <td>
              {(2000000 - getObjectById(21813)?.high).toLocaleString()}
              <br />
              {(
                ((2000000 - getObjectById(21813)?.high) * 100) /
                getObjectById(21813)?.high
              ).toLocaleString() + '%'}
              <br />
              {((2000000 - getObjectById(21813)?.high) * 27).toLocaleString() +
                ' /inv'}{' '}
              <br />
            </td>
            <td>{tiempoTranscurrido(getObjectById(21813)?.highTime)}</td>
            <td>{tiempoTranscurrido(getObjectById(21813)?.lowTime)}</td>
          </tr>
          <tr>
            <td>
              <a href="https://prices.osrs.cloud/item/22299" target="blank">
                <img src={getObjectById(22299)?.image} alt="" />
              </a>
            </td>
            <td>{getObjectById(22299)?.low.toLocaleString()}</td>
            <td>{getObjectById(22299)?.high.toLocaleString()}</td>
            <td>
              {(4000000 - getObjectById(22299)?.low).toLocaleString()}
              <br />
              {(
                ((4000000 - getObjectById(22299)?.low) * 100) /
                getObjectById(22299)?.low
              ).toLocaleString() + '%'}
              <br />
              {((4000000 - getObjectById(22299)?.low) * 27).toLocaleString() +
                ' /inv'}{' '}
              <br />
            </td>
            <td>
              {(4000000 - getObjectById(22299)?.high).toLocaleString()}
              <br />
              {(
                ((4000000 - getObjectById(22299)?.high) * 100) /
                getObjectById(22299)?.high
              ).toLocaleString() + '%'}
              <br />
              {((4000000 - getObjectById(22299)?.high) * 27).toLocaleString() +
                ' /inv'}{' '}
              <br />
            </td>
            <td>{tiempoTranscurrido(getObjectById(22299)?.highTime)}</td>
            <td>{tiempoTranscurrido(getObjectById(22299)?.lowTime)}</td>
          </tr>

          <tr>
            <td>
              <a href="https://prices.osrs.cloud/item/22302" target="blank">
                <img src={getObjectById(22302)?.image} alt="" />
              </a>
            </td>
            <td>{getObjectById(22302)?.low.toLocaleString()}</td>
            <td>{getObjectById(22302)?.high.toLocaleString()}</td>
            <td>
              {(8000000 - getObjectById(22302)?.low).toLocaleString()}
              <br />
              {(
                ((8000000 - getObjectById(22302)?.low) * 100) /
                getObjectById(22302)?.low
              ).toLocaleString() + '%'}
              <br />
              {((8000000 - getObjectById(22302)?.low) * 27).toLocaleString() +
                ' /inv'}{' '}
              <br />
            </td>
            <td>
              {(8000000 - getObjectById(22302)?.high).toLocaleString()}
              <br />
              {(
                ((8000000 - getObjectById(22302)?.high) * 100) /
                getObjectById(22302)?.high
              ).toLocaleString() + '%'}
              <br />
              {((8000000 - getObjectById(22302)?.high) * 27).toLocaleString() +
                ' /inv'}{' '}
              <br />
            </td>
            <td>{tiempoTranscurrido(getObjectById(22302)?.highTime)}</td>
            <td>{tiempoTranscurrido(getObjectById(22302)?.lowTime)}</td>
          </tr>

          <tr>
            <td>
              <a href="https://prices.osrs.cloud/item/22305" target="blank">
                <img src={getObjectById(22305)?.image} alt="" />
              </a>
            </td>
            <td>{getObjectById(22305)?.low.toLocaleString()}</td>
            <td>{getObjectById(22305)?.high.toLocaleString()}</td>
            <td>
              {(16000000 - getObjectById(22305)?.low).toLocaleString()}
              <br />
              {(
                ((16000000 - getObjectById(22305)?.low) * 100) /
                getObjectById(22305)?.low
              ).toLocaleString() + '%'}
              <br />
              {((16000000 - getObjectById(22305)?.low) * 27).toLocaleString() +
                ' /inv'}{' '}
              <br />
            </td>
            <td>
              {(16000000 - getObjectById(22305)?.high).toLocaleString()}
              <br />
              {(
                ((16000000 - getObjectById(22305)?.high) * 100) /
                getObjectById(22305)?.high
              ).toLocaleString() + '%'}
              <br />
              {((16000000 - getObjectById(22305)?.high) * 27).toLocaleString() +
                ' /inv'}{' '}
              <br />
            </td>
            <td>{tiempoTranscurrido(getObjectById(22305)?.highTime)}</td>
            <td>{tiempoTranscurrido(getObjectById(22305)?.lowTime)}</td>
          </tr>
        </tbody>
      </table>

      <h2>Wards</h2>
      <table style={{ marginBottom: '4rem' }}>
        <thead>
          <th>img</th>
          <th>low price</th>
          <th>high price</th>
          <th>B.L. ▼ - S.H. ▲</th>
          <th>B.H. ▲ - S.H. ▲ </th>
          <th>B.H. ▲ - SL. ▼</th>
          <th>B.H. ▲ - SL. ▼</th>
        </thead>
        <tbody>
          <tr>
            <td>
              <a href="https://prices.osrs.cloud/item/11926" target="blank">
                <img src={getObjectById(11926)?.image} alt="" />
              </a>
            </td>
            <td>{getObjectById(11926)?.low.toLocaleString()}</td>
            <td>{getObjectById(11926)?.high.toLocaleString()}</td>
            <td>
              {(
                getObjectById(11926)?.high -
                getObjectById(11928)?.low -
                getObjectById(11929)?.low -
                getObjectById(11930)?.low
              ).toLocaleString()}
              <br />
            </td>
            <td>
              {(
                getObjectById(11926)?.high -
                getObjectById(11928)?.high -
                getObjectById(11929)?.high -
                getObjectById(11930)?.high
              ).toLocaleString()}
              <br />
            </td>

            <td>
              {(
                getObjectById(11926)?.low -
                getObjectById(11928)?.low -
                getObjectById(11929)?.low -
                getObjectById(11930)?.low
              ).toLocaleString()}
              <br />
            </td>
            <td>
              {(
                getObjectById(11926)?.low -
                getObjectById(11928)?.high -
                getObjectById(11929)?.high -
                getObjectById(11930)?.high
              ).toLocaleString()}
              <br />
            </td>
          </tr>

          <tr>
            <td>
              <a href="https://prices.osrs.cloud/item/11924" target="blank">
                <img src={getObjectById(11924)?.image} alt="" />
              </a>
            </td>
            <td>{getObjectById(11924)?.low.toLocaleString()}</td>
            <td>{getObjectById(11924)?.high.toLocaleString()}</td>
            <td>
              {(
                getObjectById(11924)?.high -
                getObjectById(11931)?.low -
                getObjectById(11932)?.low -
                getObjectById(11933)?.low
              ).toLocaleString()}
              <br />
            </td>
            <td>
              {(
                getObjectById(11924)?.high -
                getObjectById(11931)?.high -
                getObjectById(11932)?.high -
                getObjectById(11933)?.high
              ).toLocaleString()}
              <br />
            </td>

            <td>
              {(
                getObjectById(11924)?.low -
                getObjectById(11931)?.low -
                getObjectById(11932)?.low -
                getObjectById(11933)?.low
              ).toLocaleString()}
              <br />
            </td>
            <td>
              {(
                getObjectById(11924)?.low -
                getObjectById(11931)?.high -
                getObjectById(11932)?.high -
                getObjectById(11933)?.high
              ).toLocaleString()}
              <br />
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Cannon sets</h2>
      {/* Se hacen unos 180 sets por hora, o un 1inv de 6sets cada 2min */}
      <table style={{ marginBottom: '4rem' }}>
        <thead>
          <th>img</th>
          <th>gp/hr selling low</th>
          <th>gp/hr selling high</th>
        </thead>
        <tbody>
          <tr>
            <td>
              <a href="https://prices.osrs.cloud/item/12863" target="blank">
                <img src={getObjectById(12863)?.image} alt="" />
              </a>
            </td>
            <td>
              {((getObjectById(12863)?.low - 750000) * 180).toLocaleString() +
                ' gp/hr'}
            </td>
            <td>
              {((getObjectById(12863)?.high - 750000) * 180).toLocaleString() +
                ' gp/hr'}
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Dismantle items</h2>
      {/* Se hacen unos 180 sets por hora, o un 1inv de 6sets cada 2min */}
      <table style={{ marginBottom: '4rem' }}>
        <thead>
          <th>img</th>
          <th>low price</th>
          <th>high price</th>
          <th>B.L. ▼ - S.H. ▲</th>
          <th>B.H. ▲ - S.H. ▲ </th>
          <th>B.H. ▲ - SL. ▼</th>
          <th>B.H. ▲ - SL. ▼</th>
        </thead>
        <tbody>
          <tr>
            <td>
              <a href="https://prices.osrs.cloud/item/12932" target="blank">
                <img src={getObjectById(12932)?.image} alt="" />
              </a>
            </td>
            <td>{getObjectById(12932)?.low.toLocaleString()}</td>
            <td>{getObjectById(12932)?.high.toLocaleString()}</td>
            <td>
              {(
                getObjectById(12934)?.high * 20000 -
                getObjectById(12932)?.low
              ).toLocaleString()}
              <br />
            </td>
            <td>
              {(
                getObjectById(12934)?.high * 20000 -
                getObjectById(12932)?.high
              ).toLocaleString()}
              <br />
            </td>

            <td>
              {(
                getObjectById(12934)?.low * 20000 -
                getObjectById(12932)?.low
              ).toLocaleString()}
              <br />
            </td>
            <td>
              {(
                getObjectById(12934)?.high * 20000 -
                getObjectById(12932)?.low
              ).toLocaleString()}
              <br />
            </td>
          </tr>
          <tr>
            <td>
              <a href="https://prices.osrs.cloud/item/12922" target="blank">
                <img src={getObjectById(12922)?.image} alt="" />
              </a>
            </td>
            <td>{getObjectById(12922)?.low.toLocaleString()}</td>
            <td>{getObjectById(12922)?.high.toLocaleString()}</td>
            <td>
              {(
                getObjectById(12934)?.high * 20000 -
                getObjectById(12922)?.low
              ).toLocaleString()}
              <br />
            </td>
            <td>
              {(
                getObjectById(12934)?.high * 20000 -
                getObjectById(12922)?.high
              ).toLocaleString()}
              <br />
            </td>

            <td>
              {(
                getObjectById(12934)?.low * 20000 -
                getObjectById(12922)?.low
              ).toLocaleString()}
              <br />
            </td>
            <td>
              {(
                getObjectById(12934)?.low * 20000 -
                getObjectById(12922)?.high
              ).toLocaleString()}
              <br />
            </td>
          </tr>
          <tr>
            <td>
              <a href="https://prices.osrs.cloud/item/12927" target="blank">
                <img src={getObjectById(12927)?.image} alt="" />
              </a>
            </td>
            <td>{getObjectById(12927)?.low.toLocaleString()}</td>
            <td>{getObjectById(12927)?.high.toLocaleString()}</td>
            <td>
              {(
                getObjectById(12934)?.high * 20000 -
                getObjectById(12927)?.low
              ).toLocaleString()}
              <br />
            </td>
            <td>
              {(
                getObjectById(12934)?.high * 20000 -
                getObjectById(12927)?.high
              ).toLocaleString()}
              <br />
            </td>

            <td>
              {(
                getObjectById(12934)?.low * 20000 -
                getObjectById(12927)?.low
              ).toLocaleString()}
              <br />
            </td>
            <td>
              {(
                getObjectById(12934)?.low * 20000 -
                getObjectById(12927)?.high
              ).toLocaleString()}
              <br />
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Combining / charging</h2>
      {/* Se hacen unos 180 sets por hora, o un 1inv de 6sets cada 2min */}
      <table style={{ marginBottom: '4rem' }}>
        <thead>
          <th>img</th>
          <th>low price</th>
          <th>high price</th>
          <th>B.L. ▼ - S.H. ▲</th>
          <th>B.H. ▲ - S.H. ▲ </th>
          <th>B.H. ▲ - SL. ▼</th>
          <th>B.H. ▲ - SL. ▼</th>
        </thead>
        <tbody>
          <tr>
            <td>
              <a href="https://prices.osrs.cloud/item/22294" target="blank">
                <img src={getObjectById(22294)?.image} alt="" />
              </a>
            </td>
            <td>{getObjectById(22294)?.low.toLocaleString()}</td>
            <td>{getObjectById(22294)?.high.toLocaleString()}</td>
            <td>
              {(
                getObjectById(22294)?.high -
                getObjectById(12004)?.low * 10 -
                getObjectById(12900)?.low
              ).toLocaleString()}
              <br />
            </td>
            <td>
              {(
                getObjectById(22294)?.high -
                getObjectById(12004)?.high * 10 -
                getObjectById(12900)?.high
              ).toLocaleString()}
              <br />
            </td>
            <td>
              {(
                getObjectById(22294)?.low -
                getObjectById(12004)?.low * 10 -
                getObjectById(12900)?.low
              ).toLocaleString()}
              <br />
            </td>
            <td>
              {(
                getObjectById(22294)?.low -
                getObjectById(12004)?.high * 10 -
                getObjectById(12900)?.high
              ).toLocaleString()}
              <br />
            </td>
          </tr>
        </tbody>
      </table>

      <FillingBasketsTable getObjectById={getObjectById}></FillingBasketsTable>

      <CraftingTable getObjectById={getObjectById}></CraftingTable>
    </div>
  );
};

export default OsrsTable;

// 19553
// 19547
// 19550
// 19544
// 6585
// 11133
// 6583
// 11128
