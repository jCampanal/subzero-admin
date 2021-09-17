import { memo, useState } from 'react';
import { Button, Snackbar, TextField } from '@material-ui/core';
import { Alert as MuiAlert } from '@material-ui/lab';
import ScheduleDisplay from './ScheduleDisplay';
import ConfirmDlg from './ConfirmDlg';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};
const dummySchedules = [
  {
    id: 1,
    reference: 'Lorem',
    customer: 'Grep',
    company: 'Gue Ueg Egu Geu',
    nextOrder: 'Gue Ueg Egu Geu',
    paused: false,
  },
  {
    id: 2,
    reference: 'Lorem',
    customer: 'Grep',
    company: 'Gue Ueg Egu Geu',
    nextOrder: 'Gue Ueg Egu Geu',
    paused: false,
  },
  {
    id: 3,
    reference: 'Lorem',
    customer: 'Grep',
    company: 'Gue Ueg Egu Geu',
    nextOrder: 'Gue Ueg Egu Geu',
    paused: false,
  },
  {
    id: 4,
    reference: 'Lorem',
    customer: 'Grep',
    company: 'Gue Ueg Egu Geu',
    nextOrder: 'Gue Ueg Egu Geu',
    paused: false,
  },
  {
    id: 5,
    reference: 'Lorem',
    customer: 'Grep',
    company: 'Gue Ueg Egu Geu',
    nextOrder: 'Gue Ueg Egu Geu',
    paused: false,
  },
  {
    id: 6,
    reference: 'Lorem',
    customer: 'Grep',
    company: 'Gue Ueg Egu Geu',
    nextOrder: 'Gue Ueg Egu Geu',
    paused: false,
  },
  {
    id: 7,
    reference: 'Lorem',
    customer: 'Grep',
    company: 'Gue Ueg Egu Geu',
    nextOrder: 'Gue Ueg Egu Geu',
    paused: false,
  },
  {
    id: 8,
    reference: 'Lorem',
    customer: 'Grep',
    company: 'Gue Ueg Egu Geu',
    nextOrder: 'Gue Ueg Egu Geu',
    paused: false,
  },
  {
    id: 9,
    reference: 'Lorem',
    customer: 'Grep',
    company: 'Gue Ueg Egu Geu',
    nextOrder: 'Gue Ueg Egu Geu',
    paused: false,
  },
];

function Schedules() {
  const [detailsIsOpen, openDetails] = useState(false);
  const [schedule, selectSchedule] = useState({
    id: 0,
    reference: '',
    customer: '',
    company: '',
    nextOrder: '',
  });
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
    selectSchedule({ id: 0, reference: '', customer: '', company: '', nextOrder: '' });
    toggleConfirmation();
  };
  const confirmBeforeDeleteSchedule = (id) => {
    selectSchedule(schedules.filter((item) => item.id === id)[0]);
    toggleConfirmation();
  };
  return (
    <div>
      <p className="h1">
        <i className="fa fa-calendar mr-4" />
        Schedules{' '}
        <span className="text-gray-50 rounded-full px-16 bg-blue-600">{schedules.length}</span>
      </p>
      <div className="flex justify-center items-center min-w-full mb-14 gap-7">
        <TextField label="Customer" name="customer" />
        <TextField label="Company" name="company" />
        <Button variant="contained" className="bg-blue-500 hover:bg-blue-700 text-white">
          Search
        </Button>
      </div>
      <div className="mt-2 flex flex-col">
        <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-100 text-lg font-sans">
                <thead className="bg-gray-50 font-medium text-gray-800 font-serif">
                  <tr className="text-left tracking-wider border-t border-b">
                    <th scope="col" className="px-14 py-3">
                      Id
                    </th>
                    <th scope="col" className="px-14 py-3">
                      Reference #
                    </th>
                    <th scope="col" className="px-14 py-3">
                      Customer
                    </th>
                    <th scope="col" className="px-14 py-3">
                      Company
                    </th>
                    <th scope="col" className="px-14 py-3">
                      Next order
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {schedules.map((item) => (
                    <tr key={item.id} className="odd:bg-gray-200 hover:bg-gray-100">
                      <td className="px-14 py-3">{item.id}</td>
                      <td className="px-14 py-3">{item.reference}</td>
                      <td className="px-14 py-3">{item.customer}</td>
                      <td className="px-14 py-3">{item.company}</td>
                      <td className="px-14 py-3">{item.nextOrder}</td>
                      <td className="px-14 py-3">
                        <div className="flex justify-end items-center">
                          <Button
                            type="button"
                            onClick={() => viewSchedule(item.id)}
                            className="text-sm text-gray-700 hover:text-gray-800 leading-none rounded-md mr-5"
                          >
                            <i className="fa fa-eye mr-4" />
                            View
                          </Button>
                          <Button
                            type="button"
                            onClick={() => pauseSchedule(item.id)}
                            className={`text-sm ${
                              item.paused
                                ? 'text-blue-700 hover:text-blue-800'
                                : 'text-deep-orange-700 hover:text-deep-orange-800'
                            } leading-none rounded-md mr-5`}
                          >
                            <i
                              className={`fa ${
                                item.paused ? 'fa-play-circle' : 'fa-pause-circle'
                              } mr-4`}
                            />
                            {item.paused ? 'Resume' : 'Pause'}
                          </Button>
                          <Button
                            type="button"
                            onClick={() => confirmBeforeDeleteSchedule(item.id)}
                            className="text-sm text-red-700 hover:text-red-800 leading-none rounded-md"
                          >
                            <i className="fa fa-trash mr-4" />
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ScheduleDisplay open={detailsIsOpen} handleClose={toggleDetails} schedule={schedule} />
      <ConfirmDlg
        open={confirmDelete}
        handleClose={toggleConfirmation}
        confirm={deleteSchedule}
        subject={schedule}
      />
      <Snackbar open={snackIsOpen} autoHideDuration={6000} onClose={toggleSnack} className="z-50">
        <Alert onClose={toggleSnack} severity="success">
          {schedule.paused ? 'Schedule has been paused' : 'Schedule has been resumed'}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default memo(Schedules);
