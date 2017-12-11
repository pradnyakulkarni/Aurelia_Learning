import * as nprogress from 'nprogress';
import {bindable, noView} from 'aurelia-framework';

// since the entire rendering job is handled by the NProgress library, we don't need Aurelia's templating engine to render this component at all. So, we use the noView() decorator to tell Aurelia not to load a loading-indicator.html, compile it or do any of that rendering work. Additionally the NProgress library requires some CSS to work, so we can declare that in the decorator as well. In the case of noView, this works exactly as if you had put this in a require element inside the view.
@noView(['nprogress/nprogress.css'])

export class LoadingIndicator {
	@bindable loading = false;
	loadingChanged(newValue) {
		if (newValue) {
          nprogress.start();
        } else {
          nprogress.done();
        }
    }
}	