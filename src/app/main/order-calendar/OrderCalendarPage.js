import FusePageSimple from '@fuse/core/FusePageSimple';
import OrderCalendar from './OrderCalendar/OrderCalendar';

function OrderCalendarPage() {
    return (
        <FusePageSimple
            content={
                <div className="p-24">
                    <OrderCalendar />
                </div>
            }
        />
    );
}

export default OrderCalendarPage;
