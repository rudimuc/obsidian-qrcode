import { Plugin, MarkdownPostProcessorContext, Notice } from 'obsidian';

import { QRCode, toCanvas } from 'qrcode'

export default class QrCodePlugin extends Plugin {
	
	/**
	* Function for processing Content-only QR code blocks
	*/
	postprocessorRaw = async (content: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
		const destination = document.createElement('canvas');
		if(content.endsWith("\n")) {
			// Obsidian gives an unpretty linebreak at the end. Don't encode it in our QR Code!
			content = content.substring(0, content.length - 1);
		}
		toCanvas(destination, content);
		el.appendChild(destination);
		return;
	}

	/**
	* Function for processing JSON like QR code blocks
	*/
	postprocessorComplex = async (content: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
		const destination = document.createElement('canvas');
		let [text, parameters] = this.readParameters(content);
		toCanvas(destination, text, parameters);
		el.appendChild(destination);
		return;
	}
	
	private readParameters(jsonString: any) {
		let params = JSON.parse(jsonString);
		let options: {[k:string]: any} = {};
		options.color = {light: "#ffffff", dark: "#000000"};
		options.errorCorrectionLevel = 'M';
		if (params.width !== undefined) {
			options.width = params.width;
		}
		if (params.errorCorrectionLevel !== undefined) {
			options.errorCorrectionLevel = params.errorCorrectionLevel;
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
		this.registerMarkdownCodeBlockProcessor('qrcode', this.postprocessorRaw);
		this.registerMarkdownCodeBlockProcessor('qrcode-complex', this.postprocessorComplex);
	}
}
