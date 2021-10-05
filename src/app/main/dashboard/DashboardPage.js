import Dashboard from 'app/main/dashboard/Dashboard';
import FusePageSimple from '@fuse/core/FusePageSimple';

function DashboardPage() {
    return (
        <FusePageSimple
            content={
                <div className="p-24">
                    <Dashboard />
                </div>
            }
        />
    );
}

export default DashboardPage;
