import FusePageSimple from '@fuse/core/FusePageSimple';
import OrderAdmin from './OrderAdmin/OrderAdmin';

function OrderAdminPage() {
    return (
        <FusePageSimple
            content={
                <div className="p-24">
                    <OrderAdmin />
                </div>
            }
        />
    );
}

export default OrderAdminPage;
