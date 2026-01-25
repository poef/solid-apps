import metro from '@muze-nl/metro'
import oldm from '@muze-nl/oldm'
import oldmmw from '@muze-nl/metro-oldm'
import {html,css} from 'simplyview/src/highlight.mjs'

export default {
	html: {
		'solid-contacts': html`
<div class="solid-contacts" data-flow-map="contacts.view">
	<template>
		<div class="solid-contacts-section">
			<div class="solid-contacts-letter" data-flow-field="capital"></div>
			<div class="solid-contacts-list" data-flow-list="entries">
				<template>
					<div class="solid-contacts-entry">
						<span class="solid-contacts-avatar"></span>
						<span class="solid-contacts-lastname" data-flow-field="last_name"></span>,
						<span class="solid-contacts-firstname" data-flow-field="first_name"></span>
					</div>
				</template>
			</div>
		</div>
	</template>
</div>`
	},
	css: {
		'solid-contacts': css`
			@layer component {
				.solid-sticky-top {
					position: sticky;
					top: 0;
					z-index: 10;
					background: var(--ds-white);
				}
				.solid-contacts-letter {
					background: var(--ds-primary);
					color: var(--ds-primary-contrast);
					width: calc(var(--ds-space-d2) + var(--ds-line-height));
					padding: var(--ds-space-d4);
					text-align: center;
					margin: var(--ds-space-d4) var(--ds-space-d2) 0 0;
					position: sticky;
					z-index: 9;
					top: calc(2 * var(--ds-line-height));
				}
				.solid-contacts-entry {
					display: flex;
					align-items: center;
				}
				.solid-contacts-avatar {
					width: calc(var(--ds-space-d2) + var(--ds-line-height));
					aspect-ratio: 1;
					margin: var(--ds-space-d4) var(--ds-space-d2) 0 0;
					background-color: var(--ds-grey-80);
				}
			}
		`
	}
}