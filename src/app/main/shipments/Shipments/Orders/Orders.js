import { getShipment } from "app/api-conn/shipments_order";
import OrdersTable from "./OrdersTable";
import React, { useEffect, useState } from "react";
import rows from "./rows";
import { useDispatch } from "react-redux";
import { showMessage } from "app/store/fuse/messageSlice";

const dummyOrders = [
  {
    id: "67b6e540-0985-asdsd49e2-8a7a-3af8278f664e2e",
    tag: "Dry Ice",
    status: "Waiting",
    priority: 1,
    pickUp: false,
    address: {
      id: "67b6e540-0985-49e2-8a7a123-3af8278f6e2e",
      street: "Wall Street",
      city: "New York",
      state: "New York",
      zipCode: 10001,
    },
    driver: {
      email: "test@admin.com",
      enabled: true,
      id: "67b6e540-0985-49e2-8a7a-3af823478f6e2e",
      imageURL: "url",
      lastName: "Pérez",
      name: "Juan",
      phoneNumber: "test@admin.com",
      userName: "Pedro",
      warehouse: {
        id: "67b6e540-0985-49e2-8a7a-3af8435278f6e2e",
        name: "FLL Warehouse",
        address: {
          id: "67b6e540-0985-49e2-8a7a-3af548278f6e2e",
          street: "Wall Street",
          city: "New York",
          state: "New York",
          zipCode: 10001,
        },
      },
    },
    customer: {
      company: {
        id: "67b6e540-0985-49e2-8a7a-3a123f8278f6e2e",
        name: "Company 1",
        address: {
          id: "67b6e540-0985-49e2-8a7awer-3af8278f6e2e",
          street: "Wall Street",
          city: "New York",
          state: "New York",
          zipCode: 10001,
        },
      },
      email: "test@admin.com",
      id: "67b6e540-0985-49e2-8a7a-2343af8278f6e2e",
      imageURL: "url",
      lastName: "Pérez",
      name: "Juan",
      phoneNumber: "test@admin.com",
      priorityCustomer: false,
      userName: "Juan",
    },
    products: [
      {
        id: "67b6e540-0985-49e2-8a2347a-3af8278f6e2e",
        pendingQuanty: 200,
        completed: true,
        description: "Dry Ice 4 kg",
        quanty: 1,
        name: "Dry Ice",
        productTypeId: "67b6e540-2340985-49e2-8a7a-3af8278f6e2e",
      },
    ],
  },
  {
    id: "67b6e540-0985-49e2-8a7a1241-3af8278f6e2e",
    tag: "Dry Ice",
    status: "Waiting",
    priority: 1,
    pickUp: false,
    address: {
      id: "67b6e540-0985-49e2-rt8a7a-3af8278f6e2e",
      street: "Wall Street",
      city: "New York",
      state: "New York",
      zipCode: 10001,
    },
    driver: {
      email: "test@admin.com",
      enabled: true,
      id: "67b6e540-0985-49e2234-8a7a-3af8278f6e2e",
      imageURL: "url",
      lastName: "Pérez",
      name: "Juan",
      phoneNumber: "test@admin.com",
      userName: "Pedro",
      warehouse: {
        id: "67b6e540-0985-49e2-8a7erta-3af8278f6e2e",
        name: "FLL Warehouse",
        address: {
          id: "67b6e540-0985-49e2-8a1417a-3af8278f6e2e",
          street: "Wall Street",
          city: "New York",
          state: "New York",
          zipCode: 10001,
        },
      },
    },
    customer: {
      company: {
        id: "67b6e540-0985-49e2-8a7a43534-3af8278f6e2e",
        name: "Company 1",
        address: {
          id: "67b6e540-0985-49e2-8a743523a-3af8278f6e2e",
          street: "Wall Street",
          city: "New York",
          state: "New York",
          zipCode: 10001,
        },
      },
      email: "test@admin.com",
      id: "67b6e540-0985-49e2-8a7a43534-3af8278f6e2e",
      imageURL: "url",
      lastName: "Pérez",
      name: "Juan",
      phoneNumber: "test@admin.com",
      priorityCustomer: false,
      userName: "Juan",
    },
    products: [
      {
        id: "67b6e540-0985-49e2-8a7a234-3af8278f6e2e",
        pendingQuanty: 200,
        completed: true,
        description: "Dry Ice 4 kg",
        quanty: 1,
        name: "Dry Ice",
        productTypeId: "67b6e540-0985-49453242-8a7a-3af8278f6e2e",
      },
    ],
  },
  {
    id: "67b6e540-0985-49e2-8a7a34522-3af8278f6e2e",
    tag: "Dry Ice",
    status: "Waiting",
    priority: 1,
    pickUp: false,
    address: {
      id: "67b6e540-0985-49e2-8a7a-3af81241278f6e2e",
      street: "Wall Street",
      city: "New York",
      state: "New York",
      zipCode: 10001,
    },
    driver: {
      email: "test@admin.com",
      enabled: true,
      id: "67b6e540-0985-49e2-8a7a-3af834534278f6e2e",
      imageURL: "url",
      lastName: "Pérez",
      name: "Juan",
      phoneNumber: "test@admin.com",
      userName: "Pedro",
      warehouse: {
        id: "67b6e540-0985-49e2-8a7a-3a 234f8278f6e2e",
        name: "FLL Warehouse",
        address: {
          id: "67b6e540-0985-49e2-8a7a-3arterf8278f6e2e",
          street: "Wall Street",
          city: "New York",
          state: "New York",
          zipCode: 10001,
        },
      },
    },
    customer: {
      company: {
        id: "67b6e540-0985-49e2-8345a7a-3af8278f6e2e",
        name: "Company 1",
        address: {
          id: "67b6e540-0985-49e2-hrtg8a7a-3af8278f6e2e",
          street: "Wall Street",
          city: "New York",
          state: "New York",
          zipCode: 10001,
        },
      },
      email: "test@admin.com",
      id: "67b6e540-0985-49e2-8a7a-3af1248278f6e2e",
      imageURL: "url",
      lastName: "Pérez",
      name: "Juan",
      phoneNumber: "test@admin.com",
      priorityCustomer: false,
      userName: "Juan",
    },
    products: [
      {
        id: "67b6e540-0985-49e2-8a7234a-3af8278f6e2e",
        pendingQuanty: 200,
        completed: true,
        description: "Dry Ice 4 kg",
        quanty: 1,
        name: "Dry Ice",
        productTypeId: "67b6e54045y-0985-49e2-8a7a-3af8278f6e2e",
      },
    ],
  },
  {
    id: "67b6e540-0985-49e2-8a7a-3af5468278f6e2e",
    tag: "Dry Ice",
    status: "Waiting",
    priority: 1,
    pickUp: false,
    address: {
      id: "67b6e540-0985-49e2-we38a7a-3af8278f6e2e",
      street: "Wall Street",
      city: "New York",
      state: "New York",
      zipCode: 10001,
    },
    driver: {
      email: "test@admin.com",
      enabled: true,
      id: "67b6e540-0985-49e2-8a7a-3af82tyu78f6e2e",
      imageURL: "url",
      lastName: "Pérez",
      name: "Juan",
      phoneNumber: "test@admin.com",
      userName: "Pedro",
      warehouse: {
        id: "67b6e540-0985-49e2-8a7a-3af82ghj78f6e2e",
        name: "FLL Warehouse",
        address: {
          id: "67b6e540-0985-49e2-8a7agdfg-3af8278f6e2e",
          street: "Wall Street",
          city: "New York",
          state: "New York",
          zipCode: 10001,
        },
      },
    },
    customer: {
      company: {
        id: "67b6e540-0985-49e2-8a7a-3afasd8278f6e2e",
        name: "Company 1",
        address: {
          id: "67b6e540-0985-49e2-8a7a-3aasdf8278f6e2e",
          street: "Wall Street",
          city: "New York",
          state: "New York",
          zipCode: 10001,
        },
      },
      email: "test@admin.com",
      id: "67b6e540-0985-49e2-8a7a-3af82dasd78f6e2e",
      imageURL: "url",
      lastName: "Pérez",
      name: "Juan",
      phoneNumber: "test@admin.com",
      priorityCustomer: false,
      userName: "Juan",
    },
    products: [
      {
        id: "67b6e540-0985-49e2-8a7a-3af8278sasdf6e2e",
        pendingQuanty: 200,
        completed: true,
        description: "Dry Ice 4 kg",
        quanty: 1,
        name: "Dry Ice",
        productTypeId: "67b6e540-0985-49e2-8a7a-3afdasd8278f6e2e",
      },
    ],
  },
];

const Orders = ({ driverId }) => {
  const [orders, setOrders] = useState({ data: dummyOrders, totalItems: 10 });
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);

  const handleChangePage = (event) => {
    setRowPerPage(event.target.value);
  };
  function handleChangeRowsPerPage(event, value) {
    setPage(value);
  }

  const dispatch = useDispatch();
  const loadOrders = (id) => {
    getShipment(id)
      .then((response) => {
        setOrders({
          data: response.data.data,

          totalItems: response.data.totalItems,
        });

        // setTotalItems(response.data.totalItems);
      })
      .catch(() => {
        dispatch(
          showMessage({
            message: "There is something wrong, try to refresh the page",
            variant: "error",
          })
        );
      });
  };

  useEffect(() => {
    // loadOrders(driverId);
    console.log("Use Effect Orders");
  }, [driverId]);

  console.log(orders);
  return (
    <OrdersTable
      data={orders.data}
      rows={rows}
      page={page}
      rowsPerPage={rowPerPage}
      totalItems={orders.totalItems}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default Orders;
