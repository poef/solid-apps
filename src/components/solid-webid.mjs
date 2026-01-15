import metro from '@muze-nl/metro'
import oldm from '@muze-nl/oldm'
import oldmmw from '@muze-nl/metro-oldm'

export default {
	html: {
		webid: html`
<dialog id="webidDialog" class="webid-dialog">
	<button class="ds-button ds-button-close" data-simply-command="webidClose">
		<svg class="ds-icon ds-icon-feather">
            <use xlink:href="assets/icons/feather-sprite.svg#x"></use>
        </svg>		
	</button>
<form data-simply-command="webidSave">
	<div class="ds-alert ds-alert-error" data-flow-field="webid.error"></div>
	<label>
		Solid WebID
		<input autofocus type="url" name="webidURL" placeholder="Enter your WebID">
	</label>
	<p>Don't have a Solid WebID? Request a personal WebID at one of these providers: ....</p>
	<div class="ds-form-buttons">
		<button class="ds-button ds-button-primary">Save</button>
	</div>
</form>
</dialog>
		`
	},
	css: {
		webid: css`
@layer theme {
	:root {
		--ds-dialog-shadow: var(--ds-shadow-large);
		--ds-dialog-radius: var(--ds-box-radius);
		--ds-dialog-backdrop: rgba(255,255,255,0.1);
	}
}
@layer component {
	:root {
		--webid-space: var(--ds-space);
		--webid-dialog-shadow: var(--ds-dialog-shadow);
		--webid-dialog-radius: var(--ds-dialog-radius);
		--webid-dialog-width: 400px;
		--webid-dialog-height: 300px;
		--webid-dialog-backdrop: var(--ds-dialog-backdrop);
	}
	.webid-dialog {
		width: var(--webid-dialog-width);
		height: var(--webid-dialog-height);
		border: 0;
		border-radius: var(--webid-dialog-radius);
		box-shadow: var(--webid-dialog-shadow);
	}
	.webid-dialog::backdrop {
		background: var(--webid-dialog-backdrop);
		backdrop-filter: blur(16px);
	}
}
@media screen and (max-width:719px) {
	width: 100vw;
	height: 100vh;
}
		`
	},
	commands: {
		webidDialog: async function(el, value) {
			this.actions.webidErrors('')
			document.getElementById('webidDialog').showModal()
		},
		webidSave: async function(form, values) {
			if (!values.webidURL) {
				this.actions.webidErrors('Please enter a WebID URL')
				return
			}
			this.state.webid.id = values.webidURL
			if (await this.actions.webidSave(values.webidURL)) {
				document.getElementById('webidDialog').close()
			}
		},
		webidClose: async function(el, value) {
			document.getElementById('webidDialog').close()			
		}
	},
	actions: {
		webidInit: async function(config={}) {
			if (!this.state.webid) {
				this.state.webid = {
					config: {
						prefixes: {
							acl:    "http://www.w3.org/ns/auth/acl#",
							foaf:   "http://xmlns.com/foaf/0.1/",
							ldp:    "http://www.w3.org/ns/ldp#",
							schema: "http://schema.org/",
							solid:  "http://www.w3.org/ns/solid/terms#",
							space:  "http://www.w3.org/ns/pim/space#"
						},
						parser: oldm.n3Parser
					}
				}
			}
			Object.assign(this.state.webid.config, config)
		},
		webidSave: async function(webID) {
			let linkeddata
			try {
				const client = metro.client(
					metro.mw.thrower(),
					oldmmw(this.state.webid.config),
					metro.mw.getdata()
				)
				linkeddata = await client.get(webID)
				if (linkeddata instanceof Response) {
					// unexpected non-linked data response
					throw new Error('Error: unexpected response: '+(await profile.text()))
				}
				if (!linkeddata.primary) {
					throw new Error('Error: no webID found in resource')
				}
				this.state.webid.profile = linkeddata.primary
				return true
			} catch(error) {
				this.actions.webidErrors(error.message)
			}
			return false
		},
		webidErrors: async function(error) {
			this.state.webid.error = error
		}
	},
	hooks: {
		start: function(component) {
			this.actions.webidInit()
			this.container.insertAdjacentHTML('beforeend', component.html.webid)//FIXME: use simply-render
		}
	}
}