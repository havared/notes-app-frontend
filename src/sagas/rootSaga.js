import { all, fork } from 'redux-saga/effects';
import * as noteSaga from './noteSaga';

export default function* rootSaga() {
    yield all([
        ...Object.values(noteSaga)
    ].map(fork));
 }
