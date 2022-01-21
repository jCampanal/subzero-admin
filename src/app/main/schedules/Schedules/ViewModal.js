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

import { formatDisplayDate } from "app/lib/formatDate";
import React from "react";
import { useTranslation } from "react-i18next";
import PropType from "prop-types";

const ViewModal = ({ schedule, isModal, setIsModal }) => {
  const { t } = useTranslation("schedules");

  return (
    <Dialog
      open={isModal}
      onClose={() => setIsModal(false)}
      fullWidth
      maxWidth="xs"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {schedule.order.status}
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent classes={{ root: "p-0" }}>
        <div className="px-16 sm:px-24">
          <div className="-mx-4 my-5 pt-5">
            <h3>
              This is scheduled for{" "}
              {formatDisplayDate(new Date(schedule.nextOrder))}
            </h3>
            <span className="small"></span>
          </div>
        </div>
        <br />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>product</TableCell>
              <TableCell>description</TableCell>
              <TableCell>quanty</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedule.order.products.map((product) => {
              return (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.quanty}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions className="px-8 py-16 justify-end">
        <div className="px-16">
          <Button
            type="submit"
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
  schedule: PropType.object.isRequired,
  isModal: PropType.bool.isRequired,
  setIsModal: PropType.func.isRequired,
};
