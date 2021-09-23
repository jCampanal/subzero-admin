import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import {motion} from 'framer-motion';
import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import TableHeader from 'app/main/products/Products/TableHeader';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

function CustomersTable(props) {
    const [selected, setSelected] = useState([]);
    const [data, setData] = useState(props.customers);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState({
        direction: 'asc',
        id: null,
    });

    function handleRequestSort(event, property) {
        const id = property;
        let direction = 'desc';

        if (order.id === property && order.direction === 'desc') {
            direction = 'asc';
        }

        setOrder({
            direction,
            id,
        });
    }

    function handleSelectAllClick(event) {
        if (event.target.checked) {
            setSelected(data.map((n) => n.id));
            return;
        }
        setSelected([]);
    }

    function handleDeselect() {
        setSelected([]);
    }

    function handleClick(item) {
        props.history.push(`/apps/e-commerce/products/${item.id}/${item.handle}`);
    }

    function handleCheck(event, id) {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    }

    function handleChangePage(event, value) {
        setPage(value);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(event.target.value);
    }

    if (data.length === 0) {
        return (
            <motion.div initial={{opacity: 0}} animate={{opacity: 1, transition: {delay: 0.1}}} className="flex flex-1 items-center justify-center h-full">
                <Typography color="textSecondary" variant="h5">
                    There are no customers!
                </Typography>
            </motion.div>
        );
    }

    return (
        <div className="w-full flex flex-col">
            <FuseScrollbars className="flex-grow overflow-x-auto overflow-y-auto">
                <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
                    <TableHeader
                        rows={props.rows}
                        selectedProductIds={selected}
                        order={order}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={data.length}
                        onMenuItemClick={handleDeselect}
                    />

                    <TableBody>
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((customer) => {
                            const isSelected = selected.indexOf(customer.id) !== -1;
                            return (
                                <TableRow
                                    className="h-72 cursor-pointer"
                                    hover
                                    role="checkbox"
                                    aria-checked={isSelected}
                                    tabIndex={-1}
                                    key={customer.id}
                                    selected={isSelected}
                                    onClick={(event) => handleClick(customer)}
                                >
                                    <TableCell className="w-40 md:w-64 text-center" padding="none">
                                        <Checkbox
                                            checked={isSelected}
                                            onClick={(event) => event.stopPropagation()}
                                            onChange={(event) => handleCheck(event, customer.id)}
                                        />
                                    </TableCell>

                                    <TableCell className="w-52 px-4 md:px-0" component="th" scope="row" padding="none">
                                        <img className="w-full block rounded" src="assets/images/ecommerce/product-image-placeholder.png" alt={customer.name} />
                                    </TableCell>

                                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                                        {customer.firstName}
                                    </TableCell>

                                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                                        {customer.lastName}
                                    </TableCell>

                                    <TableCell className="p-4 md:p-16" component="th" scope="row" align="left">
                                        {customer.company}
                                    </TableCell>

                                    <TableCell className="p-4 md:p-16" component="th" scope="row" align="left">
                                        {customer.phone}
                                    </TableCell>

                                    <TableCell className="p-4 md:p-16" component="th" scope="row" align="left">
                                        {customer.email}
                                    </TableCell>

                                    <TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
                                        <Button color="primary">
                                            <Icon>edit</Icon> Edit
                                        </Button>
                                        <Button color="primary">
                                            <Icon>delete</Icon> Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </FuseScrollbars>

            <TablePagination
                className="flex-shrink-0 border-t-1"
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page',
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
}

export default withRouter(CustomersTable);

CustomersTable.propTypes = {
    customers: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
};
