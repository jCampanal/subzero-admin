import FusePageSimple from '@fuse/core/FusePageSimple';
import OrderMonitor from './OrderMonitor/OrderMonitor';

function OrderMonitorPage() {
    return (
        <FusePageSimple
            content={
                <div className="p-24">
                    <OrderMonitor />
                </div>
            }
        />
    );
}

export default OrderMonitorPage;
