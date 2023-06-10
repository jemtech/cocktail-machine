class SortableList {
	constructor(config){
		this.data = [];
		this.reverseSort = false;
		if (config) {
			if (config.fieldPath) {
				this.sortBy(config.fieldPath);
			}
		}
	}
	
	sortBy(fieldPath) {
		if(fieldPath == null) {
			this.sortPathString = null;
			this.sortPath = null;
			return;
		}
		let oldFieldPath = this.sortPathString;
		if (oldFieldPath == fieldPath) {
			this.reverseSort = !this.reverseSort;
		} else {
			this.reverseSort = false;
		}
		this.sortPathString = fieldPath;
		this.sortPath = fieldPath.split('.');
		this.sort();
	}

	sort() {
		if(this.sortPath == null){
			return;
		}
		this.data.sort(this.sortByFunction());
	}
	
	sortByFunction() {
		if(this.sortPath == null){
			console.log("no sort path");
			return function(a,b){return 0;};
		}
		var scope = this;
		let compare = function(a,b){
			let aVal = a;
			let bVal = b;
			for(let i = 0; i < scope.sortPath.length; i++) {
				if (aVal == null) {
					if (bVal == null) {
						return 0;
					}
					if (scope.reverseSort) {
						return -1;
					} else {
						return 1;
					}
				}
				if (bVal == null) {
					if (scope.reverseSort) {
						return 1;
					} else {
						return -1;
					}
				}
				aVal = aVal[scope.sortPath[i]];
				bVal = bVal[scope.sortPath[i]];
			}
			if (aVal < bVal || bVal == null) {
				if (scope.reverseSort) {
					return 1;
				} else {
					return -1;
				}
			}
			if (aVal > bVal || aVal == null) {
				if (scope.reverseSort) {
					return -1;
				} else {
					return 1;
				}
			}
			return 0;
		}
		return compare;
	}
	
	push(data) {
		this.data.push(data);
		this.sort();
	}
	
	pushAll(data){
		let arrayLength = data.length;
		for (let i = 0; i < arrayLength; i++) {
			this.data.push(data[i]);
		}
		this.sort();
	}
	
	forEach(callBack) {
		let arrayLength = this.data.length;
		for (let i = 0; i < arrayLength; i++) {
			callBack(this.data[i]);
		}
		if(this.sortPath != null){
			this.sort();
		}
	}
	
	clear() {
		this.data = [];
	}
	
	remove(element) {
		let index = this.data.indexOf(element);
		if (index == -1) {
			return this;
		}
		this.data.splice(index, 1);
		return this;
	}
}
export default SortableList;