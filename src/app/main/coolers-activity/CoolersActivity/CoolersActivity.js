import React, {lazy, memo} from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded';

const Header = lazy(() => import('./PageCardedHeader'));
const CoolersActivityTable = lazy(() => import('./CoolersActivityTable'));

const rows = [
    {
        id: 'code',
        align: 'left',
        disablePadding: false,
        label: 'Code',
        sort: true,
    },
    {
        id: 'from',
        align: 'left',
        disablePadding: false,
        label: 'From',
        sort: true,
    },
    {
        id: 'to',
        align: 'left',
        disablePadding: false,
        label: 'To',
        sort: true,
    },
    {
        id: 'driver',
        align: 'left',
        disablePadding: false,
        label: 'Driver',
        sort: true,
    },
    {
        id: 'date',
        align: 'left',
        disablePadding: false,
        label: 'Date',
        sort: true,
    },
    {
        id: 'sign',
        align: 'right',
        disablePadding: false,
        label: '',
        sort: false,
    },
];
const dummyCoolersActivity = [
    {id: 1, code: 1001, from: 'Gue', to: 'Ueg', driver: 'Gue Ueg Egu Geu', date: new Date()},
    {id: 2, code: 1002, from: 'Gue', to: 'Ueg', driver: 'Gue Ueg Egu Geu', date: new Date()},
    {id: 3, code: 1003, from: 'Gue', to: 'Ueg', driver: 'Gue Ueg Egu Geu', date: new Date()},
    {id: 4, code: 1004, from: 'Gue', to: 'Ueg', driver: 'Gue Ueg Egu Geu', date: new Date()},
    {id: 5, code: 1005, from: 'Gue', to: 'Ueg', driver: 'Gue Ueg Egu Geu', date: new Date()},
    {id: 6, code: 1006, from: 'Gue', to: 'Ueg', driver: 'Gue Ueg Egu Geu', date: new Date()},
];

function CoolersActivity() {
    return (
        <FusePageCarded
            classes={{
                content: 'flex',
                contentCard: 'overflow-hidden',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
            }}
            header={<Header />}
            content={<CoolersActivityTable coolersActivity={dummyCoolersActivity} rows={rows} />}
            innerScroll
        />
    );
}

export default memo(CoolersActivity);
