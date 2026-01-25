import 'simplyview'
import 'simplyflow'
import webid from '../components/solid-webid.mjs'
import solidFS from '../components/solid-fs.mjs'
import solidDrawer from '../components/solid-drawer.mjs'
import solidContacts from '../components/solid-contacts.mjs'
import {authorizePopup} from '@muze-nl/metro-oauth2/src/oauth2.popup.mjs'
import metro from '@muze-nl/metro'

const contacts = simply.app({
	actions: {
		loadMockContacts: async function() {
			const contacts = await this.api.contacts()
			const contactsModel = simply.flow.model({
				data: contacts.persons,
				options: {}
			})
			contactsModel.addEffect(function(data) {
				return simply.state.effect(() => {
					return data.current.map(p => {
						const capitalPos = p.last_name.search(/[A-Z]/)
						if (capitalPos==-1 && p.last_name.trim()[0].search(/[a-z]/)==-1) {
							p.sort_name = '#' + p.last_name
						} else {
							p.sort_name = p.last_name.substring(capitalPos).toUpperCase()
						}
						return p
					})
				})
			})
			contactsModel.addEffect(simply.flow.sort({
				sortBy: 'sort_name'
			}))
			contactsModel.addEffect(function(data) {
				let result = {}
				for (const entry of data.current) {
					const capital = entry.sort_name[0]
					if (!result[capital]) {
						result[capital] = {
							capital,
							entries: []
						}
					}
					result[capital].entries.push(entry)
				}
				return result
			})
			this.state.contacts = contactsModel
			console.log('contacts',contactsModel)
		}
	},
	state: simply.state.signal({
		path: '/',
		list: [],
		solidConfiguration: {
			client_info: {
				client_name: 'contacts',
				redirect_uris: [
					new URL('redirect.html', window.location.href)
				]
			},
			authorize_callback: authorizePopup
		}
	}),
	hooks: {
		start: async function() {
			simply.bind({
				root: this.state,
				transformers: this.transformers
			})
			delete document.body.dataset.swLoading
			if (!this.state.webid?.id) {
				await this.actions.webidDialog()
			}
			// temporary
			this.hooks.solidPreferencesLoaded.call(this)
		},
		solidPreferencesLoaded: async function() {
			this.actions.loadMockContacts()
		}
	},
	api: metro.jsonApi(window.location.href, {
		contacts: function() {
			return this.get('../data/contacts.json')
		}
	}),
	components: {
		webid,
		solidFS,
		solidDrawer,
		solidContacts
	}
})
contacts.start()

globalThis.contacts = contacts