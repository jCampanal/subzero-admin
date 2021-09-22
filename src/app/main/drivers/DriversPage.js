import FusePageSimple from '@fuse/core/FusePageSimple';
import Drivers from './Drivers';

function DriversPage() {
    return (
        <FusePageSimple
            content={
                <div className="p-24">
                    <Drivers />
                </div>
            }
        />
    );
}

export default DriversPage;
