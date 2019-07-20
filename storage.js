/*
* author:
* date: 2/27/18
* desc:
*/

!(function () {
    var UA = navigator.userAgent.toLocaleLowerCase();
    var _storage = window.localStorage;
    // 是否支持 storage
    var _isSupport = function () {
        var _k = '_is_support_storage';
        var result = false;
        try {
            if (typeof _storage == 'object') {
                _storage.setItem && _storage.setItem(_k, _k);
                var t = _storage.getItem && _storage.getItem(_k);
                _storage.removeItem(_k);
                if (t && t == _k) {
                    result = true;
                }
            }
        } catch (e) {

        }
        return result;
    }();

    //
    function _trim(str) {
        var _trim = String.prototype.trim;
        var func = _trim ? function (s) {
            return null === s ? '' : _trim.call(s);
        } : function (s) {
            return null === s ? '' : s.toString().replace(/^\s+/, "").replace(/\s+$/, "");
        };
        return func(str);
    }

    // set/ get  cookie
    function _cookie(key, value, options) {
        if (typeof value !== 'undefined') {
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }

            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var data;
                if (typeof options.expires == 'number') {
                    data = new Date();
                    data.setTime(data.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    data = options.expires;
                }
                expires = "; expires=" + data.toUTCString();
            }
            var path = options.path ? "; path=" + (options.path) : "";
            var domain = options.domain ? "; domain=" + (options.domain) : "";
            var secure = options.secure ? "; secure" : "";
            document.cookie = [key, '=', encodeURIComponent(value), expires, path, domain, secure].join("");
        } else {
            var cookieValue = null;

            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = _trim(cookies[i]);
                    // get
                    if (cookie.substring(0, key.length + 1) === (key + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(key.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    }

    // cookie config
    var _cookieConfig = function () {
        var domain = window.location.hostname;

        return {
            expires: 30, // 30 day
            path: '/',
            domain: domain
        }
    }();


    // 是否app 环境

    var _cookiePre = '_local_cookie_';

    function _canUseLocalStorage() {
        return _isSupport;
    }

    function _setItem(key, value) {
        if (!key) {
            return false;
        }

        if (_canUseLocalStorage()) {
            _storage.setItem(key, value);
        } else {
            _cookie(_cookiePre + key, value, _cookieConfig);
        }
    }

    function _getItem(key) {
        if (!key) {
            return null;
        }

        if (_canUseLocalStorage()) {
            return _storage.getItem(key);
        } else {
            return _cookie(_cookiePre + key);
        }
    }

    function _removeItem(key) {
        if (!key) {
            return null;
        }

        if (_canUseLocalStorage()) {
            _storage.removeItem(key);
        } else {
            _cookie(_cookiePre + key, null, _cookieConfig);
        }
    }

    //
    var storage = {
        setItem: _setItem,
        getItem: _getItem,
        removeItem: _removeItem
    };


    // RequireJS && SeaJS
    if (typeof define === 'function') {
        define(function () {
            return storage;
        });
        // NodeJS
    } else if (typeof exports !== 'undefined') {
        module.exports = storage;
    } else {
        // browser
        window.storage = storage;
    }

})();
