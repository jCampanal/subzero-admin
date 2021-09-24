import React, {lazy, memo} from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded';

const Header = lazy(() => import('app/main/products/Products/PageCardedHeader'));
const AdminsTable = lazy(() => import('./AdminsTable'));

const rows = [
    {
        id: 'image',
        align: 'left',
        disablePadding: true,
        label: '',
        sort: false,
    },
    {
        id: 'first-name',
        align: 'left',
        disablePadding: false,
        label: 'First Name',
        sort: true,
    },
    {
        id: 'last-name',
        align: 'left',
        disablePadding: false,
        label: 'Last Name',
        sort: true,
    },
    {
        id: 'phone',
        align: 'left',
        disablePadding: false,
        label: 'Phone',
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
const dummyAdmins = [
    {id: 1, firstName: 'Gue', lastName: 'Ipsum', phoneNumber: '+23 352345'},
    {id: 2, firstName: 'Gue', lastName: 'Ipsum', phoneNumber: '+23 352345'},
    {id: 3, firstName: 'Gue', lastName: 'Ipsum', phoneNumber: '+23 352345'},
    {id: 4, firstName: 'Gue', lastName: 'Ipsum', phoneNumber: '+23 352345'},
    {id: 5, firstName: 'Gue', lastName: 'Ipsum', phoneNumber: '+23 352345'},
    {id: 6, firstName: 'Gue', lastName: 'Ipsum', phoneNumber: '+23 352345'},
    {id: 7, firstName: 'Gue', lastName: 'Ipsum', phoneNumber: '+23 352345'},
];

function Admins() {
    return (
        <FusePageCarded
            classes={{
                content: 'flex',
                contentCard: 'overflow-hidden',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
            }}
            header={<Header iconText="supervisor_account" title="Admins" addButtonLabel="New Admin" searchHint="Search admin by name" />}
            content={<AdminsTable admins={dummyAdmins} rows={rows} />}
            innerScroll
        />
    );
}

export default memo(Admins);
