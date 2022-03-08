import React, { Fragment } from 'react'
import {
    AppBar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Toolbar,
    Typography,
    ButtonGroup 
  } from "@material-ui/core";
  import { formatDisplayDate } from "app/lib/formatDate";

const ViewModalDetails=({data})=>{
    return(
        <Fragment>
            <div className="px-16 sm:px-20 pt-10">
            <div className="-mx-4 my-5 pt-5">
                <h2 className="mb-12">              
                For <b> {data.customer.company.name}</b>
                </h2>
                <h4 className="mb-12">
                Customer : {data.customer.name} {data.customer.lastName}
                </h4>
                <h6 className="mb-12">
                {formatDisplayDate(new Date(data.deliveryTime))}
                </h6>
                <h2 className="mb-12">
                <b>to</b> {data.address.street}, {data.address.city},{" "}
                {data.address.state} {data.address.zipCode}
                </h2>

                <span className="small"></span>
            </div>
            </div>
            <br />
            <Table>
            <TableHead>
                <TableRow>
                <TableCell className="font-bold">Product</TableCell>
                <TableCell className="font-bold">Quanty</TableCell>
                <TableCell className="font-bold">Description</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.products.map((product) => {
                return (
                    <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.quanty}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    </TableRow>
                );
                })}
            </TableBody>
            </Table>
        </Fragment>
    )
}


export default ViewModalDetails 