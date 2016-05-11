import 'whatwg-fetch'

export default class NutformsApiAspectsSource {

    /**
     * Retriever of aspects definitions from Nutforms Server REST API.
     * @param {string} apiAddress   URL of the API
     * @param {string} apiUser      Name of the API user
     * @param {string} apiPassword  Password of the API user
     */
    constructor(apiAddress, apiUser, apiPassword) {
        this.API_ENDPOINT = 'api/';
        this.RULES_ENDPOINT = 'rules/';
        this.LAYOUT_ENDPOINT = 'layout/';
        this.LOCALIZATION_ENDPOINT = 'localization/';
        this.CLASS_METADATA_ENDPOINT = 'meta/class/';
        this.WIDGET_ENDPOINT = 'widget/';
        this.WIDGET_MAPPING_ENDPOINT = 'widget-mapping/';

        this.apiAddress = apiAddress;
        this.apiUser = apiUser;
        this.apiPassword = apiPassword;

        this._toText = response => response.text();
        this._toJson = response => {
            try {
                return response.json();
            } catch (err) {
                console.log("Error while parsing JSON", response);
                return null;
            }
        };
        this._logResponse = (message) => {
            return response => {
                console.log(message, response);
                return response
            };
        };
    }

    /**
     * Fetches model structure metadata for entity.
     * @param {string} entityName Name of the entity.
     * @returns {Promise}
     */
    fetchStructureMetadata(entityName) {
        return fetch(this._buildUrl(this.CLASS_METADATA_ENDPOINT + entityName))
            .then(this._logResponse("Class metadata loaded from API"))
            .then(this._toJson)
            ;
    }

    /**
     * Fetches values of entity.
     * @param {string} entityName Name of the entity.
     * @param {number} entityId Identifier of the entity.
     * @returns {Promise}
     */
    fetchValues(entityName, entityId) {
        if (entityId === null) {
            return Promise.resolve({});
        }

        return fetch(this._buildUrl(this.API_ENDPOINT + entityName.split(".").pop() + '/' + entityId), {
            headers: {
                Authorization: "Basic " + Base64.encode(this.apiUser + ":" + this.apiPassword)
                , Accept: "application/json;charset=UTF-8"
                , "Content-type": "application/json;charset=UTF-8"
            }
        })
            .then(this._toJson)
            .then(this._logResponse("Entity data loaded from API"))
            ;
    }

    /**
     * Fetches localization aspect data for entity in locale.
     * @param {string} entityName Name of the entity.
     * @param {string} locale Identifier of the locale.
     * @returns {Promise}
     */
    fetchLocalizationData(entityName, locale) {
        return fetch(this._buildUrl(this.LOCALIZATION_ENDPOINT + locale + '/' + entityName + '/new')) // TODO: remove the context
            .then(this._toJson)
            .then(this._logResponse("Localization data loaded from API"))
            ;
    }

    /**
     * Fetches layout definition.
     * @param {string} layoutName Name of the layout.
     * @returns {Promise}
     */
    fetchLayout(layoutName) {
        return fetch(this._buildUrl(this.LAYOUT_ENDPOINT + layoutName))
            .then(this._logResponse("Layout \"" + layoutName + "\" loaded from API"))
            .then(this._toText)
            ;
    }

    /**
     * Fetches widget definition.
     * @param {string} widgetName Name of the widget.
     * @returns {string}
     */
    fetchWidget(widgetName) {
        // TODO: Improvement: make this asynchronous
        var request = new XMLHttpRequest();
        request.open('GET', this._buildUrl(this.WIDGET_ENDPOINT + widgetName), false);  // `false` makes the request synchronous
        request.send(null);
        return request.responseText;
    }

    /**
     * Fetches widget mapping function.
     * @returns {string}
     */
    fetchWidgetMapping() {
        // TODO: Improvement: make this asynchronous
        var request = new XMLHttpRequest();
        request.open('GET', this._buildUrl(this.WIDGET_MAPPING_ENDPOINT), false);  // `false` makes the request synchronous
        request.send(null);
        return request.responseText;
    }

    /**
     * Builds whole URL of the resource for given path.
     *
     * @param {string} path
     * @returns {string}
     * @private
     */
    _buildUrl(path) {
        return this.apiAddress + path;
    }

}

var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) {
        var t = "";
        var n, r, i, s, o, u, a;
        var f = 0;
        e = Base64._utf8_encode(e);
        while (f < e.length) {
            n = e.charCodeAt(f++);
            r = e.charCodeAt(f++);
            i = e.charCodeAt(f++);
            s = n >> 2;
            o = (n & 3) << 4 | r >> 4;
            u = (r & 15) << 2 | i >> 6;
            a = i & 63;
            if (isNaN(r)) {
                u = a = 64
            } else if (isNaN(i)) {
                a = 64
            }
            t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
        }
        return t
    }, decode: function (e) {
        var t = "";
        var n, r, i;
        var s, o, u, a;
        var f = 0;
        e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (f < e.length) {
            s = this._keyStr.indexOf(e.charAt(f++));
            o = this._keyStr.indexOf(e.charAt(f++));
            u = this._keyStr.indexOf(e.charAt(f++));
            a = this._keyStr.indexOf(e.charAt(f++));
            n = s << 2 | o >> 4;
            r = (o & 15) << 4 | u >> 2;
            i = (u & 3) << 6 | a;
            t = t + String.fromCharCode(n);
            if (u != 64) {
                t = t + String.fromCharCode(r)
            }
            if (a != 64) {
                t = t + String.fromCharCode(i)
            }
        }
        t = Base64._utf8_decode(t);
        return t
    }, _utf8_encode: function (e) {
        e = e.replace(/\r\n/g, "\n");
        var t = "";
        for (var n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r)
            } else if (r > 127 && r < 2048) {
                t += String.fromCharCode(r >> 6 | 192);
                t += String.fromCharCode(r & 63 | 128)
            } else {
                t += String.fromCharCode(r >> 12 | 224);
                t += String.fromCharCode(r >> 6 & 63 | 128);
                t += String.fromCharCode(r & 63 | 128)
            }
        }
        return t
    }, _utf8_decode: function (e) {
        var t = "";
        var n = 0;
        var r = c1 = c2 = 0;
        while (n < e.length) {
            r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
                n++
            } else if (r > 191 && r < 224) {
                c2 = e.charCodeAt(n + 1);
                t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                n += 2
            } else {
                c2 = e.charCodeAt(n + 1);
                c3 = e.charCodeAt(n + 2);
                t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                n += 3
            }
        }
        return t
    }
};
