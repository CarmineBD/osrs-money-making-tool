import React, { useState } from 'react';
import { TokkulProfitTableRow } from './TokkulProfitTableRow';

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


const TokkulProfitTable = ({ getObjectById }) => {
    const [mithrilQuantity, setmithrilQuantity] = useState(780000);
    const [silverQuantity, setsilverQuantity] = useState(780000);
    const [goldQuantity, setgoldQuantity] = useState(0);
    const [chaosRuneQuantity, setchaosRuneQuantity] = useState(0);
    const [deathRuneQuantity, setdeathRuneQuantity] = useState(0);
    const [mithrilPrice, setmithrilPrice] = useState(getObjectById(447)?.high);
    const [silverPrice, setsilverPrice] = useState(getObjectById(442)?.high);
    const [goldPrice, setgoldPrice] = useState(getObjectById(444)?.high);
    const [chaosRunePrice, setchaosRunePrice] = useState(getObjectById(562)?.high);
    const [deathRunePrice, setdeathRunePrice] = useState(getObjectById(560)?.high);

    const handleChangemithrilQuantity = (e) => {
        const valor = e.target.value === "" ? 0 : parseInt(e.target.value, 10);
        setmithrilQuantity(valor);
    };

    const handleChangesilverQuantity = (e) => {
        const valor = e.target.value === "" ? 0 : parseInt(e.target.value, 10);
        setsilverQuantity(valor);
    };

    const handleChangegoldQuantity = (e) => {
        const valor = e.target.value === "" ? 0 : parseInt(e.target.value, 10);
        setgoldQuantity(valor);
    };

    const handleChangechaosRuneQuantity = (e) => {
        const valor = e.target.value === "" ? 0 : parseInt(e.target.value, 10);
        setchaosRuneQuantity(valor);
    };

    const handleChangedeathRuneQuantity = (e) => {
        const valor = e.target.value === "" ? 0 : parseInt(e.target.value, 10);
        setdeathRuneQuantity(valor);
    };

    const handleChangemithrilPrice = (e) => {
        const valor = parseInt(e.target.value, 10);
        setmithrilPrice(valor);
    };

    const handleChangesilverPrice = (e) => {
        const valor = parseInt(e.target.value, 10);
        setsilverPrice(valor);
    };

    const handleChangegoldPrice = (e) => {
        const valor = parseInt(e.target.value, 10);
        setgoldPrice(valor);
    };

    const handleChangechaosRunePrice = (e) => {
        const valor = parseInt(e.target.value, 10);
        setchaosRunePrice(valor);
    };

    const handleChangedeathRunePrice = (e) => {
        const valor = parseInt(e.target.value, 10);
        setdeathRunePrice(valor);
    };

    const handleResetValues = () => {
        setmithrilQuantity(0);
        setsilverQuantity(0);
        setchaosRuneQuantity(0);
        setdeathRuneQuantity(0);
    };

    const precioTotal = (mithrilQuantity * mithrilPrice) + (silverQuantity * silverPrice) + (goldQuantity * goldPrice) + (chaosRuneQuantity * chaosRunePrice) + (deathRuneQuantity * deathRunePrice);
    const totalTokkul = (mithrilQuantity * 16) + (silverQuantity * 7) + (goldQuantity * 15) + (chaosRuneQuantity * 9) + (deathRuneQuantity * 18);
    const avarageGpPerTokkul = precioTotal / totalTokkul;
    const avarageMinsToSell = ((mithrilQuantity + silverQuantity + goldQuantity + deathRuneQuantity + chaosRuneQuantity) / 50000).toFixed(0)


    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '' }}>
                        <div>
                            <a href="https://prices.osrs.cloud/item/447" target='blank'>
                                <img src={getObjectById(447)?.image} alt="" />
                            </a>
                        </div>
                        <div>

                            <input type="number" value={mithrilQuantity} onChange={handleChangemithrilQuantity} />

                            price:
                            <input type="number" value={mithrilPrice} onChange={handleChangemithrilPrice} />

                            {(mithrilPrice / 16).toFixed(2) + ' gp/tokkul'}
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '' }}>

                        <div>
                            <a href="https://prices.osrs.cloud/item/442" target='blank'>
                                <img src={getObjectById(442)?.image} alt="" />
                            </a>
                        </div>
                        <div>
                            <input type="number" value={silverQuantity} onChange={handleChangesilverQuantity} />

                            price:
                            <input type="number" value={silverPrice} onChange={handleChangesilverPrice} />
                            {(silverPrice / 7).toFixed(2) + ' gp/tokkul'}

                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '' }}>

                        <div>
                            <a href="https://prices.osrs.cloud/item/444" target='blank'>
                                <img src={getObjectById(444)?.image} alt="" />
                            </a>
                        </div>
                        <div>
                            <input type="number" value={goldQuantity} onChange={handleChangegoldQuantity} />

                            price:
                            <input type="number" value={goldPrice} onChange={handleChangegoldPrice} />
                            {(goldPrice / 15).toFixed(2) + ' gp/tokkul'}

                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '' }}>

                        <div>
                            <a href="https://prices.osrs.cloud/item/562" target='blank'>
                                <img src={getObjectById(562)?.image} alt="" />
                            </a>
                        </div>
                        <div>
                            <input type="number" value={chaosRuneQuantity} onChange={handleChangechaosRuneQuantity} />

                            price:
                            <input type="number" value={chaosRunePrice} onChange={handleChangechaosRunePrice} />
                            {(chaosRunePrice / 9).toFixed(2) + ' gp/tokkul'}

                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '' }}>

                        <div>
                            <a href="https://prices.osrs.cloud/item/560" target='blank'>
                                <img src={getObjectById(560)?.image} alt="" />
                            </a>
                        </div>
                        <div>
                            <input type="number" value={deathRuneQuantity} onChange={handleChangedeathRuneQuantity} />

                            price:
                            <input type="number" value={deathRunePrice} onChange={handleChangedeathRunePrice} />
                            {(deathRunePrice / 18).toFixed(2) + ' gp/tokkul'}

                        </div>
                    </div>
                </div>

                <div>
                    <h3>Total tokkul: </h3>
                    <h2>{totalTokkul.toLocaleString()}</h2>

                    <h3>Total price: </h3>
                    <h2>{precioTotal.toLocaleString()}</h2>

                    <h3>Avarage gp/tokkul: </h3>
                    <h2>{avarageGpPerTokkul.toFixed(2)}</h2>

                    <h3>Avarage time to sell: </h3>
                    <h2>{avarageMinsToSell + 'mins'}</h2> <br />
                </div>
            </div>
            <button onClick={handleResetValues}>Resetear valores</button>










            <h2>Profit/item</h2>
            <table style={{ marginBottom: '4rem' }}>
                <thead>
                    <th>img</th>
                    <th style={{ display: totalTokkul > 0 ? 'none' : '' }}>buy low sell high</th>
                    <th style={{ display: totalTokkul > 0 ? 'none' : '' }}>buy high sell high</th>
                    <th style={{ display: totalTokkul > 0 ? 'none' : '' }}>buy low sell low</th>
                    <th style={{ display: totalTokkul > 0 ? 'none' : '' }}>buy high sell low</th>

                    <th style={{ display: totalTokkul > 0 ? '' : 'none' }}>ammount</th>
                    <th style={{ display: totalTokkul > 0 ? '' : 'none' }}>profit/ item <br />selling high</th>
                    <th style={{ display: totalTokkul > 0 ? '' : 'none' }}>profit/ item <br />selling low</th>
                    <th style={{ display: totalTokkul > 0 ? '' : 'none' }}>
                        <span style={{ fontSize: '10px', color: '#888' }}>
                            time to buy<br />
                        </span>Total time spent</th>
                    <th style={{ display: totalTokkul > 0 ? '' : 'none' }}>
                        <span style={{ fontSize: '10px', color: '#888' }}>
                            Not counting the time to sell<br />
                        </span>
                        gp/hr
                    </th>
                    <th style={{ display: totalTokkul > 0 ? '' : 'none' }}>total profit</th>
                </thead>
                <tbody>

                    {/* Obsidian cape */}
                    <TokkulProfitTableRow
                        getObjectById={getObjectById}
                        totalTokkul={totalTokkul}
                        avarageGpPerTokkul={avarageGpPerTokkul}
                        mithrilPrice={mithrilPrice}
                        silverPrice={silverPrice}
                        avarageMinsToSell={avarageMinsToSell}
                        formatNumber={formatNumber}
                        itemId={6568}
                        itemTokkuPrice={78000}
                    ></TokkulProfitTableRow>

                    {/* Obsidian helm */}
                    <TokkulProfitTableRow
                        getObjectById={getObjectById}
                        totalTokkul={totalTokkul}
                        avarageGpPerTokkul={avarageGpPerTokkul}
                        mithrilPrice={mithrilPrice}
                        silverPrice={silverPrice}
                        avarageMinsToSell={avarageMinsToSell}
                        formatNumber={formatNumber}
                        itemId={21298}
                        itemTokkuPrice={73216}
                    ></TokkulProfitTableRow>

                    {/* Obsidian chestplate */}
                    <TokkulProfitTableRow
                        getObjectById={getObjectById}
                        totalTokkul={totalTokkul}
                        avarageGpPerTokkul={avarageGpPerTokkul}
                        mithrilPrice={mithrilPrice}
                        silverPrice={silverPrice}
                        avarageMinsToSell={avarageMinsToSell}
                        formatNumber={formatNumber}
                        itemId={21301}
                        itemTokkuPrice={109200}
                    ></TokkulProfitTableRow>

                    {/* Obsidian platelegs */}
                    <TokkulProfitTableRow
                        getObjectById={getObjectById}
                        totalTokkul={totalTokkul}
                        avarageGpPerTokkul={avarageGpPerTokkul}
                        mithrilPrice={mithrilPrice}
                        silverPrice={silverPrice}
                        avarageMinsToSell={avarageMinsToSell}
                        formatNumber={formatNumber}
                        itemId={21304}
                        itemTokkuPrice={87100}
                    ></TokkulProfitTableRow>

                    {/* Obsidian armour set */}
                    <TokkulProfitTableRow
                        getObjectById={getObjectById}
                        totalTokkul={totalTokkul}
                        avarageGpPerTokkul={avarageGpPerTokkul}
                        mithrilPrice={mithrilPrice}
                        silverPrice={silverPrice}
                        avarageMinsToSell={avarageMinsToSell}
                        formatNumber={formatNumber}
                        itemId={21279}
                        itemTokkuPrice={269516}
                        hourlyItemsBought={216}
                    ></TokkulProfitTableRow>

                    {/* Uncut onyx */}
                    <TokkulProfitTableRow
                        getObjectById={getObjectById}
                        totalTokkul={totalTokkul}
                        avarageGpPerTokkul={avarageGpPerTokkul}
                        mithrilPrice={mithrilPrice}
                        silverPrice={silverPrice}
                        avarageMinsToSell={avarageMinsToSell}
                        formatNumber={formatNumber}
                        itemId={6571}
                        itemTokkuPrice={260000}
                    ></TokkulProfitTableRow>

                    {/* Obsidian shield */}
                    <TokkulProfitTableRow
                        getObjectById={getObjectById}
                        totalTokkul={totalTokkul}
                        avarageGpPerTokkul={avarageGpPerTokkul}
                        mithrilPrice={mithrilPrice}
                        silverPrice={silverPrice}
                        avarageMinsToSell={avarageMinsToSell}
                        formatNumber={formatNumber}
                        itemId={6524}
                        itemTokkuPrice={58500}
                    ></TokkulProfitTableRow>

                    {/* Obsidian maul */}
                    <TokkulProfitTableRow
                        getObjectById={getObjectById}
                        totalTokkul={totalTokkul}
                        avarageGpPerTokkul={avarageGpPerTokkul}
                        mithrilPrice={mithrilPrice}
                        silverPrice={silverPrice}
                        avarageMinsToSell={avarageMinsToSell}
                        formatNumber={formatNumber}
                        itemId={6528}
                        itemTokkuPrice={65001}
                    ></TokkulProfitTableRow>

                    {/* Obsidian sword */}
                    <TokkulProfitTableRow
                        getObjectById={getObjectById}
                        totalTokkul={totalTokkul}
                        avarageGpPerTokkul={avarageGpPerTokkul}
                        mithrilPrice={mithrilPrice}
                        silverPrice={silverPrice}
                        avarageMinsToSell={avarageMinsToSell}
                        formatNumber={formatNumber}
                        itemId={6523}
                        itemTokkuPrice={65001}
                    ></TokkulProfitTableRow>
                </tbody>
            </table>
        </div>
    );
}

export default TokkulProfitTable;
