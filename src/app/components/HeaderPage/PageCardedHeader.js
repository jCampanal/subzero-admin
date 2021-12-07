import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import { ThemeProvider } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectMainTheme } from "app/store/fuse/settingsSlice";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import PropTypes from "prop-types";

function PageCardedHeader({
  iconText,
  title,
  addButtonLabel,
  submitFilter,
  addButtonCallback,
  searchHint,
  disableSearch,
}) {
  const mainTheme = useSelector(selectMainTheme);

  const [searchPattern, setSearchPattern] = useState("");

  const handleChangeSearchName = (e) => {
    setSearchPattern(e.target.value);
  };

  return (
    <div className="flex flex-1 w-full items-center justify-between">
      <div className="flex items-center">
        {iconText.slice(0, 3) !== "fa-" && (
          <Icon
            component={motion.span}
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.2 } }}
            className="text-24 md:text-32"
          >
            {iconText}
          </Icon>
        )}
        {iconText.slice(0, 3) === "fa-" && (
          <Icon
            component={motion.span}
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.2 } }}
            className="text-24 md:text-32"
          >
            <i className={`fa ${iconText}`} />
          </Icon>
        )}
        <Typography
          component={motion.span}
          initial={{ x: -20 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          delay={300}
          className="hidden sm:flex text-16 md:text-24 mx-12 font-semibold"
        >
          {title}
        </Typography>
      </div>

      {!disableSearch && (
        <div className="flex flex-1 items-center justify-center px-12">
          <ThemeProvider theme={mainTheme}>
            {searchHint !== undefined && searchHint !== "" && (
              <Paper
                component={motion.div}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
                className="flex items-center w-full max-w-512 px-8 py-4 rounded-16 shadow"
              >
                <Input
                  placeholder={searchHint}
                  className="flex flex-1 mx-8"
                  disableUnderline
                  fullWidth
                  inputProps={{
                    "aria-label": "Search",
                  }}
                  id="search-inp"
                  onChange={handleChangeSearchName}
                />

                <Icon
                  color="action"
                  onClick={() => submitFilter(searchPattern)}
                >
                  search
                </Icon>
              </Paper>
            )}
          </ThemeProvider>
        </div>
      )}
      {addButtonLabel !== "" && addButtonLabel !== undefined && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
        >
          <IconButton className="sm:hidden" onClick={addButtonCallback}>
            <AddCircleIcon />
          </IconButton>
          <Button
            className="whitespace-nowrap hidden sm:inline-block"
            variant="contained"
            color="secondary"
            onClick={addButtonCallback}
          >
            <AddCircleIcon className="mr-5" />
            {addButtonLabel}
          </Button>
        </motion.div>
      )}
    </div>
  );
}

export default PageCardedHeader;

PageCardedHeader.propTypes = {
  iconText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  addButtonLabel: PropTypes.string.isRequired,
  setSearchName: PropTypes.func,
  addButtonCallback: PropTypes.func,
  submitFilter: PropTypes.func,
  searchHint: PropTypes.string,
};
