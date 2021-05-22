import { Plugin, MarkdownPostProcessorContext, Notice } from 'obsidian';
import QRCode from 'qrcode'

export default class QrCodePlugin extends Plugin {
	
	postprocessorRaw = async (content: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
		const destination = document.createElement('canvas');
		if(content.endsWith("\n")) {
			// Obsidian gives an unpretty linebreak at the end. Don't encode it in our QR Code!
			content = content.substring(0, content.length - 1);
		}
		QRCode.toCanvas(destination, content);
		el.appendChild(destination);
		return;
	}

	postprocessorComplex = async (content: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
		const destination = document.createElement('canvas');
		let [text, parameters] = this.readParameters(content);
		QRCode.toCanvas(destination, text, parameters);
		el.appendChild(destination);
		return;
	}
	
	private readParameters(jsonString: any) {
		let params = JSON.parse(jsonString);
		var options: {[k:string]: any} = {};
		options.color = {light: "#ffffff", dark: "#000000"};
		if (params.width !== undefined) {
			options.width = params.width;
		}
		if (params.margin !== undefined) {
			options.margin = params.margin;
		}
		if (params.dark !== undefined) {
			options.color.dark = params.dark;
		}
		if (params.light !== undefined) {
			options.color.light = params.light;
		}
		return [params.text, options];
	}

	async onload() {
		console.log('loading plugin');
		this.registerMarkdownCodeBlockProcessor('qrcode', this.postprocessorRaw);
		this.registerMarkdownCodeBlockProcessor('qrcode-complex', this.postprocessorComplex);
	}

	onunload() {
		console.log('unloading plugin');
	}
}
