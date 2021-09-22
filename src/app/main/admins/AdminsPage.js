import FusePageSimple from '@fuse/core/FusePageSimple';
import Admins from './Admins/Admins';

function AdminsPage() {
    return (
        <FusePageSimple
            content={
                <div className="p-24">
                    <Admins />
                </div>
            }
        />
    );
}

export default AdminsPage;
