import React,{useState,useEffect} from 'react'
import {Checkbox,FormControlLabel,IconButton,InputAdornment} from '@material-ui/core';
import {
    DivDriverElementS,
    DivDriverElementSecundaryS,
    FormS,
    OrderCountS,
    H3S,
    OnlineSignal,
    LabelH4S} from './DriverElement.style'
import { DatePicker } from "@material-ui/pickers";
import Field from 'app/main/orders-admin/OrdersAdminForm/FormControls/Commons/Field/Field';
import {  MenuItem } from "@material-ui/core";
import { Controller,useForm, useFormContext,useFormState } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CalendarToday } from "@material-ui/icons";
import StopsElements from './StopsElements/StopsElements';
import { useTranslation } from "react-i18next";
import Circle from '@material-ui/icons/PlayCircleFilled';

const DriverElement=(props)=>{
    const { t } = useTranslation("drivers-monitor");
    const [calendarDeployment,setCalendarDeployment]=useState(false)

    const {
        handleSubmit,
        control,
        reset,
        setValue,
        getValues
      } = useForm({
        defaultValues: {
         selected:true,   
         date: new Date(),
         frecuency: 0
        },
        mode: "all",
      });
      


    const handlerCalendar=()=>{
        if(!calendarDeployment){
            reset()
        }
        setCalendarDeployment(!calendarDeployment)
        
    }

      const handleSubmitForm = (data)=>{
          if(calendarDeployment){
                console.log('entro aqui')
                console.log(getValues("selected"))
                console.log(getValues("date"))
                console.log(getValues("frecuency"))
                    }
      }

    return(
        <DivDriverElementS>
                        <DivDriverElementSecundaryS>
                            <H3S onClick={handlerCalendar}>{props.Name}</H3S>
                            <OrderCountS>{props.Ordenes}</OrderCountS>
                        </DivDriverElementSecundaryS>

                        <DivDriverElementSecundaryS padding>                                
                            <FormControlLabel
                                   control={ <OnlineSignal Online= {props.Online} Color={props.Color}/>}
                                    label={t("ONLINE")}/>
                            <FormControlLabel
                                    control={<Checkbox
                                               disabled={!props.Online} 
                                               defaultChecked={props.Enable&&props.Online}
                                               onChange={props.Click}  /  >}
                                    label={t("ENABLE")}/>
                        </DivDriverElementSecundaryS>

                                         
            <FormS Show={calendarDeployment} 
                   onSubmit={handleSubmit((data) => handleSubmitForm(data))} >
                {props.Stops.map(element=>{
                   return( <StopsElements>
                                {element}
                            </StopsElements>)
                })}

                <Controller
                    name="date"
                    control={control}
                    render={({ field }) => (
                        <DatePicker
                            className="w-6/12 md:w-5/6"
                            label={t("DATE")}
                            labelText={t("DATE")}
                            variant="dialog" 
                            id="date"
                            rightArrowIcon={<CalendarToday />}
                            inputVariant="outlined"
                            animateYearScrolling
                            value={getValues("date")}
                            onChange={(e) => {setValue("date", new Date(e));handleSubmitForm()}}
                                    InputProps={{
                                        endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton>
                                            <CalendarToday />
                                            </IconButton>
                                        </InputAdornment>
                                        ),
                                    }}                       
                        />
                    )}
                    />          
                    <LabelH4S>{t("SHOW_RECORDS_FOR")}</LabelH4S>                
                                        <Field
                                            type="select"
                                            className="w-6/12 place-self-center md:w-5/6"
                                            id="frecuency"
                                            name="frecuency"
                                            control={control}
                                            onChange={e=>{setValue("frecuency",e);handleSubmitForm()}}                                       
                                            options={[                                            
                                                <MenuItem key={"last 24 hours"} value={0}>
                                                    {t("LAST_24_HOURS")}
                                                </MenuItem>,
                                                <MenuItem key={"last 6 hours"} value={1}>
                                                    {t("LAST_6_HOURS")}
                                                </MenuItem>,
                                                <MenuItem key={"last hour"} value={2}>
                                                    {t("LAST_HOUR")}
                                                </MenuItem>,
                                                ]}
                                            />

                    <Controller
                            name="selected"
                            control={control}
                            render={({ field }) => (
                            <FormControlLabel
                                className="mt-8 mb-16"                                
                                id="selected"
                                control={
                                <Checkbox
                                    {...field}
                                    checked={field.value}
                                    onChange={(e) => {field.onChange(e.target.checked);handleSubmitForm()}}
                                />
                                }
                                label={<span style={{ fontSize: "16px" }}>{t("SHOW_RECORDS")}</span>}
                            />
                            )}
                        />     
            </FormS >
                      
       </DivDriverElementS>
            
    )
}
export default DriverElement