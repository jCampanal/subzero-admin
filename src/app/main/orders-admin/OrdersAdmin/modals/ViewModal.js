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
} from "@material-ui/core";

import React from "react";
import { useTranslation } from "react-i18next";
import PropType from "prop-types";
import { formatDisplayDate } from "app/lib/formatDate";

const ViewModal = ({ data, isModal, setIsModal }) => {
  const { t } = useTranslation("schedules");

  return (
    <Dialog
      open={isModal}
      onClose={() => setIsModal(false)}
      fullWidth
      maxWidth="xs"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="block w-full py-12 ">
          <Typography variant="h4" color="inherit" component="div">
            {data.poNo}
          </Typography>

          <Typography variant="h6" color="inherit" component="div">
            <h3>{data.no}</h3>
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent classes={{ root: "p-0" }}>
        <div className="px-16 sm:px-20 pt-20">
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
      </DialogContent>
      <DialogActions className="px-8 py-16 justify-end">
        <div className="px-16">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setIsModal(false)}
          >
            {t("CLOSE")}
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default ViewModal;

ViewModal.propTypes = {
  data: PropType.object.isRequired,
  isModal: PropType.bool.isRequired,
  setIsModal: PropType.func.isRequired,
};