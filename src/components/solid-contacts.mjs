import metro from '@muze-nl/metro'
import oldm from '@muze-nl/oldm'
import oldmmw from '@muze-nl/metro-oldm'
import {html,css} from 'simplyview/src/highlight.mjs'

export default {
	html: {
		'solid-contacts': html`
<div class="solid-contacts" data-flow-map="contacts.view.current">
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
	<svg class="solid-contacts-filter-icon ds-icon ds-icon-feather">
	    <use xlink:href="assets/icons/feather-sprite.svg#search"></use>
	</svg>
	<input type="text" class="solid-contacts-filter-input"
		data-simply-command="solid-contacts-filter" 
		data-simply-immediate="true"
		data-simply-value="contacts">
</div>
		`,
		'solid-contacts-contact':html`
<div class="solid-contacts-contact">
	<h2>Auke van Slooten</h2>
	<div>
		<h3>
			<svg class="ds-icon ds-icon-feather">
		    	<use xlink:href="assets/icons/feather-sprite.svg#phone"></use>
			</svg>
			Call Mobile
		</h3>
		<p class="ds-margin-up"><a href="tel:+31626528325">+31 6 26 528 325</a></p>
	</div>
	<div>
		<h3>
			<svg class="ds-icon ds-icon-feather">
		    	<use xlink:href="assets/icons/feather-sprite.svg#mail"></use>
			</svg>
			Email
		</h3>
		<p class="ds-margin-up"><a href="mailto:auke@muze.nl">auke@muze.nl</a></p>
	</div>
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
					min-height: 100svh;
					min-width: 100vw;
				}
				.solid-panels {

				}
				.solid-panels-split-horizontal {
					display: flex;
				}
				.solid-panels-pane {
					padding: var(--ds-space);
				}
			}
			@layer base {
				a:link {
					color: var(--ds-light-link-color);
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
					position: fixed;
					bottom: 0;
					z-index: 10;
					background-color: var(--ds-color-background);
					color: var(--ds-color-contrast);
					padding: var(--ds-space) 0;
				}
				.solid-contacts-filter-input {
					border-left: calc(var(--ds-space-d2) + var(--ds-line-height)) solid var(--ds-grey-medium);
					padding-left: var(--ds-space-d2);
					width: calc(100% - 2 * var(--ds-space));
					margin: 0;
				}
				.solid-contacts-filter-icon {
					position: absolute;
					margin-top: var(--ds-space-d4);
					margin-left: var(--ds-space-d2);
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