import {EventAggregator} from 'aurelia-event-aggregator';
import {WebAPI} from './web-api';
import {ContactUpdated, ContactViewed} from './messages';
import {inject} from 'aurelia-framework';

// Dependecy Injection
// static method that returns an array of constructor dependecies
@inject(WebAPI, EventAggregator)

// Class has dependecy on WebAPI class. When Aurelia instantiates contact list, it will first instantiate an instance of web API & "inject" that into the contact list's constructor
export class ContactList {
	constructor(api, ea) {
		this.api = api;
        this.contacts = [];
        ea.subscribe(ContactViewed, msg => this.select(msg.contact));
        ea.subscribe(ContactUpdated, msg => {
          let id = msg.contact.id;
          let found = this.contacts.find(x => x.id == id);
          Object.assign(found, msg.contact);
        });
    }

	// All Aurelia components follow a component life-cycle.
    created() {
		this.api.getContactList().then(contacts => this.contacts = contacts);
    }

    select(contact) {
		this.selectedId = contact.id;
        return true;
    }
}