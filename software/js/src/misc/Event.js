class Event {
	constructor(obj) {
		obj && Object.assign(this, obj);
	}
	
}
Event.TYPE_SAVE = 'saved'
export default Event;