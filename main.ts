import { Plugin, MarkdownPostProcessorContext } from 'obsidian';
import QRCode from 'qrcode';

export default class MyPlugin extends Plugin {
	
	postprocessor = async (content: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
		const destination = document.createElement('canvas');
		if(content.endsWith("\n")) {
			// Obsidian gives an unpretty linebreak at the end. Don't encode it in our QR Code!
			content = content.substring(0, content.length - 1);
		}
		QRCode.toCanvas(destination, content);
		el.appendChild(destination);
		return;
	}

	async onload() {
		console.log('loading plugin');
		this.registerMarkdownCodeBlockProcessor('qrcode', this.postprocessor);
	}

	onunload() {
		console.log('unloading plugin');
	}
}