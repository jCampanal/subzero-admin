import React, {lazy, memo} from 'react';
import FusePageCarded from '../../../../@fuse/core/FusePageCarded/FusePageCarded';

const Header = lazy(() => import('app/main/products/Products/PageCardedHeader'));
const BlacklistTable = lazy(() => import('./BlaclistTable'));

const rows = [
    {
        id: 'company-name',
        align: 'left',
        disablePadding: false,
        label: 'Company Name',
        sort: true,
    },
    {
        id: 'banned-workers',
        align: 'left',
        disablePadding: false,
        label: '',
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
const dummyBlacklist = [
    {id: 1, companyName: 'Gue Amet', bannedWorkers: 2},
    {id: 2, companyName: 'Gue Amet', bannedWorkers: 1},
    {id: 3, companyName: 'Gue Amet', bannedWorkers: 2},
    {id: 4, companyName: 'Gue Amet', bannedWorkers: 1},
    {id: 5, companyName: 'Gue Amet', bannedWorkers: 1},
    {id: 6, companyName: 'Gue Amet', bannedWorkers: 3},
];

function Blacklist() {
    return (
        <FusePageCarded
            classes={{
                content: 'flex',
                contentCard: 'overflow-hidden',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
            }}
            header={<Header iconText="block" title="Blacklist" addButtonLabel="Add to blacklist" searchHint="Search" />}
            content={<BlacklistTable items={dummyBlacklist} rows={rows} />}
            innerScroll
        />
    );
}

export default memo(Blacklist);
