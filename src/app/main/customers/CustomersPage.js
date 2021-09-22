import FusePageSimple from '@fuse/core/FusePageSimple';
import Customers from './Customers/Customers';

function CustomersPage() {
    return (
        <FusePageSimple
            content={
                <div className="p-24">
                    <Customers />
                </div>
            }
        />
    );
}

export default CustomersPage;
