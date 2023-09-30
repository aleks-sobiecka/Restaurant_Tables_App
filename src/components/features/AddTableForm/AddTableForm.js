import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { addTable } from '../../../redux/tablesRedux';
import TableForm from '../TableForm/TableForm';

const AddTableForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = table => {
        dispatch(addTable(table));
        navigate('/')
    }

    return (
        <TableForm action={handleSubmit} actionText="Add table" />
      )
};

export default AddTableForm;