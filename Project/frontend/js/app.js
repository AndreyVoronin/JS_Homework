import Utils from './helpers/utils.js';
import AppAbout from './views/pages/app-about.js';
import AppError404 from './views/pages/app-error404.js';
<<<<<<< HEAD
import AddAndList from './views/pages/app-main.js';
=======
import AddAndList from './views/pages/add-list.js';
>>>>>>> 1568b8e7df526591bee5e7f5ac297fff488417b9

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