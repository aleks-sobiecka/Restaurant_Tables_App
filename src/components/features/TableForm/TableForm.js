import { useSelector } from "react-redux";
import { getAllStatus } from "../../../redux/statusRedux";
import { getAllTables } from "../../../redux/tablesRedux";
import { useState } from "react";
import { Form, Stack, Button } from "react-bootstrap";
import PropTypes from 'prop-types';

const TableForm = ({ action, actionText }) => {

    const statusList = useSelector(getAllStatus);
    const tables = useSelector(getAllTables);

    const [number, setNumber] = useState('');
    const [status, setStatus] = useState('');
    const [peopleAmount, setPeopleAmount] = useState('');
    const [maxPeopleAmount, setMaxPeopleAmount] = useState('');
    const [bill, setBill] = useState('');
    const [showBill, setShowBill] = useState(false);

    const handleStatus = e => {
        setShowBill(false);
        setStatus(e);
        if (e === statusList[1] || e === statusList[3])
            setPeopleAmount(0);
            if (e === statusList[0]) 
            setShowBill(true);
            setBill(0);
    }

    const handleNumber = e => {
        if (tables.length > 0) {
            const availableTables = tables.some(table => table.number === e)
            if (!availableTables) {
                setNumber(e);
            }
        }
    }

    const handlePeopleAmount = e => {
        if (parseInt(e) > parseInt(maxPeopleAmount))
            setPeopleAmount(maxPeopleAmount)
        if (status === statusList[0] || status === statusList[2])
            setPeopleAmount(e);
    }

    const handleMaxPeopleAmount = e => {
        setMaxPeopleAmount(e);
        if (parseInt(e) < parseInt(peopleAmount))
            setPeopleAmount(e)
    }

    const handleSubmit = e => {
        e.preventDefault();
        action({ number, status, peopleAmount, maxPeopleAmount, bill });
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="number" style={{ width: '200px' }}>
                <Stack Stack direction="horizontal" gap={3}>
                    <Form.Label>Table&nbsp;number:</Form.Label>
                    <Form.Control type="number" value={number} min="0" onChange={e => handleNumber(e.target.value)} />
                </Stack>
            </Form.Group>
            <Form.Group className="mb-3" controlId="status" style={{ width: '300px' }}>
                <Stack direction="horizontal" gap={3}>
                    <Form.Label>Status: </Form.Label>
                    <Form.Select aria-label="Default select example" value={status} onChange={e => handleStatus(e.target.value) }>
                        <option value=''>Select status...</option>
                        {statusList.map( status =>
                        <option key={status}>{status}</option>
                        )}
                    </Form.Select>
                </Stack>
            </Form.Group>
            <Stack direction="horizontal" gap={2}>
                <Form.Group className="mb-3" controlId="peopleAmount">
                    <Stack direction="horizontal" gap={2}>
                        <Form.Label>People: </Form.Label>
                        <Form.Control style={{ width: '60px' }} type="number" value={peopleAmount} min="0" max="10" onChange={e => handlePeopleAmount(e.target.value)} />
                    </Stack>
                </Form.Group>
                <Form.Group className="mb-3" controlId="maxPeopleAmount">
                    <Stack direction="horizontal" gap={2}>
                        <Form.Label>/ </Form.Label>
                        <Form.Control style={{ width: '60px' }} type="number" value={maxPeopleAmount} min="0" max="10" onChange={e => handleMaxPeopleAmount(e.target.value)} />
                    </Stack>
                </Form.Group>
            </Stack>
            {showBill && <Form.Group className="mb-3" controlId="bill">
                    <Stack direction="horizontal" gap={1}>
                        <Form.Label>Bill:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$</Form.Label>
                        <Form.Control style={{ width: '60px' }} type="number" value={bill} min="0" onChange={e => setBill(e.target.value)} />
                    </Stack>
                </Form.Group>}
            <Button type="submit">{actionText}</Button>
        </Form>
    )
}

TableForm.propTypes = {
    actionText: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
} 

export default TableForm;