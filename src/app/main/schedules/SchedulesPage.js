import Schedules from 'app/main/schedules/Schedules/Schedules';
import FusePageSimple from '@fuse/core/FusePageSimple';

function SchedulesPage() {
    return (
        <FusePageSimple
            content={
                <div className="p-24">
                    <Schedules />
                </div>
            }
        />
    );
}

export default SchedulesPage;
