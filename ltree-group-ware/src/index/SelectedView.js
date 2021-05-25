import React from 'react';
import UserMenagement from '../userMenagement/UserMenagement';
import Calendar from './Calendar';
import Notice from '../Notice/Notice';
import DefaultView from './DefaultView';
import NoticeWrite from '../Notice/Notice write';
import Board from '../Board/Board';
import BoardWrite from '../Board/Boardwirte';
import Boardcontent from '../Board/Boardcontent';
import NoticeContent from '../Notice/NoticeContent';
import BoardUpdate from '../Board/Boardupdate';
import NoticeUpdate from '../Notice/NoticeUpdate';

const SelectedView = ({ match, history, location }) => {
    
    
    switch (match.params.id) {

        case 'notice':
            return (<Notice />);
        case 'noticeUpdate':
            return (<NoticeUpdate history={history} location={location} />);
        case 'noticeWrite':
            return (<NoticeWrite history={history} />);
        case 'noticeContent':
            return (<NoticeContent history={history} location={location} />);
        case 'boarder':
            return (<Board />);
        case 'boarderUpdate':
            return (<BoardUpdate history={history} location={location}/>);
        case 'boardwrite':
            return (<BoardWrite history={history} />);
        case 'boardercontent':
            return (<Boardcontent history={history} location={location} />);
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