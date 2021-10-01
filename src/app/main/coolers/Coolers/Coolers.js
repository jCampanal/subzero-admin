import React, {lazy, memo} from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';

const Header = lazy(() => import('./PageCardedHeader'));
const CoolersTable = lazy(() => import('./CoolersTable'));

const rows = [
    {
        id: 'code',
        align: 'left',
        disablePadding: false,
        label: 'CODE',
        sort: true,
    },
    {
        id: 'provider',
        align: 'left',
        disablePadding: false,
        label: 'PROVIDER',
        sort: true,
    },
    {
        id: 'status',
        align: 'left',
        disablePadding: false,
        label: 'STATUS',
        sort: true,
    },
    {
        id: 'registration-date',
        align: 'left',
        disablePadding: false,
        label: 'REGISTRATION_DATE',
        sort: true,
    },
    {
        id: 'actions',
        align: 'right',
        disablePadding: false,
        label: '',
        sort: false,
    },
];
const dummyCoolers = [
    {id: 1, code: 1001, provider: 'Grep', status: 'Gue Ueg Egu Geu', registrationDate: new Date()},
    {id: 2, code: 1002, provider: 'Grep', status: 'Gue Ueg Egu Geu', registrationDate: new Date()},
    {id: 3, code: 1003, provider: 'Grep', status: 'Gue Ueg Egu Geu', registrationDate: new Date()},
    {id: 4, code: 1004, provider: 'Grep', status: 'Gue Ueg Egu Geu', registrationDate: new Date()},
    {id: 5, code: 1005, provider: 'Grep', status: 'Gue Ueg Egu Geu', registrationDate: new Date()},
    {id: 6, code: 1006, provider: 'Grep', status: 'Gue Ueg Egu Geu', registrationDate: new Date()},
    {id: 7, code: 1007, provider: 'Grep', status: 'Gue Ueg Egu Geu', registrationDate: new Date()},
];

function Coolers() {
    return (
        <FusePageCarded
            classes={{
                content: 'flex',
                contentCard: 'overflow-hidden',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
            }}
            header={<Header />}
            content={<CoolersTable coolers={dummyCoolers} rows={rows} />}
            innerScroll
        />
    );
}

export default memo(Coolers);
