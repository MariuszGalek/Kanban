import { CREATE_LANE, UPDATE_LANE, DELETE_LANE, EDIT_LANE } from './LaneActions';
import { CREATE_NOTE, DELETE_NOTE } from '../Note/NoteActions';


const initialState = {};

export default function lanes(state = initialState, action) {
  switch (action.type) {
  	case CREATE_LANE:
  		return [...state, action.lane];
	case UPDATE_LANE:
	  return state.map(lane => {
	    return lane.id === action.id ? { ...lane, ...action.lane } : lane;
	  });

	case DELETE_LANE:
  		return state.filter(lane => lane.id !== action.laneId);
    
    case CREATE_NOTE:
  		return state.map(lane => {
    		if (lane.id === action.laneId) {
      			const notes = [...lane.notes, action.note.id];
      			return { ...lane, notes };
    		}
    		return lane;
  		});
  	
  	case DELETE_NOTE: {
		const newLane = { ...state[action.laneId] };
      	newLane.notes = newLane.notes.filter(noteId => noteId !== action.noteId);
 
      	return { ...state, [action.laneId]: newLane };
	}

	case EDIT_LANE: {
      const lane = { ...state[action.laneId], editing: true };
      return { ...state, [action.laneId]: lane };
	}

    default:
      return state;
    }
}