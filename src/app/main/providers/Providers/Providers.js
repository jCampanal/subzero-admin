import React from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';

const Providers = () => {
    return (
        <FusePageCarded
            classes={{
                content: 'flex',
                contentCard: 'overflow-hidden',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
            }}
            header="Hello"
            content="Hello"
            innerScroll
        />
    );
};

export default Providers;
