import React from 'react';

import BottomHome from '../components/home/BottomHome';
import TopHome from '../components/home/TopHome';
import TopMiddle from '../components/home/TopMiddle';

const HomePage = () => {
    return (
        <div>
            <div style={{ marginTop: '1px' }}>
                <TopHome />
            </div>
            <div className="ui vertical stripe segment" style={{ marginTop: '50px' }}>
                <TopMiddle />
            </div>
            <div>
                <BottomHome />
            </div>
            <div className="ui verical stripe segment"></div>
        </div>
    );
};

export default HomePage;
