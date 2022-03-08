import React, { Fragment } from 'react'
import { useTranslation } from "react-i18next";
import {Button} from "@material-ui/core";
  import { formatDisplayDate } from "app/lib/formatDate";
  

const ViewModalPOD=({data})=>{
    const { t } = useTranslation("schedules");
    return(
        <Fragment>
            <div className="px-16 sm:px-20 pt-10">
            <div className="-mx-4 my-5 pt-5">
                <h2 className="mb-12">              
               {" Deliver to"} <b> {data.customer.lastName}</b>
                </h2>
                <h4 className="mb-12">
                Driver: {data.driver} 
                </h4>
                <h6 className="mb-12">
                {formatDisplayDate(new Date(data.deliveryTime))}
                </h6>
                <img className={"w-full"}
                     src={data.customer.imageURL}/>

                <div className="justify-start my-6">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {console.log("descargar")}}
                        >
                            {t("Download")}
                        </Button>
                </div>
            </div>
            </div>

        </Fragment>
    )
}


export default ViewModalPOD 