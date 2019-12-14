import {
    FETCH_NOTES,
    ADD_NEW_CHECKLIST_ITEM,
    UPDATE_NEW_NOTE,
    SAVE_NOTE,
    UPDATE_NOTE
} from './types';

export const fetchNotes = () => ({
    type: FETCH_NOTES
});

export const addNewChecklistItem = (new_checklist_item) => ({
    type: ADD_NEW_CHECKLIST_ITEM,
    new_checklist_item
});

export const updateNewNote = (new_note) =>  ({
    type: UPDATE_NEW_NOTE,
    new_note
});

export const saveNote = (new_note) =>  ({
    type: SAVE_NOTE,
    new_note
});

export const updateChecklist = (edited_note) =>  ({
    type: UPDATE_NOTE,
    edited_note
});
