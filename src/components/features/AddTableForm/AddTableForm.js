import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { addTable } from '../../../redux/tablesRedux';

const AddTableForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = table => {
        dispatch(addTable(table));
        navigate('/')
    }

    return (
        //<TableForm action={handleSubmit} actionText="Add post" />
        <h1>AddTableForm</h1>
      )
};

export default AddTableForm;