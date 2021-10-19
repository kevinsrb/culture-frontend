import { createStore, combineReducers, applyMiddleware, compose  } from 'redux'
import thunk from 'redux-thunk';
import { userReducer } from './reducers/userReducer'
import { convocatoriasReducer, edicionReducer } from './reducers/convocatoriasReducer'
import { participantesReducer } from './reducers/participanteReducer';
//import { notesReducer } from '../reducers/notesReducer';
//import { uiReducer } from '../reducers/uiReducers';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducer = combineReducers({
    user: userReducer,
    convocatoria: convocatoriasReducer,
    edicion: edicionReducer,
    participantes: participantesReducer,
})

export const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware( thunk )
    )
)
