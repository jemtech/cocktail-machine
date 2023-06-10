import Observable from "../misc/Observable.js";

class UiElement extends Observable{
	constructor(config) {
		super(config);
		this.jqObj = null;
		this.reThrowObserved = true;
	}

	/**
	 * it is also possible to set a ui object
	 */
	setBaseJQueryObject(jqObj) {
		this.observeToRethrow(jqObj);
		if (jqObj instanceof UiElement) {
			this.jqObj = jqObj.getJQueryRepresentation();
		} else {
			this.jqObj = jqObj;
		}
		return this;
	}
	
	observeToRethrow(observable){
		if (this.reThrowObserved) {
			if (observable instanceof Observable) {
				let scope = this;
				observable.addObserver(function(event){
					scope.notify(event);
				});
			} 
		}
	}

	getJQueryRepresentation() {
		return this.jqObj;
	}
	
	/**
	 * removes from UI but keeps data
	 */
	detach() {
		this.jqObj.detach();
		return this;
	}
	
	/**
	 * removes from UI and deletes  data
	 * returns null because object is destroyed;
	 */
	remove() {
		this.jqObj.remove();
		this.setBaseJQueryObject(null);
		this.clearObserver();
		return null;
	}

	/**
	 * hide this element
	 * inverse part to show()
	 * @return returns it self (this)
	 */
	hide() {
		this.jqObj.hide();
		return this;
	}
	
	/**
	 * show this element
	 * inverse part to hide()
	 * @return returns it self (this)
	 */
	show() {
		this.jqObj.show();
		return this;
	}
	
	/**
	 * append content to this element
	 * @return returns it self (this)
	 */
	append(obj){
		this.observeToRethrow(obj);
		if (obj instanceof UiElement) {
			this.jqObj.append(obj.getJQueryRepresentation());
		} else {
			this.jqObj.append(obj);
		}
		return this;
	}
	
	/**
	 * append this element to the main-content
	 * @return returns it self (this)
	 */
	appendToUi() {
		let mainContent = this.getMainContent();
		if (mainContent == null) {
			console.error('was not able to find mainContent');
			return this;
		}
		mainContent.append(this.getJQueryRepresentation());
		return this;
	}
	
	/**
	 * replace the the complet main-content with this object
	 * @return returns it self (this)
	 */
	replaceUi() {
		let mainContent = this.getMainContent();
		if (mainContent == null) {
			console.error('was not able to find mainContent');
			return this;
		}
		mainContent.html('');
		mainContent.append(this.getJQueryRepresentation());
		return this;
	}
	
	getMainContent(){
		return Misc.getMainContent();
	}
	
	text(text) {
		if (text === undefined) {
			return this.getJQueryRepresentation().text();
		}
		return this.getJQueryRepresentation().text(text);
	}
	
	html(html) {
		if (html === undefined) {
			return this.getJQueryRepresentation().html();
		}
		return this.getJQueryRepresentation().html(html);
	}
	
	clear() {
		this.html('');
		return this;
	}
}
export default UiElement;