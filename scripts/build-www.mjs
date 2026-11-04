// Copia os arquivos do jogo para www/, que o Capacitor empacota dentro do app iOS.
// O site continua sendo servido da raiz do repositório (GitHub Pages); nada muda nele.
import {rmSync, mkdirSync, copyFileSync} from 'node:fs';
const FILES = ['index.html', 'manifest.webmanifest', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png'];
rmSync('www', {recursive: true, force: true});
mkdirSync('www');
for (const f of FILES) copyFileSync(f, 'www/' + f);
console.log('www/ pronto:', FILES.join(', '));
