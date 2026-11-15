import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const appDir = path.join(root, "app");
const codeExtensions = new Set([".js", ".jsx", ".ts", ".tsx"]);
const ignoredDirectories = new Set(["node_modules", ".next", ".next-playwright", "playwright-report", "test-results"]);

function walk(directory: string): string[] {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (ignoredDirectories.has(entry.name)) return [];
      return walk(full);
    }
    return [full];
  });
}

function routeFromFile(file: string): string {
  const relative = path.relative(appDir, path.dirname(file));
  const parts = relative === "" ? [] : relative.split(path.sep);
  const visible = parts.filter((part) => !(part.startsWith("(") && part.endsWith(")")) && !part.startsWith("@"));
  const route = "/" + visible.join("/");
  return (route || "/").replace(/\[id\]/g, ":id").replace(/\[slug\]/g, ":slug");
}

const routableFiles = walk(appDir).filter((file) => /^(page|route)\.(js|jsx|ts|tsx)$/.test(path.basename(file)));
const routes = new Set<string>(routableFiles.map(routeFromFile));
const sourceFiles = walk(root).filter((file) => codeExtensions.has(path.extname(file)));
const hrefPattern = /href\s*=\s*["']([^"']+)["']/g;
const failures: string[] = [];

function matchesRoute(href: string): boolean {
  if (routes.has(href)) return true;
  for (const route of routes) {
    if (!route.includes(":")) continue;
    const expression = "^" + route
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      .replace(/:id|:slug/g, "[^/]+") + "$";
    if (new RegExp(expression).test(href)) return true;
  }
  return false;
}

for (const file of sourceFiles) {
  const text = fs.readFileSync(file, "utf8");
  for (const match of text.matchAll(hrefPattern)) {
    const raw = match[1];
    if (!raw?.startsWith("/") || raw.startsWith("//")) continue;
    const href = raw.split("#")[0].split("?")[0] || "/";
    if (!matchesRoute(href)) failures.push(`${path.relative(root, file)} -> ${raw}`);
  }
}

if (failures.length) {
  console.error("Broken literal internal links detected:");
  failures.forEach((item) => console.error(`  - ${item}`));
  process.exit(1);
}

console.log(`Internal route integrity passed (${routes.size} page and API routes checked).`);
