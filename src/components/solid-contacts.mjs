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
			<a class="solid-contacts-letter" data-flow-field="capital" data-simply-command="solid-contacts-letter-nav"></a>
			<div class="solid-contacts-list" data-flow-list="entries">
				<template>
					<a class="solid-contacts-entry" data-simply-command="solid-contacts-show">
						<span class="solid-contacts-avatar"></span>
						<span class="solid-contacts-lastname" data-flow-field="last_name"></span>,
						<span class="solid-contacts-firstname" data-flow-field="first_name"></span>
					</a>
				</template>
			</div>
		</div>
	</template>
</div>`,
		'solid-contacts-filter':html`
<div class="solid-contacts-filter">
	<input type="search" class="solid-contacts-filter-input"
		data-simply-command="solid-contacts-filter" 
		data-simply-immediate
		data-simply-value="contacts">
</div>
		`
	},
	css: {
		'solid': css`
			@layer theme {
				:root {
					--ds-box-radius: 0;
					scroll-behavior: smooth;
				}
				.solid {
					width: 100%;
					height: 100%;
					min-height: 100vh;
					min-width: 100vw;
				}
			}
		`,
		'solid-contacts': css`
			@layer component {
				.solid-sticky-top {
					position: sticky;
					top: 0;
					z-index: 10;
					background: var(--ds-color-background);
				}
				.solid-contacts {
					display: flow-root;
				}
				.solid-contacts-letter {
					position: sticky;
					z-index: 9;
					top: calc(2 * var(--ds-line-height));
					text-decoration: none;
					scroll-margin-top: calc(2 * var(--ds-line-height));
					display: block;
					margin: var(--ds-space-d4) var(--ds-space-d4) 0 0;
					background: var(--ds-primary);
					color: var(--ds-primary-contrast);
					width: calc(var(--ds-space-d2) + var(--ds-line-height));
					padding: var(--ds-space-d4);
					text-align: center;

				}
				.solid-contacts-entry {
					display: flex;
					align-items: center;
				}
				.solid-contacts-avatar {
					width: calc(var(--ds-space-d2) + var(--ds-line-height));
					aspect-ratio: 1;
					margin: var(--ds-space-d4) var(--ds-space-d2) 0 0;
					background-color: var(--ds-grey-medium);
				}
				.solid-contacts-letters-nav .solid-contacts-section {
					float: left;
				}
				.solid-contacts-letters-nav .solid-contacts-entry {
					display: none;
				}
				.solid-contacts-letters-nav .solid-contacts-letter {
					float: left;
				}
				.solid-contacts-filter {
					position: sticky;
					bottom: 0;
					z-index: 10;
					background: var(--ds-white);
				}
			}
		`
	},
	commands: {
		'solid-contacts-letter-nav': async function(el, value) {
			const contacts = el.closest('.solid-contacts')
			contacts.classList.toggle('solid-contacts-letters-nav')
			if (!contacts.classList.contains('solid-contacts-letters-nav')) {
				window.location.hash = el.hash
				window.setTimeout(() => {
					el.scrollIntoView({behavior:'smooth'})
				}, 100)
			}
		},
		'solid-contacts-filter': async function(el, value) {
			const model = simply.path.get(this.state, el.dataset.simplyValue)
			model.state.options.name.filters.text = el.value
		}
	}
}