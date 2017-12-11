import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {WebAPI} from './web-api';
import {ContactUpdated,ContactViewed} from './messages';
import {areEqual} from './utility';

@inject(WebAPI, EventAggregator)

export class ContactDetail {
	constructor(api, ea){
		this.api = api;
        this.ea = ea;
    }
	
	// additional life-cycle method for routed component
	// params object have id property for every route param that was parsed as well as a property for each query string parameter
	// routeConfig is the same configuration object that created to configure router itself.
	activate(params, routeConfig) {
        this.routeConfig = routeConfig;

        return this.api.getContactDetails(params.id).then(contact => {
          this.contact = contact;
		  // router generates a navModel for each routeConfig
          this.routeConfig.navModel.setTitle(contact.firstName);
          this.originalContact = JSON.parse(JSON.stringify(contact));
          this.ea.publish(new ContactViewed(this.contact));
        });
    }

    get canSave() {
		return this.contact.firstName && this.contact.lastName && !this.api.isRequesting;
    }

    save() {
		this.api.saveContact(this.contact).then(contact => {
			this.contact = contact;
			this.routeConfig.navModel.setTitle(contact.firstName);
			this.originalContact = JSON.parse(JSON.stringify(contact));
			this.ea.publish(new ContactUpdated(this.contact));
        });
    }

    canDeactivate() {
		// areEqual helper method
		if(!areEqual(this.originalContact, this.contact)){
			let result = confirm('You have unsaved changes. Are you sure you wish to leave?');
			if(!result) {
				this.ea.publish(new ContactViewed(this.contact));
			}
			return result;
        }
        return true;
    }
}