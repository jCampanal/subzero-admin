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
import {OptionsMenusDivS,ButtonS} from './ViewModal.style'
import React,{useState} from "react";
import { useTranslation } from "react-i18next";
import PropType from "prop-types";
import { formatDisplayDate } from "app/lib/formatDate";
import ViewModalDetails from "./ViewModal/WiewModalDetails";

const ViewModal = ({ data, isModal, setIsModal }) => {
  const { t } = useTranslation("schedules");
  const [selectedOption,setSelectedOption]=useState("details")

  const handlerOptions=(selected)=>{
    setSelectedOption(selected)
  }

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
    
         <OptionsMenusDivS>                   
              <ButtonS              
                selected={selectedOption==="details"}
                onClick={() => handlerOptions("details")}
              >
                Details
              </ButtonS>
              <ButtonS             
                selected={selectedOption==="POD"}
                onClick={() => handlerOptions("POD")}
              >
                POD
              </ButtonS>         
         </OptionsMenusDivS>

        {selectedOption==="details"&&<ViewModalDetails data={data}/>}
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
