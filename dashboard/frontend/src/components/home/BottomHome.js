import React from 'react';

const BottomHome = () => {
    return (
        <div className="ui vertical stripe quote segment">
            <div className="ui equal width stackable internally celled grid">
                <div className="center aligned row">
                    <div className="column">
                        <h3>"Úžasná firma"</h3>
                        <p>Vždy maximální spokojenost s jejich službou.</p>
                    </div>
                    <div className="column">
                        <h3>"Přešli jsme od konkurence."</h3>

                        <img
                            src="https://semantic-ui.com/examples/assets/images/avatar/nan.jpg"
                            className="ui avatar image"
                            alt="avatar"
                        />
                        <p>
                            <b>Bill Gates </b>"Nikdy jsme neučinili lepší rozhodnutí"
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BottomHome;
