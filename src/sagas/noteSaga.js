import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import {
    FETCH_NOTES,
    FETCH_NOTES_SUCCESS,
    FETCH_NOTES_FAILED,
    SAVE_NOTE,
    SAVE_NOTE_SUCCESS,
    SAVE_NOTE_FAILED,
    UPDATE_NOTE,
    UPDATE_NOTE_SUCCESS,
    UPDATE_NOTE_FAILED
} from '../actions/types';

const apiBaseUrl = 'http://18.188.87.76:8000';
const api = axios.create();

function fetchNotesApi(){
    let url = apiBaseUrl + '/notes';
    return api.get(url);
}

function* fetchNotes(action){
    try {
        const response = yield call(fetchNotesApi, action);
        yield put({type: FETCH_NOTES_SUCCESS, response});
    } catch (error) {
        yield put({type: FETCH_NOTES_FAILED, error});
    }
}

export function* watchFetchNotes(){
    yield takeLatest(FETCH_NOTES, fetchNotes);
}

function saveNoteApi(payload){
    let url = apiBaseUrl + '/notes';
    return api.post(url, payload);
}

function* saveNote(action){
    try {
        const response = yield call(saveNoteApi, action.new_note);
        yield put({type: SAVE_NOTE_SUCCESS, response});
    } catch (error) {
        yield put({type: SAVE_NOTE_FAILED, error});
    }
}

export function* watchSaveNote(){
    yield takeLatest(SAVE_NOTE, saveNote);
}

function updateNoteApi(payload){
    let url = apiBaseUrl + '/notes/' + payload._id;
    return api.put(url, payload);
}

function* updateNote(action){
    try {
        const response = yield call(updateNoteApi, action.edited_note);
        yield put({type: UPDATE_NOTE_SUCCESS, response});
    } catch (error) {
        yield put({type: UPDATE_NOTE_FAILED, error});
    }
}

export function* watchUpdateNote(){
    yield takeLatest(UPDATE_NOTE, updateNote);
}
