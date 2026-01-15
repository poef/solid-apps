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
	            <li class="ds-dropdown-item" data-simply-command="saveFile">Save</li>
	            <li class="ds-dropdown-item" data-simply-command="deleteFile">Delete</li>
	            <li class="ds-dropdown-item" data-simply-command="showDeleted">Show Deleted &amp; Redirected</li>
	        </ul>
	    </nav>
	</nav>
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
					background: linear-gradient(to bottom, #000 0%, #000, 85%, var(--ds-grey-70));
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
`
	}
}