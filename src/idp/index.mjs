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
		'#about': function() {
			this.state.page = 'about'
		},
		'#reset': function() {
			this.state.page = 'reset'
		},
		'#deleteme': function() {
			this.state.page = 'deleteme'
		},
		'#home': function() {
			this.state.page = 'home'
		},
		'#colors': function() {
			this.state.page = 'colors'
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
		reset: function() {
			alert('hier')
			this.state.page = 'resetsend'
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
			if (button.dataset.simplyState=='default') {
				button.dataset.simplyState='alt'
				document.body.classList.remove('ds-darkmode-auto')
				document.body.classList.remove('ds-darkmode')
			} else {
				document.body.classList.remove('ds-darkmode-auto')
				document.body.classList.add('ds-darkmode')
				button.dataset.simplyState='default'
			}
		}
	},
	actions: {
		darkmodeInit: function() {
			simply.state.effect(() => {
				const page = this.state.page; // trigger on page change
				window.setTimeout(() => { // wait for rerender
					if (document.body.classList.contains('ds-darkmode')) {
						document.querySelector('.solid-darkmode-toggle button').dataset.simplyState = 'default'
					} else if (document.body.classList.contains('ds-darkmode-auto')) {
						const darkModeMql = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
						if (darkModeMql && darkModeMql.matches) {
							document.querySelector('.solid-darkmode-toggle button').dataset.simplyState = 'default'
						} else {
							document.querySelector('.solid-darkmode-toggle button').dataset.simplyState = 'alt'
						}
					} else {
						document.querySelector('.solid-darkmode-toggle button').dataset.simplyState = 'alt'
					}
				}, 10);
			})
		}
	},
	state: simply.state.signal({
		page: 'home',
		palette: [
			'#ff1397','#ff2308','#ff5800','#e18b00','#8cb200','#00c91a',
			'#00cea4','#00c2fc','#00a6ff','#6182ff','#bd5fff','#f63dee'
		]
	}),
	hooks: {
		start: async function() {
			simply.bind({
				root: this.state,
				transformers: this.transformers
			})
			this.actions.darkmodeInit()
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
			this.state.colors = []
			const contrast = { normal: 0, low: -0.1, verylow: -0.2 }
			for (const color of this.state.palette) {
				let values = {}
				for (const adjust in contrast) {
					values[adjust] = 'oklch(from '+color+' calc(l + '+contrast[adjust]+') c h)'
				}
				this.state.colors.push(values)
			}
		}
	},
	transformers: {
		color: function(context, next) {
			context.element.style = '--color: '+context.value;
		}
	},
	api: metro.jsonApi(window.location.href, {
	}),
	components: {
		theds,
		solidDrawer,
		solidWebID
	},
	css: {
		solid: css`
 	main {
 		position: absolute;
 		top: 0;
 		left: 0;
 		width: 100%;
 		height: 100%;
 	}
	.ds-panels-center {
		justify-content: center;
		align-items: center;
	}
	.ds-panels-panes {
		height: 100%;
	}
	.solid-dialog {
		position: relative;
		height: auto;
		padding-bottom: var(--ds-space-x4);
	}
	.solid-dialog .ds-form-buttons {
		width: calc(100% - 2 * var(--ds-space));
	}
	.ds-darkmode .solid-dialog {
		box-shadow: var(--ds-shadow-small);
		outline: 1px solid var(--ds-grey-80);
	}
	@media (prefers-color-scheme: dark) {
    	.ds-darkmode-auto .solid-dialog {
			box-shadow: var(--ds-shadow-small);
			outline: 1px solid var(--ds-grey-80);
		}
	}
	.solid-about {
		max-height: calc(100vh - 10 * var(--ds-space));
		overflow: auto;
	}
	.solid-small {
		font-size: 80%;
	}

`
	}
})

globalThis.idpApp = idp