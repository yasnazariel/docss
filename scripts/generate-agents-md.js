function scanDocs(dir, basePath = '', ignored = { dirs: new Set(), files: new Set(), bareFiles: new Set() }) {
  const index = {};

  if (!fs.existsSync(dir)) return index;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (CONFIG.skipFiles.includes(entry.name) || entry.name.startsWith('.')) continue;

    const fullPath = path.join(dir, entry.name);
    const relPath = basePath ? `${basePath}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      if (CONFIG.skipDirs.includes(entry.name)) continue;

      const childIndex = scanDocs(fullPath, relPath, ignored);

      for (const [key, value] of Object.entries(childIndex)) {
        if (!index[key]) {
          index[key] = [];
        }
        index[key].push(...value);
      }
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (CONFIG.extensions.includes(ext)) {
        const baseName = entry.name.replace(/\.mdx?$/, '');

        if (CONFIG.skipFilePatterns.some(p => p.test(baseName))) continue;
        if (ignored.bareFiles.has(baseName)) continue;
        if (ignored.files.has(basePath ? `${basePath}/${baseName}` : baseName)) continue;

        files.push(baseName);
      }
    }
  }

  if (files.length > 0 && !ignored.dirs.has(basePath)) {
    const key = (basePath || 'root')
      .replace(/(^|\/)\d+-/g, '$1') // safer numeric prefix removal
      .replace(/^\/+/, '');

    if (!index[key]) {
      index[key] = [];
    }

    index[key].push(...files);
  }

  return index;
}
