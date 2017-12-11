import {inject} from 'aurelia-framework';
import {WebAPI} from './web-api';

@inject(WebAPI)

export class App {
	// message = 'Hello World!';
	
	constructor(api) {
		this.api = api;
	}
	
	// To add routing
	configureRouter(config, router){
		// Router configuration
        // base title to be used in document's title for the browser
		config.title = 'Contacts';
        
        // to map route patterns to the modules that should handle the patterns
        config.map([
			// default route that is matched when no fragment, route & moduleId are compulsory, base title + route title = final document title
			{ route: '',              moduleId: 'no-selection',   title: 'Select'},
			{ route: 'contacts/:id',  moduleId: 'contact-detail', name:'contacts' }			
        ]);
        this.router = router;
    }  
}