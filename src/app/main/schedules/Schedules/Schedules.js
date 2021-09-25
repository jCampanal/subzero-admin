import React, {lazy, memo, useState} from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded';

const Header = lazy(() => import('./PageCardedHeader'));
const SchedulesTable = lazy(() => import('./SchedulesTable'));

const rows = [
    {
        id: 'reference',
        align: 'left',
        disablePadding: true,
        label: 'Reference',
        sort: false,
    },
    {
        id: 'customer',
        align: 'left',
        disablePadding: false,
        label: 'Customer',
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
        id: 'next-order',
        align: 'left',
        disablePadding: false,
        label: 'Next order',
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
    const [detailsIsOpen, openDetails] = useState(false);
    const [schedule, selectSchedule] = useState({id: 0, reference: '', customer: '', company: '', nextOrder: ''});
    const [schedules, setSchedules] = useState(dummySchedules);
    const [confirmDelete, askForConfirmation] = useState(false);
    const [snackIsOpen, openSnack] = useState(false);
    const toggleConfirmation = () => {
        askForConfirmation(!confirmDelete);
    };
    const toggleDetails = () => {
        openDetails(!detailsIsOpen);
    };
    const toggleSnack = () => {
        openSnack(!snackIsOpen);
    };
    const viewSchedule = (id) => {
        selectSchedule(schedules.filter((item) => item.id === id)[0]);
        toggleDetails();
    };
    const pauseSchedule = (id) => {
        const copy = [...schedules];
        const index = copy.findIndex((item) => item.id === id);
        copy[index].paused = !copy[index].paused;
        setSchedules(copy);
        selectSchedule(schedules[index]);
        toggleSnack();
    };
    const deleteSchedule = (id) => {
        setSchedules((prevState) => prevState.filter((item) => item.id !== id));
        selectSchedule({id: 0, reference: '', customer: '', company: '', nextOrder: ''});
        toggleConfirmation();
    };
    const confirmBeforeDeleteSchedule = (id) => {
        selectSchedule(schedules.filter((item) => item.id === id)[0]);
        toggleConfirmation();
    };
    return (
        <FusePageCarded
            classes={{
                content: 'flex',
                contentCard: 'overflow-hidden',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
            }}
            header={<Header iconText="supervisor_account" title="Admins" addButtonLabel="New Admin" searchHint="Search admin by name" />}
            content={<SchedulesTable schedules={dummySchedules} rows={rows} />}
            innerScroll
        />
    );
}

export default memo(Schedules);
