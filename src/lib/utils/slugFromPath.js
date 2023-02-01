export default function slugFromPath(path) {
	return path.match(/([\w-]+)\.(svelte\.md|md|svx)/i)?.[1] ?? null;
}
