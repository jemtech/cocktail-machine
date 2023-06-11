class Event {
	constructor(obj) {
		obj && Object.assign(this, obj);
	}
	
}
Event.TYPE_SAVE = 'saved'
Event.RECIPE_PREPARED = 'recipe repared'
export default Event;