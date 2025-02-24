export class User {
    // Name and ID are temporary values to give each user both a readable name and unique identifier
    constructor(name, id) {
        this._name = name
        this._id = id
    }

    getName() {
        return this._name
    }

    getID() {
        return this._id
    }
}