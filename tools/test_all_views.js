const fs = require('fs');
const path = require('path');
const vm = require('vm');

const htmlPath = path.join(__dirname, '..', 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let scripts = [];
while ((match = scriptRegex.exec(html)) !== null) {
  if (match[1].trim()) {
    scripts.push(match[1]);
  }
}

const domMock = {
  document: {
    documentElement: { dataset: {} },
    querySelector: () => ({ setAttribute: () => {}, onclick: null, textContent: '', style: {}, classList: { add: () => {}, remove: () => {}, toggle: () => {} } }),
    querySelectorAll: () => [],
    getElementById: () => null,
    createElement: () => ({ setAttribute: () => {}, classList: { add: () => {}, remove: () => {} }, appendChild: () => {}, textContent: '', style: {} }),
    body: { appendChild: () => {}, innerText: 'mock body' },
    addEventListener: () => {}
  },
  window: {
    matchMedia: () => ({ matches: false }),
    addEventListener: () => {},
    scrollTo: () => {},
    location: { hash: '' }
  },
  localStorage: {
    getItem: () => null,
    setItem: () => {}
  },
  console,
  setTimeout,
  clearTimeout,
  setInterval,
  clearInterval
};
domMock.window.document = domMock.document;
domMock.window.localStorage = domMock.localStorage;

vm.createContext(domMock);

for (let i = 0; i < scripts.length; i++) {
  try {
    vm.runInContext(scripts[i], domMock);
  } catch (e) {
    console.error(`Script ${i + 1} error:`, e.message);
    process.exit(1);
  }
}

console.log('Validated ' + scripts.length + ' scripts in index.html: all views & data parsed cleanly (0 errors)');
