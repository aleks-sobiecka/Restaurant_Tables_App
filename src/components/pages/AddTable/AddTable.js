import { Container } from "react-bootstrap";
import AddTableForm from "../../features/AddTableForm/AddTableForm";

const AddTable = () =>{
    return (
        <section>
            <Container className='mx-auto' style={{ minWidth: '300px', maxWidth: '800px' }}>
                <h1>Add table</h1>
                <AddTableForm />
            </Container>
        </section>
    )
}

export default AddTable;