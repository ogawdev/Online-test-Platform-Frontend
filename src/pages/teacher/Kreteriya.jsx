
import TeacherMenu from '../../components/menu/TeacherMenu';
import TeacherProfile from './TeacherProfile';

function Kreteriya(props) {
    
    return (
        <div className='row p-3'>
            <TeacherMenu />
            <TeacherProfile />
        </div>
    );
}

export default Kreteriya;