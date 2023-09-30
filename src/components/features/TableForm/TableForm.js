import { useSelector } from "react-redux";
import { getAllStatus } from "../../../redux/statusRedux";
import { useState } from "react";
import { Form, Stack, Button } from "react-bootstrap";

const TableForm = ({ action, actionText, ...props }) => {

    const statusList = useSelector(getAllStatus);

    const [number, setNumber] = useState(props.number || '');
    const [status, setStatus] = useState(props.status || '');
    const [peopleAmount, setPeopleAmount] = useState(props.peopleAmount || '');
    const [maxPeopleAmount, setMaxPeopleAmount] = useState(props.maxPeopleAmount || '');
    const [bill, setBill] = useState(props.bill || '');

    const handleSubmit = e => {
        e.preventDefault();
        action({ number, status, peopleAmount, maxPeopleAmount, bill });
      };



    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="number" style={{ width: '200px' }}>
                <Stack Stack direction="horizontal" gap={3}>
                    <Form.Label>Table&nbsp;number:</Form.Label>
                    <Form.Control type="number" value={number} min="0" onChange={e => setNumber(e.target.value)} />
                </Stack>
            </Form.Group>
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
            <Button type="submit">{actionText}</Button>
        </Form>
    )
}
export default TableForm;