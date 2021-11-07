import React, {lazy, memo} from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded';
import {useTranslation} from 'react-i18next';

const Header = lazy(() => import('app/main/products/Products/PageCardedHeader').then((header) => header));
const BlacklistTable = lazy(() => import('./BlacklistTable').then((table) => table));

const rows = [
    {
        id: 'company-name',
        align: 'left',
        disablePadding: false,
        label: 'COMPANY_NAME',
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
    const {t} = useTranslation('blacklist');
    return (
        <FusePageCarded
            classes={{
                content: 'flex',
                contentCard: 'overflow-hidden',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
            }}
            header={<Header iconText="block" title={t('BLACKLIST')} addButtonLabel={t('ADD_TO_BLACKLIST')} searchHint={t('SEARCH')} />}
            content={<BlacklistTable items={dummyBlacklist} rows={rows} />}
            innerScroll
        />
    );
}

export default memo(Blacklist);
