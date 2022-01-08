import React, { useEffect, useState } from 'react';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import {ThemeProvider} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {motion} from 'framer-motion';
import {useSelector} from 'react-redux';
import {selectMainTheme} from 'app/store/fuse/settingsSlice';
import {useTranslation} from 'react-i18next';
import { useHistory } from 'react-router';
import { Button, IconButton } from '@material-ui/core';
import { CancelRounded } from '@material-ui/icons';

function PageCardedHeader() {
    const {t} = useTranslation('schedules');
    const mainTheme = useSelector(selectMainTheme);

    const history = useHistory();
  const [filter, setFilter] = useState({
    customer: "",
    company: "",
  });
  const [customerSearch, setCustomerSearch] = useState("");
  const [companySearch, setCompanySearch] = useState("");



  const serachByCustomer = () => {
    setFilter({ ...filter, customer: customerSearch });
  };
  const serachByCompany = () => {
    setFilter({ ...filter, company: companySearch });
  };


  const submitFilter = () => {
    history.push(
      `/schedules?company=${filter.company}&customer=${filter.customer}`
    );
  };
  const clearFilter = () => {
    if (filter.customer !== "" || filter.company !== "") {
      setFilter({
        customer: "",
        company: "",
      });
      setCompanySearch("");
      setCustomerSearch("");
    }
    history.push(`/schedules`);
  };

  const handleOnChangeCompany = (e) => {
    setCompanySearch(e.target.value);
  };
  const handleOnChangeCustomer = (e) => {
    setCustomerSearch(e.target.value);
  };

  useEffect(() => {
    if (filter.company !== "" || filter.customer !== "") {
      submitFilter();
    }
  }, [filter]);

    return (
        <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex items-center">
                <Icon component={motion.span} initial={{scale: 0}} animate={{scale: 1, transition: {delay: 0.2}}} className="text-24 md:text-32">
                    schedule
                </Icon>
                <Typography
                    component={motion.span}
                    initial={{x: -20}}
                    animate={{x: 0, transition: {delay: 0.2}}}
                    delay={300}
                    className="hidden sm:flex text-16 md:text-24 mx-12 font-semibold"
                >
                    {t('SCHEDULES')}
                </Typography>
            </div>

            <div className="flex flex-1 items-center justify-center px-12 gap-5 sm:gap-9 lg:gap-16">
                <ThemeProvider theme={mainTheme}>
                    <Paper
                        component={motion.div}
                        initial={{y: -20, opacity: 0}}
                        animate={{y: 0, opacity: 1, transition: {delay: 0.2}}}
                        className="flex items-center w-full max-w-512 px-8 py-4 rounded-16 shadow"
                    >
                       

                        <Input
                            placeholder={t('SEARCH_BY_CUSTOMER')}
                            className="flex flex-1 mx-8"
                            onChange={handleOnChangeCustomer}
                value={customerSearch}
                            disableUnderline
                            fullWidth
                            inputProps={{
                                'aria-label': 'Search',
                            }}
                        />
                         <Icon color="action" onClick={serachByCustomer} >search</Icon>
                    </Paper>
            <Paper
                        component={motion.div}
                        initial={{y: -20, opacity: 0}}
                        animate={{y: 0, opacity: 1, transition: {delay: 0.2}}}
                        className="flex items-center w-full max-w-512 px-8 py-4 rounded-16 shadow"
                    >

                        <Input
                            placeholder={t('SEARCH_BY_COMPANY')}
                            className="flex flex-1 mx-8"
                            onChange={handleOnChangeCompany}
                            value={companySearch}
                            disableUnderline
                            fullWidth
                            inputProps={{
                                'aria-label': 'Search',
                            }}
                        />
                        <Icon color="action" onClick={serachByCompany}>search</Icon>

                    </Paper>
                </ThemeProvider>
            </div>
            <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
        className="inline-block mx-10"
      >
        <IconButton className="sm:hidden" onClick={clearFilter}>
          <CancelRounded />
        </IconButton>
        <Button
          className="whitespace-nowrap hidden sm:inline-block"
          variant="contained"
          color="default"
          onClick={clearFilter}
        >
          <CancelRounded className="mr-5" />
          {t("CLEAR_SEARCH")}
        </Button>
      </motion.div>
        </div>
    );
}

export default PageCardedHeader;
