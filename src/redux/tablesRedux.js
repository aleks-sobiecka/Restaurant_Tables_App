import shortid from 'shortid';

//selectors
export const getAllTables = state => state.tables;
export const getTableById = ({ tables }, tableId) => tables.find(table => table.id === tableId);

// actions
const createActionName = actionName => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName('UPTATE_TABLES');
const ADD_TABLE = createActionName('ADD_TABLE');
const EDIT_TABLE = createActionName('EDIT_TABLE');

// action creators
export const updateTables = payload => ({ type: UPDATE_TABLES, payload });
export const addTable = payload => ({ type: ADD_TABLE, payload });
export const editTable = payload => ({ type: EDIT_TABLE, payload });
export const fetchTables = () => {
  return (dispatch) => {
    fetch('http://localhost:3131/api/tables')
      .then(res => res.json())
      .then(tables => dispatch(updateTables(tables)));
  };
};

const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_TABLES:
      return [...action.payload];
    case ADD_TABLE:
      return [...statePart, {...action.payload, id: shortid() }]
    case EDIT_TABLE:
      return statePart.map(table => (table.id === action.payload.tableId ? { ...table, ...action.payload } : table)) ;
    default:
      return statePart;
  };
};
export default tablesReducer;