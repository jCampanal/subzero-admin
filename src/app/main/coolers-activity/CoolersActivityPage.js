import FusePageSimple from '@fuse/core/FusePageSimple';
import CoolersActivity from './CoolersActivity';

function CoolersActivityPage() {
    return (
        <FusePageSimple
            content={
                <div className="p-24">
                    <CoolersActivity />
                </div>
            }
        />
    );
}

export default CoolersActivityPage;
