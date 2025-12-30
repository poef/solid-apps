import 'simplyview'
import 'simplyflow'
import webid from '../components/solid-webid.mjs'
import solidFS from '../components/solid-fs.mjs'
import theds from '@muze-nl/theds'
import {authorizePopup} from '@muze-nl/metro-oauth2/src/oauth2.popup.mjs'

const podlist = simply.app({
	actions: {
		webidSave: async function(webidURL) {
			const result = await webid.actions.webidSave.call(this, webidURL)
			if (result) {
				this.state.profileJSON = JSON.stringify(this.state.webid.profile, null, 4)
				const issuer = this.state.webid.profile.solid$oidcIssuer
				this.state.solidConfiguration.issuer = issuer
			}
			return result
		}
	},
	state: simply.state.signal({
		path: '/',
		list: [],
		solidConfiguration: {
			client_info: {
				client_name: 'podlist',
				redirect_uris: [
					new URL('redirect.html', window.location.href)
				]
			}
		}
	}),
	hooks: {
		start: async function() {
			simply.bind({
				root: this.state
			})
			this.state.solidConfiguration.authorize_callback = oauth2.authorizePopup
		}
	},
	components: {
		theds,
		webid,
		solidFS
	}
})
podlist.start()

globalThis.podlist = podlist