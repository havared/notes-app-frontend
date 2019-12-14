import {
    FETCH_NOTES_SUCCESS,
    ADD_NEW_CHECKLIST_ITEM,
    UPDATE_NEW_NOTE,
    SAVE_NOTE_SUCCESS,
    UPDATE_NOTE_SUCCESS
} from '../actions/types';

const initialState = {
    all_notes: [],
    new_note: {
        is_checklist: false,
        checklist: []
    }
};

export default function noteReducer(state = initialState, action) {
    let newState = state;
    switch (action.type) {
        case FETCH_NOTES_SUCCESS:
            newState = Object.assign({}, state, {
                all_notes: action.response.data.all_notes
            });
            return newState;

        case UPDATE_NEW_NOTE:
            newState = Object.assign({}, state, {
                new_note: action.new_note
            });
            return newState;

        case SAVE_NOTE_SUCCESS:
            newState = Object.assign({}, state, {
                new_note: {
                    is_checklist: false,
                    checklist: []
                },
                all_notes: [].concat(action.response.data.note, state.all_notes)
            });
            return newState;

        case ADD_NEW_CHECKLIST_ITEM:
            newState = Object.assign({}, state, {
                new_note: {
                    ...state.new_note,
                    checklist: [].concat(action.new_checklist_item, state.new_note.checklist)
                }
            });
            return newState;

        case UPDATE_NOTE_SUCCESS:
            const updated_note_index = state.all_notes.findIndex((each_note) => {return each_note._id === action.response.data.note._id});
            newState = Object.assign({}, state, {
                all_notes: [
                    ...state.all_notes.slice(0, updated_note_index),
                    action.response.data.note,
                    ...state.all_notes.slice(updated_note_index + 1)
                ]
            });
            return newState;


        default:
            return state;
    }
}
