import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import NotesHome from './pages/NotesHome/NotesHome';
import './App.css';
//redux
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';


const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer,applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <Grid container spacing={0} justify='center' alignItems='center'>
                <Grid item xs={12} sm={12} md={8} lg={8} className='app-home'>
                    <NotesHome/>
                </Grid>
            </Grid>
        </Provider>
    );
  }
}

export default App;
