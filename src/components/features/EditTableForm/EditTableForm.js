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

    const [number, setNumber] = useState(tableData.number);
    const [status, setStatus] = useState(tableData.status);
    const [peopleAmount, setPeopleAmount] = useState(tableData.peopleAmount);
    const [maxPeopleAmount, setMaxPeopleAmount] = useState(tableData.maxPeopleAmount);
    const [bill, setBill] = useState(tableData.bill);

    
    const handleSubmit = e => {
        e.preventDefult();
        dispatch(editTableRequest({ number, status, peopleAmount, maxPeopleAmount, bill, tableId }));
        navigate('/')
    }
    

    if (!tableData) return <Navigate to="/" />
    return (
        <section>
        <h1>Table {tableData.number}</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="status" style={{ width: '300px' }}>
                <Stack direction="horizontal" gap={3}>
                    <Form.Label>Status: </Form.Label>
                    <Form.Select aria-label="Default select example" value={status} onChange={e => setStatus(e.target.value) }>
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
                        <Form.Control style={{ width: '60px' }} type="number" value={peopleAmount} min="0" max="10" onChange={e => setPeopleAmount(e.target.value)} />
                    </Stack>
                </Form.Group>
                <Form.Group className="mb-3" controlId="maxPeopleAmount">
                    <Stack direction="horizontal" gap={2}>
                        <Form.Label>/ </Form.Label>
                        <Form.Control style={{ width: '60px' }} type="number" value={maxPeopleAmount} min="0" max="10" onChange={e => setMaxPeopleAmount(e.target.value)} />
                    </Stack>
                </Form.Group>
            </Stack>
            <Form.Group className="mb-3" controlId="bill">
                    <Stack direction="horizontal" gap={1}>
                        <Form.Label>Bill:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$</Form.Label>
                        <Form.Control style={{ width: '60px' }} type="number" value={bill} min="0" onChange={e => setBill(e.target.value)} />
                    </Stack>
                </Form.Group>
            <Button type="submit">Update</Button>
        </Form>
        </section>
      )
};
export default EditTableForm;