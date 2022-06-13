import React from 'react';
import { NavLink } from 'react-router-dom';

const TopMiddle = () => {
    return (
        <div className="ui middle aligned stackable grid container">
            <div className="row">
                <div className="eight wide column">
                    <h3 className="ui header">Našim hlavním produktem je přesnost</h3>
                    <p>
                        Specializujeme se na to aby zázaník vždy přesně veděl zda ve zvoleném přostředí nejsou výkyvy v
                        nastavených teplotách. Tyto hodnoty dokážeme měřit uplně přesně a to ve velmi malých
                        intervalech.
                    </p>
                    <p>
                        Největší využitelnos jsme našli v chladících a mrazících boxech a proto jsou našimi hlavními
                        partnery:
                    </p>
                    <p>
                        <b>Lidl, Penny, Makro a další...</b>
                    </p>
                    <h3 className="ui header">Vše v cloudu a přes mobil</h3>
                    <p>I nás doba dohnala. Proto jsme se rozhodli vše posunout o level výš.</p>
                    <p>
                        Proto je u nás <b>CLOUD</b> a zobrazení v<b>MOBILNÍM ZAŘÍZENÍ</b> zcela běžná záležitost.
                    </p>
                </div>
                <div className="six wide right floated column">
                    <img
                        src="https://www.mall.cz/i/41051749/1000/1000"
                        className="ui large borded rounded image"
                        alt="Meteo stanice"
                    />
                </div>
            </div>
            <div className="row" style={{ marginTop: '20px', paddingBottom: '50px' }}>
                <div className="center aligned column">
                    <NavLink to="/">
                        <div className="ui huge button">
                            "Máte zájem o spolupráci?"
                            <i className="right arrow icon" />
                        </div>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default TopMiddle;
