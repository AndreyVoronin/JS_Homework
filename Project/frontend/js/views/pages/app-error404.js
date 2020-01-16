import Component from '../../views/component.js';

class AppError404 extends Component{
    render() {
        return new Promise(resolve => {
            resolve(`                
                <h1 class="page-title">404 Error - Page Not Found</h1>              
            `);
        });
    }
}

export default AppError404;