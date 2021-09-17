import {useEffect, useState} from 'react';
import {Dialog, DialogContent, DialogTitle} from '@material-ui/core';

export default function ScheduleDisplay(props) {
  const [schedule, setSchedule] = useState(props.schedule);
  useEffect(() => setSchedule(props.schedule), [props.schedule]);
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="dlg-title"
      aria-describedby="dlg-description"
    >
      <DialogTitle id="dlg-title">Schedule details</DialogTitle>
      <span aria-hidden id="dlg-description" className="hidden">
        Schedule details
      </span>
      <DialogContent>
        <p>Schedule for Wednesday</p>
        <p className="mb-5"><small>Will be repeated on 7 days</small></p>
        <p className="pt-5">2233 Lee Rd, Winter Park Florida 32789</p>
        <div className="mt-2 flex flex-col">
          <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-100 text-lg font-sans">
                  <thead className="bg-gray-50 font-medium text-gray-800 font-serif">
                  <tr className="text-left tracking-wider border-t border-b">
                    <th scope="col" className="px-14 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-14 py-3">
                      Description
                    </th>
                    <th scope="col" className="px-14 py-3">
                      Cuantity
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr className="odd:bg-gray-200 hover:bg-gray-100">
                    <td className="px-14 py-3">Lorem</td>
                    <td className="px-14 py-3">Lorem ipsum dolor amet</td>
                    <td className="px-14 py-3">35lb</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
