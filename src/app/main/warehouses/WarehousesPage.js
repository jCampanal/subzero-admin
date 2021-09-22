import FusePageSimple from '@fuse/core/FusePageSimple';
import Warehouses from './Warehouses/Warehouses';

function WarehousesPage() {
    return (
        <FusePageSimple
            content={
                <div className="p-24">
                    <Warehouses />
                </div>
            }
        />
    );
}

export default WarehousesPage;
