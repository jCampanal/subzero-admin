import React, {lazy, memo} from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded';

const Header = lazy(() => import('./PageCardedHeader'));
const SchedulesTable = lazy(() => import('./SchedulesTable'));

const rows = [
    {
        id: 'reference',
        align: 'left',
        disablePadding: true,
        label: 'REFERENCE',
        sort: false,
    },
    {
        id: 'customer',
        align: 'left',
        disablePadding: false,
        label: 'CUSTOMER',
        sort: true,
    },
    {
        id: 'company',
        align: 'left',
        disablePadding: false,
        label: 'COMPANY',
        sort: true,
    },
    {
        id: 'next-order',
        align: 'left',
        disablePadding: false,
        label: 'NEXT_ORDER',
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
const dummySchedules = [
    {id: 1, reference: 'Lorem', customer: 'Grep', company: 'Gue Ueg Egu Geu', nextOrder: 'Gue Ueg Egu Geu', paused: false},
    {id: 2, reference: 'Lorem', customer: 'Grep', company: 'Gue Ueg Egu Geu', nextOrder: 'Gue Ueg Egu Geu', paused: false},
    {id: 3, reference: 'Lorem', customer: 'Grep', company: 'Gue Ueg Egu Geu', nextOrder: 'Gue Ueg Egu Geu', paused: false},
    {id: 4, reference: 'Lorem', customer: 'Grep', company: 'Gue Ueg Egu Geu', nextOrder: 'Gue Ueg Egu Geu', paused: true},
    {id: 5, reference: 'Lorem', customer: 'Grep', company: 'Gue Ueg Egu Geu', nextOrder: 'Gue Ueg Egu Geu', paused: false},
    {id: 6, reference: 'Lorem', customer: 'Grep', company: 'Gue Ueg Egu Geu', nextOrder: 'Gue Ueg Egu Geu', paused: false},
    {id: 7, reference: 'Lorem', customer: 'Grep', company: 'Gue Ueg Egu Geu', nextOrder: 'Gue Ueg Egu Geu', paused: false},
    {id: 8, reference: 'Lorem', customer: 'Grep', company: 'Gue Ueg Egu Geu', nextOrder: 'Gue Ueg Egu Geu', paused: true},
    {id: 9, reference: 'Lorem', customer: 'Grep', company: 'Gue Ueg Egu Geu', nextOrder: 'Gue Ueg Egu Geu', paused: false},
];

function Schedules() {
    return (
        <FusePageCarded
            classes={{
                content: 'flex',
                contentCard: 'overflow-hidden',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
            }}
            header={<Header />}
            content={<SchedulesTable schedules={dummySchedules} rows={rows} />}
            innerScroll
        />
    );
}

export default memo(Schedules);
