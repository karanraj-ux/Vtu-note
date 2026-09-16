const fs = require('fs');
const file = 'src/pages/PdfViewer.tsx';
let data = fs.readFileSync(file, 'utf8');

data = data.replace(
  /\{\/\* Open in Google Drive \*\/\}\s*\{embedSrc && \(\s*<a\s*href=\{embedSrc\.replace\('\/preview', '\/view'\)\}\s*target="_blank"\s*rel="noopener noreferrer"\s*className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-xl transition-colors"\s*title="Open in Google Drive"\s*>\s*<ExternalLink className="h-4 w-4" \/>\s*<\/a>\s*\)\}/,
  `{/* Open External / Google Drive */}
              {embedSrc && embedSrc.includes('drive.google.com') ? (
                <a
                  href={embedSrc.replace('/preview', '/view')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-xl transition-colors"
                  title="Open in Google Drive"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : embedSrc && (
                <a
                  href={embedSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-xl transition-colors"
                  title="Open in new tab"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}`
);

fs.writeFileSync(file, data, 'utf8');
console.log('Fixed PDF Viewer External Link');
