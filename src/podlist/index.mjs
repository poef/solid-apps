import 'simplyview'
import 'simplyflow'
import webid from '../components/solid-webid.mjs'
import solidFS from '../components/solid-fs.mjs'

const podlist = simply.app({
	actions: {
		webidSave: async function(webidURL) {
			const result = await webid.actions.webidSave.call(this, webidURL)
			if (result) {
				this.state.profileJSON = JSON.stringify(this.state.webid.profile, null, 4)
			}
			return result
		}
	},
	state: simply.state.signal({
		path: '/',
		list: [],
		solidConfiguration: {

		}
	}),
	hooks: {
		start: async function() {
			simply.bind({
				root: this.state
			})
		}
	},
	components: {
		webid,
		solidFS
	}
})
podlist.start()

globalThis.podlist = podlist