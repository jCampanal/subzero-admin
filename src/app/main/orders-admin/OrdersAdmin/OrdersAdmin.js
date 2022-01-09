import React, {lazy, memo,} from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded';
import { useEffect,useState } from 'react';
import withProtectedRoute from 'app/fuse-layouts/ProtectedRoute/ProtectedRoute';
import { getAllWarehouses } from 'app/api-conn/warehouses';
import rows from "./rows"

const Header = lazy(() => import('./PageCardedHeader'));
const OrdersTab = lazy(() => import('./OrdersTab'));




function OrdersAdmin() {
    const [warehoseTab, setWarehoseTab] = useState([]);

    useEffect(()=>{
        getAllWarehouses().then((res)=>{
            console.log("warehose",res.data);
            setWarehoseTab(res.data)
        })
    },[])
    return (
        <FusePageCarded
            classes={{
                content: 'flex',
                contentCard: 'overflow-hidden',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
            }}
            header={<Header />}
            content={<OrdersTab tabItems={warehoseTab} rows={rows} />}
            innerScroll
        />
    );
}

export default memo( withProtectedRoute( OrdersAdmin));
