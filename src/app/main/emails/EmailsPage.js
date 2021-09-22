import FusePageSimple from '@fuse/core/FusePageSimple';
import Emails from './Emails/Emails';

function EmailsPage() {
    return (
        <FusePageSimple
            content={
                <div className="p-24">
                    <Emails />
                </div>
            }
        />
    );
}

export default EmailsPage;
