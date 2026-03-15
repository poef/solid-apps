import 'simplyview'
import 'simplyflow'
import solidDrawer from '../components/solid-drawer.mjs'
import solidWebID from '../components/solid-webid.mjs'
import theds from '@muze-nl/theds'
import metro from '@muze-nl/metro'

const idp = simply.app({
	routes: {
		'#register': function() {
			this.state.page = 'register'			
		},
		'#login': function() {
			this.state.page = 'login'
		},
		'/': function() {
			this.routes.goto('#login')
		}
	},
	commands: {
		login: function(form, values) {
			alert('nyi')
		},
		register: function(form, values) {
			this.state.page='confirm'
		},
		confirmRegistration: function(form, values) {
			alert('nyi')
		},
		passwordStrength: function(input, value) {
			if (value.length<8) {
				input.style['outline-color'] = 'var(--ds-alert-error-color)'
			} else {
				input.style = ''
			}
			if (value.length<4) {
				this.state.passwordStrength='weak'
			} else if (value.length<8) {
				this.state.passwordStrength='average'
			} else {
				this.state.passwordStrength='strong'
			}
			this.state.password1 = value
		},
		passwordMatches: function(input, value) {
			if (value.length && value!==this.state.password1) {
				input.style['outline-color'] = 'var(--ds-alert-error-color)'
				this.state.passwordMatches=false
			} else if (value.length) {
				input.style = ''
				this.state.passwordMatches = true
			} else {
				input.style = ''
				this.state.passwordMatches = null
			}
		},
		darkmodeToggle: function(button, value) {
			if (button.dataset.simplyState=='open') {
				button.dataset.simplyState='closed'
				document.body.classList.remove('ds-darkmode-auto')
				document.body.classList.remove('ds-darkmode')
			} else {
				document.body.classList.remove('ds-darkmode-auto')
				document.body.classList.add('ds-darkmode')
				button.dataset.simplyState='open'
			}
		}
	},
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
			this.routes.addListener('finish',':*',() => {
				const focus = document.querySelector('[autofocus]')
				if (focus) {
					focus.focus()
				}
			})
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