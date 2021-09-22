import FusePageSimple from '@fuse/core/FusePageSimple';
import Coolers from './Coolers';

function CoolersPage() {
    return (
        <FusePageSimple
            content={
                <div className="p-24">
                    <Coolers />
                </div>
            }
        />
    );
}

export default CoolersPage;
