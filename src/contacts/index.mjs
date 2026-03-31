import 'simplyview'
import 'simplyflow'
import webid from '../components/solid-webid.mjs'
import solidFS from '../components/solid-fs.mjs'
import solidDrawer from '../components/solid-drawer.mjs'
import solidContacts from '../components/solid-contacts.mjs'
import {authorizePopup} from '@muze-nl/metro-oauth2/src/oauth2.popup.mjs'
import metro from '@muze-nl/metro'
import theds from '@muze-nl/theds'
import {_, from, anyOf, asc} from '@muze-nl/jaqt'

const addSortName = function(p) {
	const capitalPos = p.last_name.search(/[A-Z]/)
	if (capitalPos==-1 && p.last_name.trim()[0].search(/[a-z]/)==-1) {
		p.sort_name = '#' + p.last_name
	} else {
		p.sort_name = p.last_name.substring(capitalPos).toUpperCase()
	}
	p.capital = p.sort_name[0]
	return p
}

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
					const result = from(data.current)
					.select({
						_: o => addSortName(o)
					})
					.orderBy({
						sort_name: asc
					})
					console.log('sorted',result)
					return result
				})
			})
			contactsModel.addEffect(function(data) {
				this.state.options.filterBy = ''
				return simply.state.effect(() => {
					if (this.state.options.filterBy) {
						const filterBy = new RegExp(this.state.options.filterBy, 'i')
						return from(data.current)
						.where(anyOf({
							last_name: filterBy
						}, {
							first_name: filterBy
						}))
					} else {
						return data.current
					}
				})
			})
			contactsModel.addEffect(function(data) {
				return simply.state.effect(() =>{
					return from(data.current)
					.groupBy(_.capital)
				})
			})
			this.state.contacts = contactsModel
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

			// TODO: if this is a common best practice elevate
			// this code to simply.app()
			for (const name in this.components) {
				if (this.components[name].hooks?.start) {
					await this.components[name].hooks.start.call(this, this.components[name])
				}
			}

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
		theds,
		webid,
		solidFS,
		solidDrawer,
		solidContacts
	}
})

globalThis.contactsApp = contacts