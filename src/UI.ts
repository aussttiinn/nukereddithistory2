import * as Vue from './static_resources/vue';
import Profile from './Profile';

export default class UI {
    readonly templateAbsoluteUrl = browser.runtime.getURL('/static_resources/template.html');
    readonly body = document.getElementsByTagName('body')[0];
    public vueApp: any;
    public profile: Profile = new Profile();

    public async injectUI() {
        try {
            const response = await fetch(this.templateAbsoluteUrl);
            if (response.ok) {
                const html = await response.text();
                this.body.className = ''; // remove existing styles
                this.body.innerHTML = html;
                this.mountVueApp();
                this.profile.setup();
            } else {
                console.error('Error while trying to inject UI:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error while trying to inject UI:', error);
        }
    }

    private mountVueApp() {
        // @ts-ignore
        this.vueApp = new Vue({
            el: '#nrhApp',
            data: {
                profile: this.profile,
            },
            mounted() {
                console.log("--: Nuke Reddit History initiated :--");
            }
        });
    }
}