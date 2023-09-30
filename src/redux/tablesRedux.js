import shortid from 'shortid';

//selectors
export const getAllTables = state => state.tables;
export const getTableById = ({ tables }, tableId) => tables.find(table => table.id === tableId);

// actions
const createActionName = actionName => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName('UPTATE_TABLES');
const ADD_TABLE = createActionName('ADD_TABLE');
const REMOVE_TABLE = createActionName('REMOVE_TABLE');
const EDIT_TABLE = createActionName('EDIT_TABLE');

// action creators
export const updateTables = payload => ({ type: UPDATE_TABLES, payload });
export const addTable = payload => ({ type: ADD_TABLE, payload });
export const removeTable = payload => ({ type: REMOVE_TABLE, payload });
export const editTable = payload => ({ type: EDIT_TABLE, payload });
export const fetchTables = () => {
  return (dispatch) => {
    fetch('http://localhost:3131/api/tables')
      .then(res => res.json())
      .then(tables => dispatch(updateTables(tables)));
  }
};
export const addTableRequest = (newTable) => {
  return (dispatch) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTable),
    };

    fetch('http://localhost:3131/tables', options)
      .then(() => dispatch(addTable(newTable)))
  }
};
export const removeTableRequest = (table) => {
  console.log(table);
  return (dispatch) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ table }),
    };

    fetch('http://localhost:3131/tables/' + table, options)
    .then(() => dispatch(removeTable(table)))
  }
};

const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_TABLES:
      return [...action.payload];
    case ADD_TABLE:
      return [...statePart, {...action.payload, id: shortid() }]
    case REMOVE_TABLE:
      return [...statePart.filter(table => table.id !== action.payload)];
    case EDIT_TABLE:
      return statePart.map(table => (table.id === action.payload.tableId ? { ...table, ...action.payload } : table)) ;
    default:
      return statePart;
  };
};
export default tablesReducer;