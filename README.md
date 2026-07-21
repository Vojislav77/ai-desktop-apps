# AI Desktop Apps for Linux (AppImages)

A collection of standalone desktop clients for popular AI chat services, packaged as AppImages. No installation – just download, make executable, and run.

<img width="655" height="421" alt="ai1" src="https://github.com/user-attachments/assets/6e4707fc-be9a-44d2-898f-9c364ba1466e" />
<img width="1484" height="1367" alt="ai2" src="https://github.com/user-attachments/assets/c72768a9-514a-4b9b-9fe3-c5ac6caa284d" />
<img width="556" height="915" alt="ai3" src="https://github.com/user-attachments/assets/1e9f089e-2958-4147-aaa8-7c5913612bbc" />

## Included Apps
- **DeepSeek** – chat.deepseek.com
- **Qwen** – chat.qwen.ai
- **DuckAI** – duck.ai
- **Kimi** – www.kimi.com
- **Mistral** – chat.mistral.ai
- **Minimax** – agent.minimax.io
- **ZAI** – chat.z.ai

All apps feature:
- System tray icon with **Show** / **Quit**
- Persistent window size/position
- Native desktop integration (taskbar icon)

## Download
Get the AppImages from the [Releases](https://github.com/Vojislav77/ai-desktop-apps/releases) page.

## Usage
1. Download the `.AppImage` file.
2. Make it executable:  
   `chmod +x Name.AppImage`
3. Run it:  
   `./Name.AppImage`

If you get a fuse error, run with `--appimage-extract` and launch the extracted binary.

## Build Your Own (for other AI sites)
### Prerequisites
- Node.js & npm (install via your package manager)
- `librsvg2-tools` (for SVG→PNG conversion, optional)

### Quick build script
Use the `build-new.sh` script:

./build-new.sh <app-name> <url> <icon-url-or-path>

### Example:
./build-new.sh claude https://claude.ai icon.png

## Manual build (template)

1. Copy the app-template folder:
   cp -r app-template new-app
2. Edit main.js and package.json – replace qwen, Qwen, and the URL.
3. Place a 256x256 icon.png in the folder.
4. Run npm install && npm run build.
5. The AppImage appears in dist/.

### Template script for automation

Save as build-new.sh:

    #!/bin/bash
    NAME=$1
    URL=$2
    ICON=$3
    if [ -z "$NAME" ] || [ -z "$URL" ]; then
      echo "Usage: $0 <name> <url> [icon-path]"
      exit 1
    fi
    cp -r app-template ${NAME}-app
    cd ${NAME}-app
    rm -rf dist node_modules package-lock.json
    sed -i "s/qwen/${NAME}/g" main.js
    sed -i "s/Qwen/${NAME^}/g" main.js
    sed -i "s/chat.qwen.ai/${URL}/g" main.js
    sed -i "s/qwen/${NAME}/g" package.json
    sed -i "s/Qwen/${NAME^}/g" package.json
    sed -i "s/qwen-window-state/${NAME}-window-state/g" main.js
    if [ -f "$ICON" ]; then cp "$ICON" icon.png; fi
    npm install
    npm run build
    echo "AppImage built at dist/${NAME^}-1.0.0.AppImage"

Make it executable: chmod +x build-new.sh

### Troubleshooting

- White/blank window – the site may block Electron’s user agent. Open **main.js** and add this line after **win.loadURL()**:

    **win.webContents.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');**

    Also add **webPreferences: { webSecurity: false, allowRunningInsecureContent: true }** in the BrowserWindow options.

- No icon/tray – ensure **icon.png** is 256x256 and placed in the app folder.

### License

**MIT** – free to use and modify.
