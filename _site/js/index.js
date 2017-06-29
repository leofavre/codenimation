function baseRandom(e,t){return e+nativeFloor(nativeRandom()*(t-e+1))}function arraySample(e){var t=e.length;return t?e[baseRandom(0,t-1)]:void 0}function arrayMap(e,t){for(var n=-1,r=null==e?0:e.length,o=Array(r);++n<r;)o[n]=t(e[n],n,e);return o}function baseValues(e,t){return arrayMap(t,function(t){return e[t]})}function baseTimes(e,t){for(var n=-1,r=Array(e);++n<e;)r[n]=t(n);return r}function getRawTag(e){var t=hasOwnProperty$2.call(e,symToStringTag$1),n=e[symToStringTag$1];try{e[symToStringTag$1]=void 0;var r=!0}catch(e){}var o=nativeObjectToString.call(e);return r&&(t?e[symToStringTag$1]=n:delete e[symToStringTag$1]),o}function objectToString(e){return nativeObjectToString$1.call(e)}function baseGetTag(e){return null==e?void 0===e?undefinedTag:nullTag:symToStringTag&&symToStringTag in Object(e)?getRawTag(e):objectToString(e)}function isObjectLike(e){return null!=e&&"object"==(void 0===e?"undefined":_typeof(e))}function baseIsArguments(e){return isObjectLike(e)&&baseGetTag(e)==argsTag}function stubFalse(){return!1}function isIndex(e,t){return!!(t=null==t?MAX_SAFE_INTEGER:t)&&("number"==typeof e||reIsUint.test(e))&&e>-1&&e%1==0&&e<t}function isLength(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=MAX_SAFE_INTEGER$1}function baseIsTypedArray(e){return isObjectLike(e)&&isLength(e.length)&&!!typedArrayTags[baseGetTag(e)]}function baseUnary(e){return function(t){return e(t)}}function arrayLikeKeys(e,t){var n=isArray(e),r=!n&&isArguments(e),o=!n&&!r&&isBuffer(e),i=!n&&!r&&!o&&isTypedArray(e),a=n||r||o||i,s=a?baseTimes(e.length,String):[],u=s.length;for(var c in e)!t&&!hasOwnProperty.call(e,c)||a&&("length"==c||o&&("offset"==c||"parent"==c)||i&&("buffer"==c||"byteLength"==c||"byteOffset"==c)||isIndex(c,u))||s.push(c);return s}function isPrototype(e){var t=e&&e.constructor;return e===("function"==typeof t&&t.prototype||objectProto$5)}function overArg(e,t){return function(n){return e(t(n))}}function baseKeys(e){if(!isPrototype(e))return nativeKeys(e);var t=[];for(var n in Object(e))hasOwnProperty$3.call(e,n)&&"constructor"!=n&&t.push(n);return t}function isObject(e){var t=void 0===e?"undefined":_typeof(e);return null!=e&&("object"==t||"function"==t)}function isFunction(e){if(!isObject(e))return!1;var t=baseGetTag(e);return t==funcTag$1||t==genTag||t==asyncTag||t==proxyTag}function isArrayLike(e){return null!=e&&isLength(e.length)&&!isFunction(e)}function keys(e){return isArrayLike(e)?arrayLikeKeys(e):baseKeys(e)}function values(e){return null==e?[]:baseValues(e,keys(e))}function baseSample(e){return arraySample(values(e))}function sample(e){return(isArray(e)?arraySample:baseSample)(e)}function Raffler(e){this.model=function(e){return e.map(function(e){return{item:e,isAvailable:!0}})}(e)}function isPlainObject(e){if(!isObjectLike(e)||baseGetTag(e)!=objectTag$1)return!1;var t=getPrototype(e);if(null===t)return!0;var n=hasOwnProperty$4.call(t,"constructor")&&t.constructor;return"function"==typeof n&&n instanceof n&&funcToString.call(n)==objectCtorString}function isElement(e){return isObjectLike(e)&&1===e.nodeType&&!isPlainObject(e)}function isString(e){return"string"==typeof e||!isArray(e)&&isObjectLike(e)&&baseGetTag(e)==stringTag$1}function isBoolean(e){return!0===e||!1===e||isObjectLike(e)&&baseGetTag(e)==boolTag$1}function _formatBemRadical(e,t,n){var r=n[0];return""+e+_joinBemEntityWithDelimiter(t,r)}function _formatBemModifier(e,t,n){var r=n[1],o=_joinBemEntityWithDelimiter(e,r),i=n[2],a=_joinBemEntityWithDelimiter(t,i);return!0===t?o:!1!==t&&null!=t?""+o+a:""}function _parseModifierProp(e,t,n,r){return function(o){var i=r[0],a=n.split(i)[0],s=n.split(i)[1],u=e[o],c=formatBemClass(a,s,o,!0,r),l=formatBemClass(a,s,o,u,r);!1===u?removeClass(t,c):!0!==u&&_removeClassesBeginningWithButNot(t,c),!1!==u&&addClass(t,l)}}function _parseBemProp(e,t,n,r){return function(o){var i=e[o];r||_hasNoModifiers(i)||_hasAllModifiersSetToFalse(i)?addClass(t,o):removeClass(t,o),_parseModifier(i,t,o,n)}}function eq(e,t){return e===t||e!==e&&t!==t}function isIterateeCall(e,t,n){if(!isObject(n))return!1;var r=void 0===t?"undefined":_typeof(t);return!!("number"==r?isArrayLike(n)&&isIndex(t,n.length):"string"==r&&t in n)&&eq(n[t],e)}function isSymbol(e){return"symbol"==(void 0===e?"undefined":_typeof(e))||isObjectLike(e)&&baseGetTag(e)==symbolTag}function toNumber(e){if("number"==typeof e)return e;if(isSymbol(e))return NAN;if(isObject(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=isObject(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(reTrim,"");var n=reIsBinary.test(e);return n||reIsOctal.test(e)?freeParseInt(e.slice(2),n?2:8):reIsBadHex.test(e)?NAN:+e}function toFinite(e){return e?(e=toNumber(e),e===INFINITY||e===-INFINITY?(e<0?-1:1)*MAX_INTEGER:e===e?e:0):0===e?e:0}function random(e,t,n){if(n&&"boolean"!=typeof n&&isIterateeCall(e,t,n)&&(t=n=void 0),void 0===n&&("boolean"==typeof t?(n=t,t=void 0):"boolean"==typeof e&&(n=e,e=void 0)),void 0===e&&void 0===t?(e=0,t=1):(e=toFinite(e),void 0===t?(t=e,e=0):t=toFinite(t)),e>t){var r=e;e=t,t=r}if(n||e%1||t%1){var o=nativeRandom$1();return nativeMin(e+o*(t-e+freeParseFloat("1e-"+((o+"").length-1))),t)}return baseRandom(e,t)}var nativeFloor=Math.floor,nativeRandom=Math.random,_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},defineProperty=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e},toConsumableArray=function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)},freeGlobal="object"==("undefined"==typeof global?"undefined":_typeof(global))&&global&&global.Object===Object&&global,freeSelf="object"==("undefined"==typeof self?"undefined":_typeof(self))&&self&&self.Object===Object&&self,root=freeGlobal||freeSelf||Function("return this")(),_Symbol=root.Symbol,objectProto$2=Object.prototype,hasOwnProperty$2=objectProto$2.hasOwnProperty,nativeObjectToString=objectProto$2.toString,symToStringTag$1=_Symbol?_Symbol.toStringTag:void 0,objectProto$3=Object.prototype,nativeObjectToString$1=objectProto$3.toString,nullTag="[object Null]",undefinedTag="[object Undefined]",symToStringTag=_Symbol?_Symbol.toStringTag:void 0,argsTag="[object Arguments]",objectProto$1=Object.prototype,hasOwnProperty$1=objectProto$1.hasOwnProperty,propertyIsEnumerable=objectProto$1.propertyIsEnumerable,isArguments=baseIsArguments(function(){return arguments}())?baseIsArguments:function(e){return isObjectLike(e)&&hasOwnProperty$1.call(e,"callee")&&!propertyIsEnumerable.call(e,"callee")},isArray=Array.isArray,freeExports="object"==("undefined"==typeof exports?"undefined":_typeof(exports))&&exports&&!exports.nodeType&&exports,freeModule=freeExports&&"object"==("undefined"==typeof module?"undefined":_typeof(module))&&module&&!module.nodeType&&module,moduleExports=freeModule&&freeModule.exports===freeExports,Buffer=moduleExports?root.Buffer:void 0,nativeIsBuffer=Buffer?Buffer.isBuffer:void 0,isBuffer=nativeIsBuffer||stubFalse,MAX_SAFE_INTEGER=9007199254740991,reIsUint=/^(?:0|[1-9]\d*)$/,MAX_SAFE_INTEGER$1=9007199254740991,argsTag$1="[object Arguments]",arrayTag="[object Array]",boolTag="[object Boolean]",dateTag="[object Date]",errorTag="[object Error]",funcTag="[object Function]",mapTag="[object Map]",numberTag="[object Number]",objectTag="[object Object]",regexpTag="[object RegExp]",setTag="[object Set]",stringTag="[object String]",weakMapTag="[object WeakMap]",arrayBufferTag="[object ArrayBuffer]",dataViewTag="[object DataView]",float32Tag="[object Float32Array]",float64Tag="[object Float64Array]",int8Tag="[object Int8Array]",int16Tag="[object Int16Array]",int32Tag="[object Int32Array]",uint8Tag="[object Uint8Array]",uint8ClampedTag="[object Uint8ClampedArray]",uint16Tag="[object Uint16Array]",uint32Tag="[object Uint32Array]",typedArrayTags={};typedArrayTags[float32Tag]=typedArrayTags[float64Tag]=typedArrayTags[int8Tag]=typedArrayTags[int16Tag]=typedArrayTags[int32Tag]=typedArrayTags[uint8Tag]=typedArrayTags[uint8ClampedTag]=typedArrayTags[uint16Tag]=typedArrayTags[uint32Tag]=!0,typedArrayTags[argsTag$1]=typedArrayTags[arrayTag]=typedArrayTags[arrayBufferTag]=typedArrayTags[boolTag]=typedArrayTags[dataViewTag]=typedArrayTags[dateTag]=typedArrayTags[errorTag]=typedArrayTags[funcTag]=typedArrayTags[mapTag]=typedArrayTags[numberTag]=typedArrayTags[objectTag]=typedArrayTags[regexpTag]=typedArrayTags[setTag]=typedArrayTags[stringTag]=typedArrayTags[weakMapTag]=!1;var freeExports$1="object"==("undefined"==typeof exports?"undefined":_typeof(exports))&&exports&&!exports.nodeType&&exports,freeModule$1=freeExports$1&&"object"==("undefined"==typeof module?"undefined":_typeof(module))&&module&&!module.nodeType&&module,moduleExports$1=freeModule$1&&freeModule$1.exports===freeExports$1,freeProcess=moduleExports$1&&freeGlobal.process,nodeUtil=function(){try{return freeProcess&&freeProcess.binding&&freeProcess.binding("util")}catch(e){}}(),nodeIsTypedArray=nodeUtil&&nodeUtil.isTypedArray,isTypedArray=nodeIsTypedArray?baseUnary(nodeIsTypedArray):baseIsTypedArray,objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty,objectProto$5=Object.prototype,nativeKeys=overArg(Object.keys,Object),objectProto$4=Object.prototype,hasOwnProperty$3=objectProto$4.hasOwnProperty,asyncTag="[object AsyncFunction]",funcTag$1="[object Function]",genTag="[object GeneratorFunction]",proxyTag="[object Proxy]";Raffler.prototype=function(){function e(e,t,n){return e[n].isAvailable=t,e}function t(e,t){return e.filter(function(e){return e.isAvailable===t}).map(function(e){return e.item})}function n(e,t,n){return e.map(function(e,t){return t}).filter(function(r){return e[r].isAvailable===t&&(null==n||e[r].item===n)})}function r(){var e=l(this.model);if(e.length>0){var t=sample(e),n=f(this.model,t);return this.model=u(this.model,t),n}}function o(e){var t=c(this.model,e)[0];this.model=s(this.model,t)}function i(){return t(this.model,!0)}function a(){return t(this.model,!1)}var s=function(t,n){return e(t,!0,n)},u=function(t,n){return e(t,!1,n)},c=function(e,t){return n(e,!1,t)},l=function(e){return n(e,!0)},f=function(e,t){return e[t].item};return{draw:r,putBack:o,getAvailableItems:i,getUnavailableItems:a}}();var getPrototype=overArg(Object.getPrototypeOf,Object),objectTag$1="[object Object]",funcProto=Function.prototype,objectProto$6=Object.prototype,funcToString=funcProto.toString,hasOwnProperty$4=objectProto$6.hasOwnProperty,objectCtorString=funcToString.call(Object),stringTag$1="[object String]",boolTag$1="[object Boolean]",_isValidModifierObject=function(e){return isPlainObject(e)&&Object.keys(e).every(function(t){var n=e[t];return isBoolean(n)||isString(n)||Number.isFinite(n)})},_isValidBemObject=function(e){return isPlainObject(e)&&Object.keys(e).every(function(t){return _isValidModifierObject(e[t])})},_isValidDelimiterArray=function(e){return Array.isArray(e)&&3===e.length&&e.every(function(e){return isString(e)&&""!==e})},_throwErrorIf=function(e,t){if(e)throw new Error(t)},_validateModifyBemClassArgs=function(e,t,n){_throwErrorIf(!isElement(e),"An HTMLElement is expected as the first parameter."),_throwErrorIf(!_isValidBemObject(t),"An object describing BEM class changes is expected as the second parameter."),_throwErrorIf(!_isValidDelimiterArray(n),"An array with three strings representing BEM delimiters is expected as the third parameter.")},_parseBemEntityWithFunc=function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return Object.keys(n[0]).forEach(e.apply(void 0,n))},_changeClassWithMethod=function(e,t,n){t&&e.classList[n](t)},_isElementOrDocumentOrWindow=function(e){return isElement(e)||e===document||e===window},_domElementsToArray$2=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=e,r=t?_isElementOrDocumentOrWindow:isElement,o=t?"One or more HTMLElements are expected as the first parameter.":"One or more HTMLElements, including document or window, are expected as the first parameter.";return null==e?[]:(r(e)?n=[e]:null==e||"number"!=typeof e.length&&"number"!=typeof e.size||(n=Array.from(e)),_throwErrorIf(!Array.isArray(n)||n.some(function(e){return!r(e)}),o),n)},_domElementsToArray=function(e){return _domElementsToArray$2(e,!1)},addClass=function(e,t){_domElementsToArray(e).forEach(function(e){return _changeClassWithMethod(e,t,"add")})},removeClass=function(e,t){_domElementsToArray(e).forEach(function(e){return _changeClassWithMethod(e,t,"remove")})},_hasNoModifiers=function(e){return 0===Object.keys(e).length},_hasAllModifiersSetToFalse=function(e){return Object.keys(e).every(function(t){return!1===e[t]})},_removeClassesBeginningWithButNotBase=function(e,t){for(var n=e.classList.length-1;n>=0;n--){var r=e.classList.item(n);r!==t&&r.startsWith(t)&&removeClass(e,r)}return e},_removeClassesBeginningWithButNot=function(e,t){_domElementsToArray(e).forEach(function(e){return _removeClassesBeginningWithButNotBase(e,t)})},_joinBemEntityWithDelimiter=function(e,t){return null!=e&&""!==e&&"boolean"!=typeof e?""+t+e:""},formatBemClass=function(){var e,t=(arguments.length<=0?void 0:arguments[0])||"",n=(e=arguments.length-1,arguments.length<=e?void 0:arguments[e]);_throwErrorIf(arguments.length<2,"At least a string representing a BEM block and an array representing BEM delimiters should be passed as parameters.");var r=void 0,o=void 0,i=!0;return arguments.length>2&&(r=arguments.length<=1?void 0:arguments[1]),arguments.length>3&&(o=arguments.length<=2?void 0:arguments[2]),arguments.length>4&&(i=arguments.length<=3?void 0:arguments[3]),""+_formatBemRadical(t,r,n)+_formatBemModifier(o,i,n)},_parseModifier=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return _parseBemEntityWithFunc.apply(void 0,[_parseModifierProp].concat(t))},_parseBem=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return _parseBemEntityWithFunc.apply(void 0,[_parseBemProp].concat(t))},modifyBemClass=function(e,t,n){return _validateModifyBemClassArgs(e,t,n),_parseBem(t,e,n,!0)},symbolTag="[object Symbol]",NAN=NaN,reTrim=/^\s+|\s+$/g,reIsBadHex=/^[-+]0x[0-9a-f]+$/i,reIsBinary=/^0b[01]+$/i,reIsOctal=/^0o[0-7]+$/i,freeParseInt=parseInt,INFINITY=1/0,MAX_INTEGER=1.7976931348623157e308,freeParseFloat=parseFloat,nativeMin=Math.min,nativeRandom$1=Math.random,oneOutOf=function(e){return _throwErrorIf(!Number.isFinite(e)||e<1,"A number greater than 1 is expected as parameter."),1===e||random(1,e)===e},CodeWriter=function(e,t){this.model=function(e){return{sentence:e,textStart:0,selectionStart:0,selectionEnd:0,textEnd:0}}(t),this.node=e};CodeWriter.prototype=function(){function e(e,t){var n=Math.max(0,Math.min(e.textEnd+t,e.sentence.length));return r(e,{textEnd:n,selectionStart:n,selectionEnd:n})}function t(e,t){var n=Math.max(0,Math.min(e.selectionStart+t,e.textEnd));return r(e,{selectionStart:n,selectionEnd:n})}function n(e,t){return r(e,{selectionEnd:Math.max(0,Math.min(e.selectionEnd+t,e.textEnd))})}function r(e,t){return Object.assign({},e,t)}function o(e,t){for(var n=t-2;n>=0;n--)if(D(e[n]))return n+1;return 0}function i(e,t){for(var n=t+1;n<=e.length;n++)if(D(e[n]))return n;return e.length}function a(e,t){t.innerHTML="";var n=l(e.sentence,e.textStart,e.selectionStart,e.selectionEnd,e.textEnd);t.appendChild(n)}function s(e,t,n,r){return document.createTextNode(I(e,t,n,r))}function u(e,t,n,r){return document.createTextNode($(e,t,n,r))}function c(e,t,n){var r=N(e,t,n),o=k(t,n),i=document.createElement("span"),a=document.createTextNode(r);return modifyBemClass(i,{"type-animation__selection":{blinking:o>=0?"end":"start"}},["__","--","-"]),i.appendChild(a),i}function l(e,t,n,r,o){var i=s(e,t,n,r),a=c(e,n,r),l=u(e,n,r,o),f=document.createElement("span"),d=document.createElement("span");return f.className="type-animation__code",d.className="type-animation__inner",f.appendChild(d),d.appendChild(i),d.appendChild(a),d.appendChild(l),f}function f(){return Promise.resolve()}function d(e){return w.call(this,void 0,e)}function m(){return w.call(this,void 0,L(this.model.sentence,this.model.textEnd))}function y(){return w.call(this,void 0,W())}function p(){var t=this;return w.call(this,function(){return e(t.model,1)})}function g(){var t=this;return w.call(this,function(){return e(t.model,-1)})}function h(){var e=this;return w.call(this,function(){return t(e.model,1)})}function b(){var e=this;return w.call(this,function(){return t(e.model,-1)})}function T(){var e=this,n=i(this.model.sentence,this.model.selectionEnd);return w.call(this,function(){return t(e.model,n-e.model.selectionStart)})}function v(){var e=this,n=o(this.model.sentence,this.model.selectionEnd);return w.call(this,function(){return t(e.model,n-e.model.selectionStart)})}function j(){var e=this;return w.call(this,function(){return n(e.model,1)})}function A(){var e=this;return w.call(this,function(){return n(e.model,-1)})}function E(){var e=this,t=i(this.model.sentence,this.model.selectionEnd);return w.call(this,function(){return n(e.model,t-e.model.selectionEnd)})}function _(){var e=this,t=o(this.model.sentence,this.model.selectionEnd);return w.call(this,function(){return n(e.model,t-e.model.selectionEnd)})}function O(){var t=this,n=F(this.model.selectionStart,this.model.selectionEnd);return w.call(this,function(){return e(t.model,0-n)})}function S(){return G(this.model.sentence)}function x(){return U(this.model.sentence)}function P(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.reduce(function(e,t){return e.then(t)},Promise.resolve())}function B(){for(var e=this,t=arguments.length,n=Array(t),r=0;r<t;r++)n[r]=arguments[r];var o=this.model;return P.apply(void 0,n).then(function(){var t=e.model;return H(o,t)?e.repeatUntilEnd.apply(e,n):Promise.resolve()})}function w(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){return e.model},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return new Promise(function(r){null!=n&&n>0?C(function(){return M.call(e,t,r)},n):M.call(e,t,r)})}function M(e,t){var n=e();this.model!==n&&(this.model=n,a(this.model,this.node)),t()}function C(e,t){function n(){(new Date).getTime()-r>=t?e.call():o.value=(window.requestAnimationFrame||window.setTimeout)(n)}var r=(new Date).getTime(),o={};return o.value=(window.requestAnimationFrame||window.setTimeout)(n),o}var I=function(e,t,n,r){return e.slice(t,Math.min(n,r))},$=function(e,t,n,r){return e.slice(Math.max(t,n),r)},N=function(e,t,n){return e.slice(Math.min(t,n),Math.max(t,n))},k=function(e,t){return e<t?1:e>t?-1:0},F=function(e,t){return Math.abs(e-t)},R=function(e,t){return e.substr(t,1)},L=function(e,t){return V(R(e,t))&&oneOutOf(3)?random(30,1500):random(30,200)},W=function(){return random(30,400)},U=function(e){return Math.max.apply(Math,toConsumableArray(e.split("\n").map(function(e){return e.replace("\t","    ").length})))},G=function(e){return e.split("\n").length},D=function(e){return[" ","\t","\n"].includes(e)},V=function(e){return[" ","\n",".","(","["].includes(e)},H=function(e,t){return!Object.keys(e).every(function(n){return e[n]===t[n]})};return{start:f,wait:d,enqueue:P,repeatUntilEnd:B,delayTypingRandomly:m,delaySelectionRandomly:y,typeOneCharacter:p,removeOneCharacter:g,moveCursorToNextCharacter:h,moveCursorToPreviousCharacter:b,moveCursorToNextBreak:T,moveCursorToPreviousBreak:v,selectNextCharacter:j,selectPreviousCharacter:A,selectUntilNextBreak:E,selectUntilPreviousBreak:_,removeSelection:O,getHeightInLines:S,getWidthInCharacters:x}}();var Codenimation=function(e,t,n){this.model=function(e,t){return{snippetRaffler:e,appearanceRaffler:t}}(t,n),this.node=e};Codenimation.prototype=function(){function e(e){return{smaller:30,small:80,normal:160,big:300,bigger:600}[e]}function t(e,t){return function(n){return e.putBack(t),n}}function n(e,t){return function(n){return t.appendChild(e),n}}function r(e){var t=function(t){return function(){return e.wait(t)}},n=function(t){return function(){return e[t]()}},r=function(){for(var t=arguments.length,r=Array(t),o=0;o<t;o++)r[o]=arguments[o];return function(){return e.repeatUntilEnd.apply(e,toConsumableArray(r.map(function(e){return n(e)})))}};return e.start().then(r("delayTypingRandomly","typeOneCharacter")).then(t(4e3)).then(r("delaySelectionRandomly","selectUntilPreviousBreak")).then(t(2e3)).then(n("removeSelection"))}function o(e,t){return function(n){return t.removeChild(e),n}}function i(){return document.createElement("div")}function a(e,t,n,r){modifyBemClass(e,{"type-animation":defineProperty({},t,!0)},["__","--","-"]),e.style.top=n+"px",e.style.left=r+"px"}function s(){var u=this,y=c(this.model.snippetRaffler),p=c(this.model.appearanceRaffler),g=e(p),h=i(),b=new CodeWriter(h,y);return a(h,p,d(l(b.getHeightInLines(),g)),m(f(b.getWidthInCharacters(),g))),Promise.resolve(b).then(n(h,this.node)).then(r).then(o(h,this.node)).then(t(this.model.snippetRaffler,y)).then(t(this.model.appearanceRaffler,p)).then(function(){return s.call(u)})}function u(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;e>0;e--)s.call(this)}var c=function(e){return e.draw()},l=function(e,t){return e*t*.6*2},f=function(e,t){return e*t*.6},d=function(e){return y(e,"clientHeight")},m=function(e){return y(e,"clientWidth")},y=function(e,t){return Math.round(random(0-.25*e,document.body[t]-.75*e))};return{animate:u}}();var targetNode=document.getElementsByClassName("type-canvas")[0],snippets=['.type--code::after {\n\tcontent: "\\00a0";\n}','<link type="text/css" rel="stylesheet" href="index.css">',"<!DOCTYPE html>",'let getEventName = isActive => isActive ? "active" : "inactive";',".banner__title {\n\tfont-size: 80px;\n\tz-index: 1;\n}","@keyframes blink {\n\tto {\n\t\tvisibility: hidden;\n\t}\n}",'"use strict";',"let getCurrentTimeStamp = () => +new Date();",".menu {\n\tdisplay: flex;\n\tflex-flow: row wrap;\n}","let path = (evt.composedPath && evt.composedPath()) || evt.path;",'if (evt.type === "click") {\n\ttrigger("point");\n}','<meta charset="UTF-8">',"/(?:w+|[.*?]).indexOf(.*?) ?(?:> -1|< 0)/g"],appearances=["smaller","normal","normal","bigger","bigger"],mySnippetRaffler=new Raffler(snippets),myAppearanceRaffler=new Raffler(appearances),poetic=new Codenimation(targetNode,mySnippetRaffler,myAppearanceRaffler);poetic.animate(3);
