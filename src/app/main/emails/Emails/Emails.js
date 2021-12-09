import React, { lazy, memo, useEffect, useState } from "react";
import FusePageCarded from "@fuse/core/FusePageCarded/FusePageCarded";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import rows from "./rows";
import { getEmails } from "../../../api-conn/emails";
import { showMessage } from "../../../store/fuse/messageSlice";
import FuseLoading from "@fuse/core/FuseLoading";

const fakeDataEmail = [
  {
    emailId: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
    subject: "Dear John Doe",
    subtitle: "Hello User",
    callBackURL: "controller/usercontroller/confirmEmail",
    rawBody:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    order: {
      id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
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
        id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
        userName: "Pedro",
        name: "Juan",
        lastName: "Pérez",
        email: "test@admin.com",
        phoneNumber: "test@admin.com",
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
        id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
        priorityCustomer: false,
        userName: "Juan",
        name: "Juan",
        lastName: "Pérez",
        email: "test@admin.com",
        phoneNumber: "test@admin.com",
        company: {
          id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
          name: "Company 1",
        },
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
        },
      ],
    },
    fileURL: "string",
    toEmail: "example123@gmail.com",
  },
  {
    emailId: "67b6e540-0985-49e2-8a7a-3af8278f6e2es",
    subject: "Dear John Doe",
    subtitle: "Hello User",
    callBackURL: "controller/usercontroller/confirmEmail",
    rawBody:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    order: {
      id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
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
        id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
        userName: "Pedro",
        name: "Juan",
        lastName: "Pérez",
        email: "test@admin.com",
        phoneNumber: "test@admin.com",
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
        id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
        priorityCustomer: false,
        userName: "Juan",
        name: "Juan",
        lastName: "Pérez",
        email: "test@admin.com",
        phoneNumber: "test@admin.com",
        company: {
          id: "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
          name: "Company 1",
        },
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
        },
      ],
    },
    fileURL: "string",
    toEmail: "example123@gmail.com",
  },
];

const Header = lazy(() =>
  import("app/components/HeaderPage/PageCardedHeader").then((header) => header)
);
const EmailsTable = lazy(() => import("./EmailsTable").then((table) => table));

function Emails() {
  const { t } = useTranslation("emails");
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const dispatch = useDispatch();

  const loadEmails = (pageNumber = 0, pageSize = 10) => {
    setLoading(true);
    getEmails(pageNumber, pageSize, name)
      .then((data) => {
        setEmails(data.data.data);
        setTotalItems(data.data.totalItems);

        setLoading(false);
      })
      .catch(() => {
        dispatch(
          showMessage({
            message: t("PROBLEM_FETCHING"),
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            variant: "error",
          })
        );
        setLoading(false);
      });
  };

  function handleChangePage(event, value) {
    setPageNumber(value);
    console.log("page", value);
  }

  function handleChangeRowsPerPage(event) {
    setPageSize(event.target.value);
  }

  useEffect(() => {
    loadEmails(pageNumber, pageSize);
  }, [pageSize, pageNumber]);

  return (
    <FusePageCarded
      classes={{
        content: "flex",
        contentCard: "overflow-hidden",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={
        <Header
          iconText="email"
          title={t("EMAILS")}
          addButtonLabel=""
          searchHint=""
        />
      }
      content={
        loading ? (
          <FuseLoading />
        ) : (
          <EmailsTable
            data={emails}
            rows={rows}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleChangePage={handleChangePage}
            page={pageNumber}
            rowsPerPage={pageSize}
            totalItems={totalItems}
          />
        )
      }
      innerScroll
    />
  );
}

export default memo(Emails);
