import React, {lazy, memo} from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded';
import {useTranslation} from 'react-i18next';
import rows from './rows';

const Header = lazy(() => import('app/main/products/Products/PageCardedHeader').then((header) => header));
const EmailsTable = lazy(() => import('./EmailsTable').then((table) => table));

const dummyEmails = [
    {
        id: 1,
        to: 'Pretium Lectus',
        subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl pretium fusce id velit ut tortor. Mattis pellentesque id nibh tortor. Pellentesque massa placerat duis ultricies lacus sed turpis. Iaculis urna id volutpat lacus laoreet. Egestas purus viverra accumsan in nisl nisi. Dolor morbi non arcu risus quis varius quam quisque id. Sit amet consectetur adipiscing elit ut. Neque convallis a cras semper auctor neque vitae tempus. Purus gravida quis blandit turpis cursus in hac habitasse.',
        status: 'new',
        hasAttachments: true,
    },
    {
        id: 2,
        to: 'Quam Id',
        subject: 'Cursus turpis massa tincidunt dui ut ornare lectus sit. Sed enim ut sem viverra.',
        body: 'Sit amet porttitor eget dolor morbi. Elit at imperdiet dui accumsan sit. Mauris ultrices eros in cursus turpis massa tincidunt. Quis blandit turpis cursus in. Amet est placerat in egestas erat imperdiet sed euismod nisi. Lectus quam id leo in vitae turpis. Quis commodo odio aenean sed adipiscing. Eget magna fermentum iaculis eu. Id porta nibh venenatis cras. Nunc mattis enim ut tellus elementum sagittis vitae et. Feugiat in ante metus dictum at tempor. Quis vel eros donec ac odio tempor orci dapibus ultrices. Tincidunt dui ut ornare lectus sit amet est placerat. Vulputate ut pharetra sit amet aliquam. Neque sodales ut etiam sit amet nisl purus in mollis. Adipiscing elit ut aliquam purus. Faucibus et molestie ac feugiat sed lectus vestibulum mattis.',
        status: 'new',
        hasAttachments: false,
    },
    {
        id: 3,
        to: 'Vitae Turpis',
        subject: 'Ut placerat orci nulla pellentesque.',
        body: 'Aliquam purus sit amet luctus venenatis lectus magna fringilla. Hendrerit gravida rutrum quisque non tellus. Vestibulum morbi blandit cursus risus at. Tempus imperdiet nulla malesuada pellentesque elit eget. Amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Integer feugiat scelerisque varius morbi enim. Ornare aenean euismod elementum nisi quis eleifend quam adipiscing. Ac tortor vitae purus faucibus ornare suspendisse sed nisi. Integer vitae justo eget magna fermentum. Vel quam elementum pulvinar etiam non quam lacus suspendisse. Quis lectus nulla at volutpat diam ut venenatis tellus in. Neque laoreet suspendisse interdum consectetur libero. Maecenas volutpat blandit aliquam etiam erat. Augue interdum velit euismod in pellentesque. Nec ultrices dui sapien eget mi proin sed. Ante in nibh mauris cursus. Id ornare arcu odio ut. Morbi tempus iaculis urna id. Ac feugiat sed lectus vestibulum mattis.',
        status: 'new',
        hasAttachments: false,
    },
    {
        id: 4,
        to: 'Massa Sed',
        subject: 'Pellentesque habitant morbi tristique senectus et netus et malesuada.',
        body: 'Fames ac turpis egestas integer eget aliquet nibh praesent tristique. Viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Diam sollicitudin tempor id eu nisl nunc. Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Cras pulvinar mattis nunc sed blandit libero. At volutpat diam ut venenatis tellus. Donec ultrices tincidunt arcu non. Lectus mauris ultrices eros in cursus turpis. Vitae proin sagittis nisl rhoncus mattis rhoncus urna. Elit pellentesque habitant morbi tristique senectus et netus et. At auctor urna nunc id cursus metus aliquam eleifend mi. Sed ullamcorper morbi tincidunt ornare massa. Dolor sit amet consectetur adipiscing elit. Diam sit amet nisl suscipit adipiscing. Consequat mauris nunc congue nisi vitae suscipit tellus mauris a. Vivamus arcu felis bibendum ut tristique et egestas.',
        status: 'new',
        hasAttachments: false,
    },
    {
        id: 5,
        to: 'Elementum Tempus',
        subject: 'Enim praesent elementum facilisis leo vel fringilla est ullamcorper eget.',
        body: 'Eu turpis egestas pretium aenean pharetra. Viverra vitae congue eu consequat ac. Ullamcorper eget nulla facilisi etiam dignissim diam. Et ultrices neque ornare aenean euismod elementum nisi quis. Tortor dignissim convallis aenean et. Tristique sollicitudin nibh sit amet commodo nulla facilisi. Vulputate odio ut enim blandit volutpat maecenas. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Pellentesque nec nam aliquam sem et tortor consequat id porta. Convallis tellus id interdum velit laoreet. Nam at lectus urna duis convallis convallis tellus id interdum. Senectus et netus et malesuada. In tellus integer feugiat scelerisque varius.',
        status: 'new',
        hasAttachments: true,
    },
    {
        id: 6,
        to: 'Egestas Sed',
        subject: 'Potenti nullam ac tortor vitae purus faucibus ornare suspendisse.',
        body: 'Lorem ipsum dolor sit amet consectetur adipiscing. Neque aliquam vestibulum morbi blandit cursus risus. Odio aenean sed adipiscing diam donec adipiscing. Ultricies mi quis hendrerit dolor magna eget est lorem ipsum. Blandit libero volutpat sed cras ornare. Sagittis id consectetur purus ut faucibus pulvinar elementum integer enim. Eget gravida cum sociis natoque penatibus et magnis dis parturient. Fringilla est ullamcorper eget nulla facilisi etiam. Vulputate enim nulla aliquet porttitor lacus luctus accumsan. Venenatis cras sed felis eget velit aliquet. Elit duis tristique sollicitudin nibh sit amet commodo. Blandit cursus risus at ultrices mi tempus imperdiet. In nisl nisi scelerisque eu. Elementum curabitur vitae nunc sed velit dignissim. Tristique sollicitudin nibh sit amet commodo. Sed felis eget velit aliquet sagittis id consectetur purus. Mauris augue neque gravida in fermentum et.',
        status: 'new',
        hasAttachments: false,
    },
    {
        id: 7,
        to: 'Risus Pretium',
        subject: 'Etiam erat velit scelerisque in dictum.',
        body: 'Scelerisque felis imperdiet proin fermentum leo vel orci porta. Mollis nunc sed id semper risus in hendrerit gravida. Pharetra diam sit amet nisl suscipit adipiscing. A pellentesque sit amet porttitor. Varius sit amet mattis vulputate. At ultrices mi tempus imperdiet nulla malesuada pellentesque elit. Enim ut tellus elementum sagittis vitae. Elit duis tristique sollicitudin nibh sit amet. Nisi scelerisque eu ultrices vitae auctor eu augue. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Nulla aliquet porttitor lacus luctus accumsan tortor posuere ac ut. Sed velit dignissim sodales ut eu sem integer vitae justo. Purus sit amet volutpat consequat mauris nunc congue. Id donec ultrices tincidunt arcu non. Interdum velit euismod in pellentesque massa placerat duis ultricies. Turpis egestas maecenas pharetra convallis. Tortor at risus viverra adipiscing at in tellus integer feugiat. Ut pharetra sit amet aliquam id diam maecenas ultricies. Eu scelerisque felis imperdiet proin fermentum leo. Est sit amet facilisis magna etiam.',
        status: 'new',
        hasAttachments: true,
    },
];

function Emails() {
    const {t} = useTranslation('emails');
    return (
        <FusePageCarded
            classes={{
                content: 'flex',
                contentCard: 'overflow-hidden',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
            }}
            header={<Header iconText="email" title={t('EMAILS')} addButtonLabel="" searchHint="" />}
            content={<EmailsTable emails={dummyEmails} rows={rows} />}
            innerScroll
        />
    );
}

export default memo(Emails);
