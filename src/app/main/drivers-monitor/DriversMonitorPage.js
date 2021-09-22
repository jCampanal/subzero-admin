import FusePageSimple from '@fuse/core/FusePageSimple';
import DriversMonitor from './DriversMonitor';

function DriversMonitorPage() {
    return (
        <FusePageSimple
            content={
                <div className="p-24">
                    <DriversMonitor />
                </div>
            }
        />
    );
}

export default DriversMonitorPage;
