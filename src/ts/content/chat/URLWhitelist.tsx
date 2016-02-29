/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

const whitelist = [
 	/twimg.com$/,
 	/fbcdn.net$/,
 	/imgur.com$/,
 	/trillian.im$/,
 	/imageshack.com$/,
 	/postimage.org$/,
 	/staticflickr.com$/,
 	/tinypic.com$/,
 	/photobucket.com$/,
 	/cdninstagram.com$/,
 	/deviantart.net$/,
 	/imagebam.com$/,
 	/dropboxusercontent.com$/,
 	/whicdn.com$/,
 	/smugmug.com$/,
 	/vine.co$/,
 	/youtube.com$/,
];

function ok(text: string) {
	const re: RegExp = /http[s]*:\/\/([^/]*)/;
	let i: number;
	let match: RegExpExecArray = re.exec(text);
	if (match) {
		for (i = 0; i < whitelist.length; i++) {
			if (whitelist[i].exec(match[1])) {
				console.log(text + ' is whitelisted');
				return true;
			}
		}
	}
}

function isImage(text: string) {
	return text.split('?')[0].match(/\.jpg$|\.jpeg$|\.png$|\.gif$/);
}

function isVideo(text: string) {
	return text.match(/^http[s]?:\/\/(?:www\.)?youtube\.com\/watch\?v=([A-Za-z0-9]+)$/);
}

function isVine(text: string) {
	return text.match(/^http[s]?:\/\/vine\.co\/v\/([A-Za-z0-9]+)$/);
}

export default {
	ok,
	isImage,
	isVideo,
	isVine
}
