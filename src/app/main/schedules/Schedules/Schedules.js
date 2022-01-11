import React, { lazy, memo, useCallback, useEffect, useState } from "react";
import FusePageCarded from "@fuse/core/FusePageCarded/FusePageCarded";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import withProtectedRoute from "app/fuse-layouts/ProtectedRoute/ProtectedRoute";
import { useDispatch } from "react-redux";
import { deleteSchedule, getSchedules } from "app/api-conn/schedules";
import { showMessage } from "app/store/fuse/messageSlice";
import rows from "./rows";
import FuseLoading from "@fuse/core/FuseLoading";
import RemoveDlg from "app/common/removeDlg";
import { openDialog } from "app/store/fuse/dialogSlice";
const Header = lazy(() => import("./PageCardedHeader"));
const SchedulesTable = lazy(() => import("./SchedulesTable"));
const EditDialog = lazy(() => import("./EditDialog"));

const dummyData = {
  status: "200",
  message: "Ok",
  data: {
    data: [
      {
        id: "67b6e540-asd-49e2-8a7a-3af8278f6e2e",
        nextOrder: "2022-01-11T02:32:47.683Z",
        status: false,
        orderId: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
        order: {
          id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
          no: 0,
          deliveryTime: "2021-09-12T05:50:00.0000000",
          tag: "Dry Ice",
          status: "Waiting",
          priority: 1,
          pickUp: false,
          address: {
            id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
            street: "Wall Street",
            city: "New York",
            state: "New York",
            zipCode: 10001,
          },
          driver: {
            email: "test@admin.com",
            enabled: true,
            id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
            imageURL: "url",
            lastName: "Pérez",
            name: "Juan",
            phoneNumber: "test@admin.com",
            userName: "Pedro",
            warehouse: {
              id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
              name: "FLL Warehouse",
              address: {
                id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
                street: "Wall Street",
                city: "New York",
                state: "New York",
                zipCode: 10001,
              },
            },
          },
          customer: {
            company: {
              id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
              name: "Company 1",
              address: {
                id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
                street: "Wall Street",
                city: "New York",
                state: "New York",
                zipCode: 10001,
              },
            },
            email: "test@admin.com",
            id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
            imageURL: "url",
            lastName: "Pérez",
            listID: "80000002-1636062834",
            name: "Juan",
            phoneNumber: "test@admin.com",
            priorityCustomer: false,
            userName: "Juan",
          },
          products: [
            {
              id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
              pendingQuanty: 200,
              completed: true,
              description: "Dry Ice 4 kg",
              quanty: 1,
              name: "Dry Ice",
              productTypeId: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
              listID: "80000002-1636062834",
            },
          ],
          listID: "80000002-1636062834",
        },
      },
      {
        id: "67b6easd540-0985-49e2-8a7a-3af8278f6e2e",
        nextOrder: "2022-01-11T02:32:47.683Z",
        status: false,
        orderId: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
        order: {
          id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
          no: 0,
          deliveryTime: "2021-09-12T05:50:00.0000000",
          tag: "Dry Ice",
          status: "Waiting",
          priority: 1,
          pickUp: false,
          address: {
            id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
            street: "Wall Street",
            city: "New York",
            state: "New York",
            zipCode: 10001,
          },
          driver: {
            email: "test@admin.com",
            enabled: true,
            id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
            imageURL: "url",
            lastName: "Pérez",
            name: "Juan",
            phoneNumber: "test@admin.com",
            userName: "Pedro",
            warehouse: {
              id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
              name: "FLL Warehouse",
              address: {
                id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
                street: "Wall Street",
                city: "New York",
                state: "New York",
                zipCode: 10001,
              },
            },
          },
          customer: {
            company: {
              id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
              name: "Company 1",
              address: {
                id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
                street: "Wall Street",
                city: "New York",
                state: "New York",
                zipCode: 10001,
              },
            },
            email: "test@admin.com",
            id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
            imageURL: "url",
            lastName: "Pérez",
            listID: "80000002-1636062834",
            name: "Juan",
            phoneNumber: "test@admin.com",
            priorityCustomer: false,
            userName: "Juan",
          },
          products: [
            {
              id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
              pendingQuanty: 200,
              completed: true,
              description: "Dry Ice 4 kg",
              quanty: 1,
              name: "Dry Ice",
              productTypeId: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
              listID: "80000002-1636062834",
            },
          ],
          listID: "80000002-1636062834",
        },
      },
      {
        id: "67b6asdase540-0985-49e2-8a7a-3af8278f6e2e",
        nextOrder: "2022-01-11T02:32:47.683Z",
        status: false,
        orderId: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
        order: {
          id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
          no: 0,
          deliveryTime: "2021-09-12T05:50:00.0000000",
          tag: "Dry Ice",
          status: "Waiting",
          priority: 1,
          pickUp: false,
          address: {
            id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
            street: "Wall Street",
            city: "New York",
            state: "New York",
            zipCode: 10001,
          },
          driver: {
            email: "test@admin.com",
            enabled: true,
            id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
            imageURL: "url",
            lastName: "Pérez",
            name: "Juan",
            phoneNumber: "test@admin.com",
            userName: "Pedro",
            warehouse: {
              id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
              name: "FLL Warehouse",
              address: {
                id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
                street: "Wall Street",
                city: "New York",
                state: "New York",
                zipCode: 10001,
              },
            },
          },
          customer: {
            company: {
              id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
              name: "Company 1",
              address: {
                id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
                street: "Wall Street",
                city: "New York",
                state: "New York",
                zipCode: 10001,
              },
            },
            email: "test@admin.com",
            id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
            imageURL: "url",
            lastName: "Pérez",
            listID: "80000002-1636062834",
            name: "Juan",
            phoneNumber: "test@admin.com",
            priorityCustomer: false,
            userName: "Juan",
          },
          products: [
            {
              id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
              pendingQuanty: 200,
              completed: true,
              description: "Dry Ice 4 kg",
              quanty: 1,
              name: "Dry Ice",
              productTypeId: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
              listID: "80000002-1636062834",
            },
          ],
          listID: "80000002-1636062834",
        },
      },
      {
        id: "67b6e540-0985sdas-49e2-8a7a-3af8278f6e2e",
        nextOrder: "2022-01-11T02:32:47.683Z",
        status: false,
        orderId: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
        order: {
          id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
          no: 0,
          deliveryTime: "2021-09-12T05:50:00.0000000",
          tag: "Dry Ice",
          status: "Waiting",
          priority: 1,
          pickUp: false,
          address: {
            id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
            street: "Wall Street",
            city: "New York",
            state: "New York",
            zipCode: 10001,
          },
          driver: {
            email: "test@admin.com",
            enabled: true,
            id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
            imageURL: "url",
            lastName: "Pérez",
            name: "Juan",
            phoneNumber: "test@admin.com",
            userName: "Pedro",
            warehouse: {
              id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
              name: "FLL Warehouse",
              address: {
                id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
                street: "Wall Street",
                city: "New York",
                state: "New York",
                zipCode: 10001,
              },
            },
          },
          customer: {
            company: {
              id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
              name: "Company 1",
              address: {
                id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
                street: "Wall Street",
                city: "New York",
                state: "New York",
                zipCode: 10001,
              },
            },
            email: "test@admin.com",
            id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
            imageURL: "url",
            lastName: "Pérez",
            listID: "80000002-1636062834",
            name: "Juan",
            phoneNumber: "test@admin.com",
            priorityCustomer: false,
            userName: "Juan",
          },
          products: [
            {
              id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
              pendingQuanty: 200,
              completed: true,
              description: "Dry Ice 4 kg",
              quanty: 1,
              name: "Dry Ice",
              productTypeId: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
              listID: "80000002-1636062834",
            },
          ],
          listID: "80000002-1636062834",
        },
      },
    ],
    totalPages: 5,
    currentPage: 1,
    haveNext: true,
    havePrevious: true,
    totalItems: 15,
  },
};

function Schedules() {
  const [schedules, setSchedules] = useState({ data: [], totalItems: 0 });
  const location = useLocation();
  const { t } = useTranslation("schedules");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [customerSearch, setcustomerSearch] = useState("");
  const [companySearch, setcompanySearch] = useState("");

  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [schedule, setSchedule] = useState(null);

  const loadSchedules = useCallback(
    (
      pageNumber = 0,
      pageSize = 10,
      company = undefined,
      customer = undefined
    ) => {
      setLoading(true);
      getSchedules(pageNumber, pageSize, company, customer)
        .then(() => {
          const response = dummyData;
          setSchedules({
            data: response.data.data,
            totalItems: response.data.totalItems,
          });
          setLoading(false);
          return false;
        })
        .catch(() => {
          dispatch(
            showMessage({
              message: "There is something wrong, try to refresh the page",
              variant: "error",
            })
          );
          setLoading(false);
        });
    },
    [dispatch]
  );

  function handleChangeRowsPerPage(event) {
    setPageSize(event.target.value);
  }
  function handleChangePage(event, value) {
    setPageNumber(value);
  }

  const editSchedule = (schedule) => {
    setSchedule(schedule);
    setOpenEditDialog(true);
  };
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const onProceed = (itemIds) => {
    setLoading(true);
    deleteSchedule(JSON.stringify(itemIds))
      .then(() => {
        dispatch(
          showMessage({
            message: "Deletion completed!",
          })
        );
        loadSchedules();
        return null;
      })
      .catch(() => {
        dispatch(
          showMessage({
            message: "Error during deletion. Please try again later",
            variant: "error",
          })
        );
        setLoading(false);
      });
  };
  const removeCooler = (itemId) => {
    dispatch(
      openDialog({
        children: (
          <RemoveDlg
            itemId={itemId}
            proceedCallback={() => onProceed(itemId)}
            dlgTitle="Warning, you have requested a risky operation"
            dlgText="You are attempting to delete a cooler, this operation cannot be undone. Are you sure you want to proceed with the deletion?"
          />
        ),
      })
    );
  };

  useEffect(() => {
    document.title = "Schedules - Subzero Ice Services";
  }, []);

  useEffect(() => {
    let _compnay = new URLSearchParams(location.search).get("company");
    let _customer = new URLSearchParams(location.search).get("customer");

    if (_compnay === "" || !_compnay) {
      _compnay = undefined;
    }
    if (_customer === "" || !_customer) {
      _customer = undefined;
    }
    setcustomerSearch(_customer);
    setcompanySearch(_compnay);

    loadSchedules(pageNumber, pageSize, _compnay, _customer);
  }, [location.search, pageSize, pageNumber, loadSchedules]);

  return (
    <FusePageCarded
      classes={{
        content: "flex",
        contentCard: "overflow-hidden",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={<Header />}
      contentToolbar={
        <div className="p-16 sm:p-24 max-w-2xl">
          {(customerSearch || companySearch) && (
            <span>
              {t("SEARCH_RESULT")} (
              {customerSearch && (
                <span className="mr-10">
                  {" "}
                  <b> {t("CODE")}:</b> {customerSearch}
                </span>
              )}
              {companySearch && (
                <span className="mr-10">
                  {" "}
                  <b>{t("DATE_1")}:</b> {companySearch}
                </span>
              )}
              )
            </span>
          )}
        </div>
      }
      content={
        <>
          {loading ? (
            <FuseLoading />
          ) : (
            <>
              <SchedulesTable
                data={schedules.data}
                rows={rows}
                totalItems={schedules.totalItems}
                page={pageNumber}
                rowsPerPage={pageNumber}
                deleteCallback={removeCooler}
                editCallback={editSchedule}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </>
          )}
          {schedule && (
            <EditDialog
              open={openEditDialog}
              schedule={schedule}
              handleClose={handleCloseEditDialog}
            />
          )}
        </>
      }
      innerScroll
    />
  );
}

export default memo(withProtectedRoute(Schedules));
