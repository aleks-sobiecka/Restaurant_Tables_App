import { useSelector } from "react-redux";
import { getAllTables } from "../../../redux/tablesRedux";
import { Stack, Card, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeTableRequest } from "../../../redux/tablesRedux";

const AllTables = () => {

    const tables = useSelector(getAllTables);

    const dispatch = useDispatch();

    const handleRemove = e => {
        e.preventDefault();
        dispatch(removeTableRequest(e.target.value));
    }

    return ( 
        <section>{tables.map(table => (
            <div key={table.id} action={table.status}>
                <Stack direction="horizontal" gap={3}>
                    <Card border="light">
                        <Stack direction="horizontal" gap={3} className="mb-3">
                            <h3 className='mr-3'>Table {table.number}</h3>
                            <Card.Title className="my-auto">Status:</Card.Title>
                            <Card.Text className="my-auto">{table.status}</Card.Text>
                        </Stack>
                    </Card>
                    <Button variant="outline-danger" className="ms-auto" onClick={handleRemove} value={table.id}>Delete table</Button>
                    <NavLink to={"/table/" + table.id}>
                        <Button variant="primary">Show more</Button>
                    </NavLink>
                </Stack>
            </div>
            ))}
        </section>
    )
}

export default AllTables;