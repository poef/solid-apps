import jsfs from '@muze-nl/jsfs/src/index.mjs'
import SolidAdapter from '@muze-nl/jsfs-solid/src/SolidAdapter.js'

export default {
	actions: {
		solidFSInit: async function(client, solidConfiguration) {
			this.jsfs = new jsfs.fs(new SolidAdapter(client, '/', solidConfiguration))
		}
	}
}