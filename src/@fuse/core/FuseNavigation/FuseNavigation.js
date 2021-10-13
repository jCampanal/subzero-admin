import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import React, {memo} from 'react';
import _ from '@lodash';
import FuseNavVerticalLayout1 from './vertical/FuseNavVerticalLayout1';
import FuseNavVerticalCollapse from './vertical/types/FuseNavVerticalCollapse';
import FuseNavVerticalGroup from './vertical/types/FuseNavVerticalGroup';
import FuseNavVerticalItem from './vertical/types/FuseNavVerticalItem';
import FuseNavVerticalLink from './vertical/types/FuseNavVerticalLink';
import {registerComponent} from './FuseNavItem';
/*
Register Fuse Navigation Components
 */
registerComponent('vertical-group', FuseNavVerticalGroup);
registerComponent('vertical-collapse', FuseNavVerticalCollapse);
registerComponent('vertical-item', FuseNavVerticalItem);
registerComponent('vertical-link', FuseNavVerticalLink);
registerComponent('vertical-divider', () => <Divider className="my-16" />);
registerComponent('horizontal-divider', () => <Divider className="my-16" />);

function FuseNavigation(props) {
    const options = _.pick(props, ['navigation', 'layout', 'active', 'dense', 'className', 'onItemClick', 'firstLevel', 'selectedId']);
    if (props.navigation.length > 0) {
        return <FuseNavVerticalLayout1 {...options} />;
    }
    return null;
}

FuseNavigation.propTypes = {
    navigation: PropTypes.array.isRequired,
};

FuseNavigation.defaultProps = {
    layout: 'vertical',
};

export default memo(FuseNavigation);
