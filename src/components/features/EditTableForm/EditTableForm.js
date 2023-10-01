import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTableById } from "../../../redux/tablesRedux";
import { getAllStatus } from "../../../redux/statusRedux";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { editTableRequest } from '../../../redux/tablesRedux';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Form, Stack, Button } from "react-bootstrap";
import { useEffect } from "react";

const EditTableForm = () => {

    const { tableId } = useParams();
    const tableData = useSelector(state => getTableById(state, tableId));
    const statusList = useSelector(getAllStatus);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [number, setNumber] = useState('');
    const [status, setStatus] = useState('');
    const [peopleAmount, setPeopleAmount] = useState('');
    const [maxPeopleAmount, setMaxPeopleAmount] = useState('');
    const [bill, setBill] = useState('');
    const [showBill, setShowBill] = useState(false);

    useEffect(() => {
        if (tableData) {
            setNumber(tableData.number);
            setStatus(tableData.status);
            setPeopleAmount(tableData.peopleAmount);
            setMaxPeopleAmount(tableData.maxPeopleAmount);
            setBill(tableData.bill);
            if (tableData.status === statusList[0]) {
            setShowBill(true)
            }
        }
    }, [tableData, statusList]);

    const handleStatus = e => {
        setShowBill(false);
        setStatus(e);
        if (e === statusList[1] || e === statusList[3])
            setPeopleAmount(0);
            if (e === statusList[0]) 
            setShowBill(true);
            setBill(0);
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

    const handleSubmit = (e) => {
        e.preventDefult();
        dispatch(editTableRequest({ number, status, peopleAmount, maxPeopleAmount, bill, tableId }));
        console.log('number: ', number, 'status: ', status, 'peopleAmount: ', peopleAmount, 'maxPeopleAmount: ', maxPeopleAmount, 'bill: ', bill, 'tableId: ', tableId);
        navigate('/')
    }
    
    if (!tableData) return <Navigate to="/" />
    return (
        <section>
        <h1>Table {number}</h1>
        <Form onSubmit={handleSubmit}>
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
            <Button type="submit">Update</Button>
        </Form>
        </section>
      )
};
export default EditTableForm;