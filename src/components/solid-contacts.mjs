import metro from '@muze-nl/metro'
import oldm from '@muze-nl/oldm'
import oldmmw from '@muze-nl/metro-oldm'
import {html,css} from 'simplyview/src/highlight.mjs'

export default {
	html: {
		'solid-contacts': html`
<div class="solid-contacts" data-flow-list="contacts.view.current">
	<template>
		<div class="solid-contacts-entry">
			<span class="solid-contacts-avatar"></span>
			<div class="solid-contacts-name">
				<span class="solid-contacts-lastname" data-flow-field="last_name" data-flow-transform="firstLetterBlock"></span>,
				<span class="solid-contacts-firstname" data-flow-field="first_name"></span>
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
	},
	transformers: {
		firstLetterBlock: function(context, next) {
			const capitalPos = context.value.search(/[A-Z]/)
			let firstLetter
			if (capitalPos == -1) {
				firstLetter = '#'
			} else {
				firstLetter = context.value[capitalPos].toUpperCase()
			}
			const list = context.element.closest('[data-flow-list]')
			if (firstLetter!=list.firstLetter) {
				list.firstLetter = firstLetter
				const letterBlock = html`<div class="solid-contacts-letter ds-bg-primary">
					${firstLetter.toUpperCase()}
				</div>`
				const templ = document.createElement('template')
				templ.innerHTML = letterBlock
				context.element.closest('.solid-contacts')
					.insertBefore(templ.content, context.element.closest('.solid-contacts-entry'))
			}
			next(context)
		}
	}
}