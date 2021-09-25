import React, {lazy, memo, useState} from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';

const Header = lazy(() => import('./PageCardedHeader'));
const CoolersTable = lazy(() => import('./CoolersTable'));

const rows = [
    {
        id: 'code',
        align: 'left',
        disablePadding: false,
        label: 'Code',
        sort: true,
    },
    {
        id: 'provider',
        align: 'left',
        disablePadding: false,
        label: 'Provider',
        sort: true,
    },
    {
        id: 'status',
        align: 'left',
        disablePadding: false,
        label: 'Status',
        sort: true,
    },
    {
        id: 'registration-date',
        align: 'left',
        disablePadding: false,
        label: 'Registration date',
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
    const [formIsOpen, openForm] = useState(false);
    const [cooler, selectCooler] = useState({
        id: 0,
        code: 0,
        provider: '',
        status: '',
        registrationDate: new Date(),
    });
    const [coolers, setCoolers] = useState(dummyCoolers);
    const [confirmDelete, askForConfirmation] = useState(false);
    const [selectedFromDate, selectFromDate] = useState(undefined);
    const handleFromDateChange = (date) => {
        selectFromDate(date);
    };
    const [selectedToDate, selectToDate] = useState(undefined);
    const handleToDateChange = (date) => {
        selectToDate(date);
    };
    const toggleForm = () => {
        openForm(!formIsOpen);
    };
    const editCooler = (id) => {
        selectCooler(coolers.filter((item) => item.id === id)[0]);
        toggleForm();
    };
    const saveCooler = (item) => {
        if (item.id === 0) {
            setCoolers((old) => {
                old.push({
                    id: old[old.length - 1].id + 1,
                    code: item.code,
                    provider: item.provider,
                    status: '',
                    registrationDate: new Date(),
                });
                return old;
            });
        } else {
            setCoolers((prevState) => {
                prevState[prevState.findIndex((token) => token.id === item.id)] = item;
                return prevState;
            });
        }
    };
    const toggleConfirmation = () => {
        askForConfirmation(!confirmDelete);
    };
    const deleteCooler = (id) => {
        setCoolers((prevState) => prevState.filter((item) => item.id !== id));
        selectCooler({id: 0, code: 0, provider: '', status: '', registrationDate: new Date()});
        toggleConfirmation();
    };
    const confirmBeforeDelete = (id) => {
        selectCooler(coolers.filter((item) => item.id === id)[0]);
        toggleConfirmation();
    };
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
