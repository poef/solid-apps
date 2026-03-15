import 'simplyview'
import 'simplyflow'
import solidDrawer from '../components/solid-drawer.mjs'
import solidWebID from '../components/solid-webid.mjs'
import theds from '@muze-nl/theds'
import metro from '@muze-nl/metro'

const idp = simply.app({
	actions: {
	},
	state: simply.state.signal({
		page: 'login'
	}),
	hooks: {
		start: async function() {
			simply.bind({
				root: this.state,
				transformers: this.transformers
			})

			// TODO: if this is a common best practice elevate
			// this code to simply.app()
			for (const name in this.components) {
				if (this.components[name].hooks?.start) {
					await this.components[name].hooks.start.call(this, this.components[name])
				}
			}
		}
	},
	api: metro.jsonApi(window.location.href, {
	}),
	components: {
		theds,
		solidDrawer,
		solidWebID
	}
})

globalThis.idpApp = idp