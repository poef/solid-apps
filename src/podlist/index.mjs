import 'simplyview'
import 'simplyflow'
import webid from '../components/solid-webid.mjs'
import solidFS from '../components/solid-fs.mjs'
import solidDrawer from '../components/solid-drawer.mjs'
import {authorizePopup} from '@muze-nl/metro-oauth2/src/oauth2.popup.mjs'

const podlist = simply.app({
	css: {
		solidTheme: css`
			@layer theme {
				:root {
					--ds-primary: rgb(83, 80, 169);
					--ds-box-radius: 0;
				}
			}
			`,
		solidDialog: css`
			@layer component {
				.solid-dialog .ds-button-close {
					box-shadow: none;
					margin: 0;
				    right: 0;
				    min-height: 0;
				    line-height: 1rem;
				    top: 0;
				    color: white;
				    border-radius: 0;
				    clip-path: polygon( 0 0%, 17px 100%, 100% 100%, 100% 0);
				    padding-left: 25px;
				    background: var(--ds-grey-60);
				}
				.solid-dialog .ds-form-buttons {
					position: absolute;
					bottom: 0;
					background: var(--ds-grey-40);
					margin-left: -1em;
					padding-left: 1em;
					padding-top: calc(0.5 * var(--ds-space));
					width: 66%;
					clip-path: polygon( 0 0%, 0 100%, 100% 100%, calc(100% - 30px) 0);
				}
				.solid-dialog {
					opacity: 0;
					transform: scale(0.7)
				}
				.solid-dialog[open] {
					animation: fadeIn .2s forwards;
				}
				@keyframes fadeIn {
				  0%{
				    opacity:0;
				    transform: scale(0.7)
				  }
				  100%{
				    opacity:1;
				    transform: scale(1)
				  }
				}
				@media screen and (max-width: 480px) {
					.solid-dialog {
						width: 100vw;
						height: 100vh;
					}
				}
			}`
	},
	actions: {
		webidSave: async function(webidURL) {
			this.actions.webidErrors('')
			const result = await this.components.webid.actions.webidSave.call(this, webidURL)
			if (result) {
				this.state.profileJSON = JSON.stringify(this.state.webid.profile, null, 4)
				const issuer = this.state.webid.profile.solid$oidcIssuer
				this.state.solidConfiguration.issuer = issuer
				let pod = this.state.webid.profile.space$storage
				if (Array.isArray(pod)) {
					pod = pod[0]
				}
				if (!pod?.id) {
					this.actions.webidErrors('Geen storage pod gevonden in uw webid profiel')
					return
				}
				await this.actions.solidFSInit(pod.id, this.state.solidConfiguration)
				let files = await this.jsfs.list()
				this.state.profileJSON = JSON.stringify(files, null, 4)
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
			},
			authorize_callback: authorizePopup
		}
	}),
	hooks: {
		start: async function() {
			simply.bind({
				root: this.state
			})
			delete document.body.dataset.swLoading
			if (!this.state.webid?.id) {
				this.actions.webidDialog()
			}
		}
	},
	components: {
		webid,
		solidFS,
		solidDrawer
	}
})
podlist.start()

globalThis.podlist = podlist