/* eslint-disable */
/** @license React v16.6.0
 * react-cache.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

//Object.defineProperty(exports, '__esModule', { value: true });

import React from 'react';
import scheduler from 'scheduler';

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

// eslint-disable-next-line @typescript-eslint/no-empty-function
let warningWithoutStack = function () {};

{
	warningWithoutStack = function (condition, format) {
		for (let _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
			args[_key - 2] = arguments[_key];
		}

		if (format === undefined) {
			throw new Error(
				'`warningWithoutStack(condition, format, ...args)` requires a warning ' + 'message argument'
			);
		}
		if (args.length > 8) {
			// Check before the condition to catch violations early.
			throw new Error('warningWithoutStack() currently supports at most 8 arguments.');
		}
		if (condition) {
			return;
		}
		if (typeof console !== 'undefined') {
			let _args$map = args.map(function (item) {
					// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
					return '' + item;
				}),
				a = _args$map[0],
				b = _args$map[1],
				c = _args$map[2],
				d = _args$map[3],
				e = _args$map[4],
				f = _args$map[5],
				g = _args$map[6],
				h = _args$map[7];

			// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
			let message = 'Warning: ' + format;

			// We intentionally don't use spread (or .apply) because it breaks IE9:
			// https://github.com/facebook/react/issues/13610
			switch (args.length) {
				case 0:
					console.error(message);
					break;
				case 1:
					console.error(message, a);
					break;
				case 2:
					console.error(message, a, b);
					break;
				case 3:
					console.error(message, a, b, c);
					break;
				case 4:
					console.error(message, a, b, c, d);
					break;
				case 5:
					console.error(message, a, b, c, d, e);
					break;
				case 6:
					console.error(message, a, b, c, d, e, f);
					break;
				case 7:
					console.error(message, a, b, c, d, e, f, g);
					break;
				case 8:
					console.error(message, a, b, c, d, e, f, g, h);
					break;
				default:
					throw new Error('warningWithoutStack() currently supports at most 8 arguments.');
			}
		}
		try {
			// --- Welcome to debugging React ---
			// This error was thrown as a convenience so that you can use this stack
			// to find the callsite that caused this warning to fire.
			let argIndex = 0;
			let _message =
				// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
				'Warning: ' +
				format.replace(/%s/g, function () {
					return args[argIndex++];
				});
			throw new Error(_message);
		} catch (x) {}
	};
}

let warningWithoutStack$1 = warningWithoutStack;

function createLRU(limit) {
	let LIMIT = limit;

	// Circular, doubly-linked list
	let first = null;
	let size = 0;

	let cleanUpIsScheduled = false;

	function scheduleCleanUp() {
		if (cleanUpIsScheduled === false && size > LIMIT) {
			// The cache size exceeds the limit. Schedule a callback to delete the
			// least recently used entries.
			cleanUpIsScheduled = true;
			scheduler.unstable_scheduleCallback(cleanUp);
		}
	}

	function cleanUp() {
		cleanUpIsScheduled = false;
		deleteLeastRecentlyUsedEntries(LIMIT);
	}

	function deleteLeastRecentlyUsedEntries(targetSize) {
		// Delete entries from the cache, starting from the end of the list.
		if (first !== null) {
			let resolvedFirst = first;
			let last = resolvedFirst.previous;
			while (size > targetSize && last !== null) {
				let _onDelete = last.onDelete;
				let _previous = last.previous;
				last.onDelete = null;

				// Remove from the list
				last.previous = last.next = null;
				if (last === first) {
					// Reached the head of the list.
					first = last = null;
				} else {
					first.previous = _previous;
					_previous.next = first;
					last = _previous;
				}

				size -= 1;

				// Call the destroy method after removing the entry from the list. If it
				// throws, the rest of cache will not be deleted, but it will be in a
				// valid state.
				_onDelete();
			}
		}
	}

	function add(value, onDelete) {
		let entry = {
			value: value,
			onDelete: onDelete,
			next: null,
			previous: null
		};
		if (first === null) {
			entry.previous = entry.next = entry;
			first = entry;
		} else {
			// Append to head
			let last = first.previous;
			last.next = entry;
			entry.previous = last;

			first.previous = entry;
			entry.next = first;

			first = entry;
		}
		size += 1;
		return entry;
	}

	function update(entry, newValue) {
		entry.value = newValue;
	}

	function access(entry) {
		let next = entry.next;
		if (next !== null) {
			// Entry already cached
			let resolvedFirst = first;
			if (first !== entry) {
				// Remove from current position
				let _previous2 = entry.previous;
				_previous2.next = next;
				next.previous = _previous2;

				// Append to head
				let last = resolvedFirst.previous;
				last.next = entry;
				entry.previous = last;

				resolvedFirst.previous = entry;
				entry.next = resolvedFirst;

				first = entry;
			}
		} else {
			// Cannot access a deleted entry
			// TODO: Error? Warning?
		}
		scheduleCleanUp();
		return entry.value;
	}

	function setLimit(newLimit) {
		LIMIT = newLimit;
		scheduleCleanUp();
	}

	return {
		add: add,
		update: update,
		access: access,
		setLimit: setLimit
	};
}

let Pending = 0;
let Resolved = 1;
let Rejected = 2;

let currentDispatcher = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher;

function readContext(Context, observedBits) {
	let dispatcher = currentDispatcher.current;
	if (dispatcher === null) {
		throw new Error(
			'react-cache: read and preload may only be called from within a ' +
				"component's render. They are not supported in event handlers or " +
				'lifecycle methods.'
		);
	}
	return dispatcher.readContext(Context, observedBits);
}

function identityHashFn(input) {
	{
		!(
			typeof input === 'string' ||
			typeof input === 'number' ||
			typeof input === 'boolean' ||
			input === undefined ||
			input === null
		)
			? warningWithoutStack$1(
					false,
					'Invalid key type. Expected a string, number, symbol, or boolean, ' +
						'but instead received: %s' +
						'\n\nTo use non-primitive values as keys, you must pass a hash ' +
						'function as the second argument to createResource().',
					input
			  )
			: void 0;
	}
	return input;
}

let CACHE_LIMIT = 500;
let lru = createLRU(CACHE_LIMIT);

let entries = new Map();

let CacheContext = React.createContext(null);

function accessResult(resource, fetch, input, key) {
	let entriesForResource = entries.get(resource);
	if (entriesForResource === undefined) {
		entriesForResource = new Map();
		entries.set(resource, entriesForResource);
	}
	let entry = entriesForResource.get(key);
	if (entry === undefined) {
		let thenable = fetch(input);
		thenable.then(
			function (value) {
				if (newResult.status === Pending) {
					let resolvedResult = newResult;
					resolvedResult.status = Resolved;
					resolvedResult.value = value;
				}
			},
			function (error) {
				if (newResult.status === Pending) {
					let rejectedResult = newResult;
					rejectedResult.status = Rejected;
					rejectedResult.value = error;
				}
			}
		);
		let newResult = {
			status: Pending,
			value: thenable
		};
		let newEntry = lru.add(newResult, deleteEntry.bind(null, resource, key));
		entriesForResource.set(key, newEntry);
		return newResult;
	} else {
		return lru.access(entry);
	}
}

function deleteEntry(resource, key) {
	let entriesForResource = entries.get(resource);
	if (entriesForResource !== undefined) {
		entriesForResource.delete(key);
		if (entriesForResource.size === 0) {
			entries.delete(resource);
		}
	}
}

export function unstable_createResource(fetch, maybeHashInput) {
	let hashInput = maybeHashInput !== undefined ? maybeHashInput : identityHashFn;

	let resource = {
		read: function (input) {
			// react-cache currently doesn't rely on context, but it may in the
			// future, so we read anyway to prevent access outside of render.
			readContext(CacheContext);
			let key = hashInput(input);
			let result = accessResult(resource, fetch, input, key);
			switch (result.status) {
				case Pending: {
					let suspender = result.value;
					throw suspender;
				}
				case Resolved: {
					let _value = result.value;
					return _value;
				}
				case Rejected: {
					let error = result.value;
					throw error;
				}
				default:
					// Should be unreachable
					return undefined;
			}
		},
		preload: function (input) {
			// react-cache currently doesn't rely on context, but it may in the
			// future, so we read anyway to prevent access outside of render.
			readContext(CacheContext);
			let key = hashInput(input);
			accessResult(resource, fetch, input, key);
		}
	};
	return resource;
}

export function unstable_setGlobalCacheLimit(limit) {
	lru.setLimit(limit);
}
