export default {
	html: {
		'solid-drawer': html`
	<nav class="solid-drawer-position">
		<label for="solidDrawerState" class="solid-drawer">
			<svg class="ds-icon ds-icon-feather">
	            <use xlink:href="assets/icons/feather-sprite.svg#user"></use>
	        </svg>
	    </label>
        <input type="checkbox" id="solidDrawerState" class="ds-dropdown-state">
	    <nav class="ds-dropdown-nav ds-dropdown-right ds-align-left">
	        <ul class="ds-dropdown-list">
	            <li class="ds-dropdown-item" data-simply-command="webidDialog">WebID</li>
	            <li class="ds-dropdown-item" data-simply-command="swPreferences">Preferences</li>
	            <li class="ds-dropdown-item" data-simply-command="swProfile">Profile</li>
	            <li class="ds-dropdown-item" data-simply-command="swCustomize">Customize</li>
	        </ul>
	    </nav>
	</nav>
`,
	'solid-preferences': html`
<dialog id="solid-preferences-dialog" class="solid-dialog">
	<button class="ds-button ds-button-close" data-simply-command="solidClose">
		<svg class="ds-icon ds-icon-feather">
            <use xlink:href="assets/icons/feather-sprite.svg#x"></use>
        </svg>		
	</button>
<form data-simply-command="solidPreferencesSave">
	<h2>Preferences</h2>
	<div class="ds-margin-up ds-alert ds-alert-error" data-flow-field="solid.error"></div>
	<table class="ds-margin-up">
		<tr>
			<th>Light/Dark</th>
			<td>
				<label class="ds-inline">
					<input type="radio" name="solidPreferencesDarkmode" value="0">
					Light
				</label>
				<label class="ds-inline">
					<input type="radio" name="solidPreferencesDarkmode" value="1">
					Dark
				</label>
				<label class="ds-inline">
					<input type="radio" name="solidPreferencesDarkmode" value="auto">
					Auto
				</label>
			</td>
		</tr>
	</label>
	<div class="ds-form-buttons">
		<button class="ds-button ds-button-primary">Save</button>
	</div>
</form>
</dialog>
		`
	},
	css: {
		'solid-drawer': css`
			@layer component {
				.solid-drawer {
					position: fixed;
					top: 0;
					right: 0;
					clip-path: polygon( 0 0%, 17px 100%, 100% 100%, 100% 0);
					padding: 6px 10px 6px 25px;
					background: var(--ds-grey-70);
					color: white;
					margin: 0;
				}
				.solid-drawer-position .ds-dropdown-item {
					padding: calc(0.25 * var(--ds-space)) calc(0.5 * var(--ds-space));
					cursor: pointer;
					border-bottom: 1px solid var(--ds-grey-20);
				}
				.solid-drawer-position .ds-dropdown-item:last-child {
					border-bottom: 0;
				}
				.solid-drawer-position .ds-dropdown-right {
					right: 6px;
					top: 31px;
				}
			}
			@layer utility {
				.ds-inline {
					display: inline-block;
				}
			}
`,
		'solid-alert': css`
			@layer component {
				.ds-alert:empty {
					display: none;
				}
				.ds-alert {
					padding: calc(0.5 * var(--ds-space));
				}
				.ds-alert-error, .ds-alert-info, .ds-alert-warning {
					background-color: var(--ds-grey-30);
				}
				.ds-alert-error {
					border-left: 10px solid var(--ds-alert-error-color);
				}
				.ds-alert-warning {
					border-left: 10px solid var(--ds-alert-warning-color);
				}
				.ds-alert-info {
					border-left: 10px solid var(--ds-alert-info-color);
				}
			}

			`
	},
	commands: {
		swPreferences: async function() {
			this.actions.swPreferencesDialog()
		},
		solidClose: async function(el) {
			el.closest('dialog').close()
		},
		solidPreferencesSave: async function() {
			try {
				await this.actions.swPreferencesSave()
			} catch(err) {
				this.actions.solidErrors(err.message)
			}
		}
	},
	actions: {
		swPreferencesDialog: async function() {
			this.actions.solidErrors('')
			document.getElementById('solid-preferences-dialog').showModal()
		},
		swPreferencesDialogClose: async function() {
			document.getElementById('solid-preferences-dialog').close()
		},
		solidErrors: async function(error) {
			this.state.solid.error = error
		},
		swPreferencesSave: async function() {
			throw new Error('not yet implemented')
		}
	},
	hooks: {
		start: function(component) {
			if (!this.state.solid) {
				this.state.solid = {}
			}
			this.container.insertAdjacentHTML('beforeend', component.html['solid-preferences'])//FIXME: use simply-render
		}
	}
}