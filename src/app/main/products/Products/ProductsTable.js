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
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import CheckCircleRounded from '@material-ui/icons/CheckCircleRounded';
import {useTranslation} from 'react-i18next';
import TableHeader from './TableHeader';

function ProductsTable(props) {
    const {t} = useTranslation('products');
    const [selected, setSelected] = useState([]);
    const [data] = useState(props.products);
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
                    {t('NO_PRODUCTS')}
                </Typography>
            </motion.div>
        );
    }

    return (
        <div className="w-full flex flex-col">
            <FuseScrollbars className="flex-grow overflow-x-auto">
                <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
                    <TableHeader
                        namespace="products"
                        rows={props.rows}
                        selectedProductIds={selected}
                        order={order}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={data.length}
                        onMenuItemClick={handleDeselect}
                    />

                    <TableBody>
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => {
                            const isSelected = selected.indexOf(product.id) !== -1;
                            return (
                                <TableRow
                                    className="h-72 cursor-pointer"
                                    hover
                                    role="checkbox"
                                    aria-checked={isSelected}
                                    tabIndex={-1}
                                    key={product.id}
                                    selected={isSelected}
                                    onClick={(event) => handleClick(product)}
                                >
                                    <TableCell className="w-40 md:w-64 text-center" padding="none">
                                        <Checkbox
                                            checked={isSelected}
                                            onClick={(event) => event.stopPropagation()}
                                            onChange={(event) => handleCheck(event, product.id)}
                                        />
                                    </TableCell>

                                    <TableCell className="w-52 px-4 md:px-0" component="th" scope="row" padding="none">
                                        <img
                                            className="w-full block rounded"
                                            src={`${process.env.PUBLIC_URL}/assets/images/ecommerce/product-image-placeholder.png`}
                                            alt={product.name}
                                        />
                                    </TableCell>

                                    <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                                        {product.category}
                                    </TableCell>

                                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                                        {product.name}
                                    </TableCell>

                                    <TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
                                        {product.units}
                                    </TableCell>

                                    <TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
                                        {product.visible ? (
                                            <CheckCircleRounded className="text-green text-20" />
                                        ) : (
                                            <Icon className="text-red text-20">remove_circle</Icon>
                                        )}
                                    </TableCell>

                                    <TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
                                        <Button color="primary">
                                            <Icon>edit</Icon> {t('EDIT')}
                                        </Button>
                                        <Button color="primary">
                                            <Icon>delete</Icon> {t('DELETE')}
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
                labelRowsPerPage={t('ROWS_PER_PAGE')}
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

export default withRouter(ProductsTable);

ProductsTable.propTypes = {
    products: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
};
