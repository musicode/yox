(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("York", [], factory);
	else if(typeof exports === 'object')
		exports["York"] = factory();
	else
		root["York"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdateYork"];
/******/ 	this["webpackHotUpdateYork"] = function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}

/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}

/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}


/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}

/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "b1f9e8023e7c400c3304"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars

/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}

/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}

/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}

/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],

/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},

/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},

/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}

/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";

/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}

/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;

/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;

/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}

/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}

/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;

/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}

/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}

/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}

/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}

/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}

/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};

/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}

/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}

/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}

/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}

/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}

/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;

/******/ 			var data = {};

/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;

/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;

/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];

/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}

/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}

/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");

/******/ 		hotCurrentHash = hotUpdateNewHash;

/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}

/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}

/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}

/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}

/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _class, _temp;

	// 5 个内建指令，其他指令通过扩展实现


	var _pattern = __webpack_require__(1);

	var pattern = _interopRequireWildcard(_pattern);

	var _lifecycle = __webpack_require__(2);

	var lifecycle = _interopRequireWildcard(_lifecycle);

	var _mustache = __webpack_require__(3);

	var _event = __webpack_require__(29);

	var _keypath = __webpack_require__(30);

	var _object = __webpack_require__(7);

	var _array = __webpack_require__(10);

	var _is = __webpack_require__(9);

	var _component = __webpack_require__(32);

	var _helper = __webpack_require__(33);

	var _vdom = __webpack_require__(37);

	var _ref = __webpack_require__(45);

	var _ref2 = _interopRequireDefault(_ref);

	var _lazy = __webpack_require__(46);

	var _lazy2 = _interopRequireDefault(_lazy);

	var _event2 = __webpack_require__(47);

	var _event3 = _interopRequireDefault(_event2);

	var _model = __webpack_require__(48);

	var _model2 = _interopRequireDefault(_model);

	var _component2 = __webpack_require__(50);

	var _component3 = _interopRequireDefault(_component2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var globalComponents = {};
	var globalDirectives = { ref: _ref2.default, lazy: _lazy2.default, event: _event3.default, model: _model2.default, component: _component3.default };
	var globalFilters = {};
	var globalPartials = {};

	module.exports = (_temp = _class = function () {

	  /**
	   * 配置项
	   *
	   * @constructor
	   * @param {Object} options
	   */


	  /**
	   * 全局过滤器
	   *
	   * @type {Object}
	   */


	  /**
	   * 全局组件
	   *
	   * @type {Object}
	   */
	  function York(options) {
	    _classCallCheck(this, York);

	    var el = options.el,
	        data = options.data,
	        props = options.props,
	        parent = options.parent,
	        replace = options.replace,
	        computed = options.computed,
	        template = options.template,
	        watchers = options.watchers,
	        components = options.components,
	        directives = options.directives,
	        events = options.events,
	        filters = options.filters,
	        partials = options.partials;

	    // el 和 template 都可以传选择器

	    template = pattern.tag.test(template) ? template : (0, _helper.find)(template).innerHTML;

	    el = (0, _is.isString)(el) ? (0, _helper.find)(el) : el;

	    if (true) {
	      if (!el || el.nodeType !== 1) {
	        throw new Error('el must be a html element.');
	      }
	      if (props && (0, _is.isObject)(data)) {
	        throw new Error('component data must be a function.');
	      }
	    }

	    if (!replace) {
	      el.innerHTML = '<div></div>';
	      el = el.firstChild;
	    }

	    var instance = this;

	    if (parent) {
	      instance.$parent = parent;
	    }

	    // 拆分实例方法和生命周期函数
	    var hooks = {};
	    (0, _object.each)(lifecycle, function (name) {
	      hooks['on' + name] = name;
	    });

	    (0, _object.each)(options, function (value, key) {
	      if ((0, _is.isFunction)(value) && !hooks[key] && key !== 'data') {
	        instance[key] = value;
	      }
	    });

	    data = (0, _is.isFunction)(data) ? data.call(instance) : data;
	    if ((0, _is.isObject)(props)) {
	      (0, _object.extend)(data, props);
	    }
	    instance.$data = data;

	    if ((0, _is.isObject)(components)) {
	      instance.$components = components;
	    }
	    if ((0, _is.isObject)(directives)) {
	      instance.$directives = directives;
	    }
	    if ((0, _is.isObject)(filters)) {
	      instance.$filters = filters;
	    }
	    if ((0, _is.isObject)(partials)) {
	      instance.$partials = partials;
	    }

	    if ((0, _is.isObject)(computed)) {
	      (function () {

	        // 把计算属性拆为 getter 和 setter
	        var $computedGetters = instance.$computedGetters = {};

	        var $computedSetters = instance.$computedSetters = {};

	        // 存储计算属性的值，提升性能
	        var $computedCache = instance.$computedCache = {};

	        // 辅助获取计算属性的依赖
	        var $computedStack = instance.$computedStack = [];
	        // 计算属性的依赖关系
	        // dep => [ computed1, computed2, ... ]
	        var $computedWatchers = instance.$computedWatchers = {};
	        // computed => [ dep1, dep2, ... ]
	        var $computedDeps = instance.$computedDeps = {};

	        (0, _object.each)(computed, function (item, keypath) {
	          var get = void 0,
	              set = void 0,
	              cache = true;
	          if ((0, _is.isFunction)(item)) {
	            get = item;
	          } else if ((0, _is.isObject)(item)) {
	            if ((0, _object.has)(item, 'cache')) {
	              cache = item.cache;
	            }
	            if ((0, _is.isFunction)(item.get)) {
	              get = item.get;
	            }
	            if ((0, _is.isFunction)(item.set)) {
	              set = item.set;
	            }
	          }

	          if (get) {
	            var getter = function getter() {

	              if (cache && (0, _object.has)($computedCache, keypath)) {
	                return $computedCache[keypath];
	              }

	              // 新推一个依赖收集数组
	              $computedStack.push([]);
	              var result = get.call(instance);

	              // 处理收集好的依赖
	              var newDeps = $computedStack.pop();
	              var oldDeps = $computedDeps[keypath];
	              $computedDeps[keypath] = newDeps;

	              // 增加了哪些依赖，删除了哪些依赖
	              var addedDeps = [];
	              var removedDeps = [];
	              if ((0, _is.isArray)(oldDeps)) {
	                (0, _array.each)((0, _array.merge)(oldDeps, newDeps), function (dep) {
	                  var oldExisted = (0, _array.hasItem)(oldDeps, dep);
	                  var newExisted = (0, _array.hasItem)(newDeps, dep);
	                  if (oldExisted && !newExisted) {
	                    removedDeps.push(dep);
	                  } else if (!oldExisted && newExisted) {
	                    addedDeps.push(dep);
	                  }
	                });
	              } else {
	                addedDeps = newDeps;
	              }

	              (0, _array.each)(addedDeps, function (dep) {
	                if (!(0, _is.isArray)($computedWatchers[dep])) {
	                  $computedWatchers[dep] = [];
	                }
	                $computedWatchers[dep].push(keypath);
	              });

	              (0, _array.each)(removedDeps, function (dep) {
	                (0, _array.removeItem)($computedWatchers[dep], keypath);
	              });

	              // 不论是否开启 computed cache，获取 oldValue 时还有用
	              // 因此要存一下
	              $computedCache[keypath] = result;

	              return result;
	            };
	            // 当模板读取计算属性时，可通过 toString 求值
	            // 省的写一堆乱七八糟的判断逻辑
	            getter.toString = getter;
	            $computedGetters[keypath] = getter;
	          }

	          if (set) {
	            $computedSetters[keypath] = set.bind(instance);
	          }
	        });
	      })();
	    }

	    // 监听各种事件
	    instance.$eventEmitter = new _event.Emitter();

	    (0, _object.each)(hooks, function (value, key) {
	      if ((0, _is.isFunction)(options[key])) {
	        instance.on(value, options[key]);
	      }
	    });

	    hooks = null;

	    instance.fire(lifecycle.INIT);

	    if ((0, _is.isObject)(events)) {
	      (0, _object.each)(events, function (listener, type) {
	        if ((0, _is.isFunction)(listener)) {
	          instance.on(type, listener);
	        }
	      });
	    }

	    // 监听数据变化
	    instance.$watchEmitter = new _event.Emitter();

	    if ((0, _is.isObject)(watchers)) {
	      (0, _object.each)(watchers, function (watcher, keypath) {
	        instance.watch(keypath, watcher);
	      });
	    }

	    // 准备就绪
	    instance.fire(lifecycle.CREATE);

	    // 编译结果
	    instance.$template = (0, _mustache.parse)(template, function (name) {
	      return (0, _component.get)(instance, 'partial', name);
	    }, function (name, node) {
	      (0, _component.set)(instance, 'partial', name, node);
	    });

	    instance.fire(lifecycle.COMPILE);

	    instance.updateView(el);
	  }

	  /**
	   * 全局模板片段
	   *
	   * @type {Object}
	   */


	  /**
	   * 全局指令
	   *
	   * @type {Object}
	   */


	  _createClass(York, [{
	    key: 'get',
	    value: function get(keypath) {
	      var $data = this.$data,
	          $computedStack = this.$computedStack,
	          $computedGetters = this.$computedGetters;


	      if ((0, _is.isArray)($computedStack)) {
	        var deps = (0, _array.lastItem)($computedStack);
	        if (deps) {
	          deps.push(keypath);
	        }

	        var getter = $computedGetters[keypath];
	        if (getter) {
	          return getter();
	        }
	      }

	      var result = (0, _object.get)($data, keypath);
	      if (result) {
	        return result.value;
	      }
	    }
	  }, {
	    key: 'set',
	    value: function set(keypath, value) {
	      var model = keypath;
	      if ((0, _is.isString)(keypath)) {
	        model = {};
	        model[keypath] = value;
	      }
	      if (this.updateModel(model)) {
	        this.updateView();
	      }
	    }
	  }, {
	    key: 'on',
	    value: function on(type, listener) {
	      this.$eventEmitter.on(type, listener);
	    }
	  }, {
	    key: 'once',
	    value: function once(type, listener) {
	      this.$eventEmitter.once(type, listener);
	    }
	  }, {
	    key: 'off',
	    value: function off(type, listener) {
	      this.$eventEmitter.off(type, listener);
	    }
	  }, {
	    key: 'fire',
	    value: function fire(type, data) {
	      var args = [];
	      if (arguments.length === 2) {
	        args.push(data);
	      }
	      this.$eventEmitter.fire(type, args, this);
	    }
	  }, {
	    key: 'watch',
	    value: function watch(keypath, watcher) {
	      this.$watchEmitter.on(keypath, watcher);
	    }
	  }, {
	    key: 'watchOnce',
	    value: function watchOnce(keypath, watcher) {
	      this.$watchEmitter.once(keypath, watcher);
	    }
	  }, {
	    key: 'toggle',
	    value: function toggle(keypath) {
	      this.set(keypath, !this.get(keypath));
	    }
	  }, {
	    key: 'updateModel',
	    value: function updateModel(model) {

	      var instance = this;

	      var $data = instance.$data,
	          $watchEmitter = instance.$watchEmitter,
	          $computedCache = instance.$computedCache,
	          $computedWatchers = instance.$computedWatchers,
	          $computedSetters = instance.$computedSetters;


	      var hasComputed = (0, _is.isObject)($computedWatchers);

	      var changes = [];
	      var setter = void 0;
	      var oldValue = void 0;

	      (0, _object.each)(model, function (value, keypath) {
	        oldValue = instance.get(keypath);
	        if (value !== oldValue) {

	          changes.push({
	            keypath: keypath,
	            args: [value, oldValue]
	          });

	          if (hasComputed && (0, _is.isArray)($computedWatchers[keypath])) {
	            (0, _array.each)($computedWatchers[keypath], function (watcher) {
	              if ((0, _object.has)($computedCache, watcher)) {
	                delete $computedCache[watcher];
	              }
	            });
	          }

	          // 计算属性优先
	          if (hasComputed) {
	            setter = $computedSetters[keypath];
	            if (setter) {
	              setter(value);
	              return;
	            }
	          }

	          (0, _object.set)($data, keypath, value);
	        }
	      });

	      if (changes.length) {
	        (0, _array.each)(changes, function (item) {
	          var keypath = item.keypath,
	              args = item.args;

	          (0, _array.each)((0, _keypath.getWildcardMatches)(keypath), function (wildcardKeypath) {
	            $watchEmitter.fire(wildcardKeypath, (0, _array.merge)(args, (0, _keypath.getWildcardNames)(keypath, wildcardKeypath)), instance);
	          });
	        });
	        return true;
	      }
	    }
	  }, {
	    key: 'updateView',
	    value: function updateView(el) {

	      var instance = this;

	      var $data = instance.$data,
	          $filters = instance.$filters,
	          $template = instance.$template,
	          $currentNode = instance.$currentNode,
	          $computedGetters = instance.$computedGetters;


	      var context = {};

	      (0, _array.each)([globalFilters, $filters], function (item) {
	        if ((0, _is.isObject)(item)) {
	          (0, _object.extend)(context, (0, _component.bind)(instance, item));
	        }
	      });

	      (0, _array.each)([$data, $computedGetters], function (item) {
	        if ((0, _is.isObject)(item)) {
	          (0, _object.extend)(context, item);
	        }
	      });

	      var newNode = (0, _vdom.create)((0, _mustache.render)($template, context), instance);

	      if ($currentNode) {
	        $currentNode = (0, _vdom.patch)($currentNode, newNode);
	        instance.fire(lifecycle.UDPATE);
	      } else {
	        $currentNode = (0, _vdom.patch)(el, newNode);
	        instance.$el = $currentNode.elm;
	        instance.fire(lifecycle.ATTACH);
	      }

	      instance.$currentNode = $currentNode;
	    }
	  }, {
	    key: 'create',
	    value: function create(options, extra) {
	      options = (0, _object.extend)({}, options, extra);
	      options.parent = this;
	      return new York(options);
	    }
	  }, {
	    key: 'detach',
	    value: function detach() {
	      this.fire(lifecycle.DETACH);
	    }
	  }]);

	  return York;
	}(), _class.components = globalComponents, _class.directives = globalDirectives, _class.filters = globalFilters, _class.partials = globalPartials, _class.component = (0, _component.magic)(globalComponents), _class.directive = (0, _component.magic)(globalDirectives), _class.filter = (0, _component.magic)(globalFilters), _class.partial = (0, _component.magic)(globalPartials), _temp);

	/**
	 * [TODO]
	 * 1. snabbdom prop 和 attr 的区分
	 * 2. 组件之间的事件传递
	 * 3. Emitter 的事件广播、冒泡
	 * 4. 组件属性的组织形式（解决）
	 * 5. 计算属性是否可以 watch
	 * 6. 需要转义的文本节点如果出现在属性值里，是否需要 encode
	 * 7. 数组方法的劫持（不需要劫持，改完再 set 即可）
	 * 8. 属性延展（用 #each 遍历数据）
	 * 9. 报错信息完善
	 * 10. SEO友好
	 * 11. 计算属性的观测用 Emitter 是否更好？
	 * 12. keypath 还原
	 */

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	/**
	 * 组件名称 - 包含大写字母或连字符
	 *
	 * @type {RegExp}
	 */
	var componentName = exports.componentName = /[-A-Z]/;

	/**
	 * html 标签
	 *
	 * @type {RegExp}
	 */
	var tag = exports.tag = /<[^>]+>/;

	/**
	 * 自闭合的标签
	 *
	 * @type {RegExp}
	 */
	var selfClosingTagName = exports.selfClosingTagName = /input|img|br/i;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	/**
	 * 数据观测、事件和 watcher 都尚未初始化
	 *
	 * @type {string}
	 */
	var INIT = exports.INIT = 'init';

	/**
	 * 已创建数据绑定，计算属性，方法，watcher/事件回调。
	 * 但是还没有开始 DOM 编译，$el 还不存在。
	 *
	 * @type {string}
	 */
	var CREATE = exports.CREATE = 'create';

	/**
	 * 在编译结束后调用。此时所有的指令已生效，因而数据的变化将触发 DOM 更新
	 *
	 * @type {string}
	 */
	var COMPILE = exports.COMPILE = 'compile';

	var ATTACH = exports.ATTACH = 'attach';
	var UPDATE = exports.UPDATE = 'update';
	var DETACH = exports.DETACH = 'detach';

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.render = render;
	exports.parse = parse;

	var _cache = __webpack_require__(4);

	var cache = _interopRequireWildcard(_cache);

	var _syntax = __webpack_require__(5);

	var syntax = _interopRequireWildcard(_syntax);

	var _pattern = __webpack_require__(1);

	var pattern = _interopRequireWildcard(_pattern);

	var _Context = __webpack_require__(6);

	var _Context2 = _interopRequireDefault(_Context);

	var _Scanner = __webpack_require__(11);

	var _Scanner2 = _interopRequireDefault(_Scanner);

	var _Attribute = __webpack_require__(12);

	var _Attribute2 = _interopRequireDefault(_Attribute);

	var _Directive = __webpack_require__(16);

	var _Directive2 = _interopRequireDefault(_Directive);

	var _Each = __webpack_require__(17);

	var _Each2 = _interopRequireDefault(_Each);

	var _Element = __webpack_require__(18);

	var _Element2 = _interopRequireDefault(_Element);

	var _Else = __webpack_require__(19);

	var _Else2 = _interopRequireDefault(_Else);

	var _ElseIf = __webpack_require__(20);

	var _ElseIf2 = _interopRequireDefault(_ElseIf);

	var _Expression = __webpack_require__(21);

	var _Expression2 = _interopRequireDefault(_Expression);

	var _If = __webpack_require__(23);

	var _If2 = _interopRequireDefault(_If);

	var _Import = __webpack_require__(24);

	var _Import2 = _interopRequireDefault(_Import);

	var _Partial = __webpack_require__(25);

	var _Partial2 = _interopRequireDefault(_Partial);

	var _Text = __webpack_require__(22);

	var _Text2 = _interopRequireDefault(_Text);

	var _nodeType = __webpack_require__(13);

	var _is = __webpack_require__(9);

	var _array = __webpack_require__(10);

	var _string = __webpack_require__(26);

	var _expression = __webpack_require__(15);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var openingDelimiterPattern = /\{\{\s*/;
	var closingDelimiterPattern = /\s*\}\}/;

	var elementPattern = /<(?:\/)?[a-z]\w*/i;
	var elementEndPattern = /(?:\/)?>/;

	var attributeSuffixPattern = /^([^"']*)["']/;
	var attributePattern = /([-:@a-z0-9]+)(?:=(["'])(?:([^'"]*))?)?/i;
	var attributeValueStartPattern = /^=["']/;

	var parsers = [{
	  test: function test(source) {
	    return source.startsWith(syntax.EACH);
	  },
	  create: function create(source) {
	    var terms = source.substr(syntax.EACH.length).trim().split(':');
	    var name = terms[0].trim();
	    var index = void 0;
	    if (terms[1]) {
	      index = terms[1].trim();
	    }
	    return new _Each2.default(name, index);
	  }
	}, {
	  test: function test(source) {
	    return source.startsWith(syntax.IMPORT);
	  },
	  create: function create(source) {
	    var name = source.substr(syntax.IMPORT.length).trim();
	    if (name) {
	      return new _Import2.default(name);
	    }
	  }
	}, {
	  test: function test(source) {
	    return source.startsWith(syntax.PARTIAL);
	  },
	  create: function create(source) {
	    var name = source.substr(syntax.PARTIAL.length).trim();
	    if (name) {
	      return new _Partial2.default(name);
	    }
	    throw new Error('模板片段缺少名称');
	  }
	}, {
	  test: function test(source) {
	    return source.startsWith(syntax.IF);
	  },
	  create: function create(source) {
	    var expr = source.substr(syntax.IF.length).trim();
	    if (expr) {
	      return new _If2.default((0, _expression.parse)(expr));
	    }
	    throw new Error('if 缺少条件');
	  }
	}, {
	  test: function test(source) {
	    return source.startsWith(syntax.ELSE_IF);
	  },
	  create: function create(source, popStack) {
	    var expr = source.substr(syntax.ELSE_IF.length);
	    if (expr) {
	      popStack();
	      return new _ElseIf2.default((0, _expression.parse)(expr));
	    }
	    throw new Error('else if 缺少条件');
	  }
	}, {
	  test: function test(source) {
	    return source.startsWith(syntax.ELSE);
	  },
	  create: function create(source, popStack) {
	    popStack();
	    return new _Else2.default();
	  }
	}, {
	  test: function test(source) {
	    return true;
	  },
	  create: function create(source) {
	    var safe = true;
	    if (source.startsWith('{')) {
	      safe = false;
	      source = source.substr(1);
	    }
	    return new _Expression2.default((0, _expression.parse)(source), safe);
	  }
	}];

	var rootName = 'root';

	/**
	 * 把抽象语法树渲染成 Virtual DOM
	 *
	 * @param {Object} ast
	 * @param {Object} data
	 * @return {Object}
	 */
	function render(ast, data) {

	  var rootElement = new _Element2.default(rootName);
	  var rootContext = new _Context2.default(data);
	  var keys = [];

	  // 非转义插值需要解析模板字符串
	  var parseTemplate = function parseTemplate(template) {
	    return parse(template).children;
	  };
	  var renderAst = function renderAst(node) {
	    node.render(rootElement, rootContext, keys, parseTemplate);
	  };

	  if (ast.name === rootName) {
	    (0, _array.each)(ast.children, renderAst);
	  } else {
	    renderAst(ast);
	  }

	  var children = rootElement.children;

	  if (children.length !== 1 || children[0].type !== _nodeType.ELEMENT) {
	    throw new Error('组件有且只能有一个根元素');
	  }

	  return children[0];
	}

	/**
	 * 把模板解析为抽象语法树
	 *
	 * @param {string} template
	 * @param {Function} getPartial 当解析到 IMPORT 节点时，需要获取模板片段
	 * @param {Function} setPartial 当解析到 PARTIAL 节点时，需要注册模板片段
	 * @return {Object}
	 */
	function parse(template, getPartial, setPartial) {
	  var templateParseCache = cache.templateParseCache;


	  if (templateParseCache[template]) {
	    return templateParseCache[template];
	  }

	  var mainScanner = new _Scanner2.default(template),
	      helperScanner = new _Scanner2.default(),
	      rootNode = new _Element2.default(rootName),
	      currentNode = rootNode,
	      nodeStack = [],
	      node = void 0,
	      name = void 0,
	      content = void 0,
	      isComponent = void 0,
	      isSelfClosingTag = void 0,
	      match = void 0,
	      errorIndex = void 0;

	  var pushStack = function pushStack(node) {
	    nodeStack.push(currentNode);
	    currentNode = node;
	  };

	  var popStack = function popStack() {
	    currentNode = nodeStack.pop();
	    return currentNode;
	  };

	  var addChild = function addChild(node) {
	    var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'addChild';
	    var name = node.name,
	        type = node.type,
	        content = node.content,
	        children = node.children;


	    switch (type) {
	      case _nodeType.TEXT:
	        if ((0, _string.isBreakLine)(content)) {
	          return;
	        }
	        if (content = (0, _string.trimBreakline)(content)) {
	          node.content = content;
	        } else {
	          return;
	        }
	        break;

	      case _nodeType.ATTRIBUTE:
	        if (currentNode.attrs) {
	          action = 'addAttr';
	        }
	        break;

	      case _nodeType.DIRECTIVE:
	        if (currentNode.directives) {
	          action = 'addDirective';
	        }
	        break;

	      case _nodeType.IMPORT:
	        (0, _array.each)(getPartial(name).children, function (node) {
	          addChild(node);
	        });
	        return;

	      case _nodeType.PARTIAL:
	        setPartial(name, node);
	        pushStack(node);
	        return;

	    }

	    currentNode[action](node);

	    if (children) {
	      pushStack(node);
	    }
	  };

	  // 这个函数涉及分隔符和普通模板的深度解析
	  // 是最核心的函数
	  var parseContent = function parseContent(content, isAttributesParsing) {

	    helperScanner.reset(content);

	    while (helperScanner.hasNext()) {

	      // 分隔符之前的内容
	      content = helperScanner.nextBefore(openingDelimiterPattern);
	      helperScanner.nextAfter(openingDelimiterPattern);

	      if (content) {

	        // 支持以下 5 种 attribute
	        // name
	        // {{name}}
	        // name="value"
	        // name="{{value}}"
	        // {{name}}="{{value}}"

	        if (isAttributesParsing) {

	          // 当前节点是 ATTRIBUTE
	          // 表示至少已经有了属性名
	          if (currentNode.type === _nodeType.ATTRIBUTE) {

	            // 走进这里，只可能是以下几种情况
	            // 1. 属性名是字面量，属性值已包含表达式
	            // 2. 属性名是表达式，属性值不确定是否存在

	            // 当前属性的属性值是字面量结尾
	            if (currentNode.children.length) {
	              if (match = content.match(attributeSuffixPattern)) {
	                if (match[1]) {
	                  addChild(new _Text2.default(match[1]));
	                }
	                content = content.replace(attributeSuffixPattern, '');
	                popStack();
	              }
	            } else {
	              // 属性值开头部分是字面量
	              if (attributeValueStartPattern.test(content)) {
	                content = content.replace(attributeValueStartPattern, '');
	              }
	              // 没有属性值
	              else {
	                  popStack();
	                }
	            }
	          }

	          if (currentNode.type !== _nodeType.ATTRIBUTE) {
	            // 下一个属性的开始
	            while (match = attributePattern.exec(content)) {
	              content = content.substr(match.index + match[0].length);

	              name = match[1];

	              addChild(name.startsWith(syntax.DIRECTIVE_PREFIX) || name.startsWith(syntax.DIRECTIVE_EVENT_PREFIX) ? new _Directive2.default(name) : new _Attribute2.default(name));

	              if ((0, _is.isString)(match[3])) {
	                addChild(new _Text2.default(match[3]));
	                // 剩下的只可能是引号了
	                if (content) {
	                  popStack();
	                }
	                // else 可能跟了一个表达式
	              }
	              // 没有引号，即 checked、disabled 等
	              else if (!match[2]) {
	                  popStack();
	                }
	            }
	            content = '';
	          }
	        }

	        if (content) {
	          addChild(new _Text2.default(content));
	        }
	      }

	      // 分隔符之间的内容
	      content = helperScanner.nextBefore(closingDelimiterPattern);
	      helperScanner.nextAfter(closingDelimiterPattern);

	      if (content) {
	        if (content.charAt(0) === '/') {
	          popStack();
	        } else {
	          if (content.charAt(0) === '{' && helperScanner.charAt(0) === '}') {
	            helperScanner.forward(1);
	          }
	          (0, _array.each)(parsers, function (parser) {
	            if (parser.test(content)) {
	              node = parser.create(content, popStack);
	              if (isAttributesParsing && node.type === _nodeType.EXPRESSION && currentNode.type !== _nodeType.ATTRIBUTE) {
	                node = new _Attribute2.default(node);
	              }
	              addChild(node);
	              return false;
	            }
	          });
	        }
	      }
	    }
	  };

	  while (mainScanner.hasNext()) {
	    content = mainScanner.nextBefore(elementPattern);

	    if (content.trim()) {
	      // 处理标签之间的内容
	      parseContent(content);
	    }

	    // 接下来必须是 < 开头（标签）
	    // 如果不是标签，那就该结束了
	    if (mainScanner.charAt(0) !== '<') {
	      break;
	    }

	    errorIndex = mainScanner.pos;

	    // 结束标签
	    if (mainScanner.charAt(1) === '/') {
	      content = mainScanner.nextAfter(elementPattern);
	      name = content.substr(2);

	      if (mainScanner.charAt(0) !== '>') {
	        return (0, _string.parseError)(template, '结束标签缺少 >', errorIndex);
	      } else if (name !== currentNode.name) {
	        return (0, _string.parseError)(template, '开始标签和结束标签匹配失败', errorIndex);
	      }

	      popStack();
	      mainScanner.forward(1);
	    }
	    // 开始标签
	    else {
	        content = mainScanner.nextAfter(elementPattern);
	        name = content.substr(1);
	        isComponent = pattern.componentName.test(name);
	        isSelfClosingTag = isComponent || pattern.selfClosingTagName.test(name);

	        // 低版本浏览器不支持自定义标签，因此需要转成 div
	        addChild(new _Element2.default(isComponent ? 'div' : name, isComponent ? name : ''));

	        // 截取 <name 和 > 之间的内容
	        // 用于提取 attribute
	        content = mainScanner.nextBefore(elementEndPattern);
	        if (content) {
	          parseContent(content, true);
	        }

	        content = mainScanner.nextAfter(elementEndPattern);
	        if (!content) {
	          return (0, _string.parseError)(template, '标签缺少 >', errorIndex);
	        }

	        if (isComponent || isSelfClosingTag) {
	          popStack();
	        }
	      }
	  }

	  if (nodeStack.length) {
	    return (0, _string.parseError)(template, '节点没有正确的结束', errorIndex);
	  }

	  templateParseCache[template] = rootNode;

	  return rootNode;
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	// 提升性能用的 cache
	// 做成模块是为了给外部提供清除缓存的机会

	var templateParseCache = exports.templateParseCache = {};

	var expressionParseCache = exports.expressionParseCache = {};
	var expressionCompileCache = exports.expressionCompileCache = {};

	var keypathNormalizeCache = exports.keypathNormalizeCache = {};
	var keypathWildcardMatchesCache = exports.keypathWildcardMatchesCache = {};

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var IF = exports.IF = '#if';
	var ELSE = exports.ELSE = 'else';
	var ELSE_IF = exports.ELSE_IF = 'else if';
	var EACH = exports.EACH = '#each';
	var PARTIAL = exports.PARTIAL = '#partial';
	var IMPORT = exports.IMPORT = '>';
	var DIRECTIVE_PREFIX = exports.DIRECTIVE_PREFIX = '@';
	var DIRECTIVE_EVENT_PREFIX = exports.DIRECTIVE_EVENT_PREFIX = 'on-';

	var SPECIAL_EVENT = exports.SPECIAL_EVENT = '$event';
	var SPECIAL_KEYPATH = exports.SPECIAL_KEYPATH = '$keypath';

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _object = __webpack_require__(7);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	module.exports = function () {

	  /**
	   * @param {Object} data
	   * @param {?Context} parent
	   */
	  function Context(data, parent) {
	    _classCallCheck(this, Context);

	    this.data = data;
	    this.parent = parent;
	    this.cache = {
	      'this': data
	    };
	  }

	  _createClass(Context, [{
	    key: 'push',
	    value: function push(data) {
	      return new Context(data, this);
	    }
	  }, {
	    key: 'set',
	    value: function set(keypath, value) {
	      var data = this.data,
	          cache = this.cache;

	      if ((0, _object.has)(cache, keypath)) {
	        delete cache[keypath];
	      }
	      if (keypath.indexOf('.') > 0) {
	        var terms = keypath.split('.');
	        var prop = terms.pop();
	        var result = (0, _object.get)(data, terms.join('.'));
	        if (result) {
	          result.value[prop] = value;
	        }
	      } else {
	        data[keypath] = value;
	      }
	    }
	  }, {
	    key: 'get',
	    value: function get(keypath) {

	      var context = this;
	      var _context = context,
	          cache = _context.cache;

	      if (!(0, _object.has)(cache, keypath)) {
	        var result = void 0;
	        while (context) {
	          result = (0, _object.get)(context.data, keypath);
	          if (result) {
	            cache[keypath] = result.value;
	            break;
	          } else {
	            context = context.parent;
	          }
	        }
	      }

	      return cache[keypath];
	    }
	  }]);

	  return Context;
	}();

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.each = each;
	exports.count = count;
	exports.has = has;
	exports.extend = extend;
	exports.get = get;
	exports.set = set;

	var _toString = __webpack_require__(8);

	var _toString2 = _interopRequireDefault(_toString);

	var _is = __webpack_require__(9);

	var _array = __webpack_require__(10);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function each(object, callback) {
	  (0, _array.each)(Object.keys(object), function (key) {
	    return callback(object[key], key);
	  });
	}

	function count(object) {
	  return Object.keys(object).length;
	}

	function has(object, name) {
	  return object.hasOwnProperty(name);
	}

	function extend() {
	  var args = arguments;
	  var result = args[0];
	  for (var i = 1, len = args.length; i < len; i++) {
	    if ((0, _is.isObject)(args[i])) {
	      each(args[i], function (value, key) {
	        result[key] = value;
	      });
	    }
	  }
	  return result;
	}

	/**
	 * 返回需要区分是找不到还是值是 undefined
	 */
	function get(object, keypath) {
	  keypath = (0, _toString2.default)(keypath);

	  // object 的 key 可能是 'a.b.c' 这样的
	  // 如 data['a.b.c'] = 1 是一个合法赋值
	  if (has(object, keypath)) {
	    return {
	      value: object[keypath]
	    };
	  }
	  // 不能以 . 开头
	  if (keypath.indexOf('.') > 0) {
	    var list = keypath.split('.');
	    for (var i = 0, len = list.length; i < len && object; i++) {
	      if (i < len - 1) {
	        object = object[list[i]];
	      } else if (has(object, list[i])) {
	        return {
	          value: object[list[i]]
	        };
	      }
	    }
	  }
	}

	function set(object, keypath, value) {
	  var autoFill = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

	  keypath = (0, _toString2.default)(keypath);
	  if (keypath.indexOf('.') > 0) {
	    var originalObject = object;
	    var list = keypath.split('.');
	    var prop = list.pop();
	    (0, _array.each)(list, function (item, index) {
	      if (object[item]) {
	        object = object[item];
	      } else if (autoFill) {
	        object = object[item] = {};
	      } else {
	        object = null;
	        return false;
	      }
	    });
	    if (object && object !== originalObject) {
	      object[prop] = value;
	    }
	  } else {
	    object[keypath] = value;
	  }
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _is = __webpack_require__(9);

	module.exports = function toString(str) {
	  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

	  if ((0, _is.isString)(str)) {
	    return str;
	  }
	  if ((0, _is.isNumeric)(str)) {
	    return '' + str;
	  }
	  return defaultValue;
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.isFunction = isFunction;
	exports.isArray = isArray;
	exports.isObject = isObject;
	exports.isString = isString;
	exports.isNumber = isNumber;
	exports.isBoolean = isBoolean;
	exports.isNumeric = isNumeric;

	var toString = Object.prototype.toString;

	function is(arg, type) {
	  return toString.call(arg).toLowerCase() === '[object ' + type + ']';
	}

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isArray(arg) {
	  return is(arg, 'array');
	}

	function isObject(arg) {
	  if (!arg) {
	    return false;
	  }
	  // new String() 算 object
	  // 因此这里不能用 is 函数
	  return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object';
	}

	function isString(arg) {
	  return is(arg, 'string');
	}

	function isNumber(arg) {
	  return is(arg, 'number');
	}

	function isBoolean(arg) {
	  return is(arg, 'boolean');
	}

	function isNumeric(arg) {
	  return !isNaN(parseFloat(arg)) && isFinite(arg);
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.each = each;
	exports.reduce = reduce;
	exports.merge = merge;
	exports.toArray = toArray;
	exports.toObject = toObject;
	exports.indexOf = indexOf;
	exports.hasItem = hasItem;
	exports.lastItem = lastItem;
	exports.removeItem = removeItem;

	var _is = __webpack_require__(9);

	var slice = Array.prototype.slice;
	function each(array, callback) {
	  for (var i = 0, len = array.length; i < len; i++) {
	    if (callback(array[i], i) === false) {
	      break;
	    }
	  }
	}

	// array.reduce 如果是空数组，不传 initialValue 居然会报错，所以封装一下
	function reduce(array, callback) {
	  var initialValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

	  return array.reduce(callback, initialValue);
	}

	function merge() {
	  var result = [];
	  var push = function push(item) {
	    result.push(item);
	  };
	  each(arguments, function (array) {
	    each(array, push);
	  });
	  return result;
	}

	function toArray(array) {
	  try {
	    'length' in array;
	  } catch (e) {
	    return [];
	  }
	  return (0, _is.isArray)(array) ? array : slice.call(array);
	}

	function toObject(array, key) {
	  var result = {};
	  each(array, function (item) {
	    result[item[key]] = item;
	  });
	  return result;
	}

	function indexOf(array, item) {
	  var strict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	  if (strict) {
	    return array.indexOf(item);
	  } else {
	    var index = -1;
	    each(array, function (value, i) {
	      if (item == value) {
	        index = i;
	        return false;
	      }
	    });
	    return index;
	  }
	}

	function hasItem(array, item) {
	  var strict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	  return indexOf(array, item, strict) >= 0;
	}

	function lastItem(array) {
	  return array[array.length - 1];
	}

	function removeItem(array, item) {
	  var strict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	  var index = indexOf(array, item, strict);
	  if (index >= 0) {
	    array.splice(index, 1);
	  }
	}

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	module.exports = function () {
	  function Scanner(str) {
	    _classCallCheck(this, Scanner);

	    this.reset(str);
	  }

	  _createClass(Scanner, [{
	    key: 'reset',
	    value: function reset(str) {
	      this.pos = 0;
	      this.tail = str;
	    }

	    /**
	     * 扫描是否结束
	     *
	     * @return {boolean}
	     */

	  }, {
	    key: 'hasNext',
	    value: function hasNext() {
	      return this.tail;
	    }

	    /**
	     * 从剩下的字符串中尝试匹配 pattern
	     * pattern 必须位于字符串的开始位置
	     * 匹配成功后，位置修改为匹配结果之后
	     * 返回匹配字符串
	     *
	     * @param {RegExp} pattern
	     * @return {string}
	     */

	  }, {
	    key: 'nextAfter',
	    value: function nextAfter(pattern) {
	      var tail = this.tail;

	      var matches = tail.match(pattern);
	      if (!matches || matches.index) {
	        return '';
	      }
	      var result = matches[0];
	      this.forward(result.length);
	      return result;
	    }

	    /**
	     * 从剩下的字符串中尝试匹配 pattern
	     * pattern 不要求一定要位于字符串的开始位置
	     * 匹配成功后，位置修改为匹配结果之前
	     * 返回上次位置和当前位置之间的字符串
	     *
	     * @param {RegExp} pattern
	     * @return {string}
	     */

	  }, {
	    key: 'nextBefore',
	    value: function nextBefore(pattern) {
	      var pos = this.pos,
	          tail = this.tail;

	      var matches = tail.match(pattern);
	      if (matches) {
	        var index = matches.index;

	        if (!index) {
	          return '';
	        }
	        var result = tail.substr(0, index);
	        this.forward(index);
	        return result;
	      } else {
	        this.forward(tail.length);
	        return tail;
	      }
	    }
	  }, {
	    key: 'forward',
	    value: function forward(offset) {
	      this.pos += offset;
	      this.tail = this.tail.substr(offset);
	    }
	  }, {
	    key: 'charAt',
	    value: function charAt(index) {
	      return this.tail[index];
	    }
	  }]);

	  return Scanner;
	}();

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _nodeType = __webpack_require__(13);

	var _Node2 = __webpack_require__(14);

	var _Node3 = _interopRequireDefault(_Node2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * 属性节点
	 *
	 * @param {string} name 属性名
	 */
	module.exports = function (_Node) {
	  _inherits(Attribute, _Node);

	  function Attribute(name) {
	    _classCallCheck(this, Attribute);

	    var _this = _possibleConstructorReturn(this, (Attribute.__proto__ || Object.getPrototypeOf(Attribute)).call(this));

	    _this.type = _nodeType.ATTRIBUTE;
	    _this.name = name;
	    return _this;
	  }

	  _createClass(Attribute, [{
	    key: 'render',
	    value: function render(parent, context, keys, parseTemplate) {
	      var name = this.name;

	      if (name.type === _nodeType.EXPRESSION) {
	        name = name.execute(context);
	      }

	      var node = new Attribute(name);
	      node.keypath = keys.join('.');
	      parent.addAttr(node);

	      this.renderChildren(node, context, keys, parseTemplate);
	    }
	  }]);

	  return Attribute;
	}(_Node3.default);

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	/**
	 * if 节点
	 *
	 * @type {number}
	 */
	var IF = exports.IF = 1;

	/**
	 * else if 节点
	 *
	 * @type {number}
	 */
	var ELSE_IF = exports.ELSE_IF = 2;

	/**
	 * else 节点
	 *
	 * @type {number}
	 */
	var ELSE = exports.ELSE = 3;

	/**
	 * each 节点
	 *
	 * @type {number}
	 */
	var EACH = exports.EACH = 4;

	/**
	 * partial 节点
	 *
	 * @type {number}
	 */
	var PARTIAL = exports.PARTIAL = 5;

	/**
	 * import 节点
	 *
	 * @type {number}
	 */
	var IMPORT = exports.IMPORT = 6;

	/**
	 * 表达式 节点
	 *
	 * @type {number}
	 */
	var EXPRESSION = exports.EXPRESSION = 7;

	/**
	 * 指令 节点
	 *
	 * @type {number}
	 */
	var DIRECTIVE = exports.DIRECTIVE = 8;

	/**
	 * 元素 节点
	 *
	 * @type {number}
	 */
	var ELEMENT = exports.ELEMENT = 9;

	/**
	 * 属性 节点
	 *
	 * @type {number}
	 */
	var ATTRIBUTE = exports.ATTRIBUTE = 10;

	/**
	 * 文本 节点
	 *
	 * @type {number}
	 */
	var TEXT = exports.TEXT = 11;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _array = __webpack_require__(10);

	var _expression = __webpack_require__(15);

	var _nodeType = __webpack_require__(13);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * 节点基类
	 */
	module.exports = function () {
	  function Node() {
	    var hasChildren = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

	    _classCallCheck(this, Node);

	    if (hasChildren) {
	      this.children = [];
	    }
	  }

	  _createClass(Node, [{
	    key: 'addChild',
	    value: function addChild(node) {
	      var children = this.children;

	      if (node.type === _nodeType.TEXT) {
	        var lastChild = (0, _array.lastItem)(children);
	        if (lastChild && lastChild.type === _nodeType.TEXT) {
	          lastChild.content += node.content;
	          return;
	        }
	      }
	      children.push(node);
	    }
	  }, {
	    key: 'getValue',
	    value: function getValue() {
	      var children = this.children;

	      return children[0] ? children[0].content : true;
	    }
	  }, {
	    key: 'execute',
	    value: function execute(context) {
	      var content = (0, _expression.execute)((0, _expression.compile)(this.expr), context.data, function (name) {
	        return context.get(name);
	      });
	      if (content && content.toString) {
	        content = content.toString();
	      }
	      return content;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      // noop
	    }
	  }, {
	    key: 'renderChildren',
	    value: function renderChildren(parent, context, keys, parseTemplate, children) {
	      (0, _array.reduce)(children || this.children, function (prev, current) {
	        return current.render(parent, context, keys, parseTemplate, prev);
	      });
	    }
	  }]);

	  return Node;
	}();

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CALL = exports.CONDITIONAL = exports.BINARY = exports.UNARY = exports.MEMBER = exports.THIS = exports.IDENTIFIER = exports.ARRAY = exports.LITERAL = undefined;
	exports.parse = parse;
	exports.compile = compile;
	exports.execute = execute;
	exports.traverse = traverse;

	var _cache = __webpack_require__(4);

	var _array = __webpack_require__(10);

	var _is = __webpack_require__(9);

	/**
	 * 仅支持一句表达式，即不支持 `a + b, b + c`
	 */

	// 节点类型
	var LITERAL = exports.LITERAL = 1;
	var ARRAY = exports.ARRAY = 2;
	var IDENTIFIER = exports.IDENTIFIER = 3;
	var THIS = exports.THIS = 4;
	var MEMBER = exports.MEMBER = 5;
	var UNARY = exports.UNARY = 6;
	var BINARY = exports.BINARY = 7;
	var CONDITIONAL = exports.CONDITIONAL = 8;
	var CALL = exports.CALL = 9;

	// 分隔符
	var COMMA = 44; // ,
	var SEMCOL = 59; // ;
	var PERIOD = 46; // .
	var SQUOTE = 39; // '
	var DQUOTE = 34; // "
	var OPAREN = 40; // (
	var CPAREN = 41; // )
	var OBRACK = 91; // [
	var CBRACK = 93; // ]
	var QUMARK = 63; // ?
	var COLON = 58; // :

	var TRUE = true;
	var FALSE = false;
	var NULL = null;

	/**
	 * 倒排对象的 key
	 *
	 * @inner
	 * @param {Object} obj
	 * @return {Array.<string>}
	 */
	function sortKeys(obj) {
	  return Object.keys(obj).sort(function (a, b) {
	    return b.length - a.length;
	  });
	}

	// 用于判断是否是一元操作符
	var unaryOperatorMap = {
	  '+': TRUE,
	  '-': TRUE,
	  '!': TRUE,
	  '~': TRUE
	};

	var sortedUnaryOperatorList = sortKeys(unaryOperatorMap);

	// 操作符和对应的优先级，数字越大优先级越高
	var binaryOperatorMap = {
	  '||': 1,
	  '&&': 2,
	  '|': 3,
	  '^': 4,
	  '&': 5,
	  '==': 6,
	  '!=': 6,
	  '===': 6,
	  '!==': 6,
	  '<': 7,
	  '>': 7,
	  '<=': 7,
	  '>=': 7,
	  '<<': 8,
	  '>>': 8,
	  '>>>': 8,
	  '+': 9,
	  '-': 9,
	  '*': 10,
	  '/': 10,
	  '%': 10
	};

	var sortedBinaryOperatorList = sortKeys(binaryOperatorMap);

	// 区分关键字和普通变量
	// 举个例子：a === true
	// 从解析器的角度来说，a 和 true 是一样的 token
	var keywords = {
	  'true': TRUE,
	  'false': FALSE,
	  'null': NULL,
	  'undefined': undefined
	};

	/**
	 * 是否是数字
	 *
	 * @inner
	 * @param {string} charCode
	 * @return {boolean}
	 */
	function isNumber(charCode) {
	  return charCode >= 48 && charCode <= 57; // 0...9
	}

	/**
	 * 是否是空白符
	 *
	 * @inner
	 * @param {string} charCode
	 * @return {boolean}
	 */
	function isWhitespace(charCode) {
	  return charCode === 32 // space
	  || charCode === 9; // tab
	}

	/**
	 * 变量开始字符必须是 字母、下划线、$
	 *
	 * @inner
	 * @param {string} charCode
	 * @return {boolean}
	 */
	function isIdentifierStart(charCode) {
	  return charCode === 36 // $
	  || charCode === 95 // _
	  || charCode >= 97 && charCode <= 122 // a...z
	  || charCode >= 65 && charCode <= 90; // A...Z
	}

	/**
	 * 变量剩余的字符必须是 字母、下划线、$、数字
	 *
	 * @inner
	 * @param {string} charCode
	 * @return {boolean}
	 */
	function isIdentifierPart(charCode) {
	  return isIdentifierStart(charCode) || isNumber(charCode);
	}

	/**
	 * 用倒排 token 去匹配 content 的开始内容
	 *
	 * @inner
	 * @param {string} content
	 * @param {Array.<string>} sortedTokens 数组长度从大到小排序
	 * @return {string}
	 */
	function matchBestToken(content, sortedTokens) {
	  var result = void 0;
	  (0, _array.each)(sortedTokens, function (token) {
	    if (content.startsWith(token)) {
	      result = token;
	      return FALSE;
	    }
	  });
	  return result;
	}

	/**
	 * 懒得说各种细节错误，表达式都输出了看不出原因我也没办法
	 *
	 * @inner
	 * @param {string} expression
	 * @return {Error}
	 */
	function throwError(expression) {
	  throw new Error('Expression parse error: [' + expression + ']');
	}

	/**
	 * 创建一个三目运算
	 *
	 * @inner
	 * @param {Object} test
	 * @param {Object} consequent
	 * @param {Object} alternate
	 * @return {Object}
	 */
	function createConditional(test, consequent, alternate) {
	  return {
	    type: CONDITIONAL,
	    test: test,
	    consequent: consequent,
	    alternate: alternate
	  };
	}

	/**
	 * 创建一个二元表达式
	 *
	 * @inner
	 * @param {Object} right
	 * @param {string} operator
	 * @param {Object} left
	 * @return {Object}
	 */
	function createBinary(right, operator, left) {
	  return {
	    type: BINARY,
	    operator: operator,
	    left: left,
	    right: right
	  };
	}

	/**
	 * 创建一个一元表达式
	 *
	 * @inner
	 * @param {string} operator
	 * @param {Object} argument
	 * @return {Object}
	 */
	function createUnary(operator, argument) {
	  return {
	    type: UNARY,
	    operator: operator,
	    argument: argument
	  };
	}

	function createLiteral(value) {
	  return {
	    type: LITERAL,
	    value: value
	  };
	}

	function createIdentifier(name) {
	  return {
	    type: IDENTIFIER,
	    name: name
	  };
	}

	function createThis() {
	  return {
	    type: THIS
	  };
	}

	function createMember(object, property) {
	  return {
	    type: MEMBER,
	    object: object,
	    property: property
	  };
	}

	function createArray(elements) {
	  return {
	    type: ARRAY,
	    elements: elements
	  };
	}

	function createCall(callee, args) {
	  return {
	    type: CALL,
	    'arguments': args,
	    callee: callee
	  };
	}

	/**
	 * 表达式解析成抽象语法树
	 *
	 * @param {string} content 表达式字符串
	 * @return {Object}
	 */
	function parse(content) {
	  var length = content.length;

	  var index = 0;
	  var charCode = void 0;
	  var value = void 0;

	  function getChar() {
	    return content.charAt(index);
	  }
	  function getCharCode(i) {
	    return content.charCodeAt(i != NULL ? i : index);
	  }

	  function skipWhitespace() {
	    while (isWhitespace(getCharCode())) {
	      index++;
	    }
	  }

	  function skipNumber() {
	    while (isNumber(getCharCode())) {
	      index++;
	    }
	  }

	  function skipString() {
	    var closed = void 0,
	        quote = getCharCode();
	    index++;
	    while (index < length) {
	      index++;
	      if (getCharCode(index - 1) === quote) {
	        closed = TRUE;
	        break;
	      }
	    }
	    if (!closed) {
	      return throwError();
	    }
	  }

	  function skipIdentifier() {
	    // 第一个字符一定是经过 isIdentifierStart 判断的
	    // 因此循环至少要执行一次
	    do {
	      index++;
	    } while (isIdentifierPart(getCharCode()));
	  }

	  function parseNumber() {

	    var start = index;

	    skipNumber();
	    if (getCharCode() === PERIOD) {
	      index++;
	      skipNumber();
	    }

	    return createLiteral(parseFloat(content.substring(start, index)));
	  }

	  function parseString() {

	    var start = index;

	    skipString();

	    return createLiteral(content.substring(start + 1, index - 1));
	  }

	  function parseIdentifier() {

	    var start = index;
	    skipIdentifier();

	    value = content.substring(start, index);
	    if (keywords[value]) {
	      return createLiteral(keywords[value]);
	    } else if (value === 'this') {
	      return createThis();
	    }

	    return value ? createIdentifier(value) : throwError();
	  }

	  function parseTuple(delimiter) {

	    var args = [],
	        closed = void 0;

	    while (index < length) {
	      charCode = getCharCode();
	      if (charCode === delimiter) {
	        index++;
	        closed = TRUE;
	      } else if (charCode === COMMA) {
	        index++;
	      } else {
	        args.push(parseExpression());
	      }
	    }

	    return closed ? args : throwError();
	  }

	  function parseOperator(sortedOperatorList) {
	    skipWhitespace();
	    value = matchBestToken(content.substr(index), sortedOperatorList);
	    if (value) {
	      index += value.length;
	      return value;
	    }
	  }

	  function parseVariable() {

	    value = parseIdentifier();

	    while (index < length) {
	      // a(x)
	      charCode = getCharCode();
	      if (charCode === OPAREN) {
	        index++;
	        value = createCall(value, parseTuple(CPAREN));
	        break;
	      } else {
	        // a.x
	        if (charCode === PERIOD) {
	          index++;
	          value = createMember(value, createLiteral(parseIdentifier().name));
	        }
	        // a[x]
	        else if (charCode === OBRACK) {
	            index++;
	            value = createMember(value, parseSubexpression(CBRACK));
	          } else {
	            break;
	          }
	      }
	    }

	    return value;
	  }

	  function parseToken() {
	    skipWhitespace();

	    charCode = getCharCode();
	    // 'xx' 或 "xx"
	    if (charCode === SQUOTE || charCode === DQUOTE) {
	      return parseString();
	    }
	    // 1.1 或 .1
	    else if (isNumber(charCode) || charCode === PERIOD) {
	        return parseNumber();
	      }
	      // [xx, xx]
	      else if (charCode === OBRACK) {
	          index++;
	          return createArray(parseTuple(CBRACK));
	        }
	        // (xx, xx)
	        else if (charCode === OPAREN) {
	            index++;
	            return parseSubexpression(CPAREN);
	          } else if (isIdentifierStart(charCode)) {
	            return parseVariable();
	          }
	    value = parseOperator(sortedUnaryOperatorList);
	    return value ? parseUnary(value) : throwError();
	  }

	  function parseUnary(operator) {
	    value = parseToken();
	    if (!value) {
	      return throwError();
	    }
	    return createUnary(operator, value);
	  }

	  function parseBinary() {

	    var left = parseToken();
	    var operator = parseOperator(sortedBinaryOperatorList);
	    if (!operator) {
	      return left;
	    }

	    var right = parseToken();
	    var stack = [left, operator, binaryOperatorMap[operator], right];

	    while (operator = parseOperator(sortedBinaryOperatorList)) {

	      // 处理左边
	      if (stack.length > 3 && binaryOperatorMap[operator] < stack[stack.length - 2]) {
	        stack.push(createBinary(stack.pop(), (stack.pop(), stack.pop()), stack.pop()));
	      }

	      right = parseToken();
	      if (!right) {
	        return throwError();
	      }
	      stack.push(operator, binaryOperatorMap[operator], right);
	    }

	    // 处理右边
	    // 右边只有等到所有 token 解析完成才能开始
	    // 比如 a + b * c / d
	    // 此时右边的优先级 >= 左边的优先级，因此可以脑残的直接逆序遍历

	    right = stack.pop();
	    while (stack.length > 1) {
	      right = createBinary(right, (stack.pop(), stack.pop()), stack.pop());
	    }

	    return right;
	  }

	  // (xx) 和 [xx] 都可能是子表达式，因此
	  function parseSubexpression(delimiter) {
	    value = parseExpression();
	    if (getCharCode() === delimiter) {
	      index++;
	      return value;
	    } else {
	      return throwError();
	    }
	  }

	  function parseExpression() {

	    // 主要是区分三元和二元表达式
	    // 三元表达式可以认为是 3 个二元表达式组成的
	    // test ? consequent : alternate

	    var test = parseBinary();

	    skipWhitespace();
	    if (getCharCode() === QUMARK) {
	      index++;

	      var consequent = parseBinary();

	      skipWhitespace();
	      if (getCharCode() === COLON) {
	        index++;

	        var alternate = parseBinary();

	        // 保证调用 parseExpression() 之后无需再次调用 skipWhitespace()
	        skipWhitespace();
	        return createConditional(test, consequent, alternate);
	      } else {
	        return throwError();
	      }
	    }

	    return test;
	  }

	  if (!_cache.expressionParseCache[content]) {
	    var node = parseExpression();
	    node.$raw = content;
	    _cache.expressionParseCache[content] = node;
	  }

	  return _cache.expressionParseCache[content];
	}

	/**
	 * 创建一个可执行的函数来运行该代码，为了支持表达式中的 this，调用函数时应用 fn.apply(context, args)
	 *
	 * @param {string|Object} ast
	 * @return {Function}
	 */
	function compile(ast) {

	  var content = void 0;

	  if ((0, _is.isString)(ast)) {
	    content = ast;
	    ast = parse(content);
	  } else if (ast) {
	    content = ast.$raw;
	  }

	  if (!_cache.expressionCompileCache[content]) {
	    (function () {
	      var args = [];

	      traverse(ast, {
	        enter: function enter(node) {
	          if (node.type === IDENTIFIER) {
	            args.push(node.name);
	          }
	        }
	      });

	      var fn = new Function(args.join(', '), 'return ' + content);
	      fn.$arguments = args;
	      _cache.expressionCompileCache[content] = fn;
	    })();
	  }

	  return _cache.expressionCompileCache[content];
	}

	/**
	 * 执行表达式
	 */
	function execute(compileResult, context, getArg) {
	  var args = compileResult.$arguments.map(getArg);
	  return compileResult.apply(context, args);
	}

	/**
	 * 遍历抽象语法树
	 *
	 * @param {Object} ast
	 * @param {Function?} options.enter
	 * @param {Function?} options.leave
	 */
	function traverse(ast) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


	  // enter 返回 false 可阻止继续遍历
	  if ((0, _is.isFunction)(options.enter) && options.enter(ast) === FALSE) {
	    return;
	  }

	  switch (ast.type) {

	    case CONDITIONAL:
	      traverse(ast.test, options);
	      traverse(ast.consequent, options);
	      traverse(ast.alternate, options);
	      break;

	    case BINARY:
	      traverse(ast.left, options);
	      traverse(ast.right, options);
	      break;

	    case UNARY:
	      traverse(ast.argument, options);
	      break;

	    case MEMBER:
	      traverse(ast.object, options);
	      traverse(ast.property, options);
	      break;

	    case MEMBER:
	      traverse(ast.object, options);
	      traverse(ast.property, options);
	      break;

	    case CALL:
	      traverse(ast.callee, options);
	      (0, _array.each)(ast.arguments, function (arg) {
	        traverse(arg, options);
	      });
	      break;

	    case ARRAY:
	      (0, _array.each)(ast.elements, function (element) {
	        traverse(element, options);
	      });
	      break;

	  }

	  if ((0, _is.isFunction)(options.leave)) {
	    options.leave(ast);
	  }
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _nodeType = __webpack_require__(13);

	var _Node2 = __webpack_require__(14);

	var _Node3 = _interopRequireDefault(_Node2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * 指令节点
	 *
	 * on-click="submit()"
	 *
	 * @param {string} name 指令名
	 */
	module.exports = function (_Node) {
	  _inherits(Directive, _Node);

	  function Directive(name) {
	    _classCallCheck(this, Directive);

	    var _this = _possibleConstructorReturn(this, (Directive.__proto__ || Object.getPrototypeOf(Directive)).call(this));

	    _this.type = _nodeType.DIRECTIVE;
	    _this.name = name;
	    return _this;
	  }

	  _createClass(Directive, [{
	    key: 'render',
	    value: function render(parent, context, keys, parseTemplate) {

	      var node = new Directive(this.name);
	      node.keypath = keys.join('.');
	      parent.addDirective(node);

	      this.renderChildren(node, context, keys, parseTemplate);
	    }
	  }]);

	  return Directive;
	}(_Node3.default);

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _nodeType = __webpack_require__(13);

	var _Node2 = __webpack_require__(14);

	var _Node3 = _interopRequireDefault(_Node2);

	var _is = __webpack_require__(9);

	var _array = __webpack_require__(10);

	var _object = __webpack_require__(7);

	var _syntax = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * each 节点
	 *
	 * {{ #each name:index }}
	 *
	 * @param {string} literal 字面量，如 list:index
	 */
	module.exports = function (_Node) {
	  _inherits(Each, _Node);

	  function Each(name, index) {
	    _classCallCheck(this, Each);

	    var _this = _possibleConstructorReturn(this, (Each.__proto__ || Object.getPrototypeOf(Each)).call(this));

	    _this.type = _nodeType.EACH;
	    _this.name = name;
	    _this.index = index;
	    return _this;
	  }

	  _createClass(Each, [{
	    key: 'render',
	    value: function render(parent, context, keys, parseTemplate) {

	      var instance = this;
	      var name = instance.name,
	          index = instance.index;

	      var data = context.get(name);

	      var each = void 0;
	      if ((0, _is.isArray)(data)) {
	        each = _array.each;
	      } else if ((0, _is.isObject)(data)) {
	        each = _object.each;
	      }

	      if (each) {
	        keys.push(name);
	        each(data, function (item, i) {
	          if (index) {
	            context.set(index, i);
	          }
	          keys.push(i);
	          context.set(_syntax.SPECIAL_KEYPATH, keys.join('.'));
	          instance.renderChildren(parent, context.push(item), keys, parseTemplate);
	          keys.pop();
	        });
	        keys.pop();
	      }
	    }
	  }]);

	  return Each;
	}(_Node3.default);

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _nodeType = __webpack_require__(13);

	var _Node2 = __webpack_require__(14);

	var _Node3 = _interopRequireDefault(_Node2);

	var _array = __webpack_require__(10);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * 元素节点
	 *
	 * @param {string} name
	 */
	module.exports = function (_Node) {
	  _inherits(Element, _Node);

	  function Element(name, custom) {
	    _classCallCheck(this, Element);

	    var _this = _possibleConstructorReturn(this, (Element.__proto__ || Object.getPrototypeOf(Element)).call(this));

	    _this.type = _nodeType.ELEMENT;
	    _this.name = name;
	    _this.custom = custom;
	    _this.attrs = [];
	    _this.directives = [];
	    return _this;
	  }

	  _createClass(Element, [{
	    key: 'addAttr',
	    value: function addAttr(node) {
	      this.attrs.push(node);
	    }
	  }, {
	    key: 'addDirective',
	    value: function addDirective(node) {
	      this.directives.push(node);
	    }
	  }, {
	    key: 'getAttributes',
	    value: function getAttributes() {
	      var result = {};
	      (0, _array.each)(this.attrs, function (node) {
	        result[node.name] = node.getValue();
	      });
	      return result;
	    }
	  }, {
	    key: 'render',
	    value: function render(parent, context, keys, parseTemplate) {

	      var instance = this;
	      var node = new Element(instance.name, instance.custom);
	      node.keypath = keys.join('.');
	      parent.addChild(node);

	      instance.renderChildren(node, context, keys, parseTemplate, instance.attrs);
	      instance.renderChildren(node, context, keys, parseTemplate, instance.directives);
	      instance.renderChildren(node, context, keys, parseTemplate);
	    }
	  }]);

	  return Element;
	}(_Node3.default);

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _nodeType = __webpack_require__(13);

	var _Node2 = __webpack_require__(14);

	var _Node3 = _interopRequireDefault(_Node2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * else 节点
	 */
	module.exports = function (_Node) {
	  _inherits(Else, _Node);

	  function Else() {
	    _classCallCheck(this, Else);

	    var _this = _possibleConstructorReturn(this, (Else.__proto__ || Object.getPrototypeOf(Else)).call(this));

	    _this.type = _nodeType.ELSE;
	    return _this;
	  }

	  _createClass(Else, [{
	    key: 'render',
	    value: function render(parent, context, keys, parseTemplate, prev) {
	      if (prev) {
	        this.renderChildren(parent, context, keys, parseTemplate);
	      }
	    }
	  }]);

	  return Else;
	}(_Node3.default);

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _nodeType = __webpack_require__(13);

	var _Node2 = __webpack_require__(14);

	var _Node3 = _interopRequireDefault(_Node2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * else if 节点
	 *
	 * @param {string} expr 判断条件
	 */
	module.exports = function (_Node) {
	  _inherits(ElseIf, _Node);

	  function ElseIf(expr) {
	    _classCallCheck(this, ElseIf);

	    var _this = _possibleConstructorReturn(this, (ElseIf.__proto__ || Object.getPrototypeOf(ElseIf)).call(this));

	    _this.type = _nodeType.ELSE_IF;
	    _this.expr = expr;
	    return _this;
	  }

	  _createClass(ElseIf, [{
	    key: 'render',
	    value: function render(parent, context, keys, parseTemplate, prev) {
	      if (prev) {
	        if (this.execute(context)) {
	          this.renderChildren(parent, context, keys, parseTemplate);
	        } else {
	          return prev;
	        }
	      }
	    }
	  }]);

	  return ElseIf;
	}(_Node3.default);

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _nodeType = __webpack_require__(13);

	var _Node2 = __webpack_require__(14);

	var _Node3 = _interopRequireDefault(_Node2);

	var _Text = __webpack_require__(22);

	var _Text2 = _interopRequireDefault(_Text);

	var _pattern = __webpack_require__(1);

	var pattern = _interopRequireWildcard(_pattern);

	var _array = __webpack_require__(10);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * 表达式节点
	 *
	 * @param {string} expr
	 * @param {boolean} safe
	 */
	module.exports = function (_Node) {
	  _inherits(Expression, _Node);

	  function Expression(expr, safe) {
	    _classCallCheck(this, Expression);

	    var _this = _possibleConstructorReturn(this, (Expression.__proto__ || Object.getPrototypeOf(Expression)).call(this, false));

	    _this.type = _nodeType.EXPRESSION;
	    _this.expr = expr;
	    _this.safe = safe;
	    return _this;
	  }

	  _createClass(Expression, [{
	    key: 'render',
	    value: function render(parent, context, keys, parseTemplate) {

	      var content = this.execute(context);
	      if (content == null) {
	        content = '';
	      }

	      if (this.safe || !pattern.tag.test(content)) {
	        var node = new _Text2.default(content);
	        node.render(parent, context, keys);
	      } else {
	        (0, _array.each)(parseTemplate(content), function (node) {
	          node.render(parent, context, keys, parseTemplate);
	        });
	      }
	    }
	  }]);

	  return Expression;
	}(_Node3.default);

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _nodeType = __webpack_require__(13);

	var _Node2 = __webpack_require__(14);

	var _Node3 = _interopRequireDefault(_Node2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * 文本节点
	 *
	 * @param {string} content
	 */
	module.exports = function (_Node) {
	  _inherits(Text, _Node);

	  function Text(content) {
	    _classCallCheck(this, Text);

	    var _this = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, false));

	    _this.type = _nodeType.TEXT;
	    _this.content = content;
	    return _this;
	  }

	  _createClass(Text, [{
	    key: 'render',
	    value: function render(parent, context, keys) {
	      var node = new Text(this.content);
	      node.keypath = keys.join('.');
	      parent.addChild(node);
	    }
	  }]);

	  return Text;
	}(_Node3.default);

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _nodeType = __webpack_require__(13);

	var _Node2 = __webpack_require__(14);

	var _Node3 = _interopRequireDefault(_Node2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * if 节点
	 *
	 * @param {string} expr 判断条件
	 */
	module.exports = function (_Node) {
	  _inherits(If, _Node);

	  function If(expr) {
	    _classCallCheck(this, If);

	    var _this = _possibleConstructorReturn(this, (If.__proto__ || Object.getPrototypeOf(If)).call(this));

	    _this.type = _nodeType.IF;
	    _this.expr = expr;
	    return _this;
	  }

	  _createClass(If, [{
	    key: 'render',
	    value: function render(parent, context, keys, parseTemplate) {

	      // if 是第一个条件判断
	      // 当它不满足条件，表示需要跟进后续的条件分支
	      // 这里用到 reduce 的机制非常合适
	      // 即如果前一个分支不满足，返回 true，告知后续的要执行
	      if (this.execute(context)) {
	        this.renderChildren(parent, context, keys, parseTemplate);
	      } else {
	        return true;
	      }
	    }
	  }]);

	  return If;
	}(_Node3.default);

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _nodeType = __webpack_require__(13);

	var _Node2 = __webpack_require__(14);

	var _Node3 = _interopRequireDefault(_Node2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * import 节点
	 *
	 * @param {string} name
	 */
	module.exports = function (_Node) {
	  _inherits(Import, _Node);

	  function Import(name) {
	    _classCallCheck(this, Import);

	    var _this = _possibleConstructorReturn(this, (Import.__proto__ || Object.getPrototypeOf(Import)).call(this, false));

	    _this.type = _nodeType.IMPORT;
	    _this.name = name;
	    return _this;
	  }

	  return Import;
	}(_Node3.default);

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _nodeType = __webpack_require__(13);

	var _Node2 = __webpack_require__(14);

	var _Node3 = _interopRequireDefault(_Node2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * partial 节点
	 *
	 * @param {string} name
	 */
	module.exports = function (_Node) {
	  _inherits(Partial, _Node);

	  function Partial(name) {
	    _classCallCheck(this, Partial);

	    var _this = _possibleConstructorReturn(this, (Partial.__proto__ || Object.getPrototypeOf(Partial)).call(this));

	    _this.type = _nodeType.PARTIAL;
	    _this.name = name;
	    return _this;
	  }

	  return Partial;
	}(_Node3.default);

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isBreakLine = isBreakLine;
	exports.trimBreakline = trimBreakline;
	exports.parseError = parseError;

	var _print = __webpack_require__(27);

	var _print2 = _interopRequireDefault(_print);

	var _getLocationByIndex2 = __webpack_require__(28);

	var _getLocationByIndex3 = _interopRequireDefault(_getLocationByIndex2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var breaklinePrefixPattern = /^[ \t]*\n/;
	var breaklineSuffixPattern = /\n[ \t]*$/;

	function isBreakLine(str) {
	  return str.indexOf('\n') >= 0 && !str.trim();
	}

	function trimBreakline(str) {
	  return str.replace(breaklinePrefixPattern, '').replace(breaklineSuffixPattern, '');
	}

	function parseError(str, errorMsg, errorIndex) {
	  if (errorIndex == null) {
	    errorMsg += '.';
	  } else {
	    errorMsg += ', at line %d, col %d.';

	    var _getLocationByIndex = (0, _getLocationByIndex3.default)(str, errorIndex),
	        line = _getLocationByIndex.line,
	        col = _getLocationByIndex.col;

	    errorMsg = (0, _print2.default)(errorMsg, line, col);
	  }
	  throw new Error(errorMsg);
	}

/***/ },
/* 27 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function print(tpl) {
	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }

	  var index = -1;
	  return tpl.replace(/%s/g, function (origin) {
	    index++;
	    if (args[index] != null) {
	      return args[index];
	    }
	    return origin;
	  });
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _array = __webpack_require__(10);

	module.exports = function getLocationByIndex(str, index) {

	  var line = 0;
	  var col = 0;

	  var pos = 0;

	  (0, _array.each)(str.split('\n'), function (lineStr) {
	    line++;
	    col = 0;

	    var length = lineStr.length;

	    if (index >= pos && index <= pos + length) {
	      col = index - pos;
	      return false;
	    }

	    pos += length;
	  });

	  return {
	    line: line,
	    col: col
	  };
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Emitter = exports.Event = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _is = __webpack_require__(9);

	var _array = __webpack_require__(10);

	var _object = __webpack_require__(7);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Event = exports.Event = function () {
	  function Event(event) {
	    _classCallCheck(this, Event);

	    if (event.type) {
	      this.type = event.type;
	      this.originalEvent = event;
	    } else {
	      this.type = event;
	    }
	  }

	  _createClass(Event, [{
	    key: 'prevent',
	    value: function prevent() {
	      if (!this.isPrevented) {
	        var originalEvent = this.originalEvent;

	        if (originalEvent && (0, _is.isFunction)(originalEvent.preventDefault)) {
	          originalEvent.preventDefault();
	        }
	        this.isPrevented = true;
	      }
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      if (!this.isStoped) {
	        var originalEvent = this.originalEvent;

	        if (originalEvent && (0, _is.isFunction)(originalEvent.stopPropagation)) {
	          originalEvent.stopPropagation();
	        }
	        this.isStoped = true;
	      }
	    }
	  }]);

	  return Event;
	}();

	var Emitter = exports.Emitter = function () {
	  function Emitter() {
	    _classCallCheck(this, Emitter);

	    this.listeners = {};
	  }

	  _createClass(Emitter, [{
	    key: 'on',
	    value: function on(type, listener) {
	      var listeners = this.listeners;

	      var list = listeners[type] || (listeners[type] = []);
	      list.push(listener);
	    }
	  }, {
	    key: 'once',
	    value: function once(type, listener) {
	      var instance = this;
	      listener.$once = function () {
	        instance.off(type, listener);
	        delete listener.$once;
	      };
	      instance.on(type, listener);
	    }
	  }, {
	    key: 'off',
	    value: function off(type, listener) {
	      var listeners = this.listeners;

	      if (type == null) {
	        (0, _object.each)(listeners, function (list, type) {
	          if ((0, _is.isArray)(listeners[type])) {
	            listeners[type].length = 0;
	          }
	        });
	      } else {
	        var list = listeners[type];
	        if ((0, _is.isArray)(list)) {
	          if (listener == null) {
	            list.length = 0;
	          } else {
	            (0, _array.removeItem)(list, listener);
	          }
	        }
	      }
	    }
	  }, {
	    key: 'fire',
	    value: function fire(type, data) {
	      var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;


	      var list = this.listeners[type];
	      if ((0, _is.isArray)(list)) {
	        (0, _array.each)(list, function (listener) {
	          var result = listener.apply(context, data);

	          var $once = listener.$once;

	          if ((0, _is.isFunction)($once)) {
	            $once();
	          }

	          // 如果没有返回 false，而是调用了 event.stop 也算是返回 false
	          var event = data[0];
	          if (event && event instanceof Event) {
	            if (result === false) {
	              event.prevent();
	              event.stop();
	            } else if (event.isStoped) {
	              result = false;
	            }
	          }

	          if (result === false) {
	            return result;
	          }
	        });
	      }
	    }
	  }, {
	    key: 'has',
	    value: function has(type, listener) {
	      var list = this.listeners[type];
	      if (listener == null) {
	        // 是否注册过 type 事件
	        return (0, _is.isArray)(list) && list.length > 0;
	      }
	      return (0, _is.isArray)(list) ? (0, _array.hasItem)(list, listener) : false;
	    }
	  }]);

	  return Emitter;
	}();

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.normalize = normalize;
	exports.stringify = stringify;
	exports.getWildcardMatches = getWildcardMatches;
	exports.getWildcardNames = getWildcardNames;

	var _cache = __webpack_require__(4);

	var cache = _interopRequireWildcard(_cache);

	var _array = __webpack_require__(10);

	var _expression = __webpack_require__(15);

	var _pattern = __webpack_require__(31);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	/**
	 * 把 obj['name'] 的形式转成 obj.name
	 *
	 * @param {string} keypath
	 * @return {string}
	 */
	function normalize(keypath) {
	  var keypathNormalizeCache = cache.keypathNormalizeCache;


	  if (!keypathNormalizeCache[keypath]) {
	    keypathNormalizeCache[keypath] = keypath.indexOf('[') < 0 ? keypath : stringify((0, _expression.parse)(keypath));
	  }

	  return keypathNormalizeCache[keypath];
	}

	/**
	 * 把 member 表达式节点解析成 keypath
	 *
	 * @param {Object} node
	 * @return {string}
	 */
	function stringify(node) {
	  var result = [];
	  do {
	    if (node.property) {
	      result.push(node.property.value);
	    } else if (node.name) {
	      result.push(node.name);
	    }
	  } while (node = node.object);
	  return result.reverse().join('.');
	}

	/**
	 * 获取可能的 keypath
	 *
	 * @param {string} keypath
	 * @return {string}
	 */
	function getWildcardMatches(keypath) {
	  var keypathWildcardMatchesCache = cache.keypathWildcardMatchesCache;


	  if (!keypathWildcardMatchesCache[keypath]) {
	    (function () {
	      var result = [];
	      var terms = normalize(keypath).split('.');
	      var toWildcard = function toWildcard(isTrue, index) {
	        return isTrue ? '*' : terms[index];
	      };
	      (0, _array.each)(getBoolCombinations(terms.length), function (items) {
	        result.push(items.map(toWildcard).join('.'));
	      });
	      keypathWildcardMatchesCache[keypath] = result;
	    })();
	  }

	  return keypathWildcardMatchesCache[keypath];
	}

	/**
	 * 匹配通配符中的具体名称，如 ('user.name', 'user.*') 返回 ['name']
	 *
	 * @param {string} keypath
	 * @param {string} wildcardKeypath
	 * @return {Array.<string>}
	 */
	function getWildcardNames(keypath, wildcardKeypath) {

	  var result = [];
	  if (wildcardKeypath.indexOf('*') < 0) {
	    return result;
	  }

	  var list = keypath.split('.');
	  (0, _array.each)(wildcardKeypath.split('.'), function (name, index) {
	    if (name === '*') {
	      result.push(list[index]);
	    }
	  });

	  return result;
	}

	function getBoolCombinations(num) {
	  var result = [];
	  var toBool = function toBool(value) {
	    return value == 1;
	  };
	  var length = parseInt(new Array(num + 1).join('1'), 2);
	  for (var i = 0, binary, j, item; i <= length; i++) {
	    // 补零
	    binary = i.toString(2);
	    if (binary.length < num) {
	      binary = '0' + binary;
	    }
	    // 把 binary 转成布尔值表示
	    item = [];
	    for (j = 0; j < num; j++) {
	      item.push(toBool(binary[j]));
	    }
	    result.push(item);
	  }
	  return result;
	}

/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.escape = escape;
	exports.parse = parse;
	function escape(str) {
	  return str.replace(/[-^$+?*.|\/\\(){}\[\]]/g, '\\$&');
	}

	function parse(str, flag) {
	  var Class = RegExp;
	  if (str instanceof Class) {
	    return str;
	  }
	  return flag ? new Class(escape(str), flag) : new Class(escape(str));
	}

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.bind = bind;
	exports.magic = magic;
	exports.testKeypath = testKeypath;
	exports.get = get;
	exports.set = set;

	var _object = __webpack_require__(7);

	function bind(instance, functions) {
	  var result = {};
	  (0, _object.each)(functions, function (fn, name) {
	    result[name] = fn.bind(instance);
	  });
	  return result;
	}

	function magic(object, name, value) {
	  return function (name, value) {
	    if (value) {
	      object[name] = value;
	    } else {
	      if (isObject(name)) {
	        (0, _object.each)(name, function (value, name) {
	          object[name] = value;
	        });
	      } else {
	        return object[name];
	      }
	    }
	  };
	}

	function testKeypath(instance, keypath, name) {

	  var terms = keypath ? keypath.split('.') : [];
	  if (!name) {
	    name = terms.pop();
	  }

	  var data = instance.$data,
	      result = void 0;

	  do {
	    terms.push(name);
	    keypath = terms.join('.');
	    result = (0, _object.get)(data, keypath);
	    if (result) {
	      return {
	        keypath: keypath,
	        value: result.value
	      };
	    }
	    terms.splice(-2);
	  } while (terms.length);
	}

	function get(instance, type, name) {
	  var staticProp = type + 's',
	      instanceProp = '$' + staticProp;
	  if (instance[instanceProp] && (0, _object.has)(instance[instanceProp], name)) {
	    return instance[instanceProp][name];
	  } else if ((0, _object.has)(instance.constructor[staticProp], name)) {
	    return instance.constructor[staticProp][name];
	  } else {
	    throw new Error(name + ' ' + type + ' is not found.');
	  }
	}

	function set(instance, type, name, value) {
	  var prop = '$' + type + 's';
	  if (!instance[prop]) {
	    instance[prop] = {};
	  }
	  instance[prop][name] = value;
	}

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.on = on;
	exports.off = off;
	exports.find = find;
	exports.parseStyle = parseStyle;

	var _env = __webpack_require__(34);

	var _event = __webpack_require__(29);

	var _array = __webpack_require__(10);

	var _object = __webpack_require__(7);

	var _is = __webpack_require__(9);

	var _camelCase = __webpack_require__(35);

	var _camelCase2 = _interopRequireDefault(_camelCase);

	var _oldInputEvent = __webpack_require__(36);

	var oldInputEvent = _interopRequireWildcard(_oldInputEvent);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var isModernBrowser = _env.doc.addEventListener;

	// 处理底层的事件函数
	var nativeAddEventListener = isModernBrowser ? function (element, type, listener) {
	  element.addEventListener(type, listener, false);
	} : function (element, type, listener) {
	  if (type === 'input') {
	    oldInputEvent.on(element, listener);
	  } else {
	    element.attachEvent('on' + type, listener);
	  }
	};

	var nativeRemoveEventListener = isModernBrowser ? function (element, type, listener) {
	  element.removeEventListener(type, listener, false);
	} : function (element, type, listener) {
	  if (type === 'input') {
	    oldInputEvent.off(element, listener);
	  } else {
	    element.detachEvent('on' + type, listener);
	  }
	};

	var IEEvent = function () {
	  function IEEvent(event, element) {
	    _classCallCheck(this, IEEvent);

	    Object.assign(this, event);

	    this.currentTarget = element;
	    this.target = event.srcElement || element;
	    this.originalEvent = event;
	  }

	  _createClass(IEEvent, [{
	    key: 'preventDefault',
	    value: function preventDefault() {
	      this.originalEvent.returnValue = false;
	    }
	  }, {
	    key: 'stopPropagation',
	    value: function stopPropagation() {
	      this.originalEvent.cancelBubble = true;
	    }
	  }]);

	  return IEEvent;
	}();

	// 把 IE 事件模拟成标准事件


	var createEvent = isModernBrowser ? function (event) {
	  return event;
	} : function (event, element) {
	  return IEEvent(event, element);
	};

	/**
	 * 绑定事件
	 *
	 * @param {HTMLElement} element
	 * @param {string} type
	 * @param {Function} listener
	 */
	function on(element, type, listener) {
	  var $emitter = element.$emitter || (element.$emitter = new _event.Emitter());
	  if (!$emitter.has(type)) {
	    var nativeListener = function nativeListener(e) {
	      var event = new _event.Event(createEvent(e, element));
	      $emitter.fire(event.type, [event]);
	    };
	    $emitter[type] = nativeListener;
	    nativeAddEventListener(element, type, nativeListener);
	  }
	  $emitter.on(type, listener);
	}

	/**
	 * 解绑事件
	 *
	 * @param {HTMLElement} element
	 * @param {string} type
	 * @param {Function} listener
	 */
	function off(element, type, listener) {
	  var $emitter = element.$emitter;

	  var types = Object.keys($emitter.listeners);
	  // emitter 会根据 type 和 listener 参数进行适当的删除
	  $emitter.off(type, listener);
	  // 根据 emitter 的删除结果来操作这里的事件 listener
	  (0, _array.each)(types, function (type) {
	    if ($emitter[type] && !$emitter.has(type)) {
	      nativeRemoveEventListener(element, type, $emitter[type]);
	      delete $emitter[type];
	    }
	  });
	}

	/**
	 * 通过选择器查找元素
	 *
	 * @param {string} selector
	 * @param {?HTMLElement} context
	 * @return {?HTMLElement}
	 */
	function find(selector) {
	  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _env.doc;

	  return context.querySelector(selector);
	}

	/**
	 * 把 style-name: value 解析成对象的形式
	 *
	 * @param {string} str
	 * @return {Object}
	 */
	function parseStyle(str) {
	  var result = {};

	  if ((0, _is.isString)(str)) {
	    (function () {
	      var pairs = void 0,
	          name = void 0,
	          value = void 0;

	      (0, _array.each)(str.split(';'), function (term) {
	        if (term && term.trim()) {
	          pairs = term.split(':');
	          if (pairs.length === 2) {
	            name = pairs[0].trim();
	            value = pairs[1].trim();
	            if (name) {
	              result[(0, _camelCase2.default)(name)] = value;
	            }
	          }
	        }
	      });
	    })();
	  }

	  return result;
	}

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.warn = exports.log = exports.noop = exports.doc = exports.win = exports.inBrowser = exports.debug = undefined;

	var _is = __webpack_require__(9);

	var _print = __webpack_require__(27);

	/**
	 * 是否是调试状态
	 * 调试状态下会打印很多消息
	 *
	 * @type {boolean}
	 */
	var debug = exports.debug = true;

	/**
	 * 是否在浏览器运行
	 *
	 * @type {boolean}
	 */
	var inBrowser = exports.inBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

	/**
	 * 浏览器环境下的 window 对象
	 *
	 * @type {?Window}
	 */
	var win = exports.win = inBrowser ? window : null;

	/**
	 * 浏览器环境下的 document 对象
	 *
	 * @type {?Document}
	 */
	var doc = exports.doc = inBrowser ? document : null;

	/**
	 * 全局使用的空函数
	 *
	 * @return {Function}
	 */
	var noop = exports.noop = function noop() {};

	/**
	 * 是否有原生的日志特性，没有需要单独实现
	 *
	 * @inner
	 * @param {boolean}
	 */
	var hasConsole = typeof console !== 'undefined' && (0, _is.isFunction)(console.log);

	/**
	 * 打印消息日志
	 *
	 * @param {string} tpl
	 * @param {?*} ...args
	 */
	var log = exports.log = debug && hasConsole ? function (tpl) {
	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }

	  console.log(_print.print.apply(undefined, [tpl].concat(args)));
	} : noop;

	/**
	 * 打印警告日志
	 *
	 * @param {string} tpl
	 * @param {?*} ...args
	 */
	var warn = exports.warn = debug && hasConsole ? function (tpl) {
	  console.warn(tpl);
	} : noop;

/***/ },
/* 35 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function camelCase(name) {
	  return name.replace(/-([a-z])/gi, function ($0, $1) {
	    return $1.toUpperCase();
	  });
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.on = on;
	exports.off = off;
	function on(el, listener) {
	  var oldValue = el.value;
	  listener.$listener = function (e) {
	    if (e.originalEvent.propertyName === 'value') {
	      var newValue = el.value;
	      if (newValue !== oldValue) {
	        var result = listener.call(this, e);
	        oldValue = newValue;
	        return result;
	      }
	    }
	  };
	  el.attachEvent('onpropertychange', listener.$listener);
	}

	function off(el, listener) {
	  el.detachEvent('onpropertychange', listener.$listener);
	  delete listener.$listener;
	}

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.patch = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.create = create;

	var _snabbdom = __webpack_require__(38);

	var _snabbdom2 = _interopRequireDefault(_snabbdom);

	var _h = __webpack_require__(42);

	var _h2 = _interopRequireDefault(_h);

	var _style = __webpack_require__(43);

	var _style2 = _interopRequireDefault(_style);

	var _attributes = __webpack_require__(44);

	var _attributes2 = _interopRequireDefault(_attributes);

	var _syntax = __webpack_require__(5);

	var syntax = _interopRequireWildcard(_syntax);

	var _lifecycle = __webpack_require__(2);

	var lifecycle = _interopRequireWildcard(_lifecycle);

	var _helper = __webpack_require__(33);

	var _array = __webpack_require__(10);

	var _object = __webpack_require__(7);

	var _component = __webpack_require__(32);

	var _is = __webpack_require__(9);

	var _nodeType = __webpack_require__(13);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var patch = exports.patch = _snabbdom2.default.init([_attributes2.default, _style2.default]);

	function create(node, instance) {

	  var counter = 0;

	  var DIRECTIVE_PREFIX = syntax.DIRECTIVE_PREFIX,
	      DIRECTIVE_EVENT_PREFIX = syntax.DIRECTIVE_EVENT_PREFIX;


	  var traverse = function traverse(node, enter, leave) {

	    if (enter(node) === false) {
	      return;
	    }

	    var children = [];
	    if ((0, _is.isArray)(node.children)) {
	      (0, _array.each)(node.children, function (item) {
	        item = traverse(item, enter, leave);
	        if (item != null) {
	          children.push(item);
	        }
	      });
	    }

	    return leave(node, children);
	  };

	  return traverse(node, function (node) {
	    counter++;
	    if (node.type === _nodeType.ATTRIBUTE || node.type === _nodeType.DIRECTIVE) {
	      return false;
	    }
	  }, function (node, children) {
	    counter--;
	    if (node.type === _nodeType.ELEMENT) {
	      var _ret = function () {

	        var attrs = {},
	            directives = [],
	            styles = void 0;

	        // 指令的创建要确保顺序
	        // 组件必须第一个执行
	        // 因为如果在组件上写了 on-click="xx" 其实是监听从组件 fire 出的 click 事件
	        // 因此 component 必须在 event 指令之前执行

	        // 组件的 attrs 作为 props 传入组件，不需要写到元素上
	        if (node.custom) {
	          directives.push({
	            name: 'component',
	            node: node,
	            directive: (0, _component.get)(instance, 'directive', 'component')
	          });
	        } else {
	          (0, _object.each)(node.getAttributes(), function (value, key) {
	            if (key === 'style') {
	              styles = (0, _helper.parseStyle)(value);
	            } else {
	              attrs[key] = value;
	            }
	          });
	        }

	        (0, _array.each)(node.directives, function (node) {
	          var name = node.name;


	          var directiveName = void 0;
	          if (name.startsWith(DIRECTIVE_EVENT_PREFIX)) {
	            name = name.substr(DIRECTIVE_EVENT_PREFIX.length);
	            directiveName = 'event';
	          } else {
	            name = directiveName = name.substr(DIRECTIVE_PREFIX.length);
	          }

	          directives.push({
	            name: name,
	            node: node,
	            directive: (0, _component.get)(instance, 'directive', directiveName)
	          });
	        });

	        var data = { attrs: attrs };

	        if (styles) {
	          data.style = styles;
	        }

	        if (!counter || directives.length) {
	          (function () {

	            // 方便指令内查询
	            var map = (0, _array.toObject)(directives, 'name');

	            var notify = function notify(vnode, type) {
	              (0, _array.each)(directives, function (item) {
	                if ((0, _is.isFunction)(item.directive[type])) {
	                  item.directive[type]({
	                    el: vnode.elm,
	                    node: item.node,
	                    name: item.name,
	                    directives: map,
	                    instance: instance
	                  });
	                }
	              });
	            };

	            data.hook = {
	              insert: function insert(vnode) {
	                notify(vnode, lifecycle.ATTACH);
	              },
	              update: function update(oldNode, vnode) {
	                notify(vnode, lifecycle.UPDATE);
	              },
	              destroy: function destroy(vnode) {
	                notify(vnode, lifecycle.DETACH);
	              }
	            };
	          })();
	        }

	        return {
	          v: (0, _h2.default)(node.name, data, children)
	        };
	      }();

	      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	    } else if (node.type === _nodeType.TEXT) {
	      return node.content;
	    }
	  });
	}

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// jshint newcap: false
	/* global require, module, document, Node */
	'use strict';

	var VNode = __webpack_require__(39);
	var is = __webpack_require__(40);
	var domApi = __webpack_require__(41);

	function isUndef(s) {
	  return s === undefined;
	}
	function isDef(s) {
	  return s !== undefined;
	}

	var emptyNode = VNode('', {}, [], undefined, undefined);

	function sameVnode(vnode1, vnode2) {
	  return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
	}

	function createKeyToOldIdx(children, beginIdx, endIdx) {
	  var i,
	      map = {},
	      key;
	  for (i = beginIdx; i <= endIdx; ++i) {
	    key = children[i].key;
	    if (isDef(key)) map[key] = i;
	  }
	  return map;
	}

	var hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];

	function init(modules, api) {
	  var i,
	      j,
	      cbs = {};

	  if (isUndef(api)) api = domApi;

	  for (i = 0; i < hooks.length; ++i) {
	    cbs[hooks[i]] = [];
	    for (j = 0; j < modules.length; ++j) {
	      if (modules[j][hooks[i]] !== undefined) cbs[hooks[i]].push(modules[j][hooks[i]]);
	    }
	  }

	  function emptyNodeAt(elm) {
	    var id = elm.id ? '#' + elm.id : '';
	    var c = elm.className ? '.' + elm.className.split(' ').join('.') : '';
	    return VNode(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm);
	  }

	  function createRmCb(childElm, listeners) {
	    return function () {
	      if (--listeners === 0) {
	        var parent = api.parentNode(childElm);
	        api.removeChild(parent, childElm);
	      }
	    };
	  }

	  function createElm(vnode, insertedVnodeQueue) {
	    var i,
	        data = vnode.data;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.init)) {
	        i(vnode);
	        data = vnode.data;
	      }
	    }
	    var elm,
	        children = vnode.children,
	        sel = vnode.sel;
	    if (isDef(sel)) {
	      // Parse selector
	      var hashIdx = sel.indexOf('#');
	      var dotIdx = sel.indexOf('.', hashIdx);
	      var hash = hashIdx > 0 ? hashIdx : sel.length;
	      var dot = dotIdx > 0 ? dotIdx : sel.length;
	      var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
	      elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? api.createElementNS(i, tag) : api.createElement(tag);
	      if (hash < dot) elm.id = sel.slice(hash + 1, dot);
	      if (dotIdx > 0) elm.className = sel.slice(dot + 1).replace(/\./g, ' ');
	      if (is.array(children)) {
	        for (i = 0; i < children.length; ++i) {
	          api.appendChild(elm, createElm(children[i], insertedVnodeQueue));
	        }
	      } else if (is.primitive(vnode.text)) {
	        api.appendChild(elm, api.createTextNode(vnode.text));
	      }
	      for (i = 0; i < cbs.create.length; ++i) {
	        cbs.create[i](emptyNode, vnode);
	      }i = vnode.data.hook; // Reuse variable
	      if (isDef(i)) {
	        if (i.create) i.create(emptyNode, vnode);
	        if (i.insert) insertedVnodeQueue.push(vnode);
	      }
	    } else {
	      elm = vnode.elm = api.createTextNode(vnode.text);
	    }
	    return vnode.elm;
	  }

	  function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      api.insertBefore(parentElm, createElm(vnodes[startIdx], insertedVnodeQueue), before);
	    }
	  }

	  function invokeDestroyHook(vnode) {
	    var i,
	        j,
	        data = vnode.data;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.destroy)) i(vnode);
	      for (i = 0; i < cbs.destroy.length; ++i) {
	        cbs.destroy[i](vnode);
	      }if (isDef(i = vnode.children)) {
	        for (j = 0; j < vnode.children.length; ++j) {
	          invokeDestroyHook(vnode.children[j]);
	        }
	      }
	    }
	  }

	  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      var i,
	          listeners,
	          rm,
	          ch = vnodes[startIdx];
	      if (isDef(ch)) {
	        if (isDef(ch.sel)) {
	          invokeDestroyHook(ch);
	          listeners = cbs.remove.length + 1;
	          rm = createRmCb(ch.elm, listeners);
	          for (i = 0; i < cbs.remove.length; ++i) {
	            cbs.remove[i](ch, rm);
	          }if (isDef(i = ch.data) && isDef(i = i.hook) && isDef(i = i.remove)) {
	            i(ch, rm);
	          } else {
	            rm();
	          }
	        } else {
	          // Text node
	          api.removeChild(parentElm, ch.elm);
	        }
	      }
	    }
	  }

	  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
	    var oldStartIdx = 0,
	        newStartIdx = 0;
	    var oldEndIdx = oldCh.length - 1;
	    var oldStartVnode = oldCh[0];
	    var oldEndVnode = oldCh[oldEndIdx];
	    var newEndIdx = newCh.length - 1;
	    var newStartVnode = newCh[0];
	    var newEndVnode = newCh[newEndIdx];
	    var oldKeyToIdx, idxInOld, elmToMove, before;

	    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
	      if (isUndef(oldStartVnode)) {
	        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
	      } else if (isUndef(oldEndVnode)) {
	        oldEndVnode = oldCh[--oldEndIdx];
	      } else if (sameVnode(oldStartVnode, newStartVnode)) {
	        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
	        oldStartVnode = oldCh[++oldStartIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else if (sameVnode(oldEndVnode, newEndVnode)) {
	        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldStartVnode, newEndVnode)) {
	        // Vnode moved right
	        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
	        api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
	        oldStartVnode = oldCh[++oldStartIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldEndVnode, newStartVnode)) {
	        // Vnode moved left
	        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
	        api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else {
	        if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
	        idxInOld = oldKeyToIdx[newStartVnode.key];
	        if (isUndef(idxInOld)) {
	          // New element
	          api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
	          newStartVnode = newCh[++newStartIdx];
	        } else {
	          elmToMove = oldCh[idxInOld];
	          patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
	          oldCh[idxInOld] = undefined;
	          api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
	          newStartVnode = newCh[++newStartIdx];
	        }
	      }
	    }
	    if (oldStartIdx > oldEndIdx) {
	      before = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
	      addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
	    } else if (newStartIdx > newEndIdx) {
	      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
	    }
	  }

	  function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
	    var i, hook;
	    if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
	      i(oldVnode, vnode);
	    }
	    var elm = vnode.elm = oldVnode.elm,
	        oldCh = oldVnode.children,
	        ch = vnode.children;
	    if (oldVnode === vnode) return;
	    if (!sameVnode(oldVnode, vnode)) {
	      var parentElm = api.parentNode(oldVnode.elm);
	      elm = createElm(vnode, insertedVnodeQueue);
	      api.insertBefore(parentElm, elm, oldVnode.elm);
	      removeVnodes(parentElm, [oldVnode], 0, 0);
	      return;
	    }
	    if (isDef(vnode.data)) {
	      for (i = 0; i < cbs.update.length; ++i) {
	        cbs.update[i](oldVnode, vnode);
	      }i = vnode.data.hook;
	      if (isDef(i) && isDef(i = i.update)) i(oldVnode, vnode);
	    }
	    if (isUndef(vnode.text)) {
	      if (isDef(oldCh) && isDef(ch)) {
	        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue);
	      } else if (isDef(ch)) {
	        if (isDef(oldVnode.text)) api.setTextContent(elm, '');
	        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
	      } else if (isDef(oldCh)) {
	        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
	      } else if (isDef(oldVnode.text)) {
	        api.setTextContent(elm, '');
	      }
	    } else if (oldVnode.text !== vnode.text) {
	      api.setTextContent(elm, vnode.text);
	    }
	    if (isDef(hook) && isDef(i = hook.postpatch)) {
	      i(oldVnode, vnode);
	    }
	  }

	  return function (oldVnode, vnode) {
	    var i, elm, parent;
	    var insertedVnodeQueue = [];
	    for (i = 0; i < cbs.pre.length; ++i) {
	      cbs.pre[i]();
	    }if (isUndef(oldVnode.sel)) {
	      oldVnode = emptyNodeAt(oldVnode);
	    }

	    if (sameVnode(oldVnode, vnode)) {
	      patchVnode(oldVnode, vnode, insertedVnodeQueue);
	    } else {
	      elm = oldVnode.elm;
	      parent = api.parentNode(elm);

	      createElm(vnode, insertedVnodeQueue);

	      if (parent !== null) {
	        api.insertBefore(parent, vnode.elm, api.nextSibling(elm));
	        removeVnodes(parent, [oldVnode], 0, 0);
	      }
	    }

	    for (i = 0; i < insertedVnodeQueue.length; ++i) {
	      insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
	    }
	    for (i = 0; i < cbs.post.length; ++i) {
	      cbs.post[i]();
	    }return vnode;
	  };
	}

	module.exports = { init: init };

/***/ },
/* 39 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (sel, data, children, text, elm) {
	  var key = data === undefined ? undefined : data.key;
	  return { sel: sel, data: data, children: children,
	    text: text, elm: elm, key: key };
	};

/***/ },
/* 40 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  array: Array.isArray,
	  primitive: function primitive(s) {
	    return typeof s === 'string' || typeof s === 'number';
	  }
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	"use strict";

	function createElement(tagName) {
	  return document.createElement(tagName);
	}

	function createElementNS(namespaceURI, qualifiedName) {
	  return document.createElementNS(namespaceURI, qualifiedName);
	}

	function createTextNode(text) {
	  return document.createTextNode(text);
	}

	function insertBefore(parentNode, newNode, referenceNode) {
	  parentNode.insertBefore(newNode, referenceNode);
	}

	function removeChild(node, child) {
	  node.removeChild(child);
	}

	function appendChild(node, child) {
	  node.appendChild(child);
	}

	function parentNode(node) {
	  return node.parentElement;
	}

	function nextSibling(node) {
	  return node.nextSibling;
	}

	function tagName(node) {
	  return node.tagName;
	}

	function setTextContent(node, text) {
	  node.textContent = text;
	}

	module.exports = {
	  createElement: createElement,
	  createElementNS: createElementNS,
	  createTextNode: createTextNode,
	  appendChild: appendChild,
	  removeChild: removeChild,
	  insertBefore: insertBefore,
	  parentNode: parentNode,
	  nextSibling: nextSibling,
	  tagName: tagName,
	  setTextContent: setTextContent
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var VNode = __webpack_require__(39);
	var is = __webpack_require__(40);

	function addNS(data, children, sel) {
	  data.ns = 'http://www.w3.org/2000/svg';

	  if (sel !== 'foreignObject' && children !== undefined) {
	    for (var i = 0; i < children.length; ++i) {
	      addNS(children[i].data, children[i].children, children[i].sel);
	    }
	  }
	}

	module.exports = function h(sel, b, c) {
	  var data = {},
	      children,
	      text,
	      i;
	  if (c !== undefined) {
	    data = b;
	    if (is.array(c)) {
	      children = c;
	    } else if (is.primitive(c)) {
	      text = c;
	    }
	  } else if (b !== undefined) {
	    if (is.array(b)) {
	      children = b;
	    } else if (is.primitive(b)) {
	      text = b;
	    } else {
	      data = b;
	    }
	  }
	  if (is.array(children)) {
	    for (i = 0; i < children.length; ++i) {
	      if (is.primitive(children[i])) children[i] = VNode(undefined, undefined, undefined, children[i]);
	    }
	  }
	  if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g') {
	    addNS(data, children, sel);
	  }
	  return VNode(sel, data, children, text, undefined);
	};

/***/ },
/* 43 */
/***/ function(module, exports) {

	'use strict';

	var raf = typeof window !== 'undefined' && window.requestAnimationFrame || setTimeout;
	var nextFrame = function nextFrame(fn) {
	  raf(function () {
	    raf(fn);
	  });
	};

	function setNextFrame(obj, prop, val) {
	  nextFrame(function () {
	    obj[prop] = val;
	  });
	}

	function updateStyle(oldVnode, vnode) {
	  var cur,
	      name,
	      elm = vnode.elm,
	      oldStyle = oldVnode.data.style,
	      style = vnode.data.style;

	  if (!oldStyle && !style) return;
	  oldStyle = oldStyle || {};
	  style = style || {};
	  var oldHasDel = 'delayed' in oldStyle;

	  for (name in oldStyle) {
	    if (!style[name]) {
	      elm.style[name] = '';
	    }
	  }
	  for (name in style) {
	    cur = style[name];
	    if (name === 'delayed') {
	      for (name in style.delayed) {
	        cur = style.delayed[name];
	        if (!oldHasDel || cur !== oldStyle.delayed[name]) {
	          setNextFrame(elm.style, name, cur);
	        }
	      }
	    } else if (name !== 'remove' && cur !== oldStyle[name]) {
	      elm.style[name] = cur;
	    }
	  }
	}

	function applyDestroyStyle(vnode) {
	  var style,
	      name,
	      elm = vnode.elm,
	      s = vnode.data.style;
	  if (!s || !(style = s.destroy)) return;
	  for (name in style) {
	    elm.style[name] = style[name];
	  }
	}

	function applyRemoveStyle(vnode, rm) {
	  var s = vnode.data.style;
	  if (!s || !s.remove) {
	    rm();
	    return;
	  }
	  var name,
	      elm = vnode.elm,
	      idx,
	      i = 0,
	      maxDur = 0,
	      compStyle,
	      style = s.remove,
	      amount = 0,
	      applied = [];
	  for (name in style) {
	    applied.push(name);
	    elm.style[name] = style[name];
	  }
	  compStyle = getComputedStyle(elm);
	  var props = compStyle['transition-property'].split(', ');
	  for (; i < props.length; ++i) {
	    if (applied.indexOf(props[i]) !== -1) amount++;
	  }
	  elm.addEventListener('transitionend', function (ev) {
	    if (ev.target === elm) --amount;
	    if (amount === 0) rm();
	  });
	}

	module.exports = { create: updateStyle, update: updateStyle, destroy: applyDestroyStyle, remove: applyRemoveStyle };

/***/ },
/* 44 */
/***/ function(module, exports) {

	"use strict";

	var NamespaceURIs = {
	  "xlink": "http://www.w3.org/1999/xlink"
	};

	var booleanAttrs = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "compact", "controls", "declare", "default", "defaultchecked", "defaultmuted", "defaultselected", "defer", "disabled", "draggable", "enabled", "formnovalidate", "hidden", "indeterminate", "inert", "ismap", "itemscope", "loop", "multiple", "muted", "nohref", "noresize", "noshade", "novalidate", "nowrap", "open", "pauseonexit", "readonly", "required", "reversed", "scoped", "seamless", "selected", "sortable", "spellcheck", "translate", "truespeed", "typemustmatch", "visible"];

	var booleanAttrsDict = Object.create(null);
	for (var i = 0, len = booleanAttrs.length; i < len; i++) {
	  booleanAttrsDict[booleanAttrs[i]] = true;
	}

	function updateAttrs(oldVnode, vnode) {
	  var key,
	      cur,
	      old,
	      elm = vnode.elm,
	      oldAttrs = oldVnode.data.attrs,
	      attrs = vnode.data.attrs,
	      namespaceSplit;

	  if (!oldAttrs && !attrs) return;
	  oldAttrs = oldAttrs || {};
	  attrs = attrs || {};

	  // update modified attributes, add new attributes
	  for (key in attrs) {
	    cur = attrs[key];
	    old = oldAttrs[key];
	    if (old !== cur) {
	      if (!cur && booleanAttrsDict[key]) elm.removeAttribute(key);else {
	        namespaceSplit = key.split(":");
	        if (namespaceSplit.length > 1 && NamespaceURIs.hasOwnProperty(namespaceSplit[0])) elm.setAttributeNS(NamespaceURIs[namespaceSplit[0]], key, cur);else elm.setAttribute(key, cur);
	      }
	    }
	  }
	  //remove removed attributes
	  // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)
	  // the other option is to remove all attributes with value == undefined
	  for (key in oldAttrs) {
	    if (!(key in attrs)) {
	      elm.removeAttribute(key);
	    }
	  }
	}

	module.exports = { create: updateAttrs, update: updateAttrs };

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _component = __webpack_require__(32);

	module.exports = {

	  attach: function attach(_ref) {
	    var el = _ref.el,
	        node = _ref.node,
	        instance = _ref.instance,
	        directives = _ref.directives;


	    var component = el['$component'];
	    var value = node.getValue();
	    if (component && value) {
	      (0, _component.set)(instance, 'ref', value, component);
	      el.$ref = value;
	    }
	  },

	  detach: function detach(_ref2) {
	    var el = _ref2.el,
	        instance = _ref2.instance;


	    if (el.$ref) {
	      delete instance.$refs[el.$ref];
	      el.$ref = null;
	    }
	  }
	};
	/**
	 * 没有逻辑，ref 主要是配合 component 使用
	 *
	 * <Component @ref="component" />
	 */

/***/ },
/* 46 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * 没有逻辑，lazy 主要是配合 model 使用
	 *
	 * <input @model="name" @lazy>
	 */

	module.exports = {};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _helper = __webpack_require__(33);

	var _array = __webpack_require__(10);

	var _keypath = __webpack_require__(30);

	var _component = __webpack_require__(32);

	var _expression = __webpack_require__(15);

	var _syntax = __webpack_require__(5);

	var syntax = _interopRequireWildcard(_syntax);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	module.exports = {

	  attach: function attach(_ref) {
	    var el = _ref.el,
	        name = _ref.name,
	        node = _ref.node,
	        instance = _ref.instance;


	    var listener = void 0;
	    var value = node.getValue().trim();

	    if (value.indexOf('(') > 0) {
	      (function () {
	        var ast = (0, _expression.parse)(value);
	        if (ast.type === _expression.CALL) {
	          listener = function listener(e) {
	            var args = [].concat(_toConsumableArray(ast.arguments));
	            if (!args.length) {
	              args.push(e);
	            } else {
	              args = args.map(function (item) {
	                var name = item.name,
	                    type = item.type;

	                if (type === _expression.LITERAL) {
	                  return item.value;
	                }
	                if (type === _expression.IDENTIFIER) {
	                  if (name === syntax.SPECIAL_EVENT) {
	                    return e;
	                  }
	                } else if (type === _expression.MEMBER) {
	                  name = (0, _keypath.stringify)(item);
	                }

	                var result = (0, _component.testKeypath)(instance, node.keypath, name);
	                if (result) {
	                  return result.value;
	                }
	              });
	            }
	            instance[ast.callee.name].apply(instance, args);
	          };
	        }
	      })();
	    } else {
	      listener = function listener() {
	        instance.fire(value);
	      };
	    }

	    if (listener) {
	      var $component = el.$component;

	      if ($component) {
	        $component.on(name, listener);
	      } else {
	        (0, _helper.on)(el, name, listener);
	      }
	      el['$' + name] = listener;
	    }
	  },

	  detach: function detach(_ref2) {
	    var el = _ref2.el,
	        name = _ref2.name,
	        node = _ref2.node;

	    var listener = '$' + name;
	    if (el[listener]) {
	      var $component = el.$component;

	      if ($component) {
	        $component.off(name, el[listener]);
	      } else {
	        (0, _helper.off)(el, name, el[listener]);
	      }
	      el[listener] = null;
	    }
	  }
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _helper = __webpack_require__(33);

	var _component = __webpack_require__(32);

	var _array = __webpack_require__(10);

	var _is = __webpack_require__(9);

	var _debounce = __webpack_require__(49);

	var _debounce2 = _interopRequireDefault(_debounce);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	// 支持 input 事件的控件
	var supportInputTypes = ['text', 'number', 'url', 'email', 'search'];

	// 特殊的双向绑定逻辑
	var controlTypes = {
	  normal: {
	    set: function set(_ref) {
	      var el = _ref.el,
	          keypath = _ref.keypath,
	          instance = _ref.instance;

	      el.value = instance.get(keypath);
	    },
	    sync: function sync(_ref2) {
	      var el = _ref2.el,
	          keypath = _ref2.keypath,
	          instance = _ref2.instance;

	      instance.set(keypath, el.value);
	    }
	  },
	  radio: {
	    set: function set(_ref3) {
	      var el = _ref3.el,
	          keypath = _ref3.keypath,
	          instance = _ref3.instance;

	      el.checked = el.value == instance.get(keypath);
	    },
	    sync: function sync(_ref4) {
	      var el = _ref4.el,
	          keypath = _ref4.keypath,
	          instance = _ref4.instance;

	      if (el.checked) {
	        instance.set(keypath, el.value);
	      }
	    }
	  },
	  checkbox: {
	    set: function set(_ref5) {
	      var el = _ref5.el,
	          keypath = _ref5.keypath,
	          instance = _ref5.instance;

	      var value = instance.get(keypath);
	      el.checked = (0, _is.isArray)(value) ? (0, _array.hasItem)(value, el.value, false) : !!value;
	    },
	    sync: function sync(_ref6) {
	      var el = _ref6.el,
	          keypath = _ref6.keypath,
	          instance = _ref6.instance;

	      var array = instance.get(keypath);
	      if ((0, _is.isArray)(array)) {
	        if (el.checked) {
	          array.push(el.value);
	        } else {
	          (0, _array.removeItem)(array, el.value, false);
	        }
	        instance.set(keypath, [].concat(_toConsumableArray(array)));
	      } else {
	        instance.set(keypath, el.checked);
	      }
	    }
	  }
	};

	module.exports = {

	  attach: function attach(_ref7) {
	    var el = _ref7.el,
	        node = _ref7.node,
	        instance = _ref7.instance,
	        directives = _ref7.directives;


	    var eventName = 'change',
	        eventInterval = void 0,
	        value = void 0;

	    var type = el.type,
	        tagName = el.tagName;


	    if (tagName === 'INPUT' && (0, _array.hasItem)(supportInputTypes, type) || tagName === 'TEXTAREA') {
	      var lazyDirective = directives.lazy;
	      if (lazyDirective) {
	        value = lazyDirective.node.getValue();
	        if ((0, _is.isNumeric)(value) && value >= 0) {
	          eventName = 'input';
	          eventInterval = value;
	        }
	      } else {
	        eventName = 'input';
	      }
	    }

	    value = node.getValue();

	    var result = (0, _component.testKeypath)(instance, node.keypath, value);
	    if (!result) {
	      throw new Error('\u4E0D\u80FD\u53CC\u5411\u7ED1\u5B9A\u5230 ' + keypath);
	    }

	    var keypath = result.keypath;


	    var target = controlTypes[type] || controlTypes.normal;
	    var data = {
	      el: el,
	      keypath: keypath,
	      instance: instance
	    };
	    target.set(data);

	    instance.watch(keypath, function () {
	      target.set(data);
	    });

	    var eventListener = function eventListener() {
	      target.sync(data);
	    };

	    if (eventInterval) {
	      eventListener = (0, _debounce2.default)(eventListener, eventInterval);
	    }

	    el.$model = {
	      eventName: eventName,
	      eventListener: eventListener
	    };

	    (0, _helper.on)(el, eventName, eventListener);
	  },

	  detach: function detach(_ref8) {
	    var el = _ref8.el;
	    var $model = el.$model;

	    (0, _helper.off)(el, $model.eventName, $model.eventListener);
	    el.$model = null;
	  }

	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _array = __webpack_require__(10);

	/**
	 * 节流调用
	 *
	 * @param {Function} fn 需要节制调用的函数
	 * @param {number=} delay 调用的时间间隔，默认 50ms
	 * @param {boolean=} lazy 是否在最后调用
	 * @return {Function}
	 */
	module.exports = function debounce(fn, delay, lazy) {

	  var prevTime = void 0;
	  var timer = void 0;

	  function createTimer(args) {
	    timer = setTimeout(function () {
	      timer = null;
	      prevTime = Date.now();
	      fn.apply(null, (0, _array.toArray)(args));
	    }, delay);
	  }

	  return function () {

	    if (lazy && prevTime > 0 && Date.now() - prevTime < delay) {
	      clearTimeout(timer);
	      timer = null;
	    }

	    if (!timer) {
	      createTimer(arguments);
	    }
	  };
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _component = __webpack_require__(32);

	module.exports = {

	  attach: function attach(_ref) {
	    var el = _ref.el,
	        node = _ref.node,
	        instance = _ref.instance;

	    el.$component = instance.create((0, _component.get)(instance, 'component', node.custom), {
	      el: el,
	      props: node.getAttributes(),
	      replace: true
	    });
	  },

	  update: function update(_ref2) {
	    var el = _ref2.el,
	        node = _ref2.node;

	    el.$component.set(node.getAttributes());
	  },

	  detach: function detach(_ref3) {
	    var el = _ref3.el;

	    el.$component.detach();
	    el.$component = null;
	  }

	};

/***/ }
/******/ ])
});
;