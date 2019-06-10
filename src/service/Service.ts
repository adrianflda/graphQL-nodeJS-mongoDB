import * as mongoose from 'mongoose';
import {ContactSchema} from "../models/Model";

const Contact = mongoose.model('Contact', ContactSchema);

class Service {

    constructor() {}

    public addContact(request) {
        return Contact.create(request);
    }

    public findAllContacts() {
        return Contact.find({}).exec();
    }

    public findContactById(user) {
        return Contact.findOne({_id: user.id}).exec();
    }

    public updateContactById(user) {
        return Contact.findOneAndUpdate({_id: user.id}, user, {new: true}).exec();
    }

    deleteContactById(user) {
        return Contact.remove({_id: user.id}).exec();
    }
}

export {Service}
