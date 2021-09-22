import FusePageSimple from '@fuse/core/FusePageSimple';
import Blacklist from './Blacklist/Blacklist';

function BlacklistPage() {
    return (
        <FusePageSimple
            content={
                <div className="p-24">
                    <Blacklist />
                </div>
            }
        />
    );
}

export default BlacklistPage;
