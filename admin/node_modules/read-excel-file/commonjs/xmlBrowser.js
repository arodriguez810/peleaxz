'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
// Using native `DOMParser` because `xpath` + `xmldom` doesn't work.
// https://github.com/goto100/xpath/issues/85
exports.default = {
	createDocument: function createDocument(content) {
		return new DOMParser().parseFromString(content, 'text/xml');
	},
	select: function select(doc, node, path) {
		var namespaces = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

		var nodes = doc.evaluate(path, node || doc, function (prefix) {
			return namespaces[prefix];
		}, XPathResult.ANY_TYPE, null);
		// Convert iterator to an array.
		var results = [];
		var result = nodes.iterateNext();
		while (result) {
			results.push(result);
			result = nodes.iterateNext();
		}
		return results;
	}
};
//# sourceMappingURL=xmlBrowser.js.map