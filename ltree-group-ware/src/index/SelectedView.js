import React from 'react';
import UserMenagement from '../userMenagement/UserMenagement';
import Calendar from './Calendar';
import Notice from '../Notice/Notice';
import DefaultView from './DefaultView';
import NoticeWrite from '../Notice/Notice write';
import Board from '../Board/Board';
import BoardWrite from '../Board/Boardwirte';

const SelectedView = ({ match, history }) => {
    console.log(match.params.id)

    switch (match.params.id) {

        case 'notice':
            return (<Notice />);
        case 'noticewrite':
            return (<NoticeWrite history={history} />);
        case 'boarder':
            return (<Board />);
        case 'boardwrite':
            return (<BoardWrite history={history}/>);
        case 'schedule':
            return (<Calendar today={new Date()} />);
        case 'users':
            return (<UserMenagement />);
        case 'write':
            return (<NoticeWrite />);

        default:
            return (<DefaultView />);

    }
}

export default SelectedView;