import Component from '../../views/component.js';

class AppAbout extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`
                <div class="about"> 
                    <h1 class="page-title">Welcome!</h1>
                    <img class="santa" src="images/santa.png">                   
                    <p class="about__info">So, here is an application, where you can see information about weather and 
                        fish bite forecast in your city.<br>Enjoy!</p>
                    <a class="about__btn-start button" href="#/apps" title="Click here to get started!">Start using</a>
                </div>
            `);
        });
    }
}

export default AppAbout;