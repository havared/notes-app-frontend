import React, { Component } from 'react';
import './NotesHome.css';

import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {
    fetchNotes,
    addNewChecklistItem,
    updateNewNote,
    saveNote,
    updateChecklist
} from '../../actions/noteActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class NotesHome extends Component{
    constructor(props){
        super(props);
        this.state = {
            checklist_item: ''
        };
    }

    componentDidMount(){
        this.props.actions.fetchNotes();
    }

    setChecklistItem = (checklist_item) => {
        this.setState({
            checklist_item
        });
    }

    renderChecklistInput = (checklist = []) => {
        const { checklist_item } = this.state;
        return (
            <div>
                <div className='checklist-input'>
                    <TextField
                        placeholder='Input checklist'
                        className='checklist-input-textarea'
                        value={checklist_item}
                        onChange={(event) => this.setChecklistItem(event.target.value)}
                    />
                    <Button
                        variant='outlined'
                        color='primary'
                        onClick={() => {
                            this.props.actions.addNewChecklistItem({
                                item_name: checklist_item
                            });
                            this.setChecklistItem('');
                        }}
                        disabled={(checklist_item.length === 0)}
                        >
                        Add
                    </Button>
                </div>
                {
                    checklist && checklist.map((eachChecklist, key) => {
                        return (
                            <div key={key}>
                                <Checkbox checked={false} disabled/>
                                {eachChecklist.item_name}
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    renderInputNote = () => {
        const { new_note } = this.props;
        const { updateNewNote } = this.props.actions;
        return (
            <div className='notes-input-root-container'>
                <div className='notes-input'>
                    <TextField
                        placeholder='New Note/Checklist'
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={new_note.text? new_note.text: ''}
                        onChange={(event) => {
                            updateNewNote({
                                ...new_note,
                                text: event.target.value
                            });
                        }}
                        multiline
                    />
                    {
                        new_note.is_checklist &&
                        this.renderChecklistInput(new_note.checklist)
                    }
                </div>
                <div className='new-notes-action-container'>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={new_note.is_checklist}
                                onChange={() => {
                                    updateNewNote({
                                        ...new_note,
                                        is_checklist: !new_note.is_checklist,
                                        checklist: []
                                    });
                                }}
                                value={new_note.is_checklist}
                                />
                        }
                        label='Checklist'
                        />
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={() => {
                            this.props.actions.saveNote(new_note);
                        }}
                        disabled={(!new_note.text || !new_note.text.length)}
                        >
                        Save
                    </Button>
                </div>
            </div>
        );
    }

    renderAllNotes = () => {
        const { all_notes } = this.props;
        return (
            <Grid container spacing={4}>
                {
                    all_notes.map((each_note, note_key) => {
                        return (
                            <Grid key={note_key} item xs={12} sm={12} md={4} lg={4}>
                                <Card>
                                    <CardContent>
                                        <Typography gutterBottom component='subtitle1' className='word-wrap'>
                                            {each_note.text}
                                        </Typography>
                                        {
                                            each_note.is_checklist &&
                                            each_note.checklist.map((eachChecklist, checklist_key) => {
                                                return (
                                                    <div key={checklist_key}>
                                                        <Checkbox
                                                            checked={eachChecklist.checked}
                                                            onChange={() => {
                                                                const edited_note = all_notes[note_key];
                                                                edited_note.checklist[checklist_key].checked = !eachChecklist.checked;
                                                                this.props.actions.updateChecklist(edited_note);
                                                            }}
                                                            />
                                                        <Typography
                                                            variant='caption'
                                                            className={eachChecklist.checked? 'strike-through word-wrap': 'word-wrap'}
                                                            >
                                                            {eachChecklist.item_name}
                                                        </Typography>
                                                    </div>
                                                )
                                            })
                                        }
                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    })
                }
            </Grid>
        );
    }

    render(){
        return (
            <div className='notes-home-root-container'>
                <Card className='notes-home-input-card'>
                    <CardContent>
                        {this.renderInputNote()}
                    </CardContent>
                </Card>
                {this.renderAllNotes()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        all_notes: state.NoteStore.all_notes,
        new_note: state.NoteStore.new_note
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(
            {
                fetchNotes,
                addNewChecklistItem,
                updateNewNote,
                saveNote,
                updateChecklist
            },
            dispatch
        ),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesHome);
