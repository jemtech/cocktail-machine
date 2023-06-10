class Observable {
	constructor(config){
		this.observer = [];
		if (config && config.eventCallback) {
			this.addObserver(config.eventCallback);
		}
	}
	
	notify(event) {
		for (let i = 0; i < this.observer.length; i++) {
			this.observer[i](event);
		}
	}
	
	addObserver(observer) {
		this.observer.push(observer);
	}
	
	removeObserver(observer) {
		let index = this.observer.indexOf(observer);
		if (index == -1) {
			return this;
		}
		this.observer.splice(index, 1);
		return this;
	}
	
	clearObserver() {
		this.observer = [];
	}
}
export default Observable;