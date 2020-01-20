import Utils from './helpers/utils.js';
import AppAbout from './views/pages/app-about.js';
import AppError404 from './views/pages/app-error404.js';
import AddAndList from './views/pages/app-main.js';

const Routes = {
    '/': AppAbout,
    '/apps': AddAndList
};

function router() {
    const contentContainer = document.getElementsByClassName('content-container')[0];

    const request = Utils.parseRequestURL(),
        parsedURL = `/${request.resource || ''}${request.id ? '/:id' : ''}${request.action ? `/${request.action}` : ''}`,
        page = Routes[parsedURL] ? new Routes[parsedURL]() : new AppError404();

    page.getData().then(data => {
		page.render(data).then(html => {
			contentContainer.innerHTML = html;
			page.afterRender();
		});
    });
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);