import FusePageSimple from '@fuse/core/FusePageSimple';
import Shipments from './Shipments';

function ShipmentsPage() {
    return (
        <FusePageSimple
            content={
                <div className="p-24">
                    <Shipments />
                </div>
            }
        />
    );
}

export default ShipmentsPage;
