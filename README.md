# QR Code Generator Obsidian Plugin

This is a plugin for [Obsidian](https://obsidian.md) to display QR Codes.

The library used for generating QR Codes is [node-qrcode](https://github.com/soldair/node-qrcode).


## Installation
### From within Obsidian
From Obsidian v0.9.8, you can activate this plugin within Obsidian by doing the following:
- Open Settings > Third-party plugin
- Make sure Safe mode is **off**
- Click Browse community plugins
- Search for "QR Code Generator"
- Click Install
- Once installed, close the community plugins window and activate the newly installed plugin

### From Github
- Clone this repository
- Follow the instructions of the official [Obsidian Sample Plugin](https://github.com/obsidianmd/obsidian-sample-plugin) to deploy it in your local installation

## Usage

Type the `qrcode` keyword to use the QR Code Plugin.

```yaml
    ```qrcode
        https://github.com
    ```
```

The result will be this:

![Screenshot](https://raw.githubusercontent.com/rudimuc/obsidian-qrcode/main/obsidian_rendered.png)

For complex QR Code generation (which means customizable codes) use the keyword `qrcode-complex` instead.

```yaml
    ```qrcode-complex
    {
        "text": "this is my data",
        "width": 400,
        "margin": 20,
        "dark": "#0FF",
        "light": "#FFF"
    }
    ```
```

You have the following options:

|parameter|required|example|
|--|--|--|
|text  |yes  | The data/content for the code
|width|optional (default = auto)| integer value for the size
|margin|optional (default = 4)| Define how much wide the quiet zone should be.
|dark|optional (default = #000000)| RGB or RGBA Hex-Code for the dark Pixels
|light|optional (default = #FFFFFF)| RGB or RGBA Hex-Code for the light Pixels

## Version History
### 1.0.1
- New Keyword for complex QR Codes with settings
- Plugin class name changed
### 1.0.0
- Initial Release

