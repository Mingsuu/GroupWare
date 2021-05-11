import React from 'react';
import UserMenagement from '../userMenagement/UserMenagement';
import Schedule from './Schedule';
import Notice from '../Notice/Notice';
import DefaultView from './DefaultView';
import NoticeWrite from '../Notice/Notice write';

const SelectedView = ({ match }) => {

    switch (match.params.id) {

        case 'notice':
            return (<Notice />);
        case 'board':
            return (<Notice />);
        case 'schedule':
            return (<Schedule />);
        case 'users':
            return (<UserMenagement />);
        case 'write':
            return (<NoticeWrite />);

        default:
            return (<DefaultView />);

    }
}

export default SelectedView;