import React, {lazy, memo, useState} from 'react';
import FusePageCarded from '../../../../@fuse/core/FusePageCarded';

const CustomerGenerator = lazy(() => import('./NewCustomerGeneratorForm'));
const Header = lazy(() => import('app/main/products/Products/PageCardedHeader'));
const CustomersTable = lazy(() => import('./CustomersTable'));

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
        id: 'company',
        align: 'left',
        disablePadding: false,
        label: 'Company',
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
        id: 'email',
        align: 'left',
        disablePadding: false,
        label: 'Email',
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
const dummyCustomers = [
    {
        id: 1,
        email: 'gue@ipsum.com',
        firstName: 'Gue',
        lastName: 'Lorem',
        phone: '235324',
        company: 'Amet Dolor',
    },
    {
        id: 2,
        email: 'gue@ipsum.com',
        firstName: 'Gue',
        lastName: 'Lorem',
        phone: '235324',
        company: 'Amet Dolor',
    },
    {
        id: 3,
        email: 'gue@ipsum.com',
        firstName: 'Gue',
        lastName: 'Lorem',
        phone: '235324',
        company: 'Amet Dolor',
    },
    {
        id: 4,
        email: 'gue@ipsum.com',
        firstName: 'Gue',
        lastName: 'Lorem',
        phone: '235324',
        company: 'Amet Dolor',
    },
    {
        id: 5,
        email: 'gue@ipsum.com',
        firstName: 'Gue',
        lastName: 'Lorem',
        phone: '235324',
        company: 'Amet Dolor',
    },
    {
        id: 6,
        email: 'gue@ipsum.com',
        firstName: 'Gue',
        lastName: 'Lorem',
        phone: '235324',
        company: 'Amet Dolor',
    },
    {
        id: 7,
        email: 'gue@ipsum.com',
        firstName: 'Gue',
        lastName: 'Lorem',
        phone: '235324',
        company: 'Amet Dolor',
    },
    {
        id: 8,
        email: 'gue@ipsum.com',
        firstName: 'Gue',
        lastName: 'Lorem',
        phone: '235324',
        company: 'Amet Dolor',
    },
];

function Customers() {
    const [addingNewCustomer, addNewCustomer] = useState(false);
    const toggleAddingNewCustomer = () => {
        addNewCustomer(!addingNewCustomer);
    };

    return (
        <>
            <FusePageCarded
                classes={{
                    content: 'flex',
                    contentCard: 'overflow-hidden',
                    header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
                }}
                header={
                    <Header
                        iconText="person"
                        title="Customers"
                        addButtonLabel="New Customer"
                        addButtonCallback={toggleAddingNewCustomer}
                        searchHint="Search customer by name"
                    />
                }
                content={
                    !addingNewCustomer ? (
                        <CustomersTable customers={dummyCustomers} rows={rows} />
                    ) : (
                        <CustomerGenerator toggleNewCustomer={toggleAddingNewCustomer} />
                    )
                }
            />
        </>
    );
}

export default memo(Customers);
