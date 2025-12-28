import 'simplyview'
import 'simplyflow'
import login from '../components/solid-login.mjs'
import solidFS from '../components/solid-fs.mjs'

const podlist = simply.app({
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
		login,
		solidFS
	}
})
podlist.start()

globalThis.podlist = podlist