// PouchDB 6.4.3
//
// (c) 2012-2018 Dale Harvey and the PouchDB team
// PouchDB may be freely distributed under the Apache license, version 2.0.
// For all details and documentation:
// http://pouchdb.com
! function(e) {
  if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
  else if ("function" == typeof define && define.amd) define([], e);
  else {
    ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).PouchDB = e()
  }
}(function() {
  return function e(t, n, r) {
    function o(a, s) {
      if (!n[a]) {
        if (!t[a]) {
          var c = "function" == typeof require && require;
          if (!s && c) return c(a, !0);
          if (i) return i(a, !0);
          var u = new Error("Cannot find module '" + a + "'");
          throw u.code = "MODULE_NOT_FOUND", u
        }
        var f = n[a] = {
          exports: {}
        };
        t[a][0].call(f.exports, function(e) {
          var n = t[a][1][e];
          return o(n || e)
        }, f, f.exports, e, t, n, r)
      }
      return n[a].exports
    }
    for (var i = "function" == typeof require && require, a = 0; a < r.length; a++) o(r[a]);
    return o
  }({
    1: [function(e, t, n) {
      "use strict";
      t.exports = function(e) {
        return function() {
          var t = arguments.length;
          if (t) {
            for (var n = [], r = -1; ++r < t;) n[r] = arguments[r];
            return e.call(this, n)
          }
          return e.call(this, [])
        }
      }
    }, {}],
    2: [function(e, t, n) {
      (function(r) {
        function o() {
          var e;
          try {
            e = n.storage.debug
          } catch (e) {}
          return !e && void 0 !== r && "env" in r && (e = r.env.DEBUG), e
        }(n = t.exports = e(3)).log = function() {
          return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
        }, n.formatArgs = function(e) {
          var t = this.useColors;
          if (e[0] = (t ? "%c" : "") + this.namespace + (t ? " %c" : " ") + e[0] + (t ? "%c " : " ") + "+" + n.humanize(this.diff), !t) return;
          var r = "color: " + this.color;
          e.splice(1, 0, r, "color: inherit");
          var o = 0,
            i = 0;
          e[0].replace(/%[a-zA-Z%]/g, function(e) {
            "%%" !== e && "%c" === e && (i = ++o)
          }), e.splice(i, 0, r)
        }, n.save = function(e) {
          try {
            null == e ? n.storage.removeItem("debug") : n.storage.debug = e
          } catch (e) {}
        }, n.load = o, n.useColors = function() {
          if ("undefined" != typeof window && window.process && "renderer" === window.process.type) return !0;
          if ("undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return !1;
          return "undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)
        }, n.storage = "undefined" != typeof chrome && void 0 !== chrome.storage ? chrome.storage.local : function() {
          try {
            return window.localStorage
          } catch (e) {}
        }(), n.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], n.formatters.j = function(e) {
          try {
            return JSON.stringify(e)
          } catch (e) {
            return "[UnexpectedJSONParseError]: " + e.message
          }
        }, n.enable(o())
      }).call(this, e(9))
    }, {
      3: 3,
      9: 9
    }],
    3: [function(e, t, n) {
      function r(e) {
        var t;

        function r() {
          if (r.enabled) {
            var e = r,
              o = +new Date,
              i = o - (t || o);
            e.diff = i, e.prev = t, e.curr = o, t = o;
            for (var a = new Array(arguments.length), s = 0; s < a.length; s++) a[s] = arguments[s];
            a[0] = n.coerce(a[0]), "string" != typeof a[0] && a.unshift("%O");
            var c = 0;
            a[0] = a[0].replace(/%([a-zA-Z%])/g, function(t, r) {
              if ("%%" === t) return t;
              c++;
              var o = n.formatters[r];
              if ("function" == typeof o) {
                var i = a[c];
                t = o.call(e, i), a.splice(c, 1), c--
              }
              return t
            }), n.formatArgs.call(e, a), (r.log || n.log || console.log.bind(console)).apply(e, a)
          }
        }
        return r.namespace = e, r.enabled = n.enabled(e), r.useColors = n.useColors(), r.color = function(e) {
          var t, r = 0;
          for (t in e) r = (r << 5) - r + e.charCodeAt(t), r |= 0;
          return n.colors[Math.abs(r) % n.colors.length]
        }(e), r.destroy = o, "function" == typeof n.init && n.init(r), n.instances.push(r), r
      }

      function o() {
        var e = n.instances.indexOf(this);
        return -1 !== e && (n.instances.splice(e, 1), !0)
      }(n = t.exports = r.debug = r.default = r).coerce = function(e) {
        return e instanceof Error ? e.stack || e.message : e
      }, n.disable = function() {
        n.enable("")
      }, n.enable = function(e) {
        var t;
        n.save(e), n.names = [], n.skips = [];
        var r = ("string" == typeof e ? e : "").split(/[\s,]+/),
          o = r.length;
        for (t = 0; t < o; t++) r[t] && ("-" === (e = r[t].replace(/\*/g, ".*?"))[0] ? n.skips.push(new RegExp("^" + e.substr(1) + "$")) : n.names.push(new RegExp("^" + e + "$")));
        for (t = 0; t < n.instances.length; t++) {
          var i = n.instances[t];
          i.enabled = n.enabled(i.namespace)
        }
      }, n.enabled = function(e) {
        if ("*" === e[e.length - 1]) return !0;
        var t, r;
        for (t = 0, r = n.skips.length; t < r; t++)
          if (n.skips[t].test(e)) return !1;
        for (t = 0, r = n.names.length; t < r; t++)
          if (n.names[t].test(e)) return !0;
        return !1
      }, n.humanize = e(8), n.instances = [], n.names = [], n.skips = [], n.formatters = {}
    }, {
      8: 8
    }],
    4: [function(e, t, n) {
      function r() {
        this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
      }

      function o(e) {
        return "function" == typeof e
      }

      function i(e) {
        return "object" == typeof e && null !== e
      }

      function a(e) {
        return void 0 === e
      }
      t.exports = r, r.EventEmitter = r, r.prototype._events = void 0, r.prototype._maxListeners = void 0, r.defaultMaxListeners = 10, r.prototype.setMaxListeners = function(e) {
        if ("number" != typeof e || e < 0 || isNaN(e)) throw TypeError("n must be a positive number");
        return this._maxListeners = e, this
      }, r.prototype.emit = function(e) {
        var t, n, r, s, c, u;
        if (this._events || (this._events = {}), "error" === e && (!this._events.error || i(this._events.error) && !this._events.error.length)) {
          if ((t = arguments[1]) instanceof Error) throw t;
          var f = new Error('Uncaught, unspecified "error" event. (' + t + ")");
          throw f.context = t, f
        }
        if (a(n = this._events[e])) return !1;
        if (o(n)) switch (arguments.length) {
          case 1:
            n.call(this);
            break;
          case 2:
            n.call(this, arguments[1]);
            break;
          case 3:
            n.call(this, arguments[1], arguments[2]);
            break;
          default:
            s = Array.prototype.slice.call(arguments, 1), n.apply(this, s)
        } else if (i(n))
          for (s = Array.prototype.slice.call(arguments, 1), r = (u = n.slice()).length, c = 0; c < r; c++) u[c].apply(this, s);
        return !0
      }, r.prototype.addListener = function(e, t) {
        var n;
        if (!o(t)) throw TypeError("listener must be a function");
        return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, o(t.listener) ? t.listener : t), this._events[e] ? i(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t, i(this._events[e]) && !this._events[e].warned && (n = a(this._maxListeners) ? r.defaultMaxListeners : this._maxListeners) && n > 0 && this._events[e].length > n && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), "function" == typeof console.trace && console.trace()), this
      }, r.prototype.on = r.prototype.addListener, r.prototype.once = function(e, t) {
        if (!o(t)) throw TypeError("listener must be a function");
        var n = !1;

        function r() {
          this.removeListener(e, r), n || (n = !0, t.apply(this, arguments))
        }
        return r.listener = t, this.on(e, r), this
      }, r.prototype.removeListener = function(e, t) {
        var n, r, a, s;
        if (!o(t)) throw TypeError("listener must be a function");
        if (!this._events || !this._events[e]) return this;
        if (a = (n = this._events[e]).length, r = -1, n === t || o(n.listener) && n.listener === t) delete this._events[e], this._events.removeListener && this.emit("removeListener", e, t);
        else if (i(n)) {
          for (s = a; s-- > 0;)
            if (n[s] === t || n[s].listener && n[s].listener === t) {
              r = s;
              break
            }
          if (r < 0) return this;
          1 === n.length ? (n.length = 0, delete this._events[e]) : n.splice(r, 1), this._events.removeListener && this.emit("removeListener", e, t)
        }
        return this
      }, r.prototype.removeAllListeners = function(e) {
        var t, n;
        if (!this._events) return this;
        if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e], this;
        if (0 === arguments.length) {
          for (t in this._events) "removeListener" !== t && this.removeAllListeners(t);
          return this.removeAllListeners("removeListener"), this._events = {}, this
        }
        if (o(n = this._events[e])) this.removeListener(e, n);
        else if (n)
          for (; n.length;) this.removeListener(e, n[n.length - 1]);
        return delete this._events[e], this
      }, r.prototype.listeners = function(e) {
        return this._events && this._events[e] ? o(this._events[e]) ? [this._events[e]] : this._events[e].slice() : []
      }, r.prototype.listenerCount = function(e) {
        if (this._events) {
          var t = this._events[e];
          if (o(t)) return 1;
          if (t) return t.length
        }
        return 0
      }, r.listenerCount = function(e, t) {
        return e.listenerCount(t)
      }
    }, {}],
    5: [function(e, t, n) {
      (function(e) {
        "use strict";
        var n, r, o = e.MutationObserver || e.WebKitMutationObserver;
        if (o) {
          var i = 0,
            a = new o(f),
            s = e.document.createTextNode("");
          a.observe(s, {
            characterData: !0
          }), n = function() {
            s.data = i = ++i % 2
          }
        } else if (e.setImmediate || void 0 === e.MessageChannel) n = "document" in e && "onreadystatechange" in e.document.createElement("script") ? function() {
          var t = e.document.createElement("script");
          t.onreadystatechange = function() {
            f(), t.onreadystatechange = null, t.parentNode.removeChild(t), t = null
          }, e.document.documentElement.appendChild(t)
        } : function() {
          setTimeout(f, 0)
        };
        else {
          var c = new e.MessageChannel;
          c.port1.onmessage = f, n = function() {
            c.port2.postMessage(0)
          }
        }
        var u = [];

        function f() {
          var e, t;
          r = !0;
          for (var n = u.length; n;) {
            for (t = u, u = [], e = -1; ++e < n;) t[e]();
            n = u.length
          }
          r = !1
        }
        t.exports = function(e) {
          1 !== u.push(e) || r || n()
        }
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    6: [function(e, t, n) {
      "function" == typeof Object.create ? t.exports = function(e, t) {
        e.super_ = t, e.prototype = Object.create(t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })
      } : t.exports = function(e, t) {
        e.super_ = t;
        var n = function() {};
        n.prototype = t.prototype, e.prototype = new n, e.prototype.constructor = e
      }
    }, {}],
    7: [function(e, t, n) {
      "use strict";
      var r = e(5);

      function o() {}
      var i = {},
        a = ["REJECTED"],
        s = ["FULFILLED"],
        c = ["PENDING"];

      function u(e) {
        if ("function" != typeof e) throw new TypeError("resolver must be a function");
        this.state = c, this.queue = [], this.outcome = void 0, e !== o && h(this, e)
      }

      function f(e, t, n) {
        this.promise = e, "function" == typeof t && (this.onFulfilled = t, this.callFulfilled = this.otherCallFulfilled), "function" == typeof n && (this.onRejected = n, this.callRejected = this.otherCallRejected)
      }

      function l(e, t, n) {
        r(function() {
          var r;
          try {
            r = t(n)
          } catch (t) {
            return i.reject(e, t)
          }
          r === e ? i.reject(e, new TypeError("Cannot resolve promise with itself")) : i.resolve(e, r)
        })
      }

      function d(e) {
        var t = e && e.then;
        if (e && ("object" == typeof e || "function" == typeof e) && "function" == typeof t) return function() {
          t.apply(e, arguments)
        }
      }

      function h(e, t) {
        var n = !1;

        function r(t) {
          n || (n = !0, i.reject(e, t))
        }

        function o(t) {
          n || (n = !0, i.resolve(e, t))
        }
        var a = p(function() {
          t(o, r)
        });
        "error" === a.status && r(a.value)
      }

      function p(e, t) {
        var n = {};
        try {
          n.value = e(t), n.status = "success"
        } catch (e) {
          n.status = "error", n.value = e
        }
        return n
      }
      t.exports = u, u.prototype.catch = function(e) {
        return this.then(null, e)
      }, u.prototype.then = function(e, t) {
        if ("function" != typeof e && this.state === s || "function" != typeof t && this.state === a) return this;
        var n = new this.constructor(o);
        this.state !== c ? l(n, this.state === s ? e : t, this.outcome) : this.queue.push(new f(n, e, t));
        return n
      }, f.prototype.callFulfilled = function(e) {
        i.resolve(this.promise, e)
      }, f.prototype.otherCallFulfilled = function(e) {
        l(this.promise, this.onFulfilled, e)
      }, f.prototype.callRejected = function(e) {
        i.reject(this.promise, e)
      }, f.prototype.otherCallRejected = function(e) {
        l(this.promise, this.onRejected, e)
      }, i.resolve = function(e, t) {
        var n = p(d, t);
        if ("error" === n.status) return i.reject(e, n.value);
        var r = n.value;
        if (r) h(e, r);
        else {
          e.state = s, e.outcome = t;
          for (var o = -1, a = e.queue.length; ++o < a;) e.queue[o].callFulfilled(t)
        }
        return e
      }, i.reject = function(e, t) {
        e.state = a, e.outcome = t;
        for (var n = -1, r = e.queue.length; ++n < r;) e.queue[n].callRejected(t);
        return e
      }, u.resolve = function(e) {
        if (e instanceof this) return e;
        return i.resolve(new this(o), e)
      }, u.reject = function(e) {
        var t = new this(o);
        return i.reject(t, e)
      }, u.all = function(e) {
        var t = this;
        if ("[object Array]" !== Object.prototype.toString.call(e)) return this.reject(new TypeError("must be an array"));
        var n = e.length,
          r = !1;
        if (!n) return this.resolve([]);
        var a = new Array(n),
          s = 0,
          c = -1,
          u = new this(o);
        for (; ++c < n;) f(e[c], c);
        return u;

        function f(e, o) {
          t.resolve(e).then(function(e) {
            a[o] = e, ++s !== n || r || (r = !0, i.resolve(u, a))
          }, function(e) {
            r || (r = !0, i.reject(u, e))
          })
        }
      }, u.race = function(e) {
        var t = this;
        if ("[object Array]" !== Object.prototype.toString.call(e)) return this.reject(new TypeError("must be an array"));
        var n = e.length,
          r = !1;
        if (!n) return this.resolve([]);
        var a = -1,
          s = new this(o);
        for (; ++a < n;) c = e[a], t.resolve(c).then(function(e) {
          r || (r = !0, i.resolve(s, e))
        }, function(e) {
          r || (r = !0, i.reject(s, e))
        });
        var c;
        return s
      }
    }, {
      5: 5
    }],
    8: [function(e, t, n) {
      var r = 1e3,
        o = 60 * r,
        i = 60 * o,
        a = 24 * i,
        s = 365.25 * a;

      function c(e, t, n) {
        if (!(e < t)) return e < 1.5 * t ? Math.floor(e / t) + " " + n : Math.ceil(e / t) + " " + n + "s"
      }
      t.exports = function(e, t) {
        t = t || {};
        var n, u = typeof e;
        if ("string" === u && e.length > 0) return function(e) {
          if ((e = String(e)).length > 100) return;
          var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);
          if (!t) return;
          var n = parseFloat(t[1]);
          switch ((t[2] || "ms").toLowerCase()) {
            case "years":
            case "year":
            case "yrs":
            case "yr":
            case "y":
              return n * s;
            case "days":
            case "day":
            case "d":
              return n * a;
            case "hours":
            case "hour":
            case "hrs":
            case "hr":
            case "h":
              return n * i;
            case "minutes":
            case "minute":
            case "mins":
            case "min":
            case "m":
              return n * o;
            case "seconds":
            case "second":
            case "secs":
            case "sec":
            case "s":
              return n * r;
            case "milliseconds":
            case "millisecond":
            case "msecs":
            case "msec":
            case "ms":
              return n;
            default:
              return
          }
        }(e);
        if ("number" === u && !1 === isNaN(e)) return t.long ? c(n = e, a, "day") || c(n, i, "hour") || c(n, o, "minute") || c(n, r, "second") || n + " ms" : function(e) {
          if (e >= a) return Math.round(e / a) + "d";
          if (e >= i) return Math.round(e / i) + "h";
          if (e >= o) return Math.round(e / o) + "m";
          if (e >= r) return Math.round(e / r) + "s";
          return e + "ms"
        }(e);
        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e))
      }
    }, {}],
    9: [function(e, t, n) {
      var r, o, i = t.exports = {};

      function a() {
        throw new Error("setTimeout has not been defined")
      }

      function s() {
        throw new Error("clearTimeout has not been defined")
      }

      function c(e) {
        if (r === setTimeout) return setTimeout(e, 0);
        if ((r === a || !r) && setTimeout) return r = setTimeout, setTimeout(e, 0);
        try {
          return r(e, 0)
        } catch (t) {
          try {
            return r.call(null, e, 0)
          } catch (t) {
            return r.call(this, e, 0)
          }
        }
      }! function() {
        try {
          r = "function" == typeof setTimeout ? setTimeout : a
        } catch (e) {
          r = a
        }
        try {
          o = "function" == typeof clearTimeout ? clearTimeout : s
        } catch (e) {
          o = s
        }
      }();
      var u, f = [],
        l = !1,
        d = -1;

      function h() {
        l && u && (l = !1, u.length ? f = u.concat(f) : d = -1, f.length && p())
      }

      function p() {
        if (!l) {
          var e = c(h);
          l = !0;
          for (var t = f.length; t;) {
            for (u = f, f = []; ++d < t;) u && u[d].run();
            d = -1, t = f.length
          }
          u = null, l = !1,
            function(e) {
              if (o === clearTimeout) return clearTimeout(e);
              if ((o === s || !o) && clearTimeout) return o = clearTimeout, clearTimeout(e);
              try {
                o(e)
              } catch (t) {
                try {
                  return o.call(null, e)
                } catch (t) {
                  return o.call(this, e)
                }
              }
            }(e)
        }
      }

      function v(e, t) {
        this.fun = e, this.array = t
      }

      function g() {}
      i.nextTick = function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)
          for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        f.push(new v(e, t)), 1 !== f.length || l || c(p)
      }, v.prototype.run = function() {
        this.fun.apply(null, this.array)
      }, i.title = "browser", i.browser = !0, i.env = {}, i.argv = [], i.version = "", i.versions = {}, i.on = g, i.addListener = g, i.once = g, i.off = g, i.removeListener = g, i.removeAllListeners = g, i.emit = g, i.prependListener = g, i.prependOnceListener = g, i.listeners = function(e) {
        return []
      }, i.binding = function(e) {
        throw new Error("process.binding is not supported")
      }, i.cwd = function() {
        return "/"
      }, i.chdir = function(e) {
        throw new Error("process.chdir is not supported")
      }, i.umask = function() {
        return 0
      }
    }, {}],
    10: [function(e, t, n) {
      ! function(e) {
        if ("object" == typeof n) t.exports = e();
        else {
          var r;
          try {
            r = window
          } catch (e) {
            r = self
          }
          r.SparkMD5 = e()
        }
      }(function(e) {
        "use strict";
        var t = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

        function n(e, t) {
          var n = e[0],
            r = e[1],
            o = e[2],
            i = e[3];
          r = ((r += ((o = ((o += ((i = ((i += ((n = ((n += (r & o | ~r & i) + t[0] - 680876936 | 0) << 7 | n >>> 25) + r | 0) & r | ~n & o) + t[1] - 389564586 | 0) << 12 | i >>> 20) + n | 0) & n | ~i & r) + t[2] + 606105819 | 0) << 17 | o >>> 15) + i | 0) & i | ~o & n) + t[3] - 1044525330 | 0) << 22 | r >>> 10) + o | 0, r = ((r += ((o = ((o += ((i = ((i += ((n = ((n += (r & o | ~r & i) + t[4] - 176418897 | 0) << 7 | n >>> 25) + r | 0) & r | ~n & o) + t[5] + 1200080426 | 0) << 12 | i >>> 20) + n | 0) & n | ~i & r) + t[6] - 1473231341 | 0) << 17 | o >>> 15) + i | 0) & i | ~o & n) + t[7] - 45705983 | 0) << 22 | r >>> 10) + o | 0, r = ((r += ((o = ((o += ((i = ((i += ((n = ((n += (r & o | ~r & i) + t[8] + 1770035416 | 0) << 7 | n >>> 25) + r | 0) & r | ~n & o) + t[9] - 1958414417 | 0) << 12 | i >>> 20) + n | 0) & n | ~i & r) + t[10] - 42063 | 0) << 17 | o >>> 15) + i | 0) & i | ~o & n) + t[11] - 1990404162 | 0) << 22 | r >>> 10) + o | 0, r = ((r += ((o = ((o += ((i = ((i += ((n = ((n += (r & o | ~r & i) + t[12] + 1804603682 | 0) << 7 | n >>> 25) + r | 0) & r | ~n & o) + t[13] - 40341101 | 0) << 12 | i >>> 20) + n | 0) & n | ~i & r) + t[14] - 1502002290 | 0) << 17 | o >>> 15) + i | 0) & i | ~o & n) + t[15] + 1236535329 | 0) << 22 | r >>> 10) + o | 0, r = ((r += ((o = ((o += ((i = ((i += ((n = ((n += (r & i | o & ~i) + t[1] - 165796510 | 0) << 5 | n >>> 27) + r | 0) & o | r & ~o) + t[6] - 1069501632 | 0) << 9 | i >>> 23) + n | 0) & r | n & ~r) + t[11] + 643717713 | 0) << 14 | o >>> 18) + i | 0) & n | i & ~n) + t[0] - 373897302 | 0) << 20 | r >>> 12) + o | 0, r = ((r += ((o = ((o += ((i = ((i += ((n = ((n += (r & i | o & ~i) + t[5] - 701558691 | 0) << 5 | n >>> 27) + r | 0) & o | r & ~o) + t[10] + 38016083 | 0) << 9 | i >>> 23) + n | 0) & r | n & ~r) + t[15] - 660478335 | 0) << 14 | o >>> 18) + i | 0) & n | i & ~n) + t[4] - 405537848 | 0) << 20 | r >>> 12) + o | 0, r = ((r += ((o = ((o += ((i = ((i += ((n = ((n += (r & i | o & ~i) + t[9] + 568446438 | 0) << 5 | n >>> 27) + r | 0) & o | r & ~o) + t[14] - 1019803690 | 0) << 9 | i >>> 23) + n | 0) & r | n & ~r) + t[3] - 187363961 | 0) << 14 | o >>> 18) + i | 0) & n | i & ~n) + t[8] + 1163531501 | 0) << 20 | r >>> 12) + o | 0, r = ((r += ((o = ((o += ((i = ((i += ((n = ((n += (r & i | o & ~i) + t[13] - 1444681467 | 0) << 5 | n >>> 27) + r | 0) & o | r & ~o) + t[2] - 51403784 | 0) << 9 | i >>> 23) + n | 0) & r | n & ~r) + t[7] + 1735328473 | 0) << 14 | o >>> 18) + i | 0) & n | i & ~n) + t[12] - 1926607734 | 0) << 20 | r >>> 12) + o | 0, r = ((r += ((o = ((o += ((i = ((i += ((n = ((n += (r ^ o ^ i) + t[5] - 378558 | 0) << 4 | n >>> 28) + r | 0) ^ r ^ o) + t[8] - 2022574463 | 0) << 11 | i >>> 21) + n | 0) ^ n ^ r) + t[11] + 1839030562 | 0) << 16 | o >>> 16) + i | 0) ^ i ^ n) + t[14] - 35309556 | 0) << 23 | r >>> 9) + o | 0, r = ((r += ((o = ((o += ((i = ((i += ((n = ((n += (r ^ o ^ i) + t[1] - 1530992060 | 0) << 4 | n >>> 28) + r | 0) ^ r ^ o) + t[4] + 1272893353 | 0) << 11 | i >>> 21) + n | 0) ^ n ^ r) + t[7] - 155497632 | 0) << 16 | o >>> 16) + i | 0) ^ i ^ n) + t[10] - 1094730640 | 0) << 23 | r >>> 9) + o | 0, r = ((r += ((o = ((o += ((i = ((i += ((n = ((n += (r ^ o ^ i) + t[13] + 681279174 | 0) << 4 | n >>> 28) + r | 0) ^ r ^ o) + t[0] - 358537222 | 0) << 11 | i >>> 21) + n | 0) ^ n ^ r) + t[3] - 722521979 | 0) << 16 | o >>> 16) + i | 0) ^ i ^ n) + t[6] + 76029189 | 0) << 23 | r >>> 9) + o | 0, r = ((r += ((o = ((o += ((i = ((i += ((n = ((n += (r ^ o ^ i) + t[9] - 640364487 | 0) << 4 | n >>> 28) + r | 0) ^ r ^ o) + t[12] - 421815835 | 0) << 11 | i >>> 21) + n | 0) ^ n ^ r) + t[15] + 530742520 | 0) << 16 | o >>> 16) + i | 0) ^ i ^ n) + t[2] - 995338651 | 0) << 23 | r >>> 9) + o | 0, r = ((r += ((i = ((i += (r ^ ((n = ((n += (o ^ (r | ~i)) + t[0] - 198630844 | 0) << 6 | n >>> 26) + r | 0) | ~o)) + t[7] + 1126891415 | 0) << 10 | i >>> 22) + n | 0) ^ ((o = ((o += (n ^ (i | ~r)) + t[14] - 1416354905 | 0) << 15 | o >>> 17) + i | 0) | ~n)) + t[5] - 57434055 | 0) << 21 | r >>> 11) + o | 0, r = ((r += ((i = ((i += (r ^ ((n = ((n += (o ^ (r | ~i)) + t[12] + 1700485571 | 0) << 6 | n >>> 26) + r | 0) | ~o)) + t[3] - 1894986606 | 0) << 10 | i >>> 22) + n | 0) ^ ((o = ((o += (n ^ (i | ~r)) + t[10] - 1051523 | 0) << 15 | o >>> 17) + i | 0) | ~n)) + t[1] - 2054922799 | 0) << 21 | r >>> 11) + o | 0, r = ((r += ((i = ((i += (r ^ ((n = ((n += (o ^ (r | ~i)) + t[8] + 1873313359 | 0) << 6 | n >>> 26) + r | 0) | ~o)) + t[15] - 30611744 | 0) << 10 | i >>> 22) + n | 0) ^ ((o = ((o += (n ^ (i | ~r)) + t[6] - 1560198380 | 0) << 15 | o >>> 17) + i | 0) | ~n)) + t[13] + 1309151649 | 0) << 21 | r >>> 11) + o | 0, r = ((r += ((i = ((i += (r ^ ((n = ((n += (o ^ (r | ~i)) + t[4] - 145523070 | 0) << 6 | n >>> 26) + r | 0) | ~o)) + t[11] - 1120210379 | 0) << 10 | i >>> 22) + n | 0) ^ ((o = ((o += (n ^ (i | ~r)) + t[2] + 718787259 | 0) << 15 | o >>> 17) + i | 0) | ~n)) + t[9] - 343485551 | 0) << 21 | r >>> 11) + o | 0, e[0] = n + e[0] | 0, e[1] = r + e[1] | 0, e[2] = o + e[2] | 0, e[3] = i + e[3] | 0
        }

        function r(e) {
          var t, n = [];
          for (t = 0; t < 64; t += 4) n[t >> 2] = e.charCodeAt(t) + (e.charCodeAt(t + 1) << 8) + (e.charCodeAt(t + 2) << 16) + (e.charCodeAt(t + 3) << 24);
          return n
        }

        function o(e) {
          var t, n = [];
          for (t = 0; t < 64; t += 4) n[t >> 2] = e[t] + (e[t + 1] << 8) + (e[t + 2] << 16) + (e[t + 3] << 24);
          return n
        }

        function i(e) {
          var t, o, i, a, s, c, u = e.length,
            f = [1732584193, -271733879, -1732584194, 271733878];
          for (t = 64; t <= u; t += 64) n(f, r(e.substring(t - 64, t)));
          for (o = (e = e.substring(t - 64)).length, i = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], t = 0; t < o; t += 1) i[t >> 2] |= e.charCodeAt(t) << (t % 4 << 3);
          if (i[t >> 2] |= 128 << (t % 4 << 3), t > 55)
            for (n(f, i), t = 0; t < 16; t += 1) i[t] = 0;
          return a = (a = 8 * u).toString(16).match(/(.*?)(.{0,8})$/), s = parseInt(a[2], 16), c = parseInt(a[1], 16) || 0, i[14] = s, i[15] = c, n(f, i), f
        }

        function a(e) {
          var n, r = "";
          for (n = 0; n < 4; n += 1) r += t[e >> 8 * n + 4 & 15] + t[e >> 8 * n & 15];
          return r
        }

        function s(e) {
          var t;
          for (t = 0; t < e.length; t += 1) e[t] = a(e[t]);
          return e.join("")
        }

        function c(e) {
          return /[\u0080-\uFFFF]/.test(e) && (e = unescape(encodeURIComponent(e))), e
        }

        function u(e) {
          var t, n = [],
            r = e.length;
          for (t = 0; t < r - 1; t += 2) n.push(parseInt(e.substr(t, 2), 16));
          return String.fromCharCode.apply(String, n)
        }

        function f() {
          this.reset()
        }
        return "5d41402abc4b2a76b9719d911017c592" !== s(i("hello")) && function(e, t) {
          var n = (65535 & e) + (65535 & t);
          return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n
        }, "undefined" == typeof ArrayBuffer || ArrayBuffer.prototype.slice || function() {
          function t(e, t) {
            return (e = 0 | e || 0) < 0 ? Math.max(e + t, 0) : Math.min(e, t)
          }
          ArrayBuffer.prototype.slice = function(n, r) {
            var o, i, a, s, c = this.byteLength,
              u = t(n, c),
              f = c;
            return r !== e && (f = t(r, c)), u > f ? new ArrayBuffer(0) : (o = f - u, i = new ArrayBuffer(o), a = new Uint8Array(i), s = new Uint8Array(this, u, o), a.set(s), i)
          }
        }(), f.prototype.append = function(e) {
          return this.appendBinary(c(e)), this
        }, f.prototype.appendBinary = function(e) {
          this._buff += e, this._length += e.length;
          var t, o = this._buff.length;
          for (t = 64; t <= o; t += 64) n(this._hash, r(this._buff.substring(t - 64, t)));
          return this._buff = this._buff.substring(t - 64), this
        }, f.prototype.end = function(e) {
          var t, n, r = this._buff,
            o = r.length,
            i = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          for (t = 0; t < o; t += 1) i[t >> 2] |= r.charCodeAt(t) << (t % 4 << 3);
          return this._finish(i, o), n = s(this._hash), e && (n = u(n)), this.reset(), n
        }, f.prototype.reset = function() {
          return this._buff = "", this._length = 0, this._hash = [1732584193, -271733879, -1732584194, 271733878], this
        }, f.prototype.getState = function() {
          return {
            buff: this._buff,
            length: this._length,
            hash: this._hash
          }
        }, f.prototype.setState = function(e) {
          return this._buff = e.buff, this._length = e.length, this._hash = e.hash, this
        }, f.prototype.destroy = function() {
          delete this._hash, delete this._buff, delete this._length
        }, f.prototype._finish = function(e, t) {
          var r, o, i, a = t;
          if (e[a >> 2] |= 128 << (a % 4 << 3), a > 55)
            for (n(this._hash, e), a = 0; a < 16; a += 1) e[a] = 0;
          r = (r = 8 * this._length).toString(16).match(/(.*?)(.{0,8})$/), o = parseInt(r[2], 16), i = parseInt(r[1], 16) || 0, e[14] = o, e[15] = i, n(this._hash, e)
        }, f.hash = function(e, t) {
          return f.hashBinary(c(e), t)
        }, f.hashBinary = function(e, t) {
          var n = s(i(e));
          return t ? u(n) : n
        }, f.ArrayBuffer = function() {
          this.reset()
        }, f.ArrayBuffer.prototype.append = function(e) {
          var t, r, i, a, s, c = (r = this._buff.buffer, i = e, a = !0, (s = new Uint8Array(r.byteLength + i.byteLength)).set(new Uint8Array(r)), s.set(new Uint8Array(i), r.byteLength), a ? s : s.buffer),
            u = c.length;
          for (this._length += e.byteLength, t = 64; t <= u; t += 64) n(this._hash, o(c.subarray(t - 64, t)));
          return this._buff = t - 64 < u ? new Uint8Array(c.buffer.slice(t - 64)) : new Uint8Array(0), this
        }, f.ArrayBuffer.prototype.end = function(e) {
          var t, n, r = this._buff,
            o = r.length,
            i = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          for (t = 0; t < o; t += 1) i[t >> 2] |= r[t] << (t % 4 << 3);
          return this._finish(i, o), n = s(this._hash), e && (n = u(n)), this.reset(), n
        }, f.ArrayBuffer.prototype.reset = function() {
          return this._buff = new Uint8Array(0), this._length = 0, this._hash = [1732584193, -271733879, -1732584194, 271733878], this
        }, f.ArrayBuffer.prototype.getState = function() {
          var e, t = f.prototype.getState.call(this);
          return t.buff = (e = t.buff, String.fromCharCode.apply(null, new Uint8Array(e))), t
        }, f.ArrayBuffer.prototype.setState = function(e) {
          return e.buff = function(e, t) {
            var n, r = e.length,
              o = new ArrayBuffer(r),
              i = new Uint8Array(o);
            for (n = 0; n < r; n += 1) i[n] = e.charCodeAt(n);
            return t ? i : o
          }(e.buff, !0), f.prototype.setState.call(this, e)
        }, f.ArrayBuffer.prototype.destroy = f.prototype.destroy, f.ArrayBuffer.prototype._finish = f.prototype._finish, f.ArrayBuffer.hash = function(e, t) {
          var r = s(function(e) {
            var t, r, i, a, s, c, u = e.length,
              f = [1732584193, -271733879, -1732584194, 271733878];
            for (t = 64; t <= u; t += 64) n(f, o(e.subarray(t - 64, t)));
            for (r = (e = t - 64 < u ? e.subarray(t - 64) : new Uint8Array(0)).length, i = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], t = 0; t < r; t += 1) i[t >> 2] |= e[t] << (t % 4 << 3);
            if (i[t >> 2] |= 128 << (t % 4 << 3), t > 55)
              for (n(f, i), t = 0; t < 16; t += 1) i[t] = 0;
            return a = (a = 8 * u).toString(16).match(/(.*?)(.{0,8})$/), s = parseInt(a[2], 16), c = parseInt(a[1], 16) || 0, i[14] = s, i[15] = c, n(f, i), f
          }(new Uint8Array(e)));
          return t ? u(r) : r
        }, f
      })
    }, {}],
    11: [function(e, t, n) {
      var r = e(14),
        o = e(15),
        i = o;
      i.v1 = r, i.v4 = o, t.exports = i
    }, {
      14: 14,
      15: 15
    }],
    12: [function(e, t, n) {
      for (var r = [], o = 0; o < 256; ++o) r[o] = (o + 256).toString(16).substr(1);
      t.exports = function(e, t) {
        var n = t || 0,
          o = r;
        return o[e[n++]] + o[e[n++]] + o[e[n++]] + o[e[n++]] + "-" + o[e[n++]] + o[e[n++]] + "-" + o[e[n++]] + o[e[n++]] + "-" + o[e[n++]] + o[e[n++]] + "-" + o[e[n++]] + o[e[n++]] + o[e[n++]] + o[e[n++]] + o[e[n++]] + o[e[n++]]
      }
    }, {}],
    13: [function(e, t, n) {
      var r = "undefined" != typeof crypto && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && msCrypto.getRandomValues.bind(msCrypto);
      if (r) {
        var o = new Uint8Array(16);
        t.exports = function() {
          return r(o), o
        }
      } else {
        var i = new Array(16);
        t.exports = function() {
          for (var e, t = 0; t < 16; t++) 0 == (3 & t) && (e = 4294967296 * Math.random()), i[t] = e >>> ((3 & t) << 3) & 255;
          return i
        }
      }
    }, {}],
    14: [function(e, t, n) {
      var r, o, i = e(13),
        a = e(12),
        s = 0,
        c = 0;
      t.exports = function(e, t, n) {
        var u = t && n || 0,
          f = t || [],
          l = (e = e || {}).node || r,
          d = void 0 !== e.clockseq ? e.clockseq : o;
        if (null == l || null == d) {
          var h = i();
          null == l && (l = r = [1 | h[0], h[1], h[2], h[3], h[4], h[5]]), null == d && (d = o = 16383 & (h[6] << 8 | h[7]))
        }
        var p = void 0 !== e.msecs ? e.msecs : (new Date).getTime(),
          v = void 0 !== e.nsecs ? e.nsecs : c + 1,
          g = p - s + (v - c) / 1e4;
        if (g < 0 && void 0 === e.clockseq && (d = d + 1 & 16383), (g < 0 || p > s) && void 0 === e.nsecs && (v = 0), v >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
        s = p, c = v, o = d;
        var y = (1e4 * (268435455 & (p += 122192928e5)) + v) % 4294967296;
        f[u++] = y >>> 24 & 255, f[u++] = y >>> 16 & 255, f[u++] = y >>> 8 & 255, f[u++] = 255 & y;
        var _ = p / 4294967296 * 1e4 & 268435455;
        f[u++] = _ >>> 8 & 255, f[u++] = 255 & _, f[u++] = _ >>> 24 & 15 | 16, f[u++] = _ >>> 16 & 255, f[u++] = d >>> 8 | 128, f[u++] = 255 & d;
        for (var m = 0; m < 6; ++m) f[u + m] = l[m];
        return t || a(f)
      }
    }, {
      12: 12,
      13: 13
    }],
    15: [function(e, t, n) {
      var r = e(13),
        o = e(12);
      t.exports = function(e, t, n) {
        var i = t && n || 0;
        "string" == typeof e && (t = "binary" === e ? new Array(16) : null, e = null);
        var a = (e = e || {}).random || (e.rng || r)();
        if (a[6] = 15 & a[6] | 64, a[8] = 63 & a[8] | 128, t)
          for (var s = 0; s < 16; ++s) t[i + s] = a[s];
        return t || o(a)
      }
    }, {
      12: 12,
      13: 13
    }],
    16: [function(e, t, n) {
      "use strict";

      function r(e, t, n) {
        var r = n[n.length - 1];
        e === r.element && (n.pop(), r = n[n.length - 1]);
        var o = r.element,
          i = r.index;
        if (Array.isArray(o)) o.push(e);
        else if (i === t.length - 2) {
          o[t.pop()] = e
        } else t.push(e)
      }
      n.stringify = function(e) {
        var t = [];
        t.push({
          obj: e
        });
        for (var n, r, o, i, a, s, c, u, f, l, d = ""; n = t.pop();)
          if (r = n.obj, d += n.prefix || "", o = n.val || "") d += o;
          else if ("object" != typeof r) d += void 0 === r ? null : JSON.stringify(r);
        else if (null === r) d += "null";
        else if (Array.isArray(r)) {
          for (t.push({
              val: "]"
            }), i = r.length - 1; i >= 0; i--) a = 0 === i ? "" : ",", t.push({
            obj: r[i],
            prefix: a
          });
          t.push({
            val: "["
          })
        } else {
          for (c in s = [], r) r.hasOwnProperty(c) && s.push(c);
          for (t.push({
              val: "}"
            }), i = s.length - 1; i >= 0; i--) f = r[u = s[i]], l = i > 0 ? "," : "", l += JSON.stringify(u) + ":", t.push({
            obj: f,
            prefix: l
          });
          t.push({
            val: "{"
          })
        }
        return d
      }, n.parse = function(e) {
        for (var t, n, o, i, a, s, c, u, f, l = [], d = [], h = 0;;)
          if ("}" !== (t = e[h++]) && "]" !== t && void 0 !== t) switch (t) {
            case " ":
            case "\t":
            case "\n":
            case ":":
            case ",":
              break;
            case "n":
              h += 3, r(null, l, d);
              break;
            case "t":
              h += 3, r(!0, l, d);
              break;
            case "f":
              h += 4, r(!1, l, d);
              break;
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
            case "-":
              for (n = "", h--;;) {
                if (o = e[h++], !/[\d\.\-e\+]/.test(o)) {
                  h--;
                  break
                }
                n += o
              }
              r(parseFloat(n), l, d);
              break;
            case '"':
              for (i = "", a = void 0, s = 0;
                '"' !== (c = e[h++]) || "\\" === a && s % 2 == 1;) i += c, "\\" === (a = c) ? s++ : s = 0;
              r(JSON.parse('"' + i + '"'), l, d);
              break;
            case "[":
              u = {
                element: [],
                index: l.length
              }, l.push(u.element), d.push(u);
              break;
            case "{":
              f = {
                element: {},
                index: l.length
              }, l.push(f.element), d.push(f);
              break;
            default:
              throw new Error("unexpectedly reached end of input: " + t)
          } else {
            if (1 === l.length) return l.pop();
            r(l.pop(), l, d)
          }
      }
    }, {}],
    17: [function(e, t, n) {
      (function(n) {
        "use strict";

        function r(e) {
          return e && "object" == typeof e && "default" in e ? e.default : e
        }
        var o = r(e(7)),
          i = r(e(1)),
          a = r(e(5)),
          s = e(4),
          c = r(e(6)),
          u = r(e(11)),
          f = r(e(2)),
          l = r(e(10)),
          d = r(e(16)),
          h = "function" == typeof Promise ? Promise : o;

        function p(e) {
          if (e instanceof ArrayBuffer) return function(e) {
            if ("function" == typeof e.slice) return e.slice(0);
            var t = new ArrayBuffer(e.byteLength),
              n = new Uint8Array(t),
              r = new Uint8Array(e);
            return n.set(r), t
          }(e);
          var t = e.size,
            n = e.type;
          return "function" == typeof e.slice ? e.slice(0, t, n) : e.webkitSlice(0, t, n)
        }
        var v, g, y = Function.prototype.toString,
          _ = y.call(Object);

        function m(e) {
          var t, n, r, o;
          if (!e || "object" != typeof e) return e;
          if (Array.isArray(e)) {
            for (t = [], n = 0, r = e.length; n < r; n++) t[n] = m(e[n]);
            return t
          }
          if (e instanceof Date) return e.toISOString();
          if (o = e, "undefined" != typeof ArrayBuffer && o instanceof ArrayBuffer || "undefined" != typeof Blob && o instanceof Blob) return p(e);
          if (! function(e) {
              var t = Object.getPrototypeOf(e);
              if (null === t) return !0;
              var n = t.constructor;
              return "function" == typeof n && n instanceof n && y.call(n) == _
            }(e)) return e;
          for (n in t = {}, e)
            if (Object.prototype.hasOwnProperty.call(e, n)) {
              var i = m(e[n]);
              void 0 !== i && (t[n] = i)
            }
          return t
        }

        function b(e) {
          var t = !1;
          return i(function(n) {
            if (t) throw new Error("once called more than once");
            t = !0, e.apply(this, n)
          })
        }

        function w(e) {
          return i(function(t) {
            var n = this,
              r = "function" == typeof(t = m(t))[t.length - 1] && t.pop(),
              o = new h(function(r, o) {
                var i;
                try {
                  var a = b(function(e, t) {
                    e ? o(e) : r(t)
                  });
                  t.push(a), (i = e.apply(n, t)) && "function" == typeof i.then && r(i)
                } catch (e) {
                  o(e)
                }
              });
            return r && o.then(function(e) {
              r(null, e)
            }, r), o
          })
        }

        function E(e, t) {
          return w(i(function(n) {
            if (this._closed) return h.reject(new Error("database is closed"));
            if (this._destroyed) return h.reject(new Error("database is destroyed"));
            var r = this;
            return function(e, t, n) {
              if (e.constructor.listeners("debug").length) {
                for (var r = ["api", e.name, t], o = 0; o < n.length - 1; o++) r.push(n[o]);
                e.constructor.emit("debug", r);
                var i = n[n.length - 1];
                n[n.length - 1] = function(n, r) {
                  var o = ["api", e.name, t];
                  o = o.concat(n ? ["error", n] : ["success", r]), e.constructor.emit("debug", o), i(n, r)
                }
              }
            }(r, e, n), this.taskqueue.isReady ? t.apply(this, n) : new h(function(t, o) {
              r.taskqueue.addTask(function(i) {
                i ? o(i) : t(r[e].apply(r, n))
              })
            })
          }))
        }

        function k(e) {
          return "$" + e
        }

        function S() {
          this._store = {}
        }

        function q(e) {
          if (this._store = new S, e && Array.isArray(e))
            for (var t = 0, n = e.length; t < n; t++) this.add(e[t])
        }

        function C(e, t) {
          for (var n = {}, r = 0, o = t.length; r < o; r++) {
            var i = t[r];
            i in e && (n[i] = e[i])
          }
          return n
        }
        S.prototype.get = function(e) {
          var t = k(e);
          return this._store[t]
        }, S.prototype.set = function(e, t) {
          var n = k(e);
          return this._store[n] = t, !0
        }, S.prototype.has = function(e) {
          return k(e) in this._store
        }, S.prototype.delete = function(e) {
          var t = k(e),
            n = t in this._store;
          return delete this._store[t], n
        }, S.prototype.forEach = function(e) {
          for (var t = Object.keys(this._store), n = 0, r = t.length; n < r; n++) {
            var o = t[n];
            e(this._store[o], o = o.substring(1))
          }
        }, Object.defineProperty(S.prototype, "size", {
          get: function() {
            return Object.keys(this._store).length
          }
        }), q.prototype.add = function(e) {
          return this._store.set(e, !0)
        }, q.prototype.has = function(e) {
          return this._store.has(e)
        }, q.prototype.forEach = function(e) {
          this._store.forEach(function(t, n) {
            e(n)
          })
        }, Object.defineProperty(q.prototype, "size", {
          get: function() {
            return this._store.size
          }
        }), ! function() {
          if ("undefined" == typeof Symbol || "undefined" == typeof Map || "undefined" == typeof Set) return !1;
          var e = Object.getOwnPropertyDescriptor(Map, Symbol.species);
          return e && "get" in e && Map[Symbol.species] === Map
        }() ? (v = q, g = S) : (v = Set, g = Map);
        var A, x = 6;

        function T(e) {
          return e
        }

        function O(e) {
          return [{
            ok: e
          }]
        }

        function j(e, t, n) {
          var r = t.docs,
            o = new g;
          r.forEach(function(e) {
            o.has(e.id) ? o.get(e.id).push(e) : o.set(e.id, [e])
          });
          var i = o.size,
            a = 0,
            s = new Array(i);

          function c() {
            var e;
            ++a === i && (e = [], s.forEach(function(t) {
              t.docs.forEach(function(n) {
                e.push({
                  id: t.id,
                  docs: [n]
                })
              })
            }), n(null, {
              results: e
            }))
          }
          var u = [];
          o.forEach(function(e, t) {
            u.push(t)
          });
          var f = 0;

          function l() {
            if (!(f >= u.length)) {
              var n, r = Math.min(f + x, u.length),
                i = u.slice(f, r);
              n = f, i.forEach(function(r, i) {
                var a = n + i,
                  u = o.get(r),
                  f = C(u[0], ["atts_since", "attachments"]);
                f.open_revs = u.map(function(e) {
                  return e.rev
                }), f.open_revs = f.open_revs.filter(T);
                var d = T;
                0 === f.open_revs.length && (delete f.open_revs, d = O), ["revs", "attachments", "binary", "ajax", "latest"].forEach(function(e) {
                  e in t && (f[e] = t[e])
                }), e.get(r, f, function(e, t) {
                  var n, o, i;
                  n = e ? [{
                    error: e
                  }] : d(t), o = r, i = n, s[a] = {
                    id: o,
                    docs: i
                  }, c(), l()
                })
              }), f += i.length
            }
          }
          l()
        }

        function L() {
          return "undefined" != typeof chrome && void 0 !== chrome.storage && void 0 !== chrome.storage.local
        }
        if (L()) A = !1;
        else try {
          localStorage.setItem("_pouch_check_localstorage", 1), A = !!localStorage.getItem("_pouch_check_localstorage")
        } catch (e) {
          A = !1
        }

        function I() {
          return A
        }

        function D() {
          var e;
          s.EventEmitter.call(this), this._listeners = {}, e = this, L() ? chrome.storage.onChanged.addListener(function(t) {
            null != t.db_name && e.emit(t.dbName.newValue)
          }) : I() && ("undefined" != typeof addEventListener ? addEventListener("storage", function(t) {
            e.emit(t.key)
          }) : window.attachEvent("storage", function(t) {
            e.emit(t.key)
          }))
        }

        function R(e) {
          if ("undefined" != typeof console && "function" == typeof console[e]) {
            var t = Array.prototype.slice.call(arguments, 1);
            console[e].apply(console, t)
          }
        }

        function F(e) {
          var t, n, r = 0;
          return e || (r = 2e3), t = e, n = r, t = parseInt(t, 10) || 0, (n = parseInt(n, 10)) != n || n <= t ? n = (t || 1) << 1 : n += 1, n > 6e5 && (t = 3e5, n = 6e5), ~~((n - t) * Math.random() + t)
        }

        function N(e, t) {
          R("info", "The above " + e + " is totally normal. " + t)
        }
        c(D, s.EventEmitter), D.prototype.addListener = function(e, t, n, r) {
          if (!this._listeners[t]) {
            var o = this,
              i = !1;
            this._listeners[t] = s, this.on(e, s)
          }

          function s() {
            if (o._listeners[t])
              if (i) i = "waiting";
              else {
                i = !0;
                var e = C(r, ["style", "include_docs", "attachments", "conflicts", "filter", "doc_ids", "view", "since", "query_params", "binary"]);
                n.changes(e).on("change", function(e) {
                  e.seq > r.since && !r.cancelled && (r.since = e.seq, r.onChange(e))
                }).on("complete", function() {
                  "waiting" === i && a(s), i = !1
                }).on("error", function() {
                  i = !1
                })
              }
          }
        }, D.prototype.removeListener = function(e, t) {
          t in this._listeners && (s.EventEmitter.prototype.removeListener.call(this, e, this._listeners[t]), delete this._listeners[t])
        }, D.prototype.notifyLocalWindows = function(e) {
          L() ? chrome.storage.local.set({
            dbName: e
          }) : I() && (localStorage[e] = "a" === localStorage[e] ? "b" : "a")
        }, D.prototype.notify = function(e) {
          this.emit(e), this.notifyLocalWindows(e)
        };
        var B = "function" == typeof Object.assign ? Object.assign : function(e) {
          for (var t = Object(e), n = 1; n < arguments.length; n++) {
            var r = arguments[n];
            if (null != r)
              for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (t[o] = r[o])
          }
          return t
        };

        function $(e, t, n) {
          Error.call(this, n), this.status = e, this.name = t, this.message = n, this.error = !0
        }
        c($, Error), $.prototype.toString = function() {
          return JSON.stringify({
            status: this.status,
            name: this.name,
            message: this.message,
            reason: this.reason
          })
        };
        new $(401, "unauthorized", "Name or password is incorrect.");
        var M = new $(400, "bad_request", "Missing JSON list of 'docs'"),
          P = new $(404, "not_found", "missing"),
          U = new $(409, "conflict", "Document update conflict"),
          J = new $(400, "bad_request", "_id field must contain a string"),
          W = new $(412, "missing_id", "_id is required for puts"),
          H = new $(400, "bad_request", "Only reserved document ids may start with underscore."),
          z = (new $(412, "precondition_failed", "Database not open"), new $(500, "unknown_error", "Database encountered an unknown error")),
          K = new $(500, "badarg", "Some query argument is invalid"),
          X = (new $(400, "invalid_request", "Request was invalid"), new $(400, "query_parse_error", "Some query parameter is invalid")),
          G = new $(500, "doc_validation", "Bad special document member"),
          V = new $(400, "bad_request", "Something wrong with the request"),
          Q = new $(400, "bad_request", "Document must be a JSON object"),
          Y = (new $(404, "not_found", "Database not found"), new $(500, "indexed_db_went_bad", "unknown")),
          Z = new $(500, "web_sql_went_bad", "unknown"),
          ee = (new $(500, "levelDB_went_went_bad", "unknown"), new $(403, "forbidden", "Forbidden by design doc validate_doc_update function"), new $(400, "bad_request", "Invalid rev format")),
          te = (new $(412, "file_exists", "The database could not be created, the file already exists."), new $(412, "missing_stub", "A pre-existing attachment stub wasn't found"));
        new $(413, "invalid_url", "Provided URL is invalid");

        function ne(e, t) {
          function n(t) {
            for (var n in e) "function" != typeof e[n] && (this[n] = e[n]);
            void 0 !== t && (this.reason = t)
          }
          return n.prototype = $.prototype, new n(t)
        }

        function re(e) {
          if ("object" != typeof e) {
            var t = e;
            (e = z).data = t
          }
          return "error" in e && "conflict" === e.error && (e.name = "conflict", e.status = 409), "name" in e || (e.name = e.error || "unknown"), "status" in e || (e.status = 500), "message" in e || (e.message = e.message || e.reason), e
        }

        function oe(e) {
          var t = {},
            n = e.filter && "function" == typeof e.filter;
          return t.query = e.query_params,
            function(r) {
              r.doc || (r.doc = {});
              var o = n && function(e, t, n) {
                try {
                  return !e(t, n)
                } catch (e) {
                  var r = "Filter function threw: " + e.toString();
                  return ne(V, r)
                }
              }(e.filter, r.doc, t);
              if ("object" == typeof o) return o;
              if (o) return !1;
              if (e.include_docs) {
                if (!e.attachments)
                  for (var i in r.doc._attachments) r.doc._attachments.hasOwnProperty(i) && (r.doc._attachments[i].stub = !0)
              } else delete r.doc;
              return !0
            }
        }

        function ie(e) {
          for (var t = [], n = 0, r = e.length; n < r; n++) t = t.concat(e[n]);
          return t
        }

        function ae(e) {
          var t;
          if (e ? "string" != typeof e ? t = ne(J) : /^_/.test(e) && !/^_(design|local)/.test(e) && (t = ne(H)) : t = ne(W), t) throw t
        }

        function se(e) {
          return "boolean" == typeof e._remote ? e._remote : "function" == typeof e.type && (R("warn", "db.type() is deprecated and will be removed in a future version of PouchDB"), "http" === e.type())
        }

        function ce(e) {
          if (!e) return null;
          var t = e.split("/");
          return 2 === t.length ? t : 1 === t.length ? [e, e] : null
        }

        function ue(e) {
          var t = ce(e);
          return t ? t.join("/") : null
        }
        var fe = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
          le = "queryKey",
          de = /(?:^|&)([^&=]*)=?([^&]*)/g,
          he = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

        function pe(e) {
          for (var t = he.exec(e), n = {}, r = 14; r--;) {
            var o = fe[r],
              i = t[r] || "",
              a = -1 !== ["user", "password"].indexOf(o);
            n[o] = a ? decodeURIComponent(i) : i
          }
          return n[le] = {}, n[fe[12]].replace(de, function(e, t, r) {
            t && (n[le][t] = r)
          }), n
        }

        function ve(e, t) {
          var n = [],
            r = [];
          for (var o in t) t.hasOwnProperty(o) && (n.push(o), r.push(t[o]));
          return n.push(e), Function.apply(null, n).apply(null, r)
        }

        function ge(e, t, n) {
          return new h(function(r, o) {
            e.get(t, function(i, a) {
              if (i) {
                if (404 !== i.status) return o(i);
                a = {}
              }
              var s, c, u, f = a._rev,
                l = n(a);
              if (!l) return r({
                updated: !1,
                rev: f
              });
              l._id = t, l._rev = f, r((c = l, u = n, (s = e).put(c).then(function(e) {
                return {
                  updated: !0,
                  rev: e.rev
                }
              }, function(e) {
                if (409 !== e.status) throw e;
                return ge(s, c._id, u)
              })))
            })
          })
        }

        function ye() {
          return u.v4().replace(/-/g, "").toLowerCase()
        }
        var _e = u.v4;

        function me(e) {
          for (var t, n, r, o, i = e.rev_tree.slice(); o = i.pop();) {
            var a = o.ids,
              s = a[2],
              c = o.pos;
            if (s.length)
              for (var u = 0, f = s.length; u < f; u++) i.push({
                pos: c + 1,
                ids: s[u]
              });
            else {
              var l = !!a[1].deleted,
                d = a[0];
              t && !(r !== l ? r : n !== c ? n < c : t < d) || (t = d, n = c, r = l)
            }
          }
          return n + "-" + t
        }

        function be(e, t) {
          for (var n, r = e.slice(); n = r.pop();)
            for (var o = n.pos, i = n.ids, a = i[2], s = t(0 === a.length, o, i[0], n.ctx, i[1]), c = 0, u = a.length; c < u; c++) r.push({
              pos: o + 1,
              ids: a[c],
              ctx: s
            })
        }

        function we(e, t) {
          return e.pos - t.pos
        }

        function Ee(e) {
          var t = [];
          be(e, function(e, n, r, o, i) {
            e && t.push({
              rev: n + "-" + r,
              pos: n,
              opts: i
            })
          }), t.sort(we).reverse();
          for (var n = 0, r = t.length; n < r; n++) delete t[n].pos;
          return t
        }

        function ke(e) {
          for (var t = me(e), n = Ee(e.rev_tree), r = [], o = 0, i = n.length; o < i; o++) {
            var a = n[o];
            a.rev === t || a.opts.deleted || r.push(a.rev)
          }
          return r
        }

        function Se(e) {
          var t = [];
          return be(e.rev_tree, function(e, n, r, o, i) {
            "available" !== i.status || e || (t.push(n + "-" + r), i.status = "missing")
          }), t
        }

        function qe(e) {
          for (var t, n = [], r = e.slice(); t = r.pop();) {
            var o = t.pos,
              i = t.ids,
              a = i[0],
              s = i[1],
              c = i[2],
              u = 0 === c.length,
              f = t.history ? t.history.slice() : [];
            f.push({
              id: a,
              opts: s
            }), u && n.push({
              pos: o + 1 - f.length,
              ids: f
            });
            for (var l = 0, d = c.length; l < d; l++) r.push({
              pos: o + 1,
              ids: c[l],
              history: f
            })
          }
          return n.reverse()
        }

        function Ce(e, t) {
          return e.pos - t.pos
        }

        function Ae(e, t) {
          for (var n, r, o = t, i = e.length; o < i; o++) {
            var a = e[o],
              s = [a.id, a.opts, []];
            r ? (r[2].push(s), r = s) : n = r = s
          }
          return n
        }

        function xe(e, t) {
          return e[0] < t[0] ? -1 : 1
        }

        function Te(e, t) {
          for (var n, r, o, i = [{
              tree1: e,
              tree2: t
            }], a = !1; i.length > 0;) {
            var s = i.pop(),
              c = s.tree1,
              u = s.tree2;
            (c[1].status || u[1].status) && (c[1].status = "available" === c[1].status || "available" === u[1].status ? "available" : "missing");
            for (var f = 0; f < u[2].length; f++)
              if (c[2][0]) {
                for (var l = !1, d = 0; d < c[2].length; d++) c[2][d][0] === u[2][f][0] && (i.push({
                  tree1: c[2][d],
                  tree2: u[2][f]
                }), l = !0);
                l || (a = "new_branch", n = c[2], r = u[2][f], void 0, o = function(e, t, n) {
                  for (var r, o = 0, i = e.length; o < i;) n(e[r = o + i >>> 1], t) < 0 ? o = r + 1 : i = r;
                  return o
                }(n, r, xe), n.splice(o, 0, r))
              } else a = "new_leaf", c[2][0] = u[2][f]
          }
          return {
            conflicts: a,
            tree: e
          }
        }

        function Oe(e, t, n) {
          var r, o = [],
            i = !1,
            a = !1;
          if (!e.length) return {
            tree: [t],
            conflicts: "new_leaf"
          };
          for (var s = 0, c = e.length; s < c; s++) {
            var u = e[s];
            if (u.pos === t.pos && u.ids[0] === t.ids[0]) r = Te(u.ids, t.ids), o.push({
              pos: u.pos,
              ids: r.tree
            }), i = i || r.conflicts, a = !0;
            else if (!0 !== n) {
              var f = u.pos < t.pos ? u : t,
                l = u.pos < t.pos ? t : u,
                d = l.pos - f.pos,
                h = [],
                p = [];
              for (p.push({
                  ids: f.ids,
                  diff: d,
                  parent: null,
                  parentIdx: null
                }); p.length > 0;) {
                var v = p.pop();
                if (0 !== v.diff)
                  for (var g = v.ids[2], y = 0, _ = g.length; y < _; y++) p.push({
                    ids: g[y],
                    diff: v.diff - 1,
                    parent: v.ids,
                    parentIdx: y
                  });
                else v.ids[0] === l.ids[0] && h.push(v)
              }
              var m = h[0];
              m ? (r = Te(m.ids, l.ids), m.parent[2][m.parentIdx] = r.tree, o.push({
                pos: f.pos,
                ids: f.ids
              }), i = i || r.conflicts, a = !0) : o.push(u)
            } else o.push(u)
          }
          return a || o.push(t), o.sort(Ce), {
            tree: o,
            conflicts: i || "internal_node"
          }
        }

        function je(e, t, n) {
          var r = Oe(e, t),
            o = function(e, t) {
              for (var n, r, o = qe(e), i = 0, a = o.length; i < a; i++) {
                var s, c = o[i],
                  u = c.ids;
                if (u.length > t) {
                  n || (n = {});
                  var f = u.length - t;
                  s = {
                    pos: c.pos + f,
                    ids: Ae(u, f)
                  };
                  for (var l = 0; l < f; l++) {
                    var d = c.pos + l + "-" + u[l].id;
                    n[d] = !0
                  }
                } else s = {
                  pos: c.pos,
                  ids: Ae(u, 0)
                };
                r = r ? Oe(r, s, !0).tree : [s]
              }
              return n && be(r, function(e, t, r) {
                delete n[t + "-" + r]
              }), {
                tree: r,
                revs: n ? Object.keys(n) : []
              }
            }(r.tree, n);
          return {
            tree: o.tree,
            stemmedRevs: o.revs,
            conflicts: r.conflicts
          }
        }

        function Le(e) {
          return e.ids
        }

        function Ie(e, t) {
          t || (t = me(e));
          for (var n, r = t.substring(t.indexOf("-") + 1), o = e.rev_tree.map(Le); n = o.pop();) {
            if (n[0] === r) return !!n[1].deleted;
            o = o.concat(n[2])
          }
        }

        function De(e) {
          return /^_local/.test(e)
        }

        function Re(e, t) {
          for (var n, r = t.rev_tree.slice(); n = r.pop();) {
            var o = n.pos,
              i = n.ids,
              a = i[0],
              s = i[1],
              c = i[2],
              u = 0 === c.length,
              f = n.history ? n.history.slice() : [];
            if (f.push({
                id: a,
                pos: o,
                opts: s
              }), u)
              for (var l = 0, d = f.length; l < d; l++) {
                var h = f[l];
                if (h.pos + "-" + h.id === e) return o + "-" + a
              }
            for (var p = 0, v = c.length; p < v; p++) r.push({
              pos: o + 1,
              ids: c[p],
              history: f
            })
          }
          throw new Error("Unable to resolve latest revision for id " + t.id + ", rev " + e)
        }

        function Fe(e, t, n) {
          s.EventEmitter.call(this);
          var r = this;
          this.db = e;
          var o = (t = t ? m(t) : {}).complete = b(function(t, n) {
            var o, a;
            t ? (a = "error", ("listenerCount" in (o = r) ? o.listenerCount(a) : s.EventEmitter.listenerCount(o, a)) > 0 && r.emit("error", t)) : r.emit("complete", n), r.removeAllListeners(), e.removeListener("destroyed", i)
          });

          function i() {
            r.cancel()
          }
          n && (r.on("complete", function(e) {
            n(null, e)
          }), r.on("error", n)), e.once("destroyed", i), t.onChange = function(e, t, n) {
            r.isCancelled || function(e, t, n, r) {
              try {
                e.emit("change", t, n, r)
              } catch (e) {
                R("error", 'Error in .on("change", function):', e)
              }
            }(r, e, t, n)
          };
          var a = new h(function(e, n) {
            t.complete = function(t, r) {
              t ? n(t) : e(r)
            }
          });
          r.once("cancel", function() {
            e.removeListener("destroyed", i), t.complete(null, {
              status: "cancelled"
            })
          }), this.then = a.then.bind(a), this.catch = a.catch.bind(a), this.then(function(e) {
            o(null, e)
          }, o), e.taskqueue.isReady ? r.validateChanges(t) : e.taskqueue.addTask(function(e) {
            e ? t.complete(e) : r.isCancelled ? r.emit("cancel") : r.validateChanges(t)
          })
        }

        function Ne(e, t, n) {
          var r = [{
            rev: e._rev
          }];
          "all_docs" === n.style && (r = Ee(t.rev_tree).map(function(e) {
            return {
              rev: e.rev
            }
          }));
          var o = {
            id: t.id,
            changes: r,
            doc: e
          };
          return Ie(t, e._rev) && (o.deleted = !0), n.conflicts && (o.doc._conflicts = ke(t), o.doc._conflicts.length || delete o.doc._conflicts), o
        }

        function Be(e, t) {
          return e < t ? -1 : e > t ? 1 : 0
        }

        function $e(e, t) {
          return function(n, r) {
            n || r[0] && r[0].error ? ((n = n || r[0]).docId = t, e(n)) : e(null, r.length ? r[0] : r)
          }
        }

        function Me(e, t) {
          var n = Be(e._id, t._id);
          return 0 !== n ? n : Be(e._revisions ? e._revisions.start : 0, t._revisions ? t._revisions.start : 0)
        }

        function Pe() {
          s.EventEmitter.call(this)
        }

        function Ue() {
          this.isReady = !1, this.failed = !1, this.queue = []
        }

        function Je(e, t) {
          if (!(this instanceof Je)) return new Je(e, t);
          var n = this;
          if (t = t || {}, e && "object" == typeof e && (e = (t = e).name, delete t.name), this.__opts = t = m(t), n.auto_compaction = t.auto_compaction, n.prefix = Je.prefix, "string" != typeof e) throw new Error("Missing/invalid DB name");
          var r = function(e, t) {
            var n = e.match(/([a-z-]*):\/\/(.*)/);
            if (n) return {
              name: /https?/.test(n[1]) ? n[1] + "://" + n[2] : n[2],
              adapter: n[1]
            };
            var r = Je.adapters,
              o = Je.preferredAdapters,
              i = Je.prefix,
              a = t.adapter;
            if (!a)
              for (var s = 0; s < o.length && "idb" === (a = o[s]) && "websql" in r && I() && localStorage["_pouch__websqldb_" + i + e]; ++s) R("log", 'PouchDB is downgrading "' + e + '" to WebSQL to avoid data loss, because it was already opened with WebSQL.');
            var c = r[a];
            return {
              name: c && "use_prefix" in c && !c.use_prefix ? e : i + e,
              adapter: a
            }
          }((t.prefix || "") + e, t);
          if (t.name = r.name, t.adapter = t.adapter || r.adapter, n.name = e, n._adapter = t.adapter, Je.emit("debug", ["adapter", "Picked adapter: ", t.adapter]), !Je.adapters[t.adapter] || !Je.adapters[t.adapter].valid()) throw new Error("Invalid Adapter: " + t.adapter);
          Pe.call(n), n.taskqueue = new Ue, n.adapter = t.adapter, Je.adapters[t.adapter].call(n, t, function(e) {
            if (e) return n.taskqueue.fail(e);
            ! function(e) {
              function t(t) {
                e.removeListener("closed", n), t || e.constructor.emit("destroyed", e.name)
              }

              function n() {
                e.removeListener("destroyed", t), e.constructor.emit("unref", e)
              }
              e.once("destroyed", t), e.once("closed", n), e.constructor.emit("ref", e)
            }(n), n.emit("created", n), Je.emit("created", n.name), n.taskqueue.ready(n)
          })
        }
        c(Fe, s.EventEmitter), Fe.prototype.cancel = function() {
          this.isCancelled = !0, this.db.taskqueue.isReady && this.emit("cancel")
        }, Fe.prototype.validateChanges = function(e) {
          var t = e.complete,
            n = this;
          Je._changesFilterPlugin ? Je._changesFilterPlugin.validate(e, function(r) {
            if (r) return t(r);
            n.doChanges(e)
          }) : n.doChanges(e)
        }, Fe.prototype.doChanges = function(e) {
          var t = this,
            n = e.complete;
          if ("live" in (e = m(e)) && !("continuous" in e) && (e.continuous = e.live), e.processChange = Ne, "latest" === e.since && (e.since = "now"), e.since || (e.since = 0), "now" !== e.since) {
            if (Je._changesFilterPlugin) {
              if (Je._changesFilterPlugin.normalize(e), Je._changesFilterPlugin.shouldFilter(this, e)) return Je._changesFilterPlugin.filter(this, e)
            } else ["doc_ids", "filter", "selector", "view"].forEach(function(t) {
              t in e && R("warn", 'The "' + t + '" option was passed in to changes/replicate, but pouchdb-changes-filter plugin is not installed, so it was ignored. Please install the plugin to enable filtering.')
            });
            "descending" in e || (e.descending = !1), e.limit = 0 === e.limit ? 1 : e.limit, e.complete = n;
            var r = this.db._changes(e);
            if (r && "function" == typeof r.cancel) {
              var o = t.cancel;
              t.cancel = i(function(e) {
                r.cancel(), o.apply(this, e)
              })
            }
          } else this.db.info().then(function(r) {
            t.isCancelled ? n(null, {
              status: "cancelled"
            }) : (e.since = r.update_seq, t.doChanges(e))
          }, n)
        }, c(Pe, s.EventEmitter), Pe.prototype.post = E("post", function(e, t, n) {
          if ("function" == typeof t && (n = t, t = {}), "object" != typeof e || Array.isArray(e)) return n(ne(Q));
          this.bulkDocs({
            docs: [e]
          }, t, $e(n, e._id))
        }), Pe.prototype.put = E("put", function(e, t, n) {
          if ("function" == typeof t && (n = t, t = {}), "object" != typeof e || Array.isArray(e)) return n(ne(Q));
          if (ae(e._id), De(e._id) && "function" == typeof this._putLocal) return e._deleted ? this._removeLocal(e, n) : this._putLocal(e, n);
          var r, o, i, a, s = this;

          function c(n) {
            "function" == typeof s._put && !1 !== t.new_edits ? s._put(e, t, n) : s.bulkDocs({
              docs: [e]
            }, t, $e(n, e._id))
          }
          t.force && e._rev ? (r = e._rev.split("-"), o = r[1], i = parseInt(r[0], 10) + 1, a = ye(), e._revisions = {
            start: i,
            ids: [a, o]
          }, e._rev = i + "-" + a, t.new_edits = !1, c(function(t) {
            var r = t ? null : {
              ok: !0,
              id: e._id,
              rev: e._rev
            };
            n(t, r)
          })) : c(n)
        }), Pe.prototype.putAttachment = E("putAttachment", function(e, t, n, r, o) {
          var i = this;

          function a(e) {
            var n = "_rev" in e ? parseInt(e._rev, 10) : 0;
            return e._attachments = e._attachments || {}, e._attachments[t] = {
              content_type: o,
              data: r,
              revpos: ++n
            }, i.put(e)
          }
          return "function" == typeof o && (o = r, r = n, n = null), void 0 === o && (o = r, r = n, n = null), o || R("warn", "Attachment", t, "on document", e, "is missing content_type"), i.get(e).then(function(e) {
            if (e._rev !== n) throw ne(U);
            return a(e)
          }, function(t) {
            if (t.reason === P.message) return a({
              _id: e
            });
            throw t
          })
        }), Pe.prototype.removeAttachment = E("removeAttachment", function(e, t, n, r) {
          var o = this;
          o.get(e, function(e, i) {
            if (e) r(e);
            else if (i._rev === n) {
              if (!i._attachments) return r();
              delete i._attachments[t], 0 === Object.keys(i._attachments).length && delete i._attachments, o.put(i, r)
            } else r(ne(U))
          })
        }), Pe.prototype.remove = E("remove", function(e, t, n, r) {
          var o;
          "string" == typeof t ? (o = {
            _id: e,
            _rev: t
          }, "function" == typeof n && (r = n, n = {})) : (o = e, "function" == typeof t ? (r = t, n = {}) : (r = n, n = t)), (n = n || {}).was_delete = !0;
          var i = {
            _id: o._id,
            _rev: o._rev || n.rev,
            _deleted: !0
          };
          if (De(i._id) && "function" == typeof this._removeLocal) return this._removeLocal(o, r);
          this.bulkDocs({
            docs: [i]
          }, n, $e(r, i._id))
        }), Pe.prototype.revsDiff = E("revsDiff", function(e, t, n) {
          "function" == typeof t && (n = t, t = {});
          var r = Object.keys(e);
          if (!r.length) return n(null, {});
          var o = 0,
            i = new g;

          function a(e, t) {
            i.has(e) || i.set(e, {
              missing: []
            }), i.get(e).missing.push(t)
          }
          r.map(function(t) {
            this._getRevisionTree(t, function(s, c) {
              if (s && 404 === s.status && "missing" === s.message) i.set(t, {
                missing: e[t]
              });
              else {
                if (s) return n(s);
                f = c, l = e[u = t].slice(0), be(f, function(e, t, n, r, o) {
                  var i = t + "-" + n,
                    s = l.indexOf(i); - 1 !== s && (l.splice(s, 1), "available" !== o.status && a(u, i))
                }), l.forEach(function(e) {
                  a(u, e)
                })
              }
              var u, f, l;
              if (++o === r.length) {
                var d = {};
                return i.forEach(function(e, t) {
                  d[t] = e
                }), n(null, d)
              }
            })
          }, this)
        }), Pe.prototype.bulkGet = E("bulkGet", function(e, t) {
          j(this, e, t)
        }), Pe.prototype.compactDocument = E("compactDocument", function(e, t, n) {
          var r = this;
          this._getRevisionTree(e, function(o, i) {
            if (o) return n(o);
            var a, s, c = (a = {}, s = [], be(i, function(e, t, n, r) {
                var o = t + "-" + n;
                return e && (a[o] = 0), void 0 !== r && s.push({
                  from: r,
                  to: o
                }), o
              }), s.reverse(), s.forEach(function(e) {
                void 0 === a[e.from] ? a[e.from] = 1 + a[e.to] : a[e.from] = Math.min(a[e.from], 1 + a[e.to])
              }), a),
              u = [],
              f = [];
            Object.keys(c).forEach(function(e) {
              c[e] > t && u.push(e)
            }), be(i, function(e, t, n, r, o) {
              var i = t + "-" + n;
              "available" === o.status && -1 !== u.indexOf(i) && f.push(i)
            }), r._doCompaction(e, f, n)
          })
        }), Pe.prototype.compact = E("compact", function(e, t) {
          "function" == typeof e && (t = e, e = {});
          var n = this;
          e = e || {}, n._compactionQueue = n._compactionQueue || [], n._compactionQueue.push({
            opts: e,
            callback: t
          }), 1 === n._compactionQueue.length && function e(t) {
            var n = t._compactionQueue[0],
              r = n.opts,
              o = n.callback;
            t.get("_local/compaction").catch(function() {
              return !1
            }).then(function(n) {
              n && n.last_seq && (r.last_seq = n.last_seq), t._compact(r, function(n, r) {
                n ? o(n) : o(null, r), a(function() {
                  t._compactionQueue.shift(), t._compactionQueue.length && e(t)
                })
              })
            })
          }(n)
        }), Pe.prototype._compact = function(e, t) {
          var n = this,
            r = {
              return_docs: !1,
              last_seq: e.last_seq || 0
            },
            o = [];
          n.changes(r).on("change", function(e) {
            o.push(n.compactDocument(e.id, 0))
          }).on("complete", function(e) {
            var r = e.last_seq;
            h.all(o).then(function() {
              return ge(n, "_local/compaction", function(e) {
                return (!e.last_seq || e.last_seq < r) && (e.last_seq = r, e)
              })
            }).then(function() {
              t(null, {
                ok: !0
              })
            }).catch(t)
          }).on("error", t)
        }, Pe.prototype.get = E("get", function(e, t, n) {
          if ("function" == typeof t && (n = t, t = {}), "string" != typeof e) return n(ne(J));
          if (De(e) && "function" == typeof this._getLocal) return this._getLocal(e, n);
          var r = [],
            o = this;

          function i() {
            var i = [],
              a = r.length;
            if (!a) return n(null, i);
            r.forEach(function(r) {
              o.get(e, {
                rev: r,
                revs: t.revs,
                latest: t.latest,
                attachments: t.attachments,
                binary: t.binary
              }, function(e, t) {
                if (e) i.push({
                  missing: r
                });
                else {
                  for (var o, s = 0, c = i.length; s < c; s++)
                    if (i[s].ok && i[s].ok._rev === t._rev) {
                      o = !0;
                      break
                    }
                  o || i.push({
                    ok: t
                  })
                }--a || n(null, i)
              })
            })
          }
          if (!t.open_revs) return this._get(e, t, function(r, i) {
            if (r) return r.docId = e, n(r);
            var a = i.doc,
              s = i.metadata,
              c = i.ctx;
            if (t.conflicts) {
              var u = ke(s);
              u.length && (a._conflicts = u)
            }
            if (Ie(s, a._rev) && (a._deleted = !0), t.revs || t.revs_info) {
              for (var f = a._rev.split("-"), l = parseInt(f[0], 10), d = f[1], h = qe(s.rev_tree), p = null, v = 0; v < h.length; v++) {
                var g = h[v],
                  y = g.ids.map(function(e) {
                    return e.id
                  }).indexOf(d);
                (y === l - 1 || !p && -1 !== y) && (p = g)
              }
              var _ = p.ids.map(function(e) {
                  return e.id
                }).indexOf(a._rev.split("-")[1]) + 1,
                m = p.ids.length - _;
              if (p.ids.splice(_, m), p.ids.reverse(), t.revs && (a._revisions = {
                  start: p.pos + p.ids.length - 1,
                  ids: p.ids.map(function(e) {
                    return e.id
                  })
                }), t.revs_info) {
                var b = p.pos + p.ids.length;
                a._revs_info = p.ids.map(function(e) {
                  return {
                    rev: --b + "-" + e.id,
                    status: e.opts.status
                  }
                })
              }
            }
            if (t.attachments && a._attachments) {
              var w = a._attachments,
                E = Object.keys(w).length;
              if (0 === E) return n(null, a);
              Object.keys(w).forEach(function(e) {
                this._getAttachment(a._id, e, w[e], {
                  rev: a._rev,
                  binary: t.binary,
                  ctx: c
                }, function(t, r) {
                  var o = a._attachments[e];
                  o.data = r, delete o.stub, delete o.length, --E || n(null, a)
                })
              }, o)
            } else {
              if (a._attachments)
                for (var k in a._attachments) a._attachments.hasOwnProperty(k) && (a._attachments[k].stub = !0);
              n(null, a)
            }
          });
          if ("all" === t.open_revs) this._getRevisionTree(e, function(e, t) {
            if (e) return n(e);
            r = Ee(t).map(function(e) {
              return e.rev
            }), i()
          });
          else {
            if (!Array.isArray(t.open_revs)) return n(ne(z, "function_clause"));
            r = t.open_revs;
            for (var a = 0; a < r.length; a++) {
              var s = r[a];
              if ("string" != typeof s || !/^\d+-/.test(s)) return n(ne(ee))
            }
            i()
          }
        }), Pe.prototype.getAttachment = E("getAttachment", function(e, t, n, r) {
          var o = this;
          n instanceof Function && (r = n, n = {}), this._get(e, n, function(i, a) {
            return i ? r(i) : a.doc._attachments && a.doc._attachments[t] ? (n.ctx = a.ctx, n.binary = !0, void o._getAttachment(e, t, a.doc._attachments[t], n, r)) : r(ne(P))
          })
        }), Pe.prototype.allDocs = E("allDocs", function(e, t) {
          if ("function" == typeof e && (t = e, e = {}), e.skip = void 0 !== e.skip ? e.skip : 0, e.start_key && (e.startkey = e.start_key), e.end_key && (e.endkey = e.end_key), "keys" in e) {
            if (!Array.isArray(e.keys)) return t(new TypeError("options.keys must be an array"));
            var n = ["startkey", "endkey", "key"].filter(function(t) {
              return t in e
            })[0];
            if (n) return void t(ne(X, "Query parameter `" + n + "` is not compatible with multi-get"));
            if (!se(this) && (o = "limit" in (r = e) ? r.keys.slice(r.skip, r.limit + r.skip) : r.skip > 0 ? r.keys.slice(r.skip) : r.keys, r.keys = o, r.skip = 0, delete r.limit, r.descending && (o.reverse(), r.descending = !1), 0 === e.keys.length)) return this._allDocs({
              limit: 0
            }, t)
          }
          var r, o;
          return this._allDocs(e, t)
        }), Pe.prototype.changes = function(e, t) {
          return "function" == typeof e && (t = e, e = {}), new Fe(this, e, t)
        }, Pe.prototype.close = E("close", function(e) {
          return this._closed = !0, this.emit("closed"), this._close(e)
        }), Pe.prototype.info = E("info", function(e) {
          var t = this;
          this._info(function(n, r) {
            if (n) return e(n);
            r.db_name = r.db_name || t.name, r.auto_compaction = !(!t.auto_compaction || se(t)), r.adapter = t.adapter, e(null, r)
          })
        }), Pe.prototype.id = E("id", function(e) {
          return this._id(e)
        }), Pe.prototype.type = function() {
          return "function" == typeof this._type ? this._type() : this.adapter
        }, Pe.prototype.bulkDocs = E("bulkDocs", function(e, t, n) {
          if ("function" == typeof t && (n = t, t = {}), t = t || {}, Array.isArray(e) && (e = {
              docs: e
            }), !e || !e.docs || !Array.isArray(e.docs)) return n(ne(M));
          for (var r = 0; r < e.docs.length; ++r)
            if ("object" != typeof e.docs[r] || Array.isArray(e.docs[r])) return n(ne(Q));
          var o;
          if (e.docs.forEach(function(e) {
              e._attachments && Object.keys(e._attachments).forEach(function(t) {
                var n;
                o = o || "_" === (n = t).charAt(0) && n + " is not a valid attachment name, attachment names cannot start with '_'", e._attachments[t].content_type || R("warn", "Attachment", t, "on document", e._id, "is missing content_type")
              })
            }), o) return n(ne(V, o));
          "new_edits" in t || (t.new_edits = !("new_edits" in e) || e.new_edits);
          var i = this;
          t.new_edits || se(i) || e.docs.sort(Me),
            function(e) {
              for (var t = 0; t < e.length; t++) {
                var n = e[t];
                if (n._deleted) delete n._attachments;
                else if (n._attachments)
                  for (var r = Object.keys(n._attachments), o = 0; o < r.length; o++) {
                    var i = r[o];
                    n._attachments[i] = C(n._attachments[i], ["data", "digest", "content_type", "length", "revpos", "stub"])
                  }
              }
            }(e.docs);
          var a = e.docs.map(function(e) {
            return e._id
          });
          return this._bulkDocs(e, t, function(e, r) {
            if (e) return n(e);
            if (t.new_edits || (r = r.filter(function(e) {
                return e.error
              })), !se(i))
              for (var o = 0, s = r.length; o < s; o++) r[o].id = r[o].id || a[o];
            n(null, r)
          })
        }), Pe.prototype.registerDependentDatabase = E("registerDependentDatabase", function(e, t) {
          var n = new this.constructor(e, this.__opts);
          ge(this, "_local/_pouch_dependentDbs", function(t) {
            return t.dependentDbs = t.dependentDbs || {}, !t.dependentDbs[e] && (t.dependentDbs[e] = !0, t)
          }).then(function() {
            t(null, {
              db: n
            })
          }).catch(t)
        }), Pe.prototype.destroy = E("destroy", function(e, t) {
          "function" == typeof e && (t = e, e = {});
          var n = this,
            r = !("use_prefix" in n) || n.use_prefix;

          function o() {
            n._destroy(e, function(e, r) {
              if (e) return t(e);
              n._destroyed = !0, n.emit("destroyed"), t(null, r || {
                ok: !0
              })
            })
          }
          if (se(n)) return o();
          n.get("_local/_pouch_dependentDbs", function(e, i) {
            if (e) return 404 !== e.status ? t(e) : o();
            var a = i.dependentDbs,
              s = n.constructor,
              c = Object.keys(a).map(function(e) {
                var t = r ? e.replace(new RegExp("^" + s.prefix), "") : e;
                return new s(t, n.__opts).destroy()
              });
            h.all(c).then(o, t)
          })
        }), Ue.prototype.execute = function() {
          var e;
          if (this.failed)
            for (; e = this.queue.shift();) e(this.failed);
          else
            for (; e = this.queue.shift();) e()
        }, Ue.prototype.fail = function(e) {
          this.failed = e, this.execute()
        }, Ue.prototype.ready = function(e) {
          this.isReady = !0, this.db = e, this.execute()
        }, Ue.prototype.addTask = function(e) {
          this.queue.push(e), this.failed && this.execute()
        }, c(Je, Pe), Je.adapters = {}, Je.preferredAdapters = [], Je.prefix = "_pouch_";
        var We = new s.EventEmitter;
        ! function(e) {
          Object.keys(s.EventEmitter.prototype).forEach(function(t) {
            "function" == typeof s.EventEmitter.prototype[t] && (e[t] = We[t].bind(We))
          });
          var t = e._destructionListeners = new g;
          e.on("ref", function(e) {
            t.has(e.name) || t.set(e.name, []), t.get(e.name).push(e)
          }), e.on("unref", function(e) {
            if (t.has(e.name)) {
              var n = t.get(e.name),
                r = n.indexOf(e);
              r < 0 || (n.splice(r, 1), n.length > 1 ? t.set(e.name, n) : t.delete(e.name))
            }
          }), e.on("destroyed", function(e) {
            if (t.has(e)) {
              var n = t.get(e);
              t.delete(e), n.forEach(function(e) {
                e.emit("destroyed", !0)
              })
            }
          })
        }(Je), Je.adapter = function(e, t, n) {
          t.valid() && (Je.adapters[e] = t, n && Je.preferredAdapters.push(e))
        }, Je.plugin = function(e) {
          if ("function" == typeof e) e(Je);
          else {
            if ("object" != typeof e || 0 === Object.keys(e).length) throw new Error('Invalid plugin: got "' + e + '", expected an object or a function');
            Object.keys(e).forEach(function(t) {
              Je.prototype[t] = e[t]
            })
          }
          return this.__defaults && (Je.__defaults = B({}, this.__defaults)), Je
        }, Je.defaults = function(e) {
          function t(e, n) {
            if (!(this instanceof t)) return new t(e, n);
            n = n || {}, e && "object" == typeof e && (e = (n = e).name, delete n.name), n = B({}, t.__defaults, n), Je.call(this, e, n)
          }
          return c(t, Je), t.preferredAdapters = Je.preferredAdapters.slice(), Object.keys(Je).forEach(function(e) {
            e in t || (t[e] = Je[e])
          }), t.__defaults = B({}, this.__defaults, e), t
        };

        function He(e, t) {
          for (var n = e, r = 0, o = t.length; r < o; r++) {
            if (!(n = n[t[r]])) break
          }
          return n
        }

        function ze(e) {
          for (var t = [], n = "", r = 0, o = e.length; r < o; r++) {
            var i = e[r];
            "." === i ? r > 0 && "\\" === e[r - 1] ? n = n.substring(0, n.length - 1) + "." : (t.push(n), n = "") : n += i
          }
          return t.push(n), t
        }
        var Ke = ["$or", "$nor", "$not"];

        function Xe(e) {
          return Ke.indexOf(e) > -1
        }

        function Ge(e) {
          return Object.keys(e)[0]
        }

        function Ve(e) {
          var t = {};
          return e.forEach(function(e) {
            Object.keys(e).forEach(function(n) {
              var r = e[n];
              if ("object" != typeof r && (r = {
                  $eq: r
                }), Xe(n)) r instanceof Array ? t[n] = r.map(function(e) {
                return Ve([e])
              }) : t[n] = Ve([r]);
              else {
                var o = t[n] = t[n] || {};
                Object.keys(r).forEach(function(e) {
                  var t, n, i, a, s = r[e];
                  return "$gt" === e || "$gte" === e ? function(e, t, n) {
                    if (void 0 !== n.$eq) return;
                    void 0 !== n.$gte ? "$gte" === e ? t > n.$gte && (n.$gte = t) : t >= n.$gte && (delete n.$gte, n.$gt = t) : void 0 !== n.$gt ? "$gte" === e ? t > n.$gt && (delete n.$gt, n.$gte = t) : t > n.$gt && (n.$gt = t) : n[e] = t
                  }(e, s, o) : "$lt" === e || "$lte" === e ? function(e, t, n) {
                    if (void 0 !== n.$eq) return;
                    void 0 !== n.$lte ? "$lte" === e ? t < n.$lte && (n.$lte = t) : t <= n.$lte && (delete n.$lte, n.$lt = t) : void 0 !== n.$lt ? "$lte" === e ? t < n.$lt && (delete n.$lt, n.$lte = t) : t < n.$lt && (n.$lt = t) : n[e] = t
                  }(e, s, o) : "$ne" === e ? (i = s, void("$ne" in (a = o) ? a.$ne.push(i) : a.$ne = [i])) : "$eq" === e ? (t = s, delete(n = o).$gt, delete n.$gte, delete n.$lt, delete n.$lte, delete n.$ne, void(n.$eq = t)) : void(o[e] = s)
                })
              }
            })
          }), t
        }
        var Qe = -324,
          Ye = 3,
          Ze = "";

        function et(e, t) {
          if (e === t) return 0;
          e = tt(e), t = tt(t);
          var n, r, o = at(e),
            i = at(t);
          if (o - i != 0) return o - i;
          switch (typeof e) {
            case "number":
              return e - t;
            case "boolean":
              return e < t ? -1 : 1;
            case "string":
              return (n = e) === (r = t) ? 0 : n > r ? 1 : -1
          }
          return Array.isArray(e) ? function(e, t) {
            for (var n = Math.min(e.length, t.length), r = 0; r < n; r++) {
              var o = et(e[r], t[r]);
              if (0 !== o) return o
            }
            return e.length === t.length ? 0 : e.length > t.length ? 1 : -1
          }(e, t) : function(e, t) {
            for (var n = Object.keys(e), r = Object.keys(t), o = Math.min(n.length, r.length), i = 0; i < o; i++) {
              var a = et(n[i], r[i]);
              if (0 !== a) return a;
              if (0 !== (a = et(e[n[i]], t[r[i]]))) return a
            }
            return n.length === r.length ? 0 : n.length > r.length ? 1 : -1
          }(e, t)
        }

        function tt(e) {
          switch (typeof e) {
            case "undefined":
              return null;
            case "number":
              return e === 1 / 0 || e === -1 / 0 || isNaN(e) ? null : e;
            case "object":
              var t = e;
              if (Array.isArray(e)) {
                var n = e.length;
                e = new Array(n);
                for (var r = 0; r < n; r++) e[r] = tt(t[r])
              } else {
                if (e instanceof Date) return e.toJSON();
                if (null !== e)
                  for (var o in e = {}, t)
                    if (t.hasOwnProperty(o)) {
                      var i = t[o];
                      void 0 !== i && (e[o] = tt(i))
                    }
              }
          }
          return e
        }

        function nt(e) {
          if (null !== e) switch (typeof e) {
            case "boolean":
              return e ? 1 : 0;
            case "number":
              return function(e) {
                if (0 === e) return "1";
                var t = e.toExponential().split(/e\+?/),
                  n = parseInt(t[1], 10),
                  r = e < 0,
                  o = r ? "0" : "2",
                  i = (a = ((r ? -n : n) - Qe).toString(), s = "0", c = Ye, function(e, t, n) {
                    for (var r = "", o = n - e.length; r.length < o;) r += t;
                    return r
                  }(a, s, c) + a);
                var a, s, c;
                o += Ze + i;
                var u = Math.abs(parseFloat(t[0]));
                r && (u = 10 - u);
                var f = u.toFixed(20);
                return f = f.replace(/\.?0+$/, ""), o += Ze + f
              }(e);
            case "string":
              return e.replace(/\u0002/g, "").replace(/\u0001/g, "").replace(/\u0000/g, "");
            case "object":
              var t = Array.isArray(e),
                n = t ? e : Object.keys(e),
                r = -1,
                o = n.length,
                i = "";
              if (t)
                for (; ++r < o;) i += rt(n[r]);
              else
                for (; ++r < o;) {
                  var a = n[r];
                  i += rt(a) + rt(e[a])
                }
              return i
          }
          return ""
        }

        function rt(e) {
          return at(e = tt(e)) + Ze + nt(e) + "\0"
        }

        function ot(e, t) {
          var n, r = t;
          if ("1" === e[t]) n = 0, t++;
          else {
            var o = "0" === e[t];
            t++;
            var i = "",
              a = e.substring(t, t + Ye),
              s = parseInt(a, 10) + Qe;
            for (o && (s = -s), t += Ye;;) {
              var c = e[t];
              if ("\0" === c) break;
              i += c, t++
            }
            n = 1 === (i = i.split(".")).length ? parseInt(i, 10) : parseFloat(i[0] + "." + i[1]), o && (n -= 10), 0 !== s && (n = parseFloat(n + "e" + s))
          }
          return {
            num: n,
            length: t - r
          }
        }

        function it(e, t) {
          var n = e.pop();
          if (t.length) {
            var r = t[t.length - 1];
            n === r.element && (t.pop(), r = t[t.length - 1]);
            var o = r.element,
              i = r.index;
            if (Array.isArray(o)) o.push(n);
            else if (i === e.length - 2) {
              o[e.pop()] = n
            } else e.push(n)
          }
        }

        function at(e) {
          var t = ["boolean", "number", "string", "object"].indexOf(typeof e);
          return ~t ? null === e ? 1 : Array.isArray(e) ? 5 : t < 3 ? t + 2 : t + 3 : Array.isArray(e) ? 5 : void 0
        }

        function st(e, t, n) {
          if (e = e.filter(function(e) {
              return ct(e.doc, t.selector, n)
            }), t.sort) {
            var r = function(e) {
              function t(t) {
                return e.map(function(e) {
                  var n = ze(Ge(e));
                  return He(t, n)
                })
              }
              return function(e, n) {
                var r, o, i = et(t(e.doc), t(n.doc));
                return 0 !== i ? i : (r = e.doc._id, o = n.doc._id, r < o ? -1 : r > o ? 1 : 0)
              }
            }(t.sort);
            e = e.sort(r), "string" != typeof t.sort[0] && "desc" === (o = t.sort[0])[Ge(o)] && (e = e.reverse())
          }
          var o;
          if ("limit" in t || "skip" in t) {
            var i = t.skip || 0,
              a = ("limit" in t ? t.limit : e.length) + i;
            e = e.slice(i, a)
          }
          return e
        }

        function ct(e, t, n) {
          return n.every(function(n) {
            var r = t[n],
              o = ze(n),
              i = He(e, o);
            return Xe(n) ? function(e, t, n) {
              if ("$or" === e) return t.some(function(e) {
                return ct(n, e, Object.keys(e))
              });
              if ("$not" === e) return !ct(n, t, Object.keys(t));
              return !t.find(function(e) {
                return ct(n, e, Object.keys(e))
              })
            }(n, r, e) : ut(r, e, o, i)
          })
        }

        function ut(e, t, n, r) {
          return !e || Object.keys(e).every(function(o) {
            var i = e[o];
            return function(e, t, n, r, o) {
              if (!ht[e]) throw new Error('unknown operator "' + e + '" - should be one of $eq, $lte, $lt, $gt, $gte, $exists, $ne, $in, $nin, $size, $mod, $regex, $elemMatch, $type, $allMatch or $all');
              return ht[e](t, n, r, o)
            }(o, t, i, n, r)
          })
        }

        function ft(e) {
          return void 0 !== e && null !== e
        }

        function lt(e) {
          return void 0 !== e
        }

        function dt(e, t) {
          return t.some(function(t) {
            return e instanceof Array ? e.indexOf(t) > -1 : e === t
          })
        }
        var ht = {
          $elemMatch: function(e, t, n, r) {
            return !!Array.isArray(r) && (0 !== r.length && ("object" == typeof r[0] ? r.some(function(e) {
              return ct(e, t, Object.keys(t))
            }) : r.some(function(r) {
              return ut(t, e, n, r)
            })))
          },
          $allMatch: function(e, t, n, r) {
            return !!Array.isArray(r) && (0 !== r.length && ("object" == typeof r[0] ? r.every(function(e) {
              return ct(e, t, Object.keys(t))
            }) : r.every(function(r) {
              return ut(t, e, n, r)
            })))
          },
          $eq: function(e, t, n, r) {
            return lt(r) && 0 === et(r, t)
          },
          $gte: function(e, t, n, r) {
            return lt(r) && et(r, t) >= 0
          },
          $gt: function(e, t, n, r) {
            return lt(r) && et(r, t) > 0
          },
          $lte: function(e, t, n, r) {
            return lt(r) && et(r, t) <= 0
          },
          $lt: function(e, t, n, r) {
            return lt(r) && et(r, t) < 0
          },
          $exists: function(e, t, n, r) {
            return t ? lt(r) : !lt(r)
          },
          $mod: function(e, t, n, r) {
            return ft(r) && function(e, t) {
              var n = t[0],
                r = t[1];
              if (0 === n) throw new Error("Bad divisor, cannot divide by zero");
              if (parseInt(n, 10) !== n) throw new Error("Divisor is not an integer");
              if (parseInt(r, 10) !== r) throw new Error("Modulus is not an integer");
              return parseInt(e, 10) === e && e % n === r
            }(r, t)
          },
          $ne: function(e, t, n, r) {
            return t.every(function(e) {
              return 0 !== et(r, e)
            })
          },
          $in: function(e, t, n, r) {
            return ft(r) && dt(r, t)
          },
          $nin: function(e, t, n, r) {
            return ft(r) && !dt(r, t)
          },
          $size: function(e, t, n, r) {
            return ft(r) && (o = t, r.length === o);
            var o
          },
          $all: function(e, t, n, r) {
            return Array.isArray(r) && (o = r, t.every(function(e) {
              return o.indexOf(e) > -1
            }));
            var o
          },
          $regex: function(e, t, n, r) {
            return ft(r) && (o = r, new RegExp(t).test(o));
            var o
          },
          $type: function(e, t, n, r) {
            return function(e, t) {
              switch (t) {
                case "null":
                  return null === e;
                case "boolean":
                  return "boolean" == typeof e;
                case "number":
                  return "number" == typeof e;
                case "string":
                  return "string" == typeof e;
                case "array":
                  return e instanceof Array;
                case "object":
                  return "[object Object]" === {}.toString.call(e)
              }
              throw new Error(t + " not supported as a type.Please use one of object, string, array, number, boolean or null.")
            }(r, t)
          }
        };

        function pt(e, t) {
          if ("object" != typeof t) throw new Error("Selector error: expected a JSON object");
          var n = st([{
            doc: e
          }], {
            selector: t = function(e) {
              var t = m(e),
                n = !1;
              "$and" in t && (t = Ve(t.$and), n = !0), ["$or", "$nor"].forEach(function(e) {
                e in t && t[e].forEach(function(e) {
                  for (var t = Object.keys(e), n = 0; n < t.length; n++) {
                    var r = t[n],
                      o = e[r];
                    "object" == typeof o && null !== o || (e[r] = {
                      $eq: o
                    })
                  }
                })
              }), "$not" in t && (t.$not = Ve([t.$not]));
              for (var r = Object.keys(t), o = 0; o < r.length; o++) {
                var i = r[o],
                  a = t[i];
                "object" != typeof a || null === a ? a = {
                  $eq: a
                } : "$ne" in a && !n && (a.$ne = [a.$ne]), t[i] = a
              }
              return t
            }(t)
          }, Object.keys(t));
          return n && 1 === n.length
        }

        function vt(e, t) {
          if (e.selector && e.filter && "_selector" !== e.filter) {
            var n = "string" == typeof e.filter ? e.filter : "function";
            return t(new Error('selector invalid for filter "' + n + '"'))
          }
          t()
        }

        function gt(e) {
          e.view && !e.filter && (e.filter = "_view"), e.selector && !e.filter && (e.filter = "_selector"), e.filter && "string" == typeof e.filter && ("_view" === e.filter ? e.view = ue(e.view) : e.filter = ue(e.filter))
        }

        function yt(e, t) {
          return t.filter && "string" == typeof t.filter && !t.doc_ids && !se(e.db)
        }

        function _t(e, t) {
          var n = t.complete;
          if ("_view" === t.filter) {
            if (!t.view || "string" != typeof t.view) {
              var r = ne(V, "`view` filter parameter not found or invalid.");
              return n(r)
            }
            var o = ce(t.view);
            e.db.get("_design/" + o[0], function(r, i) {
              if (e.isCancelled) return n(null, {
                status: "cancelled"
              });
              if (r) return n(re(r));
              var a = i && i.views && i.views[o[1]] && i.views[o[1]].map;
              if (!a) return n(ne(P, i.views ? "missing json key: " + o[1] : "missing json key: views"));
              t.filter = ve(["return function(doc) {", '  "use strict";', "  var emitted = false;", "  var emit = function (a, b) {", "    emitted = true;", "  };", "  var view = " + a + ";", "  view(doc);", "  if (emitted) {", "    return true;", "  }", "};"].join("\n"), {}), e.doChanges(t)
            })
          } else if (t.selector) t.filter = function(e) {
            return pt(e, t.selector)
          }, e.doChanges(t);
          else {
            var i = ce(t.filter);
            e.db.get("_design/" + i[0], function(r, o) {
              if (e.isCancelled) return n(null, {
                status: "cancelled"
              });
              if (r) return n(re(r));
              var a = o && o.filters && o.filters[i[1]];
              if (!a) return n(ne(P, o && o.filters ? "missing json key: " + i[1] : "missing json key: filters"));
              t.filter = ve('"use strict";\nreturn ' + a + ";", {}), e.doChanges(t)
            })
          }
        }

        function mt(e) {
          return e.reduce(function(e, t) {
            return e[t] = !0, e
          }, {})
        }
        Je.plugin(function(e) {
          e.debug = f;
          var t = {};
          e.on("debug", function(e) {
            var n = e[0],
              r = e.slice(1);
            t[n] || (t[n] = f("pouchdb:" + n)), t[n].apply(null, r)
          })
        }), Je.plugin(function(e) {
          e._changesFilterPlugin = {
            validate: vt,
            normalize: gt,
            shouldFilter: yt,
            filter: _t
          }
        }), Je.version = "6.4.3";
        var bt = mt(["_id", "_rev", "_attachments", "_deleted", "_revisions", "_revs_info", "_conflicts", "_deleted_conflicts", "_local_seq", "_rev_tree", "_replication_id", "_replication_state", "_replication_state_time", "_replication_state_reason", "_replication_stats", "_removed"]),
          wt = mt(["_attachments", "_replication_id", "_replication_state", "_replication_state_time", "_replication_state_reason", "_replication_stats"]);

        function Et(e) {
          if (!/^\d+-./.test(e)) return ne(ee);
          var t = e.indexOf("-"),
            n = e.substring(0, t),
            r = e.substring(t + 1);
          return {
            prefix: parseInt(n, 10),
            id: r
          }
        }

        function kt(e, t) {
          var n, r, o, i = {
            status: "available"
          };
          if (e._deleted && (i.deleted = !0), t)
            if (e._id || (e._id = _e()), r = ye(), e._rev) {
              if ((o = Et(e._rev)).error) return o;
              e._rev_tree = [{
                pos: o.prefix,
                ids: [o.id, {
                    status: "missing"
                  },
                  [
                    [r, i, []]
                  ]
                ]
              }], n = o.prefix + 1
            } else e._rev_tree = [{
              pos: 1,
              ids: [r, i, []]
            }], n = 1;
          else if (e._revisions && (e._rev_tree = function(e, t) {
              for (var n = e.start - e.ids.length + 1, r = e.ids, o = [r[0], t, []], i = 1, a = r.length; i < a; i++) o = [r[i], {
                  status: "missing"
                },
                [o]
              ];
              return [{
                pos: n,
                ids: o
              }]
            }(e._revisions, i), n = e._revisions.start, r = e._revisions.ids[0]), !e._rev_tree) {
            if ((o = Et(e._rev)).error) return o;
            n = o.prefix, r = o.id, e._rev_tree = [{
              pos: n,
              ids: [r, i, []]
            }]
          }
          ae(e._id), e._rev = n + "-" + r;
          var a = {
            metadata: {},
            data: {}
          };
          for (var s in e)
            if (Object.prototype.hasOwnProperty.call(e, s)) {
              var c = "_" === s[0];
              if (c && !bt[s]) {
                var u = ne(G, s);
                throw u.message = G.message + ": " + s, u
              }
              c && !wt[s] ? a.metadata[s.slice(1)] = e[s] : a.data[s] = e[s]
            }
          return a
        }
        var St = function(e) {
            return atob(e)
          },
          qt = function(e) {
            return btoa(e)
          };

        function Ct(e, t) {
          e = e || [], t = t || {};
          try {
            return new Blob(e, t)
          } catch (o) {
            if ("TypeError" !== o.name) throw o;
            for (var n = new("undefined" != typeof BlobBuilder ? BlobBuilder : "undefined" != typeof MSBlobBuilder ? MSBlobBuilder : "undefined" != typeof MozBlobBuilder ? MozBlobBuilder : WebKitBlobBuilder), r = 0; r < e.length; r += 1) n.append(e[r]);
            return n.getBlob(t.type)
          }
        }

        function At(e, t) {
          return Ct([function(e) {
            for (var t = e.length, n = new ArrayBuffer(t), r = new Uint8Array(n), o = 0; o < t; o++) r[o] = e.charCodeAt(o);
            return n
          }(e)], {
            type: t
          })
        }

        function xt(e, t) {
          return At(St(e), t)
        }

        function Tt(e) {
          for (var t = "", n = new Uint8Array(e), r = n.byteLength, o = 0; o < r; o++) t += String.fromCharCode(n[o]);
          return t
        }

        function Ot(e, t) {
          if ("undefined" == typeof FileReader) return t(Tt((new FileReaderSync).readAsArrayBuffer(e)));
          var n = new FileReader,
            r = "function" == typeof n.readAsBinaryString;
          n.onloadend = function(e) {
            var n = e.target.result || "";
            if (r) return t(n);
            t(Tt(n))
          }, r ? n.readAsBinaryString(e) : n.readAsArrayBuffer(e)
        }

        function jt(e, t) {
          Ot(e, function(e) {
            t(e)
          })
        }

        function Lt(e, t) {
          jt(e, function(e) {
            t(qt(e))
          })
        }

        function It(e, t) {
          if ("undefined" == typeof FileReader) return t((new FileReaderSync).readAsArrayBuffer(e));
          var n = new FileReader;
          n.onloadend = function(e) {
            var n = e.target.result || new ArrayBuffer(0);
            t(n)
          }, n.readAsArrayBuffer(e)
        }
        var Dt = n.setImmediate || n.setTimeout,
          Rt = 32768;

        function Ft(e, t, n, r, o) {
          var i, a, s;
          (n > 0 || r < t.size) && (a = n, s = r, t = (i = t).webkitSlice ? i.webkitSlice(a, s) : i.slice(a, s)), It(t, function(t) {
            e.append(t), o()
          })
        }

        function Nt(e, t, n, r, o) {
          (n > 0 || r < t.length) && (t = t.substring(n, r)), e.appendBinary(t), o()
        }

        function Bt(e, t) {
          var n = "string" == typeof e,
            r = n ? e.length : e.size,
            o = Math.min(Rt, r),
            i = Math.ceil(r / o),
            a = 0,
            s = n ? new l : new l.ArrayBuffer,
            c = n ? Nt : Ft;

          function u() {
            Dt(d)
          }

          function f() {
            var e = s.end(!0),
              n = qt(e);
            t(n), s.destroy()
          }

          function d() {
            var t = a * o,
              n = t + o;
            c(s, e, t, n, ++a < i ? u : f)
          }
          d()
        }

        function $t(e, t, n) {
          var r = function(e) {
            try {
              return St(e)
            } catch (e) {
              return {
                error: ne(K, "Attachment is not a valid base64 string")
              }
            }
          }(e.data);
          if (r.error) return n(r.error);
          e.length = r.length, e.data = "blob" === t ? At(r, e.content_type) : "base64" === t ? qt(r) : r, Bt(r, function(t) {
            e.digest = "md5-" + t, n()
          })
        }

        function Mt(e, t, n) {
          if (e.stub) return n();
          var r, o, i;
          "string" == typeof e.data ? $t(e, t, n) : (o = t, i = n, Bt((r = e).data, function(e) {
            r.digest = "md5-" + e, r.length = r.data.size || r.data.length || 0, "binary" === o ? jt(r.data, function(e) {
              r.data = e, i()
            }) : "base64" === o ? Lt(r.data, function(e) {
              r.data = e, i()
            }) : i()
          }))
        }

        function Pt(e, t, n) {
          if (!e.length) return n();
          var r, o = 0;

          function i() {
            o++, e.length === o && (r ? n(r) : n())
          }
          e.forEach(function(e) {
            var n = e.data && e.data._attachments ? Object.keys(e.data._attachments) : [],
              o = 0;
            if (!n.length) return i();

            function a(e) {
              r = e, ++o === n.length && i()
            }
            for (var s in e.data._attachments) e.data._attachments.hasOwnProperty(s) && Mt(e.data._attachments[s], t, a)
          })
        }

        function Ut(e, t, n, r, o, i, a, s) {
          if (function(e, t) {
              for (var n, r = e.slice(), o = t.split("-"), i = parseInt(o[0], 10), a = o[1]; n = r.pop();) {
                if (n.pos === i && n.ids[0] === a) return !0;
                for (var s = n.ids[2], c = 0, u = s.length; c < u; c++) r.push({
                  pos: n.pos + 1,
                  ids: s[c]
                })
              }
              return !1
            }(t.rev_tree, n.metadata.rev)) return r[o] = n, i();
          var c = t.winningRev || me(t),
            u = "deleted" in t ? t.deleted : Ie(t, c),
            f = "deleted" in n.metadata ? n.metadata.deleted : Ie(n.metadata),
            l = /^1-/.test(n.metadata.rev);
          if (u && !f && s && l) {
            var d = n.data;
            d._rev = c, d._id = n.metadata.id, n = kt(d, s)
          }
          var h = je(t.rev_tree, n.metadata.rev_tree[0], e);
          if (s && (u && f && "new_leaf" !== h.conflicts || !u && "new_leaf" !== h.conflicts || u && !f && "new_branch" === h.conflicts)) {
            var p = ne(U);
            return r[o] = p, i()
          }
          var v = n.metadata.rev;
          n.metadata.rev_tree = h.tree, n.stemmedRevs = h.stemmedRevs || [], t.rev_map && (n.metadata.rev_map = t.rev_map);
          var g = me(n.metadata),
            y = Ie(n.metadata, g),
            _ = u === y ? 0 : u < y ? -1 : 1;
          a(n, g, y, v === g ? y : Ie(n.metadata, v), !0, _, o, i)
        }

        function Jt(e, t, n, r, o, i, a, s, c) {
          e = e || 1e3;
          var u = s.new_edits,
            f = new g,
            l = 0,
            d = t.length;

          function h() {
            ++l === d && c && c()
          }
          t.forEach(function(e, t) {
            if (e._id && De(e._id)) {
              var r = e._deleted ? "_removeLocal" : "_putLocal";
              n[r](e, {
                ctx: o
              }, function(e, n) {
                i[t] = e || n, h()
              })
            } else {
              var a = e.metadata.id;
              f.has(a) ? (d--, f.get(a).push([e, t])) : f.set(a, [
                [e, t]
              ])
            }
          }), f.forEach(function(t, n) {
            var o = 0;

            function c() {
              ++o < t.length ? f() : h()
            }

            function f() {
              var f = t[o],
                l = f[0],
                d = f[1];
              if (r.has(n)) Ut(e, r.get(n), l, i, d, c, a, u);
              else {
                var h = je([], l.metadata.rev_tree[0], e);
                l.metadata.rev_tree = h.tree, l.stemmedRevs = h.stemmedRevs || [],
                  function(e, t, n) {
                    var r = me(e.metadata),
                      o = Ie(e.metadata, r);
                    if ("was_delete" in s && o) return i[t] = ne(P, "deleted"), n();
                    if (u && "missing" === e.metadata.rev_tree[0].ids[1].status) {
                      var c = ne(U);
                      return i[t] = c, n()
                    }
                    a(e, r, o, o, !1, o ? 0 : 1, t, n)
                  }(l, d, c)
              }
            }
            f()
          })
        }
        var Wt = 5,
          Ht = "document-store",
          zt = "by-sequence",
          Kt = "attach-store",
          Xt = "attach-seq-store",
          Gt = "meta-store",
          Vt = "local-store",
          Qt = "detect-blob-support";

        function Yt(e) {
          try {
            return JSON.parse(e)
          } catch (t) {
            return d.parse(e)
          }
        }

        function Zt(e) {
          try {
            return JSON.stringify(e)
          } catch (t) {
            return d.stringify(e)
          }
        }

        function en(e) {
          return function(t) {
            var n = "unknown_error";
            t.target && t.target.error && (n = t.target.error.name || t.target.error.message), e(ne(Y, n, t.type))
          }
        }

        function tn(e, t, n) {
          return {
            data: Zt(e),
            winningRev: t,
            deletedOrLocal: n ? "1" : "0",
            seq: e.seq,
            id: e.id
          }
        }

        function nn(e) {
          if (!e) return null;
          var t = Yt(e.data);
          return t.winningRev = e.winningRev, t.deleted = "1" === e.deletedOrLocal, t.seq = e.seq, t
        }

        function rn(e) {
          if (!e) return e;
          var t = e._doc_id_rev.lastIndexOf(":");
          return e._id = e._doc_id_rev.substring(0, t - 1), e._rev = e._doc_id_rev.substring(t + 1), delete e._doc_id_rev, e
        }

        function on(e, t, n, r) {
          n ? r(e ? "string" != typeof e ? e : xt(e, t) : Ct([""], {
            type: t
          })) : e ? "string" != typeof e ? Ot(e, function(e) {
            r(qt(e))
          }) : r(e) : r("")
        }

        function an(e, t, n, r) {
          var o = Object.keys(e._attachments || {});
          if (!o.length) return r && r();
          var i = 0;

          function a() {
            ++i === o.length && r && r()
          }
          o.forEach(function(r) {
            var o, i, s;
            t.attachments && t.include_docs ? (o = r, i = e._attachments[o], s = i.digest, n.objectStore(Kt).get(s).onsuccess = function(e) {
              i.body = e.target.result.body, a()
            }) : (e._attachments[r].stub = !0, a())
          })
        }

        function sn(e, t) {
          return h.all(e.map(function(e) {
            if (e.doc && e.doc._attachments) {
              var n = Object.keys(e.doc._attachments);
              return h.all(n.map(function(n) {
                var r = e.doc._attachments[n];
                if ("body" in r) {
                  var o = r.body,
                    i = r.content_type;
                  return new h(function(a) {
                    on(o, i, t, function(t) {
                      e.doc._attachments[n] = B(C(r, ["digest", "content_type"]), {
                        data: t
                      }), a()
                    })
                  })
                }
              }))
            }
          }))
        }

        function cn(e, t, n) {
          var r = [],
            o = n.objectStore(zt),
            i = n.objectStore(Kt),
            a = n.objectStore(Xt),
            s = e.length;

          function c() {
            --s || function() {
              if (!r.length) return;
              r.forEach(function(e) {
                var t = a.index("digestSeq").count(IDBKeyRange.bound(e + "::", e + "::￿", !1, !1));
                t.onsuccess = function(t) {
                  var n = t.target.result;
                  n || i.delete(e)
                }
              })
            }()
          }
          e.forEach(function(e) {
            var n = o.index("_doc_id_rev"),
              i = t + "::" + e;
            n.getKey(i).onsuccess = function(e) {
              var t = e.target.result;
              if ("number" != typeof t) return c();
              o.delete(t), a.index("seq").openCursor(IDBKeyRange.only(t)).onsuccess = function(e) {
                var t = e.target.result;
                if (t) {
                  var n = t.value.digestSeq.split("::")[0];
                  r.push(n), a.delete(t.primaryKey), t.continue()
                } else c()
              }
            }
          })
        }

        function un(e, t, n) {
          try {
            return {
              txn: e.transaction(t, n)
            }
          } catch (e) {
            return {
              error: e
            }
          }
        }
        var fn = new D;

        function ln(e, t, n, r, o, i) {
          for (var a, s, c, u, f, l, d, h, p = t.docs, v = 0, y = p.length; v < y; v++) {
            var _ = p[v];
            _._id && De(_._id) || (_ = p[v] = kt(_, n.new_edits)).error && !d && (d = _)
          }
          if (d) return i(d);
          var m = !1,
            b = 0,
            w = new Array(p.length),
            E = new g,
            k = !1,
            S = r._meta.blobSupport ? "blob" : "base64";

          function q() {
            m = !0, C()
          }

          function C() {
            h && m && (h.docCount += b, l.put(h))
          }

          function A() {
            k || (fn.notify(r._meta.name), i(null, w))
          }

          function x(e, t, n, r, o, i, a, s) {
            e.metadata.winningRev = t, e.metadata.deleted = n;
            var c = e.data;
            if (c._id = e.metadata.id, c._rev = e.metadata.rev, r && (c._deleted = !0), c._attachments && Object.keys(c._attachments).length) return function(e, t, n, r, o, i) {
              var a = e.data,
                s = 0,
                c = Object.keys(a._attachments);

              function f() {
                s === c.length && T(e, t, n, r, o, i)
              }

              function l() {
                s++, f()
              }
              c.forEach(function(n) {
                var r, o, i, a = e.data._attachments[n];
                if (a.stub) s++, f();
                else {
                  var c = a.data;
                  delete a.data, a.revpos = parseInt(t, 10);
                  var d = a.digest;
                  r = d, o = c, i = l, u.count(r).onsuccess = function(e) {
                    var t = e.target.result;
                    if (t) return i();
                    var n = {
                        digest: r,
                        body: o
                      },
                      a = u.put(n);
                    a.onsuccess = i
                  }
                }
              })
            }(e, t, n, o, a, s);
            b += i, C(), T(e, t, n, o, a, s)
          }

          function T(e, t, n, o, i, u) {
            var l = e.data,
              d = e.metadata;

            function h(i) {
              var c = e.stemmedRevs || [];
              o && r.auto_compaction && (c = c.concat(Se(e.metadata))), c && c.length && cn(c, e.metadata.id, a), d.seq = i.target.result;
              var u = tn(d, t, n);
              s.put(u).onsuccess = p
            }

            function p() {
              w[i] = {
                  ok: !0,
                  id: d.id,
                  rev: d.rev
                }, E.set(e.metadata.id, e.metadata),
                function(e, t, n) {
                  var r = 0,
                    o = Object.keys(e.data._attachments || {});
                  if (!o.length) return n();

                  function i() {
                    ++r === o.length && n()
                  }

                  function a(n) {
                    var r = e.data._attachments[n].digest,
                      o = f.put({
                        seq: t,
                        digestSeq: r + "::" + t
                      });
                    o.onsuccess = i, o.onerror = function(e) {
                      e.preventDefault(), e.stopPropagation(), i()
                    }
                  }
                  for (var s = 0; s < o.length; s++) a(o[s])
                }(e, d.seq, u)
            }
            l._doc_id_rev = d.id + "::" + d.rev, delete l._id, delete l._rev;
            var v = c.put(l);
            v.onsuccess = h, v.onerror = function(e) {
              e.preventDefault(), e.stopPropagation(), c.index("_doc_id_rev").getKey(l._doc_id_rev).onsuccess = function(e) {
                c.put(l, e.target.result).onsuccess = h
              }
            }
          }
          Pt(p, S, function(t) {
            if (t) return i(t);
            ! function() {
              var t = un(o, [Ht, zt, Kt, Vt, Xt, Gt], "readwrite");
              if (t.error) return i(t.error);
              (a = t.txn).onabort = en(i), a.ontimeout = en(i), a.oncomplete = A, s = a.objectStore(Ht), c = a.objectStore(zt), u = a.objectStore(Kt), f = a.objectStore(Xt), (l = a.objectStore(Gt)).get(Gt).onsuccess = function(e) {
                  h = e.target.result, C()
                },
                function(e) {
                  var t = [];
                  if (p.forEach(function(e) {
                      e.data && e.data._attachments && Object.keys(e.data._attachments).forEach(function(n) {
                        var r = e.data._attachments[n];
                        r.stub && t.push(r.digest)
                      })
                    }), !t.length) return e();
                  var n, r = 0;
                  t.forEach(function(o) {
                    var i, a;
                    i = o, a = function(o) {
                      o && !n && (n = o), ++r === t.length && e(n)
                    }, u.get(i).onsuccess = function(e) {
                      if (e.target.result) a();
                      else {
                        var t = ne(te, "unknown stub attachment with digest " + i);
                        t.status = 412, a(t)
                      }
                    }
                  })
                }(function(t) {
                  if (t) return k = !0, i(t);
                  ! function() {
                    if (!p.length) return;
                    var t = 0;

                    function o() {
                      ++t === p.length && Jt(e.revs_limit, p, r, E, a, w, x, n, q)
                    }

                    function i(e) {
                      var t = nn(e.target.result);
                      t && E.set(t.id, t), o()
                    }
                    for (var c = 0, u = p.length; c < u; c++) {
                      var f = p[c];
                      if (f._id && De(f._id)) o();
                      else {
                        var l = s.get(f.metadata.id);
                        l.onsuccess = i
                      }
                    }
                  }()
                })
            }()
          })
        }

        function dn(e, t, n, r, o) {
          var i, a, s;

          function c(e) {
            a = e.target.result, i && o(i, a, s)
          }

          function u(e) {
            i = e.target.result, a && o(i, a, s)
          }

          function f(e) {
            var t = e.target.result;
            if (!t) return o();
            o([t.key], [t.value], t)
          }
          "function" == typeof e.getAll && "function" == typeof e.getAllKeys && r > 1 && !n ? (s = {
            continue: function() {
              if (!i.length) return o();
              var n, s = i[i.length - 1];
              if (t && t.upper) try {
                n = IDBKeyRange.bound(s, t.upper, !0, t.upperOpen)
              } catch (e) {
                if ("DataError" === e.name && 0 === e.code) return o()
              } else n = IDBKeyRange.lowerBound(s, !0);
              t = n, i = null, a = null, e.getAll(t, r).onsuccess = c, e.getAllKeys(t, r).onsuccess = u
            }
          }, e.getAll(t, r).onsuccess = c, e.getAllKeys(t, r).onsuccess = u) : n ? e.openCursor(t, "prev").onsuccess = f : e.openCursor(t).onsuccess = f
        }

        function hn(e, t, n) {
          var r, o, i = "startkey" in e && e.startkey,
            a = "endkey" in e && e.endkey,
            s = "key" in e && e.key,
            c = "keys" in e && e.keys,
            u = e.skip || 0,
            f = "number" == typeof e.limit ? e.limit : -1,
            l = !1 !== e.inclusive_end;
          if (!c && (o = (r = function(e, t, n, r, o) {
              try {
                if (e && t) return o ? IDBKeyRange.bound(t, e, !n, !1) : IDBKeyRange.bound(e, t, !1, !n);
                if (e) return o ? IDBKeyRange.upperBound(e) : IDBKeyRange.lowerBound(e);
                if (t) return o ? IDBKeyRange.lowerBound(t, !n) : IDBKeyRange.upperBound(t, !n);
                if (r) return IDBKeyRange.only(r)
              } catch (e) {
                return {
                  error: e
                }
              }
              return null
            }(i, a, l, s, e.descending)) && r.error) && ("DataError" !== o.name || 0 !== o.code)) return n(ne(Y, o.name, o.message));
          var d = [Ht, zt, Gt];
          e.attachments && d.push(Kt);
          var h = un(t, d, "readonly");
          if (h.error) return n(h.error);
          var p = h.txn;
          p.oncomplete = function() {
            e.attachments ? sn(C, e.binary).then(O) : O()
          }, p.onabort = en(n);
          var v, g, y, _, m, b, w, E = p.objectStore(Ht),
            k = p.objectStore(zt),
            S = p.objectStore(Gt),
            q = k.index("_doc_id_rev"),
            C = [];

          function A(t, n) {
            var r, o, i, a, s = {
              id: n.id,
              key: n.id,
              value: {
                rev: t
              }
            };
            n.deleted ? c && (C.push(s), s.value.deleted = !0, s.doc = null) : u-- <= 0 && (C.push(s), e.include_docs && (o = s, i = t, a = (r = n).id + "::" + i, q.get(a).onsuccess = function(t) {
              if (o.doc = rn(t.target.result), e.conflicts) {
                var n = ke(r);
                n.length && (o.doc._conflicts = n)
              }
              an(o.doc, e, p)
            }))
          }

          function x(e) {
            for (var t = 0, n = e.length; t < n && C.length !== f; t++) {
              var r = e[t];
              if (r.error && c) C.push(r);
              else {
                var o = nn(r);
                A(o.winningRev, o)
              }
            }
          }

          function T(e, t, n) {
            n && (x(t), C.length < f && n.continue())
          }

          function O() {
            var t = {
              total_rows: v,
              offset: e.skip,
              rows: C
            };
            e.update_seq && void 0 !== g && (t.update_seq = g), n(null, t)
          }
          return S.get(Gt).onsuccess = function(e) {
            v = e.target.result.docCount
          }, e.update_seq && function(e, t) {
            e.openCursor(null, "prev").onsuccess = function(e) {
              var n = e.target.result,
                r = void 0;
              n && n.key && (r = n.key);
              return t({
                target: {
                  result: [r]
                }
              })
            }
          }(k, function(e) {
            e.target.result && e.target.result.length > 0 && (g = e.target.result[0])
          }), o || 0 === f ? void 0 : c ? (y = e.keys, _ = E, m = T, b = [], w = 0, void y.forEach(function(e, t) {
            _.get(e).onsuccess = function(n) {
              n.target.result ? b[t] = n.target.result : b[t] = {
                key: e,
                error: "not_found"
              }, ++w === y.length && m(y, b, {})
            }
          })) : -1 === f ? function(e, t, n) {
            if ("function" != typeof e.getAll) {
              var r = [];
              e.openCursor(t).onsuccess = function(e) {
                var t = e.target.result;
                t ? (r.push(t.value), t.continue()) : n({
                  target: {
                    result: r
                  }
                })
              }
            } else e.getAll(t).onsuccess = n
          }(E, r, function(t) {
            var n = t.target.result;
            e.descending && (n = n.reverse()), x(n)
          }) : void dn(E, r, e.descending, f + u, T)
        }
        var pn = !1,
          vn = [];

        function gn() {
          !pn && vn.length && (pn = !0, vn.shift()())
        }

        function yn(e, t, n, r) {
          if ((e = m(e)).continuous) {
            var o = n + ":" + _e();
            return fn.addListener(n, o, t, e), fn.notify(n), {
              cancel: function() {
                fn.removeListener(n, o)
              }
            }
          }
          var i = e.doc_ids && new v(e.doc_ids);
          e.since = e.since || 0;
          var a, s = e.since,
            c = "limit" in e ? e.limit : -1;
          0 === c && (c = 1), a = "return_docs" in e ? e.return_docs : !("returnDocs" in e) || e.returnDocs;
          var u, f, l, d, h = [],
            p = 0,
            y = oe(e),
            _ = new g;

          function b(e, t, n, r) {
            if (n.seq !== t) return r();
            if (n.winningRev === e._rev) return r(n, e);
            var o = e._id + "::" + n.winningRev;
            d.get(o).onsuccess = function(e) {
              r(n, rn(e.target.result))
            }
          }

          function w() {
            e.complete(null, {
              results: h,
              last_seq: s
            })
          }
          var E = [Ht, zt];
          e.attachments && E.push(Kt);
          var k = un(r, E, "readonly");
          if (k.error) return e.complete(k.error);
          (u = k.txn).onabort = en(e.complete), u.oncomplete = function() {
            !e.continuous && e.attachments ? sn(h).then(w) : w()
          }, f = u.objectStore(zt), l = u.objectStore(Ht), d = f.index("_doc_id_rev"), dn(f, e.since && !e.descending ? IDBKeyRange.lowerBound(e.since, !0) : null, e.descending, c, function(t, n, r) {
            if (r && t.length) {
              var o = new Array(t.length),
                f = new Array(t.length),
                d = 0;
              n.forEach(function(e, n) {
                ! function(e, t, n) {
                  if (i && !i.has(e._id)) return n();
                  var r = _.get(e._id);
                  if (r) return b(e, t, r, n);
                  l.get(e._id).onsuccess = function(o) {
                    r = nn(o.target.result), _.set(e._id, r), b(e, t, r, n)
                  }
                }(rn(e), t[n], function(e, i) {
                  f[n] = e, o[n] = i, ++d === t.length && function() {
                    for (var e = 0, t = o.length; e < t && p !== c; e++) {
                      var n = o[e];
                      n && v(f[e], n)
                    }
                    p !== c && r.continue()
                  }()
                })
              })
            }

            function v(t, n) {
              var r = e.processChange(n, t, e);
              s = r.seq = t.seq;
              var o = y(r);
              if ("object" == typeof o) return e.complete(o);
              o && (p++, a && h.push(r), e.attachments && e.include_docs ? an(n, e, u, function() {
                sn([r], e.binary).then(function() {
                  e.onChange(r)
                })
              }) : e.onChange(r))
            }
          })
        }
        var _n, mn = new g,
          bn = new g;

        function wn(e, t) {
          var n, r, o, i = this;
          n = function(t) {
            ! function(e, t, n) {
              var r = t.name,
                o = null;

              function i(e, t) {
                var n = e.objectStore(Ht);
                n.createIndex("deletedOrLocal", "deletedOrLocal", {
                  unique: !1
                }), n.openCursor().onsuccess = function(e) {
                  var r = e.target.result;
                  if (r) {
                    var o = r.value,
                      i = Ie(o);
                    o.deletedOrLocal = i ? "1" : "0", n.put(o), r.continue()
                  } else t()
                }
              }

              function s(e, t) {
                var n = e.objectStore(Vt),
                  r = e.objectStore(Ht),
                  o = e.objectStore(zt),
                  i = r.openCursor();
                i.onsuccess = function(e) {
                  var i = e.target.result;
                  if (i) {
                    var a = i.value,
                      s = a.id,
                      c = De(s),
                      u = me(a);
                    if (c) {
                      var f = s + "::" + u,
                        l = s + "::",
                        d = s + "::~",
                        h = o.index("_doc_id_rev"),
                        p = IDBKeyRange.bound(l, d, !1, !1),
                        v = h.openCursor(p);
                      v.onsuccess = function(e) {
                        if (v = e.target.result) {
                          var t = v.value;
                          t._doc_id_rev === f && n.put(t), o.delete(v.primaryKey), v.continue()
                        } else r.delete(i.primaryKey), i.continue()
                      }
                    } else i.continue()
                  } else t && t()
                }
              }

              function c(e, t) {
                var n = e.objectStore(zt),
                  r = e.objectStore(Kt),
                  o = e.objectStore(Xt),
                  i = r.count();
                i.onsuccess = function(e) {
                  var r = e.target.result;
                  if (!r) return t();
                  n.openCursor().onsuccess = function(e) {
                    var n = e.target.result;
                    if (!n) return t();
                    for (var r = n.value, i = n.primaryKey, a = Object.keys(r._attachments || {}), s = {}, c = 0; c < a.length; c++) {
                      var u = r._attachments[a[c]];
                      s[u.digest] = !0
                    }
                    var f = Object.keys(s);
                    for (c = 0; c < f.length; c++) {
                      var l = f[c];
                      o.put({
                        seq: i,
                        digestSeq: l + "::" + i
                      })
                    }
                    n.continue()
                  }
                }
              }

              function u(e) {
                var t = e.objectStore(zt),
                  n = e.objectStore(Ht),
                  r = n.openCursor();
                r.onsuccess = function(e) {
                  var r = e.target.result;
                  if (r) {
                    var o, i, a, s = function(e) {
                      if (!e.data) return e.deleted = "1" === e.deletedOrLocal, e;
                      return nn(e)
                    }(r.value);
                    if (s.winningRev = s.winningRev || me(s), s.seq) return c();
                    o = s.id + "::", i = s.id + "::￿", a = 0, t.index("_doc_id_rev").openCursor(IDBKeyRange.bound(o, i)).onsuccess = function(e) {
                      var t = e.target.result;
                      if (!t) return s.seq = a, c();
                      var n = t.primaryKey;
                      n > a && (a = n), t.continue()
                    }
                  }

                  function c() {
                    var e = tn(s, s.winningRev, s.deleted),
                      t = n.put(e);
                    t.onsuccess = function() {
                      r.continue()
                    }
                  }
                }
              }
              e._meta = null, e._remote = !1, e.type = function() {
                return "idb"
              }, e._id = w(function(t) {
                t(null, e._meta.instanceId)
              }), e._bulkDocs = function(n, r, i) {
                ln(t, n, r, e, o, i)
              }, e._get = function(e, t, n) {
                var r, i, a, s = t.ctx;
                if (!s) {
                  var c = un(o, [Ht, zt, Kt], "readonly");
                  if (c.error) return n(c.error);
                  s = c.txn
                }

                function u() {
                  n(a, {
                    doc: r,
                    metadata: i,
                    ctx: s
                  })
                }
                s.objectStore(Ht).get(e).onsuccess = function(e) {
                  if (!(i = nn(e.target.result))) return a = ne(P, "missing"), u();
                  var n;
                  if (t.rev) n = t.latest ? Re(t.rev, i) : t.rev;
                  else {
                    n = i.winningRev;
                    var o = Ie(i);
                    if (o) return a = ne(P, "deleted"), u()
                  }
                  var c = s.objectStore(zt),
                    f = i.id + "::" + n;
                  c.index("_doc_id_rev").get(f).onsuccess = function(e) {
                    if ((r = e.target.result) && (r = rn(r)), !r) return a = ne(P, "missing"), u();
                    u()
                  }
                }
              }, e._getAttachment = function(e, t, n, r, i) {
                var a;
                if (r.ctx) a = r.ctx;
                else {
                  var s = un(o, [Ht, zt, Kt], "readonly");
                  if (s.error) return i(s.error);
                  a = s.txn
                }
                var c = n.digest,
                  u = n.content_type;
                a.objectStore(Kt).get(c).onsuccess = function(e) {
                  var t = e.target.result.body;
                  on(t, u, r.binary, function(e) {
                    i(null, e)
                  })
                }
              }, e._info = function(t) {
                var n, r, i = un(o, [Gt, zt], "readonly");
                if (i.error) return t(i.error);
                var a = i.txn;
                a.objectStore(Gt).get(Gt).onsuccess = function(e) {
                  r = e.target.result.docCount
                }, a.objectStore(zt).openCursor(null, "prev").onsuccess = function(e) {
                  var t = e.target.result;
                  n = t ? t.key : 0
                }, a.oncomplete = function() {
                  t(null, {
                    doc_count: r,
                    update_seq: n,
                    idb_attachment_format: e._meta.blobSupport ? "binary" : "base64"
                  })
                }
              }, e._allDocs = function(e, t) {
                hn(e, o, t)
              }, e._changes = function(t) {
                return yn(t, e, r, o)
              }, e._close = function(e) {
                o.close(), mn.delete(r), e()
              }, e._getRevisionTree = function(e, t) {
                var n = un(o, [Ht], "readonly");
                if (n.error) return t(n.error);
                var r = n.txn,
                  i = r.objectStore(Ht).get(e);
                i.onsuccess = function(e) {
                  var n = nn(e.target.result);
                  n ? t(null, n.rev_tree) : t(ne(P))
                }
              }, e._doCompaction = function(e, t, n) {
                var r = [Ht, zt, Kt, Xt],
                  i = un(o, r, "readwrite");
                if (i.error) return n(i.error);
                var a = i.txn,
                  s = a.objectStore(Ht);
                s.get(e).onsuccess = function(n) {
                  var r = nn(n.target.result);
                  be(r.rev_tree, function(e, n, r, o, i) {
                    var a = n + "-" + r; - 1 !== t.indexOf(a) && (i.status = "missing")
                  }), cn(t, e, a);
                  var o = r.winningRev,
                    i = r.deleted;
                  a.objectStore(Ht).put(tn(r, o, i))
                }, a.onabort = en(n), a.oncomplete = function() {
                  n()
                }
              }, e._getLocal = function(e, t) {
                var n = un(o, [Vt], "readonly");
                if (n.error) return t(n.error);
                var r = n.txn,
                  i = r.objectStore(Vt).get(e);
                i.onerror = en(t), i.onsuccess = function(e) {
                  var n = e.target.result;
                  n ? (delete n._doc_id_rev, t(null, n)) : t(ne(P))
                }
              }, e._putLocal = function(e, t, n) {
                "function" == typeof t && (n = t, t = {}), delete e._revisions;
                var r = e._rev,
                  i = e._id;
                e._rev = r ? "0-" + (parseInt(r.split("-")[1], 10) + 1) : "0-1";
                var a, s = t.ctx;
                if (!s) {
                  var c = un(o, [Vt], "readwrite");
                  if (c.error) return n(c.error);
                  (s = c.txn).onerror = en(n), s.oncomplete = function() {
                    a && n(null, a)
                  }
                }
                var u, f = s.objectStore(Vt);
                r ? (u = f.get(i)).onsuccess = function(o) {
                  var i = o.target.result;
                  if (i && i._rev === r) {
                    var s = f.put(e);
                    s.onsuccess = function() {
                      a = {
                        ok: !0,
                        id: e._id,
                        rev: e._rev
                      }, t.ctx && n(null, a)
                    }
                  } else n(ne(U))
                } : ((u = f.add(e)).onerror = function(e) {
                  n(ne(U)), e.preventDefault(), e.stopPropagation()
                }, u.onsuccess = function() {
                  a = {
                    ok: !0,
                    id: e._id,
                    rev: e._rev
                  }, t.ctx && n(null, a)
                })
              }, e._removeLocal = function(e, t, n) {
                "function" == typeof t && (n = t, t = {});
                var r, i = t.ctx;
                if (!i) {
                  var a = un(o, [Vt], "readwrite");
                  if (a.error) return n(a.error);
                  (i = a.txn).oncomplete = function() {
                    r && n(null, r)
                  }
                }
                var s = e._id,
                  c = i.objectStore(Vt),
                  u = c.get(s);
                u.onerror = en(n), u.onsuccess = function(o) {
                  var i = o.target.result;
                  i && i._rev === e._rev ? (c.delete(s), r = {
                    ok: !0,
                    id: s,
                    rev: "0-0"
                  }, t.ctx && n(null, r)) : n(ne(P))
                }
              }, e._destroy = function(e, t) {
                fn.removeAllListeners(r);
                var n = bn.get(r);
                n && n.result && (n.result.close(), mn.delete(r));
                var o = indexedDB.deleteDatabase(r);
                o.onsuccess = function() {
                  bn.delete(r), I() && r in localStorage && delete localStorage[r], t(null, {
                    ok: !0
                  })
                }, o.onerror = en(t)
              };
              var f, l = mn.get(r);
              if (l) return o = l.idb, e._meta = l.global, a(function() {
                n(null, e)
              });
              f = t.storage ? function(e, t) {
                try {
                  return indexedDB.open(e, {
                    version: Wt,
                    storage: t
                  })
                } catch (t) {
                  return indexedDB.open(e, Wt)
                }
              }(r, t.storage) : indexedDB.open(r, Wt);
              bn.set(r, f), f.onupgradeneeded = function(e) {
                var t = e.target.result;
                if (e.oldVersion < 1) return function(e) {
                  var t = e.createObjectStore(Ht, {
                    keyPath: "id"
                  });
                  e.createObjectStore(zt, {
                    autoIncrement: !0
                  }).createIndex("_doc_id_rev", "_doc_id_rev", {
                    unique: !0
                  }), e.createObjectStore(Kt, {
                    keyPath: "digest"
                  }), e.createObjectStore(Gt, {
                    keyPath: "id",
                    autoIncrement: !1
                  }), e.createObjectStore(Qt), t.createIndex("deletedOrLocal", "deletedOrLocal", {
                    unique: !1
                  }), e.createObjectStore(Vt, {
                    keyPath: "_id"
                  });
                  var n = e.createObjectStore(Xt, {
                    autoIncrement: !0
                  });
                  n.createIndex("seq", "seq"), n.createIndex("digestSeq", "digestSeq", {
                    unique: !0
                  })
                }(t);
                var n, r = e.currentTarget.transaction;
                e.oldVersion < 3 && t.createObjectStore(Vt, {
                  keyPath: "_id"
                }).createIndex("_doc_id_rev", "_doc_id_rev", {
                  unique: !0
                }), e.oldVersion < 4 && ((n = t.createObjectStore(Xt, {
                  autoIncrement: !0
                })).createIndex("seq", "seq"), n.createIndex("digestSeq", "digestSeq", {
                  unique: !0
                }));
                var o = [i, s, c, u],
                  a = e.oldVersion;
                ! function e() {
                  var t = o[a - 1];
                  a++;
                  t && t(r, e)
                }()
              }, f.onsuccess = function(t) {
                (o = t.target.result).onversionchange = function() {
                  o.close(), mn.delete(r)
                }, o.onabort = function(e) {
                  R("error", "Database has a global failure", e.target.error), o.close(), mn.delete(r)
                };
                var i, a, s, c, u, f, l = o.transaction([Gt, Qt, Ht], "readwrite"),
                  d = !1;

                function p() {
                  void 0 !== s && d && (e._meta = {
                    name: r,
                    instanceId: c,
                    blobSupport: s
                  }, mn.set(r, {
                    idb: o,
                    global: e._meta
                  }), n(null, e))
                }

                function v() {
                  if (void 0 !== a && void 0 !== i) {
                    var e = r + "_id";
                    e in i ? c = i[e] : i[e] = c = _e(), i.docCount = a, l.objectStore(Gt).put(i)
                  }
                }
                l.objectStore(Gt).get(Gt).onsuccess = function(e) {
                  i = e.target.result || {
                    id: Gt
                  }, v()
                }, u = function(e) {
                  a = e, v()
                }, l.objectStore(Ht).index("deletedOrLocal").count(IDBKeyRange.only("0")).onsuccess = function(e) {
                  u(e.target.result)
                }, _n || (f = l, _n = new h(function(e) {
                  var t = Ct([""]);
                  f.objectStore(Qt).put(t, "key").onsuccess = function() {
                    var t = navigator.userAgent.match(/Chrome\/(\d+)/),
                      n = navigator.userAgent.match(/Edge\//);
                    e(n || !t || parseInt(t[1], 10) >= 43)
                  }, f.onabort = function(t) {
                    t.preventDefault(), t.stopPropagation(), e(!1)
                  }
                }).catch(function() {
                  return !1
                })), _n.then(function(e) {
                  s = e, p()
                }), l.oncomplete = function() {
                  d = !0, p()
                }, l.onabort = en(n)
              }, f.onerror = function() {
                var e = "Failed to open indexedDB, are you in private browsing mode?";
                R("error", e), n(ne(Y, e))
              }
            }(i, e, t)
          }, r = t, o = i.constructor, vn.push(function() {
            n(function(e, t) {
              ! function(e, t, n, r) {
                try {
                  e(t, n)
                } catch (t) {
                  r.emit("error", t)
                }
              }(r, e, t, o), pn = !1, a(function() {
                gn()
              })
            })
          }), gn()
        }

        function En(e) {
          return e < 65 ? e - 48 : e - 55
        }

        function kn(e, t) {
          return "UTF-8" === t ? (n = function(e, t, n) {
            for (var r = ""; t < n;) r += String.fromCharCode(En(e.charCodeAt(t++)) << 4 | En(e.charCodeAt(t++)));
            return r
          }(e, 0, e.length), decodeURIComponent(escape(n))) : function(e, t, n) {
            for (var r = ""; t < n;) r += String.fromCharCode(En(e.charCodeAt(t + 2)) << 12 | En(e.charCodeAt(t + 3)) << 8 | En(e.charCodeAt(t)) << 4 | En(e.charCodeAt(t + 1))), t += 4;
            return r
          }(e, 0, e.length);
          var n
        }

        function Sn(e) {
          return "'" + e + "'"
        }
        wn.valid = function() {
          var e = "undefined" != typeof openDatabase && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform),
            t = "function" == typeof fetch && -1 !== fetch.toString().indexOf("[native code");
          try {
            return (!e || t) && "undefined" != typeof indexedDB && "undefined" != typeof IDBKeyRange
          } catch (e) {
            return !1
          }
        };
        var qn = 7,
          Cn = Sn("document-store"),
          An = Sn("by-sequence"),
          xn = Sn("attach-store"),
          Tn = Sn("local-store"),
          On = Sn("metadata-store"),
          jn = Sn("attach-seq-store");

        function Ln(e) {
          return delete e._id, delete e._rev, JSON.stringify(e)
        }

        function In(e, t, n) {
          return (e = JSON.parse(e))._id = t, e._rev = n, e
        }

        function Dn(e) {
          for (var t = "("; e--;) t += "?", e && (t += ",");
          return t + ")"
        }

        function Rn(e, t, n, r, o) {
          return "SELECT " + e + " FROM " + ("string" == typeof t ? t : t.join(" JOIN ")) + (n ? " ON " + n : "") + (r ? " WHERE " + ("string" == typeof r ? r : r.join(" AND ")) : "") + (o ? " ORDER BY " + o : "")
        }

        function Fn(e, t, n) {
          if (e.length) {
            var r = 0,
              o = [];
            e.forEach(function(e) {
              var r = "SELECT seq FROM " + An + " WHERE doc_id=? AND rev=?";
              n.executeSql(r, [t, e], function(e, t) {
                if (!t.rows.length) return i();
                var n = t.rows.item(0).seq;
                o.push(n), e.executeSql("DELETE FROM " + An + " WHERE seq=?", [n], i)
              })
            })
          }

          function i() {
            ++r === e.length && function() {
              if (!o.length) return;
              var e = "SELECT DISTINCT digest AS digest FROM " + jn + " WHERE seq IN " + Dn(o.length);
              n.executeSql(e, o, function(e, t) {
                for (var n = [], r = 0; r < t.rows.length; r++) n.push(t.rows.item(r).digest);
                if (n.length) {
                  var i = "DELETE FROM " + jn + " WHERE seq IN (" + o.map(function() {
                    return "?"
                  }).join(",") + ")";
                  e.executeSql(i, o, function(e) {
                    var t = "SELECT digest FROM " + jn + " WHERE digest IN (" + n.map(function() {
                      return "?"
                    }).join(",") + ")";
                    e.executeSql(t, n, function(e, t) {
                      for (var r = new v, o = 0; o < t.rows.length; o++) r.add(t.rows.item(o).digest);
                      n.forEach(function(t) {
                        r.has(t) || (e.executeSql("DELETE FROM " + jn + " WHERE digest=?", [t]), e.executeSql("DELETE FROM " + xn + " WHERE digest=?", [t]))
                      })
                    })
                  })
                }
              })
            }()
          }
        }

        function Nn(e) {
          return function(t) {
            R("error", "WebSQL threw an error", t);
            var n = t && t.constructor.toString().match(/function ([^(]+)/),
              r = (n && n[1] || t.type, t.target || t.message);
            e(ne(Z, r))
          }
        }

        function Bn(e, t, n, r, o, i, a) {
          var s, c = n.new_edits,
            u = t.docs.map(function(e) {
              return e._id && De(e._id) ? e : kt(e, c)
            }),
            f = u.filter(function(e) {
              return e.error
            });
          if (f.length) return a(f[0]);
          var l, d = new Array(u.length),
            h = new g;

          function p() {
            if (l) return a(l);
            i.notify(r._name), a(null, d)
          }

          function v(e) {
            var t = [];
            if (u.forEach(function(e) {
                e.data && e.data._attachments && Object.keys(e.data._attachments).forEach(function(n) {
                  var r = e.data._attachments[n];
                  r.stub && t.push(r.digest)
                })
              }), !t.length) return e();
            var n, r = 0;
            t.forEach(function(o) {
              var i, a, c;
              i = o, a = function(o) {
                o && !n && (n = o), ++r === t.length && e(n)
              }, c = "SELECT count(*) as cnt FROM " + xn + " WHERE digest=?", s.executeSql(c, [i], function(e, t) {
                if (0 === t.rows.item(0).cnt) {
                  var n = ne(te, "unknown stub attachment with digest " + i);
                  a(n)
                } else a()
              })
            })
          }

          function y(e, t, n, o, i, a, c, u) {
            function f() {
              var t = e.data,
                n = o ? 1 : 0,
                r = t._id,
                i = t._rev,
                a = Ln(t),
                c = "INSERT INTO " + An + " (doc_id, rev, json, deleted) VALUES (?, ?, ?, ?);",
                u = [r, i, a, n];

              function f(e, n) {
                var r, o, i, a = 0,
                  c = Object.keys(t._attachments || {});
                if (!c.length) return n();

                function u() {
                  return ++a === c.length && n(), !1
                }
                for (var f = 0; f < c.length; f++) r = c[f], void 0, void 0, o = "INSERT INTO " + jn + " (digest, seq) VALUES (?,?)", i = [t._attachments[r].digest, e], s.executeSql(o, i, u, u)
              }
              s.executeSql(c, u, function(e, t) {
                var n = t.insertId;
                f(n, function() {
                  _(e, n)
                })
              }, function() {
                var e = Rn("seq", An, null, "doc_id=? AND rev=?");
                return s.executeSql(e, [r, i], function(e, t) {
                  var o = t.rows.item(0).seq,
                    s = "UPDATE " + An + " SET json=?, deleted=? WHERE doc_id=? AND rev=?;",
                    c = [a, n, r, i];
                  e.executeSql(s, c, function(e) {
                    f(o, function() {
                      _(e, o)
                    })
                  })
                }), !1
              })
            }

            function l(e) {
              p || (e ? u(p = e) : v === g.length && f())
            }
            var p = null,
              v = 0;
            e.data._id = e.metadata.id, e.data._rev = e.metadata.rev;
            var g = Object.keys(e.data._attachments || {});

            function y(e) {
              v++, l(e)
            }

            function _(n, o) {
              var a = e.metadata.id,
                s = e.stemmedRevs || [];
              i && r.auto_compaction && (s = Se(e.metadata).concat(s)), s.length && Fn(s, a, n), e.metadata.seq = o;
              var f = e.metadata.rev;
              delete e.metadata.rev;
              var l = i ? "UPDATE " + Cn + " SET json=?, max_seq=?, winningseq=(SELECT seq FROM " + An + " WHERE doc_id=" + Cn + ".id AND rev=?) WHERE id=?" : "INSERT INTO " + Cn + " (id, winningseq, max_seq, json) VALUES (?,?,?,?);",
                p = Zt(e.metadata),
                v = i ? [p, o, t, a] : [a, o, o, p];
              n.executeSql(l, v, function() {
                d[c] = {
                  ok: !0,
                  id: e.metadata.id,
                  rev: f
                }, h.set(a, e.metadata), u()
              })
            }
            o && (e.data._deleted = !0), g.forEach(function(n) {
              var r, o, i, a, c = e.data._attachments[n];
              if (c.stub) v++, l();
              else {
                var u = c.data;
                delete c.data, c.revpos = parseInt(t, 10);
                var f = c.digest;
                r = f, o = u, i = y, a = "SELECT digest FROM " + xn + " WHERE digest=?", s.executeSql(a, [r], function(e, t) {
                  if (t.rows.length) return i();
                  var n;
                  a = "INSERT INTO " + xn + " (digest, body, escaped) VALUES (?,?,1)", e.executeSql(a, [r, (n = o, n.replace(/\u0002/g, "").replace(/\u0001/g, "").replace(/\u0000/g, ""))], function() {
                    i()
                  }, function() {
                    return i(), !1
                  })
                })
              }
            }), g.length || f()
          }

          function _() {
            Jt(e.revs_limit, u, r, h, s, d, y, n)
          }
          Pt(u, "binary", function(e) {
            if (e) return a(e);
            o.transaction(function(e) {
              s = e, v(function(e) {
                e ? l = e : function(e) {
                  if (!u.length) return e();
                  var t = 0;

                  function n() {
                    ++t === u.length && e()
                  }
                  u.forEach(function(e) {
                    if (e._id && De(e._id)) return n();
                    var t = e.metadata.id;
                    s.executeSql("SELECT json FROM " + Cn + " WHERE id = ?", [t], function(e, r) {
                      if (r.rows.length) {
                        var o = Yt(r.rows.item(0).json);
                        h.set(t, o)
                      }
                      n()
                    })
                  })
                }(_)
              })
            }, Nn(a), p)
          })
        }
        var $n = new g;
        var Mn = new D;

        function Pn(e, t, n, r, o) {
          var i = Object.keys(e._attachments || {});
          if (!i.length) return o && o();
          var a = 0;

          function s() {
            ++a === i.length && o && o()
          }
          i.forEach(function(o) {
            var i, a, c, u;
            t.attachments && t.include_docs ? (a = o, c = (i = e)._attachments[a], u = {
              binary: t.binary,
              ctx: r
            }, n._getAttachment(i._id, a, c, u, function(e, t) {
              i._attachments[a] = B(C(c, ["digest", "content_type"]), {
                data: t
              }), s()
            })) : (e._attachments[o].stub = !0, s())
          })
        }
        var Un = 1,
          Jn = "CREATE INDEX IF NOT EXISTS 'by-seq-deleted-idx' ON " + An + " (seq, deleted)",
          Wn = "CREATE UNIQUE INDEX IF NOT EXISTS 'by-seq-doc-id-rev' ON " + An + " (doc_id, rev)",
          Hn = "CREATE INDEX IF NOT EXISTS 'doc-winningseq-idx' ON " + Cn + " (winningseq)",
          zn = "CREATE INDEX IF NOT EXISTS 'attach-seq-seq-idx' ON " + jn + " (seq)",
          Kn = "CREATE UNIQUE INDEX IF NOT EXISTS 'attach-seq-digest-idx' ON " + jn + " (digest, seq)",
          Xn = An + ".seq = " + Cn + ".winningseq",
          Gn = An + ".seq AS seq, " + An + ".deleted AS deleted, " + An + ".json AS data, " + An + ".rev AS rev, " + Cn + ".json AS metadata";

        function Vn(e, t) {
          var n, r, o = this,
            i = null,
            a = "size" in (n = e) ? 1e6 * n.size : "undefined" != typeof navigator && /Android/.test(navigator.userAgent) ? 5e6 : 1,
            s = [];
          o._name = e.name;
          var c, u, f = B({}, e, {
              version: Un,
              description: e.name,
              size: a
            }),
            l = (c = f, (u = $n.get(c.name)) || (u = function(e) {
              try {
                return {
                  db: (t = e, t.websql(t.name, t.version, t.description, t.size))
                }
              } catch (e) {
                return {
                  error: e
                }
              }
              var t
            }(c), $n.set(c.name, u)), u);
          if (l.error) return Nn(t)(l.error);
          var d = l.db;

          function h() {
            I() && (window.localStorage["_pouch__websqldb_" + o._name] = !0), t(null, o)
          }

          function p(e, t) {
            e.executeSql(Hn), e.executeSql("ALTER TABLE " + An + " ADD COLUMN deleted TINYINT(1) DEFAULT 0", [], function() {
              e.executeSql(Jn), e.executeSql("ALTER TABLE " + Cn + " ADD COLUMN local TINYINT(1) DEFAULT 0", [], function() {
                e.executeSql("CREATE INDEX IF NOT EXISTS 'doc-store-local-idx' ON " + Cn + " (local, id)");
                var n = "SELECT " + Cn + ".winningseq AS seq, " + Cn + ".json AS metadata FROM " + An + " JOIN " + Cn + " ON " + An + ".seq = " + Cn + ".winningseq";
                e.executeSql(n, [], function(e, n) {
                  for (var r = [], o = [], i = 0; i < n.rows.length; i++) {
                    var a = n.rows.item(i),
                      s = a.seq,
                      c = JSON.parse(a.metadata);
                    Ie(c) && r.push(s), De(c.id) && o.push(c.id)
                  }
                  e.executeSql("UPDATE " + Cn + "SET local = 1 WHERE id IN " + Dn(o.length), o, function() {
                    e.executeSql("UPDATE " + An + " SET deleted = 1 WHERE seq IN " + Dn(r.length), r, t)
                  })
                })
              })
            })
          }

          function v(e, t) {
            var n = "CREATE TABLE IF NOT EXISTS " + Tn + " (id UNIQUE, rev, json)";
            e.executeSql(n, [], function() {
              var n = "SELECT " + Cn + ".id AS id, " + An + ".json AS data FROM " + An + " JOIN " + Cn + " ON " + An + ".seq = " + Cn + ".winningseq WHERE local = 1";
              e.executeSql(n, [], function(e, n) {
                for (var r = [], o = 0; o < n.rows.length; o++) r.push(n.rows.item(o));
                ! function n() {
                  if (!r.length) return t(e);
                  var o = r.shift(),
                    i = JSON.parse(o.data)._rev;
                  e.executeSql("INSERT INTO " + Tn + " (id, rev, json) VALUES (?,?,?)", [o.id, i, o.data], function(e) {
                    e.executeSql("DELETE FROM " + Cn + " WHERE id=?", [o.id], function(e) {
                      e.executeSql("DELETE FROM " + An + " WHERE seq=?", [o.seq], function() {
                        n()
                      })
                    })
                  })
                }()
              })
            })
          }

          function g(e, t) {
            var n = "ALTER TABLE " + An + " ADD COLUMN doc_id";
            e.executeSql(n, [], function(n) {
              var o = "ALTER TABLE " + An + " ADD COLUMN rev";
              n.executeSql(o, [], function(n) {
                n.executeSql(Wn, [], function(n) {
                  var o = "SELECT hex(doc_id_rev) as hex FROM " + An;
                  n.executeSql(o, [], function(n, o) {
                    for (var i, a = [], s = 0; s < o.rows.length; s++) a.push(o.rows.item(s));
                    i = a,
                      function n() {
                        if (!i.length) return t(e);
                        var o = kn(i.shift().hex, r),
                          a = o.lastIndexOf("::"),
                          s = o.substring(0, a),
                          c = o.substring(a + 2),
                          u = "UPDATE " + An + " SET doc_id=?, rev=? WHERE doc_id_rev=?";
                        e.executeSql(u, [s, c, o], function() {
                          n()
                        })
                      }()
                  })
                })
              })
            })
          }

          function y(e, t) {
            function n(e) {
              var n = "SELECT COUNT(*) AS cnt FROM " + xn;
              e.executeSql(n, [], function(e, n) {
                if (!n.rows.item(0).cnt) return t(e);
                var r = 0,
                  o = 10;
                ! function n() {
                  var i = Rn(Gn + ", " + Cn + ".id AS id", [Cn, An], Xn, null, Cn + ".id ");
                  i += " LIMIT " + o + " OFFSET " + r, r += o, e.executeSql(i, [], function(e, r) {
                    if (!r.rows.length) return t(e);
                    for (var o, i, a, s = {}, c = 0; c < r.rows.length; c++)
                      for (var u = r.rows.item(c), f = In(u.data, u.id, u.rev), l = Object.keys(f._attachments || {}), d = 0; d < l.length; d++) {
                        var h = f._attachments[l[d]];
                        o = h.digest, i = u.seq, a = void 0, -1 === (a = s[o] = s[o] || []).indexOf(i) && a.push(i)
                      }
                    var p = [];
                    if (Object.keys(s).forEach(function(e) {
                        s[e].forEach(function(t) {
                          p.push([e, t])
                        })
                      }), !p.length) return n();
                    var v = 0;
                    p.forEach(function(t) {
                      var r = "INSERT INTO " + jn + " (digest, seq) VALUES (?,?)";
                      e.executeSql(r, t, function() {
                        ++v === p.length && n()
                      })
                    })
                  })
                }()
              })
            }
            var r = "CREATE TABLE IF NOT EXISTS " + jn + " (digest, seq INTEGER)";
            e.executeSql(r, [], function(e) {
              e.executeSql(Kn, [], function(e) {
                e.executeSql(zn, [], n)
              })
            })
          }

          function _(e, t) {
            var n = "ALTER TABLE " + xn + " ADD COLUMN escaped TINYINT(1) DEFAULT 0";
            e.executeSql(n, [], t)
          }

          function b(e, t) {
            var n = "ALTER TABLE " + Cn + " ADD COLUMN max_seq INTEGER";
            e.executeSql(n, [], function(e) {
              var n = "UPDATE " + Cn + " SET max_seq=(SELECT MAX(seq) FROM " + An + " WHERE doc_id=id)";
              e.executeSql(n, [], function(e) {
                var n = "CREATE UNIQUE INDEX IF NOT EXISTS 'doc-max-seq-idx' ON " + Cn + " (max_seq)";
                e.executeSql(n, [], t)
              })
            })
          }

          function E() {
            for (; s.length > 0;) {
              s.pop()(null, i)
            }
          }

          function k(e, t) {
            if (0 === t) {
              var n = "CREATE TABLE IF NOT EXISTS " + On + " (dbid, db_version INTEGER)",
                r = "CREATE TABLE IF NOT EXISTS " + xn + " (digest UNIQUE, escaped TINYINT(1), body BLOB)",
                o = "CREATE TABLE IF NOT EXISTS " + jn + " (digest, seq INTEGER)",
                a = "CREATE TABLE IF NOT EXISTS " + Cn + " (id unique, json, winningseq, max_seq INTEGER UNIQUE)",
                s = "CREATE TABLE IF NOT EXISTS " + An + " (seq INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, json, deleted TINYINT(1), doc_id, rev)",
                c = "CREATE TABLE IF NOT EXISTS " + Tn + " (id UNIQUE, rev, json)";
              e.executeSql(r), e.executeSql(c), e.executeSql(o, [], function() {
                e.executeSql(zn), e.executeSql(Kn)
              }), e.executeSql(a, [], function() {
                e.executeSql(Hn), e.executeSql(s, [], function() {
                  e.executeSql(Jn), e.executeSql(Wn), e.executeSql(n, [], function() {
                    var t = "INSERT INTO " + On + " (db_version, dbid) VALUES (?,?)";
                    i = _e();
                    var n = [qn, i];
                    e.executeSql(t, n, function() {
                      E()
                    })
                  })
                })
              })
            } else {
              var u = [p, v, g, y, _, b, function() {
                  t < qn && e.executeSql("UPDATE " + On + " SET db_version = " + qn);
                  var n = "SELECT dbid FROM " + On;
                  e.executeSql(n, [], function(e, t) {
                    i = t.rows.item(0).dbid, E()
                  })
                }],
                f = t,
                l = function(e) {
                  u[f - 1](e, l), f++
                };
              l(e)
            }
          }

          function S(e, t) {
            var n = "SELECT MAX(seq) AS seq FROM " + An;
            e.executeSql(n, [], function(e, n) {
              var r = n.rows.item(0).seq || 0;
              t(r)
            })
          }

          function q(e, t) {
            var n = Rn("COUNT(" + Cn + ".id) AS 'num'", [Cn, An], Xn, An + ".deleted=0");
            e.executeSql(n, [], function(e, n) {
              t(n.rows.item(0).num)
            })
          }
          "function" != typeof d.readTransaction && (d.readTransaction = d.transaction), d.transaction(function(e) {
            var t;
            t = function() {
              var t;
              t = "SELECT sql FROM sqlite_master WHERE tbl_name = " + On, e.executeSql(t, [], function(e, t) {
                t.rows.length ? /db_version/.test(t.rows.item(0).sql) ? e.executeSql("SELECT db_version FROM " + On, [], function(e, t) {
                  var n = t.rows.item(0).db_version;
                  k(e, n)
                }) : e.executeSql("ALTER TABLE " + On + " ADD COLUMN db_version INTEGER", [], function() {
                  k(e, 1)
                }) : k(e, 0)
              })
            }, e.executeSql('SELECT HEX("a") AS hex', [], function(e, n) {
              var o = n.rows.item(0).hex;
              r = 2 === o.length ? "UTF-8" : "UTF-16", t()
            })
          }, Nn(t), h), o._remote = !1, o.type = function() {
            return "websql"
          }, o._id = w(function(e) {
            e(null, i)
          }), o._info = function(e) {
            var t, n;
            d.readTransaction(function(e) {
              S(e, function(e) {
                t = e
              }), q(e, function(e) {
                n = e
              })
            }, Nn(e), function() {
              e(null, {
                doc_count: n,
                update_seq: t,
                websql_encoding: r
              })
            })
          }, o._bulkDocs = function(t, n, r) {
            Bn(e, t, n, o, d, Mn, r)
          }, o._get = function(e, t, n) {
            var r, i, a, s, c, u, f, l, h, p, v, g = t.ctx;
            if (!g) return d.readTransaction(function(r) {
              o._get(e, B({
                ctx: r
              }, t), n)
            });

            function y(e) {
              n(e, {
                doc: r,
                metadata: i,
                ctx: g
              })
            }
            if (t.rev) {
              if (t.latest) return c = g, u = e, f = t.rev, l = function(r) {
                t.latest = !1, t.rev = r, o._get(e, t, n)
              }, h = y, p = Rn(Gn, [Cn, An], Xn, Cn + ".id=?"), v = [u], void c.executeSql(p, v, function(e, t) {
                if (!t.rows.length) {
                  var n = ne(P, "missing");
                  return h(n)
                }
                var r = Yt(t.rows.item(0).metadata);
                l(Re(f, r))
              });
              a = Rn(Gn, [Cn, An], Cn + ".id=" + An + ".doc_id", [An + ".doc_id=?", An + ".rev=?"]), s = [e, t.rev]
            } else a = Rn(Gn, [Cn, An], Xn, Cn + ".id=?"), s = [e];
            g.executeSql(a, s, function(e, n) {
              if (!n.rows.length) return y(ne(P, "missing"));
              var o = n.rows.item(0);
              if (i = Yt(o.metadata), o.deleted && !t.rev) return y(ne(P, "deleted"));
              r = In(o.data, i.id, o.rev), y()
            })
          }, o._allDocs = function(e, t) {
            var n, r, i = [],
              a = "startkey" in e && e.startkey,
              s = "endkey" in e && e.endkey,
              c = "key" in e && e.key,
              u = "keys" in e && e.keys,
              f = "descending" in e && e.descending,
              l = "limit" in e ? e.limit : -1,
              h = "skip" in e ? e.skip : 0,
              p = !1 !== e.inclusive_end,
              v = [],
              g = [];
            if (u) {
              var y = [],
                _ = "";
              u.forEach(function(e) {
                -1 === y.indexOf(e) && (y.push(e), _ += "?,")
              }), _ = _.substring(0, _.length - 1), g.push(Cn + ".id IN (" + _ + ")"), v = v.concat(y)
            } else if (!1 !== c) g.push(Cn + ".id = ?"), v.push(c);
            else if (!1 !== a || !1 !== s) {
              if (!1 !== a && (g.push(Cn + ".id " + (f ? "<=" : ">=") + " ?"), v.push(a)), !1 !== s) {
                var m = f ? ">" : "<";
                p && (m += "="), g.push(Cn + ".id " + m + " ?"), v.push(s)
              }!1 !== c && (g.push(Cn + ".id = ?"), v.push(c))
            }
            u || g.push(An + ".deleted = 0"), d.readTransaction(function(t) {
              if (q(t, function(e) {
                  n = e
                }), e.update_seq && S(t, function(e) {
                  r = e
                }), 0 !== l) {
                var a = Rn(Gn, [Cn, An], Xn, g, Cn + ".id " + (f ? "DESC" : "ASC"));
                a += " LIMIT " + l + " OFFSET " + h, t.executeSql(a, v, function(t, n) {
                  for (var r = 0, a = n.rows.length; r < a; r++) {
                    var s = n.rows.item(r),
                      c = Yt(s.metadata),
                      f = c.id,
                      l = In(s.data, f, s.rev),
                      d = l._rev,
                      h = {
                        id: f,
                        key: f,
                        value: {
                          rev: d
                        }
                      };
                    if (e.include_docs) {
                      if (h.doc = l, h.doc._rev = d, e.conflicts) {
                        var p = ke(c);
                        p.length && (h.doc._conflicts = p)
                      }
                      Pn(h.doc, e, o, t)
                    }
                    if (s.deleted) {
                      if (!u) continue;
                      h.value.deleted = !0, h.doc = null
                    }
                    if (u) {
                      var v = u.indexOf(f, v);
                      do {
                        i[v] = h, v = u.indexOf(f, v + 1)
                      } while (v > -1 && v < u.length)
                    } else i.push(h)
                  }
                  u && u.forEach(function(e, t) {
                    i[t] || (i[t] = {
                      key: e,
                      error: "not_found"
                    })
                  })
                })
              }
            }, Nn(t), function() {
              var o = {
                total_rows: n,
                offset: e.skip,
                rows: i
              };
              e.update_seq && (o.update_seq = r), t(null, o)
            })
          }, o._changes = function(e) {
            if ((e = m(e)).continuous) {
              var t = o._name + ":" + _e();
              return Mn.addListener(o._name, t, o, e), Mn.notify(o._name), {
                cancel: function() {
                  Mn.removeListener(o._name, t)
                }
              }
            }
            var n = e.descending;
            e.since = e.since && !n ? e.since : 0;
            var r, i = "limit" in e ? e.limit : -1;
            0 === i && (i = 1), r = "return_docs" in e ? e.return_docs : !("returnDocs" in e) || e.returnDocs;
            var a = [],
              s = 0;
            ! function() {
              var t = Cn + ".json AS metadata, " + Cn + ".max_seq AS maxSeq, " + An + ".json AS winningDoc, " + An + ".rev AS winningRev ",
                c = Cn + " JOIN " + An,
                u = Cn + ".id=" + An + ".doc_id AND " + Cn + ".winningseq=" + An + ".seq",
                f = ["maxSeq > ?"],
                l = [e.since];
              e.doc_ids && (f.push(Cn + ".id IN " + Dn(e.doc_ids.length)), l = l.concat(e.doc_ids));
              var h = Rn(t, c, u, f, "maxSeq " + (n ? "DESC" : "ASC")),
                p = oe(e);
              e.view || e.filter || (h += " LIMIT " + i);
              var v = e.since || 0;
              d.readTransaction(function(t) {
                t.executeSql(h, l, function(t, n) {
                  function c(t) {
                    return function() {
                      e.onChange(t)
                    }
                  }
                  for (var u = 0, f = n.rows.length; u < f; u++) {
                    var l = n.rows.item(u),
                      d = Yt(l.metadata);
                    v = l.maxSeq;
                    var h = In(l.winningDoc, d.id, l.winningRev),
                      g = e.processChange(h, d, e);
                    g.seq = l.maxSeq;
                    var y = p(g);
                    if ("object" == typeof y) return e.complete(y);
                    if (y && (s++, r && a.push(g), e.attachments && e.include_docs ? Pn(h, e, o, t, c(g)) : c(g)()), s === i) break
                  }
                })
              }, Nn(e.complete), function() {
                e.continuous || e.complete(null, {
                  results: a,
                  last_seq: v
                })
              })
            }()
          }, o._close = function(e) {
            e()
          }, o._getAttachment = function(e, t, n, o, i) {
            var a, s = o.ctx,
              c = n.digest,
              u = n.content_type,
              f = "SELECT escaped, CASE WHEN escaped = 1 THEN body ELSE HEX(body) END AS body FROM " + xn + " WHERE digest=?";
            s.executeSql(f, [c], function(e, t) {
              var n = t.rows.item(0),
                s = n.escaped ? n.body.replace(/\u0001\u0001/g, "\0").replace(/\u0001\u0002/g, "").replace(/\u0002\u0002/g, "") : kn(n.body, r);
              a = o.binary ? At(s, u) : qt(s), i(null, a)
            })
          }, o._getRevisionTree = function(e, t) {
            d.readTransaction(function(n) {
              var r = "SELECT json AS metadata FROM " + Cn + " WHERE id = ?";
              n.executeSql(r, [e], function(e, n) {
                if (n.rows.length) {
                  var r = Yt(n.rows.item(0).metadata);
                  t(null, r.rev_tree)
                } else t(ne(P))
              })
            })
          }, o._doCompaction = function(e, t, n) {
            if (!t.length) return n();
            d.transaction(function(n) {
              var r = "SELECT json AS metadata FROM " + Cn + " WHERE id = ?";
              n.executeSql(r, [e], function(n, r) {
                var o = Yt(r.rows.item(0).metadata);
                be(o.rev_tree, function(e, n, r, o, i) {
                  var a = n + "-" + r; - 1 !== t.indexOf(a) && (i.status = "missing")
                });
                var i = "UPDATE " + Cn + " SET json = ? WHERE id = ?";
                n.executeSql(i, [Zt(o), e])
              }), Fn(t, e, n)
            }, Nn(n), function() {
              n()
            })
          }, o._getLocal = function(e, t) {
            d.readTransaction(function(n) {
              var r = "SELECT json, rev FROM " + Tn + " WHERE id=?";
              n.executeSql(r, [e], function(n, r) {
                if (r.rows.length) {
                  var o = r.rows.item(0),
                    i = In(o.json, e, o.rev);
                  t(null, i)
                } else t(ne(P))
              })
            })
          }, o._putLocal = function(e, t, n) {
            "function" == typeof t && (n = t, t = {}), delete e._revisions;
            var r, o = e._rev,
              i = e._id;
            r = e._rev = o ? "0-" + (parseInt(o.split("-")[1], 10) + 1) : "0-1";
            var a, s = Ln(e);

            function c(e) {
              var c, u;
              o ? (c = "UPDATE " + Tn + " SET rev=?, json=? WHERE id=? AND rev=?", u = [r, s, i, o]) : (c = "INSERT INTO " + Tn + " (id, rev, json) VALUES (?,?,?)", u = [i, r, s]), e.executeSql(c, u, function(e, o) {
                o.rowsAffected ? (a = {
                  ok: !0,
                  id: i,
                  rev: r
                }, t.ctx && n(null, a)) : n(ne(U))
              }, function() {
                return n(ne(U)), !1
              })
            }
            t.ctx ? c(t.ctx) : d.transaction(c, Nn(n), function() {
              a && n(null, a)
            })
          }, o._removeLocal = function(e, t, n) {
            var r;

            function o(o) {
              var i = "DELETE FROM " + Tn + " WHERE id=? AND rev=?",
                a = [e._id, e._rev];
              o.executeSql(i, a, function(o, i) {
                if (!i.rowsAffected) return n(ne(P));
                r = {
                  ok: !0,
                  id: e._id,
                  rev: "0-0"
                }, t.ctx && n(null, r)
              })
            }
            "function" == typeof t && (n = t, t = {}), t.ctx ? o(t.ctx) : d.transaction(o, Nn(n), function() {
              r && n(null, r)
            })
          }, o._destroy = function(e, t) {
            Mn.removeAllListeners(o._name), d.transaction(function(e) {
              [Cn, An, xn, On, Tn, jn].forEach(function(t) {
                e.executeSql("DROP TABLE IF EXISTS " + t, [])
              })
            }, Nn(t), function() {
              I() && (delete window.localStorage["_pouch__websqldb_" + o._name], delete window.localStorage[o._name]), t(null, {
                ok: !0
              })
            })
          }
        }

        function Qn() {
          if ("undefined" == typeof indexedDB || null === indexedDB || !/iP(hone|od|ad)/.test(navigator.userAgent)) return !0;
          var e = I(),
            t = "_pouch__websqldb_valid_" + navigator.userAgent;
          if (e && localStorage[t]) return "1" === localStorage[t];
          var n = function() {
            try {
              return openDatabase("_pouch_validate_websql", 1, "", 1), !0
            } catch (e) {
              return !1
            }
          }();
          return e && (localStorage[t] = n ? "1" : "0"), n
        }

        function Yn(e, t, n, r) {
          return openDatabase(e, t, n, r)
        }

        function Zn(e, t) {
          R("warn", "WebSQL is deprecated and will be removed in future releases of PouchDB. Please migrate to IndexedDB: https://pouchdb.com/2018/01/23/pouchdb-6.4.2.html");
          var n = B({
            websql: Yn
          }, e);
          Vn.call(this, n, t)
        }

        function er(e, t) {
          var n, r, o, i = new Headers,
            a = {
              method: e.method,
              credentials: "include",
              headers: i
            };
          return e.json && (i.set("Accept", "application/json"), i.set("Content-Type", e.headers["Content-Type"] || "application/json")), e.body && e.processData && "string" != typeof e.body ? a.body = JSON.stringify(e.body) : a.body = "body" in e ? e.body : null, Object.keys(e.headers).forEach(function(t) {
            e.headers.hasOwnProperty(t) && i.set(t, e.headers[t])
          }), n = function() {
            for (var e = {}, t = new h(function(t, n) {
                e.resolve = t, e.reject = n
              }), n = new Array(arguments.length), r = 0; r < n.length; r++) n[r] = arguments[r];
            return e.promise = t, h.resolve().then(function() {
              return fetch.apply(null, n)
            }).then(function(t) {
              e.resolve(t)
            }).catch(function(t) {
              e.reject(t)
            }), e
          }(e.url, a), e.timeout > 0 && (r = setTimeout(function() {
            n.reject(new Error("Load timeout for resource: " + e.url))
          }, e.timeout)), n.promise.then(function(t) {
            return o = {
              statusCode: t.status
            }, e.timeout > 0 && clearTimeout(r), o.statusCode >= 200 && o.statusCode < 300 ? e.binary ? t.blob() : t.text() : t.json()
          }).then(function(e) {
            o.statusCode >= 200 && o.statusCode < 300 ? t(null, o, e) : (e.status = o.statusCode, t(e))
          }).catch(function(e) {
            e || (e = new Error("canceled")), t(e)
          }), {
            abort: n.reject
          }
        }
        Zn.valid = function() {
          return "function" == typeof openDatabase && Qn()
        }, Zn.use_prefix = !0;
        var tr = function() {
          try {
            return new XMLHttpRequest, !0
          } catch (e) {
            return !1
          }
        }();

        function nr(e, t) {
          return tr || e.xhr ? function(e, t) {
            var n, r, o = !1,
              i = function() {
                o = !0, n.abort(), s()
              },
              a = {
                abort: function() {
                  n.abort(), s()
                }
              },
              s = function() {
                clearTimeout(r), a.abort = function() {}, n && (n.onprogress = void 0, n.upload && (n.upload.onprogress = void 0), n.onreadystatechange = void 0, n = void 0)
              };
            n = e.xhr ? new e.xhr : new XMLHttpRequest;
            try {
              n.open(e.method, e.url)
            } catch (e) {
              return t(new Error(e.name || "Url is invalid"))
            }
            for (var c in n.withCredentials = !("withCredentials" in e) || e.withCredentials, "GET" === e.method ? delete e.headers["Content-Type"] : e.json && (e.headers.Accept = "application/json", e.headers["Content-Type"] = e.headers["Content-Type"] || "application/json", e.body && e.processData && "string" != typeof e.body && (e.body = JSON.stringify(e.body))), e.binary && (n.responseType = "arraybuffer"), "body" in e || (e.body = null), e.headers) e.headers.hasOwnProperty(c) && n.setRequestHeader(c, e.headers[c]);
            return e.timeout > 0 && (r = setTimeout(i, e.timeout), n.onprogress = function() {
              clearTimeout(r), 4 !== n.readyState && (r = setTimeout(i, e.timeout))
            }, void 0 !== n.upload && (n.upload.onprogress = n.onprogress)), n.onreadystatechange = function() {
              if (4 === n.readyState) {
                var r = {
                  statusCode: n.status
                };
                if (n.status >= 200 && n.status < 300) {
                  var i;
                  i = e.binary ? Ct([n.response || ""], {
                    type: n.getResponseHeader("Content-Type")
                  }) : n.responseText, t(null, r, i)
                } else {
                  var a = {};
                  if (o)(a = new Error("ETIMEDOUT")).code = "ETIMEDOUT";
                  else if ("string" == typeof n.response && "" !== n.response) try {
                    a = JSON.parse(n.response)
                  } catch (e) {}
                  a.status = n.status, t(a)
                }
                s()
              }
            }, e.body && e.body instanceof Blob ? It(e.body, function(e) {
              n.send(e)
            }) : n.send(e.body), a
          }(e, t) : er(e, t)
        }

        function rr(e, t) {
          e = m(e);
          return (e = B({
            method: "GET",
            headers: {},
            json: !0,
            processData: !0,
            timeout: 1e4,
            cache: !1
          }, e)).json && (e.binary || (e.headers.Accept = "application/json"), e.headers["Content-Type"] = e.headers["Content-Type"] || "application/json"), e.binary && (e.encoding = null, e.json = !1), e.processData || (e.json = !1), nr(e, function(n, r, o) {
            if (n) return t(re(n));
            var i, a = r.headers && r.headers["content-type"],
              s = o || "";
            if (!e.binary && (e.json || !e.processData) && "object" != typeof s && (/json/.test(a) || /^[\s]*\{/.test(s) && /\}[\s]*$/.test(s))) try {
              s = JSON.parse(s.toString())
            } catch (e) {}
            r.statusCode >= 200 && r.statusCode < 300 ? function(t, n, r) {
              if (!e.binary && e.json && "string" == typeof t) try {
                t = JSON.parse(t)
              } catch (e) {
                return r(e)
              }
              Array.isArray(t) && (t = t.map(function(e) {
                return e.error || e.missing ? re(e) : e
              })), e.binary, r(null, t, n)
            }(s, r, t) : ((i = re(s)).status = r.statusCode, t(i))
          })
        }

        function or(e, t) {
          var n = navigator && navigator.userAgent ? navigator.userAgent.toLowerCase() : "",
            r = -1 !== n.indexOf("safari") && -1 === n.indexOf("chrome"),
            o = -1 !== n.indexOf("msie"),
            i = -1 !== n.indexOf("trident"),
            a = -1 !== n.indexOf("edge"),
            s = r || (o || i || a) && "GET" === e.method,
            c = !("cache" in e) || e.cache;
          if (!/^blob:/.test(e.url) && (s || !c)) {
            var u = -1 !== e.url.indexOf("?");
            e.url += (u ? "&" : "?") + "_nonce=" + Date.now()
          }
          return rr(e, t)
        }
        var ir = 25,
          ar = 50,
          sr = 5e3,
          cr = 1e4,
          ur = {};

        function fr(e) {
          var t = (e.doc || e.ok)._attachments;
          t && Object.keys(t).forEach(function(e) {
            var n = t[e];
            n.data = xt(n.data, n.content_type)
          })
        }

        function lr(e) {
          return /^_design/.test(e) ? "_design/" + encodeURIComponent(e.slice(8)) : /^_local/.test(e) ? "_local/" + encodeURIComponent(e.slice(7)) : encodeURIComponent(e)
        }

        function dr(e) {
          return e._attachments && Object.keys(e._attachments) ? h.all(Object.keys(e._attachments).map(function(t) {
            var n = e._attachments[t];
            if (n.data && "string" != typeof n.data) return new h(function(e) {
              Lt(n.data, e)
            }).then(function(e) {
              n.data = e
            })
          })) : h.resolve()
        }

        function hr(e, t) {
          if (function(e) {
              if (!e.prefix) return !1;
              var t = pe(e.prefix).protocol;
              return "http" === t || "https" === t
            }(t)) {
            var n = t.name.substr(t.prefix.length);
            e = t.prefix + encodeURIComponent(n)
          }
          var r = pe(e);
          (r.user || r.password) && (r.auth = {
            username: r.user,
            password: r.password
          });
          var o = r.path.replace(/(^\/|\/$)/g, "").split("/");
          return r.db = o.pop(), -1 === r.db.indexOf("%") && (r.db = encodeURIComponent(r.db)), r.path = o.join("/"), r
        }

        function pr(e, t) {
          return vr(e, e.db + "/" + t)
        }

        function vr(e, t) {
          var n = e.path ? "/" : "";
          return e.protocol + "://" + e.host + (e.port ? ":" + e.port : "") + "/" + e.path + n + t
        }

        function gr(e) {
          return "?" + Object.keys(e).map(function(t) {
            return t + "=" + encodeURIComponent(e[t])
          }).join("&")
        }

        function yr(e, t) {
          var n, r = this,
            o = hr(e.name, e),
            s = pr(o, ""),
            c = (e = m(e)).ajax || {};
          if (e.auth || o.auth) {
            var u = e.auth || o.auth,
              f = u.username + ":" + u.password,
              l = qt(unescape(encodeURIComponent(f)));
            c.headers = c.headers || {}, c.headers.Authorization = "Basic " + l
          }

          function d(e, t, n) {
            var o = (e || {}).ajax || {},
              i = B(m(c), o, t),
              a = m(c.headers || {});
            return i.headers = B(a, o.headers, t.headers || {}), r.constructor.listeners("debug").length && r.constructor.emit("debug", ["http", i.method, i.url]), r._ajax(i, n)
          }

          function p(e, t) {
            return new h(function(n, r) {
              d(e, t, function(e, t) {
                if (e) return r(e);
                n(t)
              })
            })
          }

          function v(e, t) {
            return E(e, i(function(e) {
              g().then(function() {
                return t.apply(this, e)
              }).catch(function(t) {
                e.pop()(t)
              })
            }))
          }

          function g() {
            return e.skipSetup || e.skip_setup ? h.resolve() : n || ((n = p({}, {
              method: "GET",
              url: s
            }).catch(function(e) {
              return e && e.status && 404 === e.status ? (N(404, "PouchDB is just detecting if the remote exists."), p({}, {
                method: "PUT",
                url: s
              })) : h.reject(e)
            }).catch(function(e) {
              return !(!e || !e.status || 412 !== e.status) || h.reject(e)
            })).catch(function() {
              n = null
            }), n)
          }

          function y(e) {
            return e.split("/").map(encodeURIComponent).join("/")
          }
          r._ajax = or, a(function() {
            t(null, r)
          }), r._remote = !0, r.type = function() {
            return "http"
          }, r.id = v("id", function(e) {
            d({}, {
              method: "GET",
              url: vr(o, "")
            }, function(t, n) {
              var r = n && n.uuid ? n.uuid + o.db : pr(o, "");
              e(null, r)
            })
          }), r.request = v("request", function(e, t) {
            e.url = pr(o, e.url), d({}, e, t)
          }), r.compact = v("compact", function(e, t) {
            "function" == typeof e && (t = e, e = {}), d(e = m(e), {
              url: pr(o, "_compact"),
              method: "POST"
            }, function() {
              ! function n() {
                r.info(function(r, o) {
                  o && !o.compact_running ? t(null, {
                    ok: !0
                  }) : setTimeout(n, e.interval || 200)
                })
              }()
            })
          }), r.bulkGet = E("bulkGet", function(e, t) {
            var n = this;

            function r(t) {
              var n = {};
              e.revs && (n.revs = !0), e.attachments && (n.attachments = !0), e.latest && (n.latest = !0), d(e, {
                url: pr(o, "_bulk_get" + gr(n)),
                method: "POST",
                body: {
                  docs: e.docs
                }
              }, function(n, r) {
                !n && e.attachments && e.binary && r.results.forEach(function(e) {
                  e.docs.forEach(fr)
                }), t(n, r)
              })
            }

            function i() {
              var r = ar,
                o = Math.ceil(e.docs.length / r),
                i = 0,
                a = new Array(o);

              function s(e) {
                return function(n, r) {
                  a[e] = r.results, ++i === o && t(null, {
                    results: ie(a)
                  })
                }
              }
              for (var u = 0; u < o; u++) {
                var f = C(e, ["revs", "attachments", "binary", "latest"]);
                f.ajax = c, f.docs = e.docs.slice(u * r, Math.min(e.docs.length, (u + 1) * r)), j(n, f, s(u))
              }
            }
            var a = vr(o, ""),
              s = ur[a];
            "boolean" != typeof s ? r(function(e, n) {
              e ? (ur[a] = !1, N(e.status, "PouchDB is just detecting if the remote supports the _bulk_get API."), i()) : (ur[a] = !0, t(null, n))
            }) : s ? r(t) : i()
          }), r._info = function(e) {
            g().then(function() {
              d({}, {
                method: "GET",
                url: pr(o, "")
              }, function(t, n) {
                if (t) return e(t);
                n.host = pr(o, ""), e(null, n)
              })
            }).catch(e)
          }, r.get = v("get", function(e, t, n) {
            "function" == typeof t && (n = t, t = {});
            var r = {};
            (t = m(t)).revs && (r.revs = !0), t.revs_info && (r.revs_info = !0), t.latest && (r.latest = !0), t.open_revs && ("all" !== t.open_revs && (t.open_revs = JSON.stringify(t.open_revs)), r.open_revs = t.open_revs), t.rev && (r.rev = t.rev), t.conflicts && (r.conflicts = t.conflicts), t.update_seq && (r.update_seq = t.update_seq), e = lr(e);
            var i = {
              method: "GET",
              url: pr(o, e + gr(r))
            };

            function a(e) {
              var n = e._attachments,
                r = n && Object.keys(n);
              if (n && r.length) {
                var i, a, s = r.map(function(r) {
                  return function() {
                    return a = n[i = r], s = lr(e._id) + "/" + y(i) + "?rev=" + e._rev, p(t, {
                      method: "GET",
                      url: pr(o, s),
                      binary: !0
                    }).then(function(e) {
                      return t.binary ? e : new h(function(t) {
                        Lt(e, t)
                      })
                    }).then(function(e) {
                      delete a.stub, delete a.length, a.data = e
                    });
                    var i, a, s
                  }
                });
                return i = s, a = 5, new h(function(e, t) {
                  var n, r = 0,
                    o = 0,
                    s = 0,
                    c = i.length;

                  function u() {
                    ++s === c ? n ? t(n) : e() : d()
                  }

                  function f() {
                    r--, u()
                  }

                  function l(e) {
                    r--, n = n || e, u()
                  }

                  function d() {
                    for (; r < a && o < c;) r++, i[o++]().then(f, l)
                  }
                  d()
                })
              }
            }
            p(t, i).then(function(e) {
              return h.resolve().then(function() {
                if (t.attachments) return n = e, Array.isArray(n) ? h.all(n.map(function(e) {
                  if (e.ok) return a(e.ok)
                })) : a(n);
                var n
              }).then(function() {
                n(null, e)
              })
            }).catch(function(t) {
              t.docId = e, n(t)
            })
          }), r.remove = v("remove", function(e, t, n, r) {
            var i;
            "string" == typeof t ? (i = {
              _id: e,
              _rev: t
            }, "function" == typeof n && (r = n, n = {})) : (i = e, "function" == typeof t ? (r = t, n = {}) : (r = n, n = t));
            var a = i._rev || n.rev;
            d(n, {
              method: "DELETE",
              url: pr(o, lr(i._id)) + "?rev=" + a
            }, r)
          }), r.getAttachment = v("getAttachment", function(e, t, n, r) {
            "function" == typeof n && (r = n, n = {});
            var i = n.rev ? "?rev=" + n.rev : "";
            d(n, {
              method: "GET",
              url: pr(o, lr(e)) + "/" + y(t) + i,
              binary: !0
            }, r)
          }), r.removeAttachment = v("removeAttachment", function(e, t, n, r) {
            d({}, {
              method: "DELETE",
              url: pr(o, lr(e) + "/" + y(t)) + "?rev=" + n
            }, r)
          }), r.putAttachment = v("putAttachment", function(e, t, n, r, i, a) {
            "function" == typeof i && (a = i, i = r, r = n, n = null);
            var s = lr(e) + "/" + y(t),
              u = pr(o, s);
            if (n && (u += "?rev=" + n), "string" == typeof r) {
              var f;
              try {
                f = St(r)
              } catch (e) {
                return a(ne(K, "Attachment is not a valid base64 string"))
              }
              r = f ? At(f, i) : ""
            }
            d({}, {
              headers: {
                "Content-Type": i
              },
              method: "PUT",
              url: u,
              processData: !1,
              body: r,
              timeout: c.timeout || 6e4
            }, a)
          }), r._bulkDocs = function(e, t, n) {
            e.new_edits = t.new_edits, g().then(function() {
              return h.all(e.docs.map(dr))
            }).then(function() {
              d(t, {
                method: "POST",
                url: pr(o, "_bulk_docs"),
                timeout: t.timeout,
                body: e
              }, function(e, t) {
                if (e) return n(e);
                t.forEach(function(e) {
                  e.ok = !0
                }), n(null, t)
              })
            }).catch(n)
          }, r._put = function(e, t, n) {
            g().then(function() {
              return dr(e)
            }).then(function() {
              d(t, {
                method: "PUT",
                url: pr(o, lr(e._id)),
                body: e
              }, function(t, r) {
                if (t) return t.docId = e && e._id, n(t);
                n(null, r)
              })
            }).catch(n)
          }, r.allDocs = v("allDocs", function(e, t) {
            "function" == typeof e && (t = e, e = {});
            var n, r = {},
              i = "GET";
            (e = m(e)).conflicts && (r.conflicts = !0), e.update_seq && (r.update_seq = !0), e.descending && (r.descending = !0), e.include_docs && (r.include_docs = !0), e.attachments && (r.attachments = !0), e.key && (r.key = JSON.stringify(e.key)), e.start_key && (e.startkey = e.start_key), e.startkey && (r.startkey = JSON.stringify(e.startkey)), e.end_key && (e.endkey = e.end_key), e.endkey && (r.endkey = JSON.stringify(e.endkey)), void 0 !== e.inclusive_end && (r.inclusive_end = !!e.inclusive_end), void 0 !== e.limit && (r.limit = e.limit), void 0 !== e.skip && (r.skip = e.skip);
            var a = gr(r);
            void 0 !== e.keys && (i = "POST", n = {
              keys: e.keys
            }), p(e, {
              method: i,
              url: pr(o, "_all_docs" + a),
              body: n
            }).then(function(n) {
              e.include_docs && e.attachments && e.binary && n.rows.forEach(fr), t(null, n)
            }).catch(t)
          }), r._changes = function(e) {
            var t = "batch_size" in e ? e.batch_size : ir;
            !(e = m(e)).continuous || "heartbeat" in e || (e.heartbeat = cr);
            var n = "timeout" in e ? e.timeout : "timeout" in c ? c.timeout : 3e4;
            "timeout" in e && e.timeout && n - e.timeout < sr && (n = e.timeout + sr), "heartbeat" in e && e.heartbeat && n - e.heartbeat < sr && (n = e.heartbeat + sr);
            var r = {};
            "timeout" in e && e.timeout && (r.timeout = e.timeout);
            var i, s = void 0 !== e.limit && e.limit;
            i = "return_docs" in e ? e.return_docs : !("returnDocs" in e) || e.returnDocs;
            var u = s;
            if (e.style && (r.style = e.style), (e.include_docs || e.filter && "function" == typeof e.filter) && (r.include_docs = !0), e.attachments && (r.attachments = !0), e.continuous && (r.feed = "longpoll"), e.seq_interval && (r.seq_interval = e.seq_interval), e.conflicts && (r.conflicts = !0), e.descending && (r.descending = !0), e.update_seq && (r.update_seq = !0), "heartbeat" in e && e.heartbeat && (r.heartbeat = e.heartbeat), e.filter && "string" == typeof e.filter && (r.filter = e.filter), e.view && "string" == typeof e.view && (r.filter = "_view", r.view = e.view), e.query_params && "object" == typeof e.query_params)
              for (var f in e.query_params) e.query_params.hasOwnProperty(f) && (r[f] = e.query_params[f]);
            var l, h, p, v = "GET";
            e.doc_ids ? (r.filter = "_doc_ids", v = "POST", l = {
              doc_ids: e.doc_ids
            }) : e.selector && (r.filter = "_selector", v = "POST", l = {
              selector: e.selector
            });
            var y = function(i, a) {
                if (!e.aborted) {
                  r.since = i, "object" == typeof r.since && (r.since = JSON.stringify(r.since)), e.descending ? s && (r.limit = u) : r.limit = !s || u > t ? t : u;
                  var c = {
                    method: v,
                    url: pr(o, "_changes" + gr(r)),
                    timeout: n,
                    body: l
                  };
                  p = i, e.aborted || g().then(function() {
                    h = d(e, c, a)
                  }).catch(a)
                }
              },
              _ = {
                results: []
              },
              b = function(n, r) {
                if (!e.aborted) {
                  var o = 0;
                  if (r && r.results) {
                    o = r.results.length, _.last_seq = r.last_seq;
                    var c = null,
                      f = null;
                    "number" == typeof r.pending && (c = r.pending), "string" != typeof _.last_seq && "number" != typeof _.last_seq || (f = _.last_seq);
                    e.query_params, r.results = r.results.filter(function(t) {
                      u--;
                      var n = oe(e)(t);
                      return n && (e.include_docs && e.attachments && e.binary && fr(t), i && _.results.push(t), e.onChange(t, c, f)), n
                    })
                  } else if (n) return e.aborted = !0, void e.complete(n);
                  r && r.last_seq && (p = r.last_seq);
                  var l = s && u <= 0 || r && o < t || e.descending;
                  (!e.continuous || s && u <= 0) && l ? e.complete(null, _) : a(function() {
                    y(p, b)
                  })
                }
              };
            return y(e.since || 0, b), {
              cancel: function() {
                e.aborted = !0, h && h.abort()
              }
            }
          }, r.revsDiff = v("revsDiff", function(e, t, n) {
            "function" == typeof t && (n = t, t = {}), d(t, {
              method: "POST",
              url: pr(o, "_revs_diff"),
              body: e
            }, n)
          }), r._close = function(e) {
            e()
          }, r._destroy = function(e, t) {
            d(e, {
              url: pr(o, ""),
              method: "DELETE"
            }, function(e, n) {
              if (e && e.status && 404 !== e.status) return t(e);
              t(null, n)
            })
          }
        }

        function _r(e) {
          this.status = 400, this.name = "query_parse_error", this.message = e, this.error = !0;
          try {
            Error.captureStackTrace(this, _r)
          } catch (e) {}
        }

        function mr(e) {
          this.status = 404, this.name = "not_found", this.message = e, this.error = !0;
          try {
            Error.captureStackTrace(this, mr)
          } catch (e) {}
        }

        function br(e) {
          this.status = 500, this.name = "invalid_value", this.message = e, this.error = !0;
          try {
            Error.captureStackTrace(this, br)
          } catch (e) {}
        }

        function wr(e, t) {
          return t && e.then(function(e) {
            a(function() {
              t(null, e)
            })
          }, function(e) {
            a(function() {
              t(e)
            })
          }), e
        }

        function Er(e, t) {
          return function() {
            var n = arguments,
              r = this;
            return e.add(function() {
              return t.apply(r, n)
            })
          }
        }

        function kr(e) {
          var t = new v(e),
            n = new Array(t.size),
            r = -1;
          return t.forEach(function(e) {
            n[++r] = e
          }), n
        }

        function Sr(e) {
          var t = new Array(e.size),
            n = -1;
          return e.forEach(function(e, r) {
            t[++n] = r
          }), t
        }

        function qr(e) {
          return new br("builtin " + e + " function requires map values to be numbers or number arrays")
        }

        function Cr(e) {
          for (var t = 0, n = 0, r = e.length; n < r; n++) {
            var o = e[n];
            if ("number" != typeof o) {
              if (!Array.isArray(o)) throw qr("_sum");
              t = "number" == typeof t ? [t] : t;
              for (var i = 0, a = o.length; i < a; i++) {
                var s = o[i];
                if ("number" != typeof s) throw qr("_sum");
                void 0 === t[i] ? t.push(s) : t[i] += s
              }
            } else "number" == typeof t ? t += o : t[0] += o
          }
          return t
        }
        yr.valid = function() {
          return !0
        }, c(_r, Error), c(mr, Error), c(br, Error);
        var Ar = R.bind(null, "log"),
          xr = Array.isArray,
          Tr = JSON.parse;

        function Or(e, t) {
          return ve("return (" + e.replace(/;\s*$/, "") + ");", {
            emit: t,
            sum: Cr,
            log: Ar,
            isArray: xr,
            toJSON: Tr
          })
        }

        function jr() {
          this.promise = new h(function(e) {
            e()
          })
        }

        function Lr(e) {
          if (!e) return "undefined";
          switch (typeof e) {
            case "function":
            case "string":
              return e.toString();
            default:
              return JSON.stringify(e)
          }
        }

        function Ir(e, t, n, r, o, i) {
          var a, s, c = (a = r, Lr(n) + Lr(a) + "undefined");
          if (!o && (s = e._cachedViews = e._cachedViews || {})[c]) return s[c];
          var u = e.info().then(function(a) {
            var u, f = a.db_name + "-mrview-" + (o ? "temp" : (u = c, l.hash(u)));
            return ge(e, "_local/" + i, function(e) {
              e.views = e.views || {};
              var n = t; - 1 === n.indexOf("/") && (n = t + "/" + t);
              var r = e.views[n] = e.views[n] || {};
              if (!r[f]) return r[f] = !0, e
            }).then(function() {
              return e.registerDependentDatabase(f).then(function(t) {
                var o = t.db;
                o.auto_compaction = !0;
                var i = {
                  name: f,
                  db: o,
                  sourceDB: e,
                  adapter: e.adapter,
                  mapFun: n,
                  reduceFun: r
                };
                return i.db.get("_local/lastSeq").catch(function(e) {
                  if (404 !== e.status) throw e
                }).then(function(e) {
                  return i.seq = e ? e.seq : 0, s && i.db.once("destroyed", function() {
                    delete s[c]
                  }), i
                })
              })
            })
          });
          return s && (s[c] = u), u
        }
        jr.prototype.add = function(e) {
          return this.promise = this.promise.catch(function() {}).then(function() {
            return e()
          }), this.promise
        }, jr.prototype.finish = function() {
          return this.promise
        };
        var Dr = {},
          Rr = new jr,
          Fr = 50;

        function Nr(e) {
          return -1 === e.indexOf("/") ? [e, e] : e.split("/")
        }

        function Br(e, t) {
          try {
            e.emit("error", t)
          } catch (e) {
            R("error", "The user's map/reduce function threw an uncaught error.\nYou can debug this error by doing:\nmyDatabase.on('error', function (err) { debugger; });\nPlease double-check your map/reduce function."), R("error", t)
          }
        }
        var $r = {
          _sum: function(e, t) {
            return Cr(t)
          },
          _count: function(e, t) {
            return t.length
          },
          _stats: function(e, t) {
            return {
              sum: Cr(t),
              min: Math.min.apply(null, t),
              max: Math.max.apply(null, t),
              count: t.length,
              sumsqr: function(e) {
                for (var t = 0, n = 0, r = e.length; n < r; n++) {
                  var o = e[n];
                  t += o * o
                }
                return t
              }(t)
            }
          }
        };
        var Mr = function(e, t, n, r) {
          function o(e, t, n) {
            try {
              t(n)
            } catch (t) {
              Br(e, t)
            }
          }

          function s(e, t, n, r, o) {
            try {
              return {
                output: t(n, r, o)
              }
            } catch (t) {
              return Br(e, t), {
                error: t
              }
            }
          }

          function c(e, t) {
            var n = et(e.key, t.key);
            return 0 !== n ? n : et(e.value, t.value)
          }

          function u(e) {
            var t = e.value;
            return t && "object" == typeof t && t._id || e.id
          }

          function f(e) {
            return function(t) {
              return e.include_docs && e.attachments && e.binary && t.rows.forEach(function(e) {
                var t = e.doc && e.doc._attachments;
                t && Object.keys(t).forEach(function(e) {
                  var n = t[e];
                  t[e].data = xt(n.data, n.content_type)
                })
              }), t
            }
          }

          function l(e, t, n, r) {
            var o = t[e];
            void 0 !== o && (r && (o = encodeURIComponent(JSON.stringify(o))), n.push(e + "=" + o))
          }

          function d(e) {
            if (void 0 !== e) {
              var t = Number(e);
              return isNaN(t) || t !== parseInt(e, 10) ? e : t
            }
          }

          function p(e, t) {
            var n = e.descending ? "endkey" : "startkey",
              r = e.descending ? "startkey" : "endkey";
            if (void 0 !== e[n] && void 0 !== e[r] && et(e[n], e[r]) > 0) throw new _r("No rows can match your key range, reverse your start_key and end_key or set {descending : true}");
            if (t.reduce && !1 !== e.reduce) {
              if (e.include_docs) throw new _r("{include_docs:true} is invalid for reduce");
              if (e.keys && e.keys.length > 1 && !e.group && !e.group_level) throw new _r("Multi-key fetches for reduce views must use {group: true}")
            }["group_level", "limit", "skip"].forEach(function(t) {
              var n = function(e) {
                if (e) {
                  if ("number" != typeof e) return new _r('Invalid value for integer: "' + e + '"');
                  if (e < 0) return new _r('Invalid value for positive integer: "' + e + '"')
                }
              }(e[t]);
              if (n) throw n
            })
          }

          function y(e) {
            return function(t) {
              if (404 === t.status) return e;
              throw t
            }
          }

          function _(e, t, n) {
            var r, o = "_local/doc_" + e,
              i = {
                _id: o,
                keys: []
              },
              a = n.get(e),
              s = a[0],
              c = a[1];
            return (1 === (r = c).length && /^1-/.test(r[0].rev) ? h.resolve(i) : t.db.get(o).catch(y(i))).then(function(e) {
              return (n = e, n.keys.length ? t.db.allDocs({
                keys: n.keys,
                include_docs: !0
              }) : h.resolve({
                rows: []
              })).then(function(t) {
                return function(e, t) {
                  for (var n = [], r = new v, o = 0, i = t.rows.length; o < i; o++) {
                    var a = t.rows[o].doc;
                    if (a && (n.push(a), r.add(a._id), a._deleted = !s.has(a._id), !a._deleted)) {
                      var c = s.get(a._id);
                      "value" in c && (a.value = c.value)
                    }
                  }
                  var u = Sr(s);
                  return u.forEach(function(e) {
                    if (!r.has(e)) {
                      var t = {
                          _id: e
                        },
                        o = s.get(e);
                      "value" in o && (t.value = o.value), n.push(t)
                    }
                  }), e.keys = kr(u.concat(e.keys)), n.push(e), n
                }(e, t)
              });
              var n
            })
          }

          function m(e) {
            var t = "string" == typeof e ? e : e.name,
              n = Dr[t];
            return n || (n = Dr[t] = new jr), n
          }

          function b(e) {
            return Er(m(e), function() {
              return function(e) {
                var n, r, i = t(e.mapFun, function(e, t) {
                    var o = {
                      id: r._id,
                      key: tt(e)
                    };
                    void 0 !== t && null !== t && (o.value = tt(t)), n.push(o)
                  }),
                  a = e.seq || 0;

                function s(t, n) {
                  return function() {
                    return o = t, i = n, a = "_local/lastSeq", (r = e).db.get(a).catch(y({
                      _id: a,
                      seq: 0
                    })).then(function(e) {
                      var t = Sr(o);
                      return h.all(t.map(function(e) {
                        return _(e, r, o)
                      })).then(function(t) {
                        var n = ie(t);
                        return e.seq = i, n.push(e), r.db.bulkDocs({
                          docs: n
                        })
                      })
                    });
                    var r, o, i, a
                  }
                }
                var u = new jr;

                function f() {
                  return e.sourceDB.changes({
                    conflicts: !0,
                    include_docs: !0,
                    style: "all_docs",
                    since: a,
                    limit: Fr
                  }).then(l)
                }

                function l(t) {
                  var l = t.results;
                  if (l.length) {
                    var h = function(t) {
                      for (var s = new g, u = 0, f = t.length; u < f; u++) {
                        var l = t[u];
                        if ("_" !== l.doc._id[0]) {
                          n = [], (r = l.doc)._deleted || o(e.sourceDB, i, r), n.sort(c);
                          var h = d(n);
                          s.set(l.doc._id, [h, l.changes])
                        }
                        a = l.seq
                      }
                      return s
                    }(l);
                    if (u.add(s(h, a)), !(l.length < Fr)) return f()
                  }
                }

                function d(e) {
                  for (var t, n = new g, r = 0, o = e.length; r < o; r++) {
                    var i = e[r],
                      a = [i.key, i.id];
                    r > 0 && 0 === et(i.key, t) && a.push(r), n.set(rt(a), i), t = i.key
                  }
                  return n
                }
                return f().then(function() {
                  return u.finish()
                }).then(function() {
                  e.seq = a
                })
              }(e)
            })()
          }

          function w(e, t) {
            return Er(m(e), function() {
              return function(e, t) {
                var r, o = e.reduceFun && !1 !== t.reduce,
                  i = t.skip || 0;

                function a(t) {
                  return t.include_docs = !0, e.db.allDocs(t).then(function(e) {
                    return r = e.total_rows, e.rows.map(function(e) {
                      if ("value" in e.doc && "object" == typeof e.doc.value && null !== e.doc.value) {
                        var t = Object.keys(e.doc.value).sort(),
                          n = ["id", "key", "value"];
                        if (!(t < n || t > n)) return e.doc.value
                      }
                      var r = function(e) {
                        for (var t = [], n = [], r = 0;;) {
                          var o = e[r++];
                          if ("\0" !== o) switch (o) {
                            case "1":
                              t.push(null);
                              break;
                            case "2":
                              t.push("1" === e[r]), r++;
                              break;
                            case "3":
                              var i = ot(e, r);
                              t.push(i.num), r += i.length;
                              break;
                            case "4":
                              for (var a = "";;) {
                                var s = e[r];
                                if ("\0" === s) break;
                                a += s, r++
                              }
                              a = a.replace(/\u0001\u0001/g, "\0").replace(/\u0001\u0002/g, "").replace(/\u0002\u0002/g, ""), t.push(a);
                              break;
                            case "5":
                              var c = {
                                element: [],
                                index: t.length
                              };
                              t.push(c.element), n.push(c);
                              break;
                            case "6":
                              var u = {
                                element: {},
                                index: t.length
                              };
                              t.push(u.element), n.push(u);
                              break;
                            default:
                              throw new Error("bad collationIndex or unexpectedly reached end of input: " + o)
                          } else {
                            if (1 === t.length) return t.pop();
                            it(t, n)
                          }
                        }
                      }(e.doc._id);
                      return {
                        key: r[0],
                        id: r[1],
                        value: "value" in e.doc ? e.doc.value : null
                      }
                    })
                  })
                }

                function c(a) {
                  var c;
                  if (c = o ? function(e, t, r) {
                      0 === r.group_level && delete r.group_level;
                      var o, i, a, c = r.group || r.group_level,
                        u = n(e.reduceFun),
                        f = [],
                        l = isNaN(r.group_level) ? Number.POSITIVE_INFINITY : r.group_level;
                      t.forEach(function(e) {
                        var t = f[f.length - 1],
                          n = c ? e.key : null;
                        if (c && Array.isArray(n) && (n = n.slice(0, l)), t && 0 === et(t.groupKey, n)) return t.keys.push([e.key, e.id]), void t.values.push(e.value);
                        f.push({
                          keys: [
                            [e.key, e.id]
                          ],
                          values: [e.value],
                          groupKey: n
                        })
                      }), t = [];
                      for (var d = 0, h = f.length; d < h; d++) {
                        var p = f[d],
                          v = s(e.sourceDB, u, p.keys, p.values, !1);
                        if (v.error && v.error instanceof br) throw v.error;
                        t.push({
                          value: v.error ? null : v.output,
                          key: p.groupKey
                        })
                      }
                      return {
                        rows: (o = t, i = r.limit, a = r.skip, a = a || 0, "number" == typeof i ? o.slice(a, i + a) : a > 0 ? o.slice(a) : o)
                      }
                    }(e, a, t) : {
                      total_rows: r,
                      offset: i,
                      rows: a
                    }, t.update_seq && (c.update_seq = e.seq), t.include_docs) {
                    var f = kr(a.map(u));
                    return e.sourceDB.allDocs({
                      keys: f,
                      include_docs: !0,
                      conflicts: t.conflicts,
                      attachments: t.attachments,
                      binary: t.binary
                    }).then(function(e) {
                      var t = new g;
                      return e.rows.forEach(function(e) {
                        t.set(e.id, e.doc)
                      }), a.forEach(function(e) {
                        var n = u(e),
                          r = t.get(n);
                        r && (e.doc = r)
                      }), c
                    })
                  }
                  return c
                }
                if (void 0 === t.keys || t.keys.length || (t.limit = 0, delete t.keys), void 0 !== t.keys) {
                  var f = t.keys,
                    l = f.map(function(e) {
                      var n = {
                        startkey: rt([e]),
                        endkey: rt([e, {}])
                      };
                      return t.update_seq && (n.update_seq = !0), a(n)
                    });
                  return h.all(l).then(ie).then(c)
                }
                var d, p, v = {
                  descending: t.descending
                };
                if (t.update_seq && (v.update_seq = !0), "start_key" in t && (d = t.start_key), "startkey" in t && (d = t.startkey), "end_key" in t && (p = t.end_key), "endkey" in t && (p = t.endkey), void 0 !== d && (v.startkey = t.descending ? rt([d, {}]) : rt([d])), void 0 !== p) {
                  var y = !1 !== t.inclusive_end;
                  t.descending && (y = !y), v.endkey = rt(y ? [p, {}] : [p])
                }
                if (void 0 !== t.key) {
                  var _ = rt([t.key]),
                    m = rt([t.key, {}]);
                  v.descending ? (v.endkey = _, v.startkey = m) : (v.startkey = _, v.endkey = m)
                }
                return o || ("number" == typeof t.limit && (v.limit = t.limit), v.skip = i), a(v).then(c)
              }(e, t)
            })()
          }

          function E(t, n, o) {
            if ("function" == typeof t._query) return i = t, s = n, c = o, new h(function(e, t) {
              i._query(s, c, function(n, r) {
                if (n) return t(n);
                e(r)
              })
            });
            var i, s, c;
            if (se(t)) return function(e, t, n) {
              var r, o = [],
                i = "GET";
              if (l("reduce", n, o), l("include_docs", n, o), l("attachments", n, o), l("limit", n, o), l("descending", n, o), l("group", n, o), l("group_level", n, o), l("skip", n, o), l("stale", n, o), l("conflicts", n, o), l("startkey", n, o, !0), l("start_key", n, o, !0), l("endkey", n, o, !0), l("end_key", n, o, !0), l("inclusive_end", n, o), l("key", n, o, !0), l("update_seq", n, o), o = "" === (o = o.join("&")) ? "" : "?" + o, void 0 !== n.keys) {
                var a = "keys=" + encodeURIComponent(JSON.stringify(n.keys));
                a.length + o.length + 1 <= 2e3 ? o += ("?" === o[0] ? "&" : "?") + a : (i = "POST", "string" == typeof t ? r = {
                  keys: n.keys
                } : t.keys = n.keys)
              }
              if ("string" == typeof t) {
                var s = Nr(t);
                return e.request({
                  method: i,
                  url: "_design/" + s[0] + "/_view/" + s[1] + o,
                  body: r
                }).then(function(e) {
                  return e.rows.forEach(function(e) {
                    if (e.value && e.value.error && "builtin_reduce_error" === e.value.error) throw new Error(e.reason)
                  }), e
                }).then(f(n))
              }
              return r = r || {}, Object.keys(t).forEach(function(e) {
                Array.isArray(t[e]) ? r[e] = t[e] : r[e] = t[e].toString()
              }), e.request({
                method: "POST",
                url: "_temp_view" + o,
                body: r
              }).then(f(n))
            }(t, n, o);
            if ("string" != typeof n) return p(o, n), Rr.add(function() {
              return Ir(t, "temp_view/temp_view", n.map, n.reduce, !0, e).then(function(e) {
                return t = b(e).then(function() {
                  return w(e, o)
                }), n = function() {
                  return e.db.destroy()
                }, t.then(function(e) {
                  return n().then(function() {
                    return e
                  })
                }, function(e) {
                  return n().then(function() {
                    throw e
                  })
                });
                var t, n
              })
            }), Rr.finish();
            var u = n,
              d = Nr(u),
              v = d[0],
              g = d[1];
            return t.get("_design/" + v).then(function(n) {
              var i = n.views && n.views[g];
              if (!i) throw new mr("ddoc " + n._id + " has no view named " + g);
              return r(n, g), p(o, i), Ir(t, u, i.map, i.reduce, !1, e).then(function(e) {
                return "ok" === o.stale || "update_after" === o.stale ? ("update_after" === o.stale && a(function() {
                  b(e)
                }), w(e, o)) : b(e).then(function() {
                  return w(e, o)
                })
              })
            })
          }
          var k;
          return {
            query: function(e, t, n) {
              var r, o = this;
              "function" == typeof t && (n = t, t = {}), t = t ? ((r = t).group_level = d(r.group_level), r.limit = d(r.limit), r.skip = d(r.skip), r) : {}, "function" == typeof e && (e = {
                map: e
              });
              var i = h.resolve().then(function() {
                return E(o, e, t)
              });
              return wr(i, n), i
            },
            viewCleanup: (k = function() {
              var t, n;
              return "function" == typeof this._viewCleanup ? (t = this, new h(function(e, n) {
                t._viewCleanup(function(t, r) {
                  if (t) return n(t);
                  e(r)
                })
              })) : se(this) ? this.request({
                method: "POST",
                url: "_view_cleanup"
              }) : (n = this).get("_local/" + e).then(function(e) {
                var t = new g;
                Object.keys(e.views).forEach(function(e) {
                  var n = Nr(e),
                    r = "_design/" + n[0],
                    o = n[1],
                    i = t.get(r);
                  i || (i = new v, t.set(r, i)), i.add(o)
                });
                var r = {
                  keys: Sr(t),
                  include_docs: !0
                };
                return n.allDocs(r).then(function(r) {
                  var o = {};
                  r.rows.forEach(function(n) {
                    var r = n.key.substring(8);
                    t.get(n.key).forEach(function(t) {
                      var i = r + "/" + t;
                      e.views[i] || (i = t);
                      var a = Object.keys(e.views[i]),
                        s = n.doc && n.doc.views && n.doc.views[t];
                      a.forEach(function(e) {
                        o[e] = o[e] || s
                      })
                    })
                  });
                  var i = Object.keys(o).filter(function(e) {
                    return !o[e]
                  }).map(function(e) {
                    return Er(m(e), function() {
                      return new n.constructor(e, n.__opts).destroy()
                    })()
                  });
                  return h.all(i).then(function() {
                    return {
                      ok: !0
                    }
                  })
                })
              }, y({
                ok: !0
              }))
            }, i(function(e) {
              var t = e.pop(),
                n = k.apply(this, e);
              return "function" == typeof t && wr(n, t), n
            }))
          }
        }("mrviews", function(e, t) {
          if ("function" == typeof e && 2 === e.length) {
            var n = e;
            return function(e) {
              return n(e, t)
            }
          }
          return Or(e.toString(), t)
        }, function(e) {
          var t = e.toString(),
            n = function(e) {
              if (/^_sum/.test(e)) return $r._sum;
              if (/^_count/.test(e)) return $r._count;
              if (/^_stats/.test(e)) return $r._stats;
              if (/^_/.test(e)) throw new Error(e + " is not a supported reduce function.")
            }(t);
          return n || Or(t)
        }, function(e, t) {
          var n = e.views && e.views[t];
          if ("string" != typeof n.map) throw new mr("ddoc " + e._id + " has no string view named " + t + ", instead found object of type: " + typeof n.map)
        });
        var Pr = {
          query: function(e, t, n) {
            return Mr.query.call(this, e, t, n)
          },
          viewCleanup: function(e) {
            return Mr.viewCleanup.call(this, e)
          }
        };

        function Ur(e) {
          return /^1-/.test(e)
        }

        function Jr(e, t) {
          var n = Object.keys(t._attachments);
          return h.all(n.map(function(n) {
            return e.getAttachment(t._id, n, {
              rev: t._rev
            })
          }))
        }

        function Wr(e, t, n, r) {
          n = m(n);
          var o = [],
            i = !0;

          function a(t) {
            return e.allDocs({
              keys: t,
              include_docs: !0,
              conflicts: !0
            }).then(function(e) {
              if (r.cancelled) throw new Error("cancelled");
              e.rows.forEach(function(e) {
                var t, r;
                e.deleted || !e.doc || !Ur(e.value.rev) || (r = e.doc, r._attachments && Object.keys(r._attachments).length > 0) || (t = e.doc, t._conflicts && t._conflicts.length > 0) || (e.doc._conflicts && delete e.doc._conflicts, o.push(e.doc), delete n[e.id])
              })
            })
          }
          return h.resolve().then(function() {
            var e = Object.keys(n).filter(function(e) {
              var t = n[e].missing;
              return 1 === t.length && Ur(t[0])
            });
            if (e.length > 0) return a(e)
          }).then(function() {
            var a, s, c = (a = n, s = [], Object.keys(a).forEach(function(e) {
              a[e].missing.forEach(function(t) {
                s.push({
                  id: e,
                  rev: t
                })
              })
            }), {
              docs: s,
              revs: !0,
              latest: !0
            });
            if (c.docs.length) return e.bulkGet(c).then(function(n) {
              if (r.cancelled) throw new Error("cancelled");
              return h.all(n.results.map(function(n) {
                return h.all(n.docs.map(function(n) {
                  var r, o, a, s, c, u = n.ok;
                  return n.error && (i = !1), u && u._attachments ? (r = t, o = e, a = u, s = se(o) && !se(r), c = Object.keys(a._attachments), s ? r.get(a._id).then(function(e) {
                    return h.all(c.map(function(t) {
                      return i = a, s = t, (n = e)._attachments && n._attachments[s] && n._attachments[s].digest === i._attachments[s].digest ? r.getAttachment(e._id, t) : o.getAttachment(a._id, t);
                      var n, i, s
                    }))
                  }).catch(function(e) {
                    if (404 !== e.status) throw e;
                    return Jr(o, a)
                  }) : Jr(o, a)).then(function(e) {
                    var t = Object.keys(u._attachments);
                    return e.forEach(function(e, n) {
                      var r = u._attachments[t[n]];
                      delete r.stub, delete r.length, r.data = e
                    }), u
                  }) : u
                }))
              })).then(function(e) {
                o = o.concat(ie(e).filter(Boolean))
              })
            })
          }).then(function() {
            return {
              ok: i,
              docs: o
            }
          })
        }
        var Hr = 1,
          zr = "pouchdb",
          Kr = 5,
          Xr = 0;

        function Gr(e, t, n, r, o) {
          return e.get(t).catch(function(n) {
            if (404 === n.status) return "http" !== e.adapter && "https" !== e.adapter || N(404, "PouchDB is just checking if a remote checkpoint exists."), {
              session_id: r,
              _id: t,
              history: [],
              replicator: zr,
              version: Hr
            };
            throw n
          }).then(function(i) {
            if (!o.cancelled && i.last_seq !== n) return i.history = (i.history || []).filter(function(e) {
              return e.session_id !== r
            }), i.history.unshift({
              last_seq: n,
              session_id: r
            }), i.history = i.history.slice(0, Kr), i.version = Hr, i.replicator = zr, i.session_id = r, i.last_seq = n, e.put(i).catch(function(i) {
              if (409 === i.status) return Gr(e, t, n, r, o);
              throw i
            })
          })
        }

        function Vr(e, t, n, r, o) {
          this.src = e, this.target = t, this.id = n, this.returnValue = r, this.opts = o || {}
        }
        Vr.prototype.writeCheckpoint = function(e, t) {
          var n = this;
          return this.updateTarget(e, t).then(function() {
            return n.updateSource(e, t)
          })
        }, Vr.prototype.updateTarget = function(e, t) {
          return this.opts.writeTargetCheckpoint ? Gr(this.target, this.id, e, t, this.returnValue) : h.resolve(!0)
        }, Vr.prototype.updateSource = function(e, t) {
          if (this.opts.writeSourceCheckpoint) {
            var n = this;
            return Gr(this.src, this.id, e, t, this.returnValue).catch(function(e) {
              if (Zr(e)) return n.opts.writeSourceCheckpoint = !1, !0;
              throw e
            })
          }
          return h.resolve(!0)
        };
        var Qr = {
          undefined: function(e, t) {
            return 0 === et(e.last_seq, t.last_seq) ? t.last_seq : 0
          },
          1: function(e, t) {
            return function(e, t) {
              if (e.session_id === t.session_id) return {
                last_seq: e.last_seq,
                history: e.history
              };
              return function e(t, n) {
                var r = t[0];
                var o = t.slice(1);
                var i = n[0];
                var a = n.slice(1);
                if (!r || 0 === n.length) return {
                  last_seq: Xr,
                  history: []
                };
                var s = r.session_id;
                if (Yr(s, n)) return {
                  last_seq: r.last_seq,
                  history: t
                };
                var c = i.session_id;
                if (Yr(c, o)) return {
                  last_seq: i.last_seq,
                  history: a
                };
                return e(o, a)
              }(e.history, t.history)
            }(t, e).last_seq
          }
        };

        function Yr(e, t) {
          var n = t[0],
            r = t.slice(1);
          return !(!e || 0 === t.length) && (e === n.session_id || Yr(e, r))
        }

        function Zr(e) {
          return "number" == typeof e.status && 4 === Math.floor(e.status / 100)
        }
        Vr.prototype.getCheckpoint = function() {
          var e = this;
          return e.opts && e.opts.writeSourceCheckpoint && !e.opts.writeTargetCheckpoint ? e.src.get(e.id).then(function(e) {
            return e.last_seq || Xr
          }).catch(function(e) {
            if (404 !== e.status) throw e;
            return Xr
          }) : e.target.get(e.id).then(function(t) {
            return e.opts && e.opts.writeTargetCheckpoint && !e.opts.writeSourceCheckpoint ? t.last_seq || Xr : e.src.get(e.id).then(function(e) {
              return t.version !== e.version ? Xr : (n = t.version ? t.version.toString() : "undefined") in Qr ? Qr[n](t, e) : Xr;
              var n
            }, function(n) {
              if (404 === n.status && t.last_seq) return e.src.put({
                _id: e.id,
                last_seq: Xr
              }).then(function() {
                return Xr
              }, function(n) {
                return Zr(n) ? (e.opts.writeSourceCheckpoint = !1, t.last_seq) : Xr
              });
              throw n
            })
          }).catch(function(e) {
            if (404 !== e.status) throw e;
            return Xr
          })
        };
        var eo = 0;

        function to(e, t, n) {
          var r, o = n.doc_ids ? n.doc_ids.sort(et) : "",
            i = n.filter ? n.filter.toString() : "",
            a = "",
            s = "",
            c = "";
          return n.selector && (c = JSON.stringify(n.selector)), n.filter && n.query_params && (a = JSON.stringify((r = n.query_params, Object.keys(r).sort(et).reduce(function(e, t) {
            return e[t] = r[t], e
          }, {})))), n.filter && "_view" === n.filter && (s = n.view.toString()), h.all([e.id(), t.id()]).then(function(e) {
            var t = e[0] + e[1] + i + s + a + o + c;
            return new h(function(e) {
              Bt(t, e)
            })
          }).then(function(e) {
            return "_local/" + (e = e.replace(/\//g, ".").replace(/\+/g, "_"))
          })
        }

        function no(e, t, n, r, o) {
          var i, a, s, c = [],
            u = {
              seq: 0,
              changes: [],
              docs: []
            },
            f = !1,
            l = !1,
            d = !1,
            p = 0,
            v = n.continuous || n.live || !1,
            g = n.batch_size || 100,
            y = n.batches_limit || 10,
            _ = !1,
            b = n.doc_ids,
            w = n.selector,
            E = [],
            k = _e(),
            S = n.seq_interval;
          o = o || {
            ok: !0,
            start_time: new Date,
            docs_read: 0,
            docs_written: 0,
            doc_write_failures: 0,
            errors: []
          };
          var q = {};

          function C() {
            return s ? h.resolve() : to(e, t, n).then(function(o) {
              a = o;
              var i = {};
              i = !1 === n.checkpoint ? {
                writeSourceCheckpoint: !1,
                writeTargetCheckpoint: !1
              } : "source" === n.checkpoint ? {
                writeSourceCheckpoint: !0,
                writeTargetCheckpoint: !1
              } : "target" === n.checkpoint ? {
                writeSourceCheckpoint: !1,
                writeTargetCheckpoint: !0
              } : {
                writeSourceCheckpoint: !0,
                writeTargetCheckpoint: !0
              }, s = new Vr(e, t, a, r, i)
            })
          }

          function A() {
            if (E = [], 0 !== i.docs.length) {
              var e = i.docs,
                a = {
                  timeout: n.timeout
                };
              return t.bulkDocs({
                docs: e,
                new_edits: !1
              }, a).then(function(t) {
                if (r.cancelled) throw I(), new Error("cancelled");
                var n = Object.create(null);
                t.forEach(function(e) {
                  e.error && (n[e.id] = e)
                });
                var i = Object.keys(n).length;
                o.doc_write_failures += i, o.docs_written += e.length - i, e.forEach(function(e) {
                  var t = n[e._id];
                  if (t) {
                    o.errors.push(t);
                    var i = (t.name || "").toLowerCase();
                    if ("unauthorized" !== i && "forbidden" !== i) throw t;
                    r.emit("denied", m(t))
                  } else E.push(e)
                })
              }, function(t) {
                throw o.doc_write_failures += e.length, t
              })
            }
          }

          function x() {
            if (i.error) throw new Error("There was a problem getting docs.");
            o.last_seq = p = i.seq;
            var e = m(o);
            return E.length && (e.docs = E, "number" == typeof i.pending && (e.pending = i.pending, delete i.pending), r.emit("change", e)), f = !0, s.writeCheckpoint(i.seq, k).then(function() {
              if (f = !1, r.cancelled) throw I(), new Error("cancelled");
              i = void 0, B()
            }).catch(function(e) {
              throw M(e), e
            })
          }

          function T() {
            return Wr(e, t, i.diffs, r).then(function(e) {
              i.error = !e.ok, e.docs.forEach(function(e) {
                delete i.diffs[e._id], o.docs_read++, i.docs.push(e)
              })
            })
          }

          function O() {
            var e;
            r.cancelled || i || (0 !== c.length ? (i = c.shift(), (e = {}, i.changes.forEach(function(t) {
              "_user/" !== t.id && (e[t.id] = t.changes.map(function(e) {
                return e.rev
              }))
            }), t.revsDiff(e).then(function(e) {
              if (r.cancelled) throw I(), new Error("cancelled");
              i.diffs = e
            })).then(T).then(A).then(x).then(O).catch(function(e) {
              L("batch processing terminated with error", e)
            })) : j(!0))
          }

          function j(e) {
            0 !== u.changes.length ? (e || l || u.changes.length >= g) && (c.push(u), u = {
              seq: 0,
              changes: [],
              docs: []
            }, "pending" !== r.state && "stopped" !== r.state || (r.state = "active", r.emit("active")), O()) : 0 !== c.length || i || ((v && q.live || l) && (r.state = "pending", r.emit("paused")), l && I())
          }

          function L(e, t) {
            d || (t.message || (t.message = e), o.ok = !1, o.status = "aborting", c = [], u = {
              seq: 0,
              changes: [],
              docs: []
            }, I(t))
          }

          function I(i) {
            if (!(d || r.cancelled && (o.status = "cancelled", f)))
              if (o.status = o.status || "complete", o.end_time = new Date, o.last_seq = p, d = !0, i) {
                (i = ne(i)).result = o;
                var a = (i.name || "").toLowerCase();
                "unauthorized" === a || "forbidden" === a ? (r.emit("error", i), r.removeAllListeners()) : function(e, t, n, r) {
                  if (!1 === e.retry) return t.emit("error", n), void t.removeAllListeners();
                  if ("function" != typeof e.back_off_function && (e.back_off_function = F), t.emit("requestError", n), "active" === t.state || "pending" === t.state) {
                    t.emit("paused", n), t.state = "stopped";
                    var o = function() {
                      e.current_back_off = eo
                    };
                    t.once("paused", function() {
                      t.removeListener("active", o)
                    }), t.once("active", o)
                  }
                  e.current_back_off = e.current_back_off || eo, e.current_back_off = e.back_off_function(e.current_back_off), setTimeout(r, e.current_back_off)
                }(n, r, i, function() {
                  no(e, t, n, r)
                })
              } else r.emit("complete", o), r.removeAllListeners()
          }

          function D(e, t, o) {
            if (r.cancelled) return I();
            "number" == typeof t && (u.pending = t), oe(n)(e) && (u.seq = e.seq || o, u.changes.push(e), j(0 === c.length && q.live))
          }

          function R(e) {
            if (_ = !1, r.cancelled) return I();
            if (e.results.length > 0) q.since = e.last_seq, B(), j(!0);
            else {
              var t = function() {
                v ? (q.live = !0, B()) : l = !0, j(!0)
              };
              i || 0 !== e.results.length ? t() : (f = !0, s.writeCheckpoint(e.last_seq, k).then(function() {
                f = !1, o.last_seq = p = e.last_seq, t()
              }).catch(M))
            }
          }

          function N(e) {
            if (_ = !1, r.cancelled) return I();
            L("changes rejected", e)
          }

          function B() {
            if (!_ && !l && c.length < y) {
              _ = !0, r._changes && (r.removeListener("cancel", r._abortChanges), r._changes.cancel()), r.once("cancel", o);
              var t = e.changes(q).on("change", D);
              t.then(i, i), t.then(R).catch(N), n.retry && (r._changes = t, r._abortChanges = o)
            }

            function o() {
              t.cancel()
            }

            function i() {
              r.removeListener("cancel", o)
            }
          }

          function $() {
            C().then(function() {
              if (!r.cancelled) return s.getCheckpoint().then(function(e) {
                q = {
                  since: p = e,
                  limit: g,
                  batch_size: g,
                  style: "all_docs",
                  doc_ids: b,
                  selector: w,
                  return_docs: !0
                }, !1 !== S && (q.seq_interval = S || g), n.filter && ("string" != typeof n.filter ? q.include_docs = !0 : q.filter = n.filter), "heartbeat" in n && (q.heartbeat = n.heartbeat), "timeout" in n && (q.timeout = n.timeout), n.query_params && (q.query_params = n.query_params), n.view && (q.view = n.view), B()
              });
              I()
            }).catch(function(e) {
              L("getCheckpoint rejected with ", e)
            })
          }

          function M(e) {
            f = !1, L("writeCheckpoint completed with error", e)
          }
          r.ready(e, t), r.cancelled ? I() : (r._addedListeners || (r.once("cancel", I), "function" == typeof n.complete && (r.once("error", n.complete), r.once("complete", function(e) {
            n.complete(null, e)
          })), r._addedListeners = !0), void 0 === n.since ? $() : C().then(function() {
            return f = !0, s.writeCheckpoint(n.since, k)
          }).then(function() {
            f = !1, r.cancelled ? I() : (p = n.since, $())
          }).catch(M))
        }

        function ro() {
          s.EventEmitter.call(this), this.cancelled = !1, this.state = "pending";
          var e = this,
            t = new h(function(t, n) {
              e.once("complete", t), e.once("error", n)
            });
          e.then = function(e, n) {
            return t.then(e, n)
          }, e.catch = function(e) {
            return t.catch(e)
          }, e.catch(function() {})
        }

        function oo(e, t) {
          var n = t.PouchConstructor;
          return "string" == typeof e ? new n(e, t) : e
        }

        function io(e, t, n, r) {
          if ("function" == typeof n && (r = n, n = {}), void 0 === n && (n = {}), n.doc_ids && !Array.isArray(n.doc_ids)) throw ne(V, "`doc_ids` filter parameter is not a list.");
          n.complete = r, (n = m(n)).continuous = n.continuous || n.live, n.retry = "retry" in n && n.retry, n.PouchConstructor = n.PouchConstructor || this;
          var o = new ro(n);
          return no(oo(e, n), oo(t, n), n, o), o
        }

        function ao(e, t, n, r) {
          return "function" == typeof n && (r = n, n = {}), void 0 === n && (n = {}), (n = m(n)).PouchConstructor = n.PouchConstructor || this, new so(e = oo(e, n), t = oo(t, n), n, r)
        }

        function so(e, t, n, r) {
          var o = this;
          this.canceled = !1;
          var i = n.push ? B({}, n, n.push) : n,
            a = n.pull ? B({}, n, n.pull) : n;

          function s(e) {
            o.emit("change", {
              direction: "pull",
              change: e
            })
          }

          function c(e) {
            o.emit("change", {
              direction: "push",
              change: e
            })
          }

          function u(e) {
            o.emit("denied", {
              direction: "push",
              doc: e
            })
          }

          function f(e) {
            o.emit("denied", {
              direction: "pull",
              doc: e
            })
          }

          function l() {
            o.pushPaused = !0, o.pullPaused && o.emit("paused")
          }

          function d() {
            o.pullPaused = !0, o.pushPaused && o.emit("paused")
          }

          function p() {
            o.pushPaused = !1, o.pullPaused && o.emit("active", {
              direction: "push"
            })
          }

          function v() {
            o.pullPaused = !1, o.pushPaused && o.emit("active", {
              direction: "pull"
            })
          }
          this.push = io(e, t, i), this.pull = io(t, e, a), this.pushPaused = !0, this.pullPaused = !0;
          var g = {};

          function y(e) {
            return function(t, n) {
              ("change" === t && (n === s || n === c) || "denied" === t && (n === f || n === u) || "paused" === t && (n === d || n === l) || "active" === t && (n === v || n === p)) && (t in g || (g[t] = {}), g[t][e] = !0, 2 === Object.keys(g[t]).length && o.removeAllListeners(t))
            }
          }

          function _(e, t, n) {
            -1 == e.listeners(t).indexOf(n) && e.on(t, n)
          }
          n.live && (this.push.on("complete", o.pull.cancel.bind(o.pull)), this.pull.on("complete", o.push.cancel.bind(o.push))), this.on("newListener", function(e) {
            "change" === e ? (_(o.pull, "change", s), _(o.push, "change", c)) : "denied" === e ? (_(o.pull, "denied", f), _(o.push, "denied", u)) : "active" === e ? (_(o.pull, "active", v), _(o.push, "active", p)) : "paused" === e && (_(o.pull, "paused", d), _(o.push, "paused", l))
          }), this.on("removeListener", function(e) {
            "change" === e ? (o.pull.removeListener("change", s), o.push.removeListener("change", c)) : "denied" === e ? (o.pull.removeListener("denied", f), o.push.removeListener("denied", u)) : "active" === e ? (o.pull.removeListener("active", v), o.push.removeListener("active", p)) : "paused" === e && (o.pull.removeListener("paused", d), o.push.removeListener("paused", l))
          }), this.pull.on("removeListener", y("pull")), this.push.on("removeListener", y("push"));
          var m = h.all([this.push, this.pull]).then(function(e) {
            var t = {
              push: e[0],
              pull: e[1]
            };
            return o.emit("complete", t), r && r(null, t), o.removeAllListeners(), t
          }, function(e) {
            if (o.cancel(), r ? r(e) : o.emit("error", e), o.removeAllListeners(), r) throw e
          });
          this.then = function(e, t) {
            return m.then(e, t)
          }, this.catch = function(e) {
            return m.catch(e)
          }
        }
        c(ro, s.EventEmitter), ro.prototype.cancel = function() {
          this.cancelled = !0, this.state = "cancelled", this.emit("cancel")
        }, ro.prototype.ready = function(e, t) {
          var n = this;

          function r() {
            n.cancel()
          }
          n._readyCalled || (n._readyCalled = !0, e.once("destroyed", r), t.once("destroyed", r), n.once("complete", function() {
            e.removeListener("destroyed", r), t.removeListener("destroyed", r)
          }))
        }, c(so, s.EventEmitter), so.prototype.cancel = function() {
          this.canceled || (this.canceled = !0, this.push.cancel(), this.pull.cancel())
        }, Je.plugin(function(e) {
          e.adapter("idb", wn, !0)
        }).plugin(function(e) {
          e.adapter("websql", Zn, !0)
        }).plugin(function(e) {
          e.adapter("http", yr, !1), e.adapter("https", yr, !1)
        }).plugin(Pr).plugin(function(e) {
          e.replicate = io, e.sync = ao, Object.defineProperty(e.prototype, "replicate", {
            get: function() {
              var e = this;
              return void 0 === this.replicateMethods && (this.replicateMethods = {
                from: function(t, n, r) {
                  return e.constructor.replicate(t, e, n, r)
                },
                to: function(t, n, r) {
                  return e.constructor.replicate(e, t, n, r)
                }
              }), this.replicateMethods
            }
          }), e.prototype.sync = function(e, t, n) {
            return this.constructor.sync(this, e, t, n)
          }
        }), t.exports = Je
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
      1: 1,
      10: 10,
      11: 11,
      16: 16,
      2: 2,
      4: 4,
      5: 5,
      6: 6,
      7: 7
    }]
  }, {}, [17])(17)
});