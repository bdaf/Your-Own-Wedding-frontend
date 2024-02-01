import { EventModel, NoteModel } from "../components/Models";
import { EVENTS, API_URL, NOTES } from "../constants";
import axios from 'axios';

function createNote(event_id: string, note: NoteModel) {
    const result = axios.post(`${API_URL}/${EVENTS}/${event_id}/${NOTES}.json`, { note: {...note} }, { withCredentials: true })
    console.log(result)
    return axios.post(`${API_URL}/${EVENTS}/${event_id}/${NOTES}.json`, { note: {...note} }, { withCredentials: true })
}

function editNote(note: NoteModel) {
    const result = axios.put(`${API_URL}/${EVENTS}/${note.event_id}/${NOTES}/${note.id}.json`, { note: {...note} }, { withCredentials: true })
    return result
}

function deleteNote(note: NoteModel) {
    return axios.delete(`${API_URL}/${EVENTS}/${note.event_id}/${NOTES}/${note.id}.json`, { withCredentials: true })
}

function returnEventWithAddedNote(event: EventModel, note: NoteModel): EventModel {
    const notes = event.notes;
    notes.push(note); 
    const resultEvent: EventModel = {
        id: event.id,
        name: event.name,
        date: event.date,
        notes: notes
    }
    return resultEvent;
}

function returnEventWithEditedNote(event: EventModel, note: NoteModel): EventModel {
    const notes = event.notes.map(n => n.id == note.id ? note : n);
    const resultEvent: EventModel = {
        id: event.id,
        name: event.name,
        date: event.date,
        notes: notes
    }
    return resultEvent;
}

function returnEventWithDeletedNote(event: EventModel, note: NoteModel): EventModel {
    const notes = event.notes.filter(n => n.id != note.id);
    const resultEvent: EventModel = {
        id: event.id,
        name: event.name,
        date: event.date,
        notes: notes
    }
    return resultEvent;
}
export {createNote, editNote, deleteNote, returnEventWithAddedNote, returnEventWithEditedNote, returnEventWithDeletedNote}