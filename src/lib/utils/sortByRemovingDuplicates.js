export default function sortByRemovingDuplicates(array) {
	return [...new Set(array)].sort();
}
