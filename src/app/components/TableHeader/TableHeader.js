import Checkbox from "@material-ui/core/Checkbox";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Tooltip from "@material-ui/core/Tooltip";
import clsx from "clsx";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  actionsButtonWrapper: {
    background: theme.palette.background.paper,
  },
}));

function TableHeader({
  namespace,
  onRequestSort,
  rowCount,
  onSelectAllClick,
  rows,
  onMenuItemClick,
  deleteSelectedItemsCallback,
  order,
  selectedProductIds,
  disableCheck,
  ...props
}) {
  const { t } = useTranslation(namespace);
  const classes = useStyles(props);

  const numSelected = selectedProductIds?.length ?? 0;

  const [selectedProductsMenu, setSelectedProductsMenu] = useState(null);

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  function openSelectedProductsMenu(event) {
    setSelectedProductsMenu(event.currentTarget);
  }

  function closeSelectedProductsMenu() {
    setSelectedProductsMenu(null);
  }

  return (
    <TableHead>
      <TableRow className="h-48 sm:h-64">
        {!disableCheck && (
          <TableCell padding="none" className="w-40 md:w-64 text-center z-99">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount !== 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
            {numSelected > 0 && (
              <div
                className={clsx(
                  "flex items-center justify-center absolute w-64 top-0 ltr:left-0 rtl:right-0 mx-56 h-64 z-10 border-b-1",
                  classes.actionsButtonWrapper
                )}
              >
                <IconButton
                  aria-owns={
                    selectedProductsMenu ? "selectedProductsMenu" : null
                  }
                  aria-haspopup="true"
                  onClick={openSelectedProductsMenu}
                >
                  <Icon>more_horiz</Icon>
                </IconButton>
                <Menu
                  id="selectedProductsMenu"
                  anchorEl={selectedProductsMenu}
                  open={Boolean(selectedProductsMenu)}
                  onClose={closeSelectedProductsMenu}
                >
                  <MenuList>
                    <MenuItem
                      onClick={() => {
                        onMenuItemClick();
                        deleteSelectedItemsCallback();
                      }}
                    >
                      <ListItemIcon className="min-w-40">
                        <Icon>delete</Icon>
                      </ListItemIcon>
                      <ListItemText primary={t("DELETE")} />
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>
            )}
          </TableCell>
        )}
        {rows.map((row) => {
          return (
            <TableCell
              className="p-4 md:p-10"
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? "none" : "normal"}
              sortDirection={order.id === row.id ? order.direction : false}
            >
              {row.sort ? (
                <Tooltip
                  title="Sort"
                  placement={
                    row.align === "right" ? "bottom-end" : "bottom-start"
                  }
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={order.id === row.id}
                    direction={order.direction}
                    onClick={createSortHandler(row.id)}
                    className="font-semibold"
                  >
                    {t(`${row.label}`)}
                  </TableSortLabel>
                </Tooltip>
              ) : (
                <span>{t(`${row.label}`)}</span>
              )}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;

TableHeader.propTypes = {
  namespace: PropTypes.string.isRequired,
  rows: PropTypes.array.isRequired,
  deleteSelectedItemsCallback: PropTypes.func,
};
