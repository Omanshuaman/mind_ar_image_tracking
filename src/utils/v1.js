(() => {
  var Kr = Object.create;
  var ir = Object.defineProperty;
  var Qr = Object.getOwnPropertyDescriptor;
  var Zr = Object.getOwnPropertyNames;
  var $r = Object.getPrototypeOf,
    Jr = Object.prototype.hasOwnProperty;
  var ei = (i, e) => () => (
    e || i((e = { exports: {} }).exports, e), e.exports
  );
  var ti = (i, e, t, r) => {
    if ((e && typeof e == "object") || typeof e == "function")
      for (let n of Zr(e))
        !Jr.call(i, n) &&
          n !== t &&
          ir(i, n, {
            get: () => e[n],
            enumerable: !(r = Qr(e, n)) || r.enumerable,
          });
    return i;
  };
  var ri = (i, e, t) => (
    (t = i != null ? Kr($r(i)) : {}),
    ti(
      e || !i || !i.__esModule
        ? ir(t, "default", { value: i, enumerable: !0 })
        : t,
      i
    )
  );
  var nr = ei((ft) => {
    "use strict";
    ft.__esModule = !0;
    ft.detectIncognito = void 0;
    var ii = function () {
      return new Promise(function (i, e) {
        var t = "Unknown";
        function r(u) {
          i({ isPrivate: u, browserName: t });
        }
        function n() {
          var u = navigator.userAgent;
          return u.match(/Chrome/)
            ? navigator.brave !== void 0
              ? "Brave"
              : u.match(/Edg/)
              ? "Edge"
              : u.match(/OPR/)
              ? "Opera"
              : "Chrome"
            : "Chromium";
        }
        function s(u) {
          return u === eval.toString().length;
        }
        function a() {
          var u = navigator.vendor;
          return u !== void 0 && u.indexOf("Apple") === 0 && s(37);
        }
        function o() {
          var u = navigator.vendor;
          return u !== void 0 && u.indexOf("Google") === 0 && s(33);
        }
        function l() {
          return (
            document.documentElement !== void 0 &&
            document.documentElement.style.MozAppearance !== void 0 &&
            s(37)
          );
        }
        function h() {
          return navigator.msSaveBlob !== void 0 && s(39);
        }
        function p() {
          var u = String(Math.random());
          try {
            var w = window.indexedDB.open(u, 1);
            w.onupgradeneeded = function (g) {
              var F,
                Z,
                re =
                  (F = g.target) === null || F === void 0 ? void 0 : F.result;
              try {
                re
                  .createObjectStore("test", { autoIncrement: !0 })
                  .put(new Blob()),
                  r(!1);
              } catch (q) {
                var $ = q;
                if (
                  (q instanceof Error &&
                    ($ = (Z = q.message) !== null && Z !== void 0 ? Z : q),
                  typeof $ != "string")
                )
                  return r(!1);
                var ie = /BlobURLs are not yet supported/.test($);
                return r(ie);
              } finally {
                re.close(), window.indexedDB.deleteDatabase(u);
              }
            };
          } catch {
            return r(!1);
          }
        }
        function f() {
          var u = window.openDatabase,
            w = window.localStorage;
          try {
            u(null, null, null, null);
          } catch {
            return r(!0);
          }
          try {
            w.setItem("test", "1"), w.removeItem("test");
          } catch {
            return r(!0);
          }
          return r(!1);
        }
        function m() {
          navigator.maxTouchPoints !== void 0 ? p() : f();
        }
        function _() {
          var u = window;
          return u.performance !== void 0 &&
            u.performance.memory !== void 0 &&
            u.performance.memory.jsHeapSizeLimit !== void 0
            ? performance.memory.jsHeapSizeLimit
            : 1073741824;
        }
        function R() {
          navigator.webkitTemporaryStorage.queryUsageAndQuota(
            function (u, w) {
              var g = Math.round(w / 1048576),
                F = Math.round(_() / (1024 * 1024)) * 2;
              r(g < F);
            },
            function (u) {
              e(
                new Error(
                  "detectIncognito somehow failed to query storage quota: " +
                    u.message
                )
              );
            }
          );
        }
        function x() {
          var u = window.webkitRequestFileSystem,
            w = function () {
              r(!1);
            },
            g = function () {
              r(!0);
            };
          u(0, 1, w, g);
        }
        function M() {
          self.Promise !== void 0 && self.Promise.allSettled !== void 0
            ? R()
            : x();
        }
        function E() {
          r(navigator.serviceWorker === void 0);
        }
        function O() {
          r(window.indexedDB === void 0);
        }
        function v() {
          a()
            ? ((t = "Safari"), m())
            : o()
            ? ((t = n()), M())
            : l()
            ? ((t = "Firefox"), E())
            : h()
            ? ((t = "Internet Explorer"), O())
            : e(new Error("detectIncognito cannot determine the browser"));
        }
        v();
      });
    };
    ft.detectIncognito = ii;
  });
  var sr = ri(nr());
  var ni = {
    none: "Tap 'Open' on the banner to launch AR",
    safari: "Tap 'Open' on the banner to launch AR",
    wkwebview:
      "Tap and hold, then select 'Open Link', or copy the link and paste it in Safari.",
    "private-safari":
      "Safari is in Private mode. Tap & hold to copy the link below to a non-private tab.",
    "ios-chrome":
      "You must be in Safari to launch AR. Tap & hold to copy the link below to a Safari tab.",
    "launch-viewer": "",
    "wk-facebook":
      "Tap and hold, then select 'Open Link', or copy the link and paste it in Safari.",
    "wk-instagram":
      "Tap and hold, then select 'Open Link', or copy the link and paste it in Safari.",
    "wk-linkedin":
      "Tap and hold, then select 'Open Link', or copy the link and paste it in Safari.",
    "wk-line":
      "Tap and hold, then select 'Open Link', or copy the link and paste it in Safari.",
    "wk-wechat":
      "Tap and hold, then select 'Open Link', or copy the link and paste it in Safari.",
    "wk-snapchat":
      "Tap and hold, then select 'Open Link', or copy the link and paste it in Safari.",
  };
  async function si() {
    let i = await ze();
    return ni[i];
  }
  async function ar() {
    let i = await si();
    return { browser: await ze(), launchInstructions: i };
  }
  function or() {
    return cr() ? "ios" : hi() ? "android" : lr() ? "ios" : "desktop";
  }
  async function ze() {
    if (cr()) return "launch-viewer";
    if (!lr()) return "none";
    if (oi()) return "ios-chrome";
    let i = ci();
    return i !== null
      ? i
      : li()
      ? "wkwebview"
      : (await ai())
      ? "private-safari"
      : "safari";
  }
  function lr() {
    let i = navigator.userAgent || navigator.vendor || window.opera;
    return !!(
      (/iPad|iPhone|iPod/.test(i) && !window.MSStream) ||
      (navigator.platform === "MacIntel" &&
        navigator.maxTouchPoints &&
        navigator.maxTouchPoints > 1)
    );
  }
  function cr() {
    return navigator.userAgent.indexOf("Variant Launch") !== -1;
  }
  async function ai() {
    return (await (0, sr.detectIncognito)()).isPrivate;
  }
  function oi() {
    return (
      (navigator.userAgent || navigator.vendor || window.opera).indexOf(
        "CriOS"
      ) > -1
    );
  }
  function li() {
    return !!(window.webkit && window.webkit.messageHandlers);
  }
  function ci() {
    let i = navigator.userAgent || navigator.vendor || window.opera,
      e = null;
    return (
      (i.indexOf("FBAN") > -1 || i.indexOf("FBAV") > -1) && (e = "wk-facebook"),
      i.indexOf("LinkedInApp") > -1 && (e = "wk-linkedin"),
      i.indexOf("Instagram") > -1 && (e = "wk-instagram"),
      i.indexOf(" Line") > -1 && (e = "wk-line"),
      i.indexOf("MicroMessenger") > -1 && (e = "wk-wechat"),
      i.indexOf("Snapchat") > -1 && (e = "wk-snapchat"),
      e
    );
  }
  function hi() {
    return navigator.userAgent.toLowerCase().indexOf("android") > -1;
  }
  var di =
      typeof global < "u"
        ? global
        : typeof self < "u"
        ? self
        : typeof window < "u"
        ? window
        : {},
    mt = di;
  var Ke = Symbol("@@webxr-polyfill/EventTarget"),
    Y = class {
      constructor() {
        this[Ke] = { listeners: new Map() };
      }
      addEventListener(e, t) {
        if (typeof e != "string") throw new Error("`type` must be a string");
        if (typeof t != "function")
          throw new Error("`listener` must be a function");
        let r = this[Ke].listeners.get(e) || [];
        r.push(t), this[Ke].listeners.set(e, r);
      }
      removeEventListener(e, t) {
        if (typeof e != "string") throw new Error("`type` must be a string");
        if (typeof t != "function")
          throw new Error("`listener` must be a function");
        let r = this[Ke].listeners.get(e) || [];
        for (let n = r.length; n >= 0; n--) r[n] === t && r.pop();
      }
      dispatchEvent(e, t) {
        let r = this[Ke].listeners.get(e) || [],
          n = [];
        for (let s = 0; s < r.length; s++) n[s] = r[s];
        for (let s of n) s(t);
        typeof this[`on${e}`] == "function" && this[`on${e}`](t);
      }
    };
  var L = typeof Float32Array < "u" ? Float32Array : Array;
  var $i = Math.PI / 180;
  function b() {
    let i = new L(16);
    return (
      L != Float32Array &&
        ((i[1] = 0),
        (i[2] = 0),
        (i[3] = 0),
        (i[4] = 0),
        (i[6] = 0),
        (i[7] = 0),
        (i[8] = 0),
        (i[9] = 0),
        (i[11] = 0),
        (i[12] = 0),
        (i[13] = 0),
        (i[14] = 0)),
      (i[0] = 1),
      (i[5] = 1),
      (i[10] = 1),
      (i[15] = 1),
      i
    );
  }
  function Xe(i) {
    let e = new L(16);
    return (
      (e[0] = i[0]),
      (e[1] = i[1]),
      (e[2] = i[2]),
      (e[3] = i[3]),
      (e[4] = i[4]),
      (e[5] = i[5]),
      (e[6] = i[6]),
      (e[7] = i[7]),
      (e[8] = i[8]),
      (e[9] = i[9]),
      (e[10] = i[10]),
      (e[11] = i[11]),
      (e[12] = i[12]),
      (e[13] = i[13]),
      (e[14] = i[14]),
      (e[15] = i[15]),
      e
    );
  }
  function k(i, e) {
    return (
      (i[0] = e[0]),
      (i[1] = e[1]),
      (i[2] = e[2]),
      (i[3] = e[3]),
      (i[4] = e[4]),
      (i[5] = e[5]),
      (i[6] = e[6]),
      (i[7] = e[7]),
      (i[8] = e[8]),
      (i[9] = e[9]),
      (i[10] = e[10]),
      (i[11] = e[11]),
      (i[12] = e[12]),
      (i[13] = e[13]),
      (i[14] = e[14]),
      (i[15] = e[15]),
      i
    );
  }
  function W(i) {
    return (
      (i[0] = 1),
      (i[1] = 0),
      (i[2] = 0),
      (i[3] = 0),
      (i[4] = 0),
      (i[5] = 1),
      (i[6] = 0),
      (i[7] = 0),
      (i[8] = 0),
      (i[9] = 0),
      (i[10] = 1),
      (i[11] = 0),
      (i[12] = 0),
      (i[13] = 0),
      (i[14] = 0),
      (i[15] = 1),
      i
    );
  }
  function j(i, e) {
    let t = e[0],
      r = e[1],
      n = e[2],
      s = e[3],
      a = e[4],
      o = e[5],
      l = e[6],
      h = e[7],
      p = e[8],
      f = e[9],
      m = e[10],
      _ = e[11],
      R = e[12],
      x = e[13],
      M = e[14],
      E = e[15],
      O = t * o - r * a,
      v = t * l - n * a,
      u = t * h - s * a,
      w = r * l - n * o,
      g = r * h - s * o,
      F = n * h - s * l,
      Z = p * x - f * R,
      re = p * M - m * R,
      $ = p * E - _ * R,
      ie = f * M - m * x,
      q = f * E - _ * x,
      pe = m * E - _ * M,
      I = O * pe - v * q + u * ie + w * $ - g * re + F * Z;
    return I
      ? ((I = 1 / I),
        (i[0] = (o * pe - l * q + h * ie) * I),
        (i[1] = (n * q - r * pe - s * ie) * I),
        (i[2] = (x * F - M * g + E * w) * I),
        (i[3] = (m * g - f * F - _ * w) * I),
        (i[4] = (l * $ - a * pe - h * re) * I),
        (i[5] = (t * pe - n * $ + s * re) * I),
        (i[6] = (M * u - R * F - E * v) * I),
        (i[7] = (p * F - m * u + _ * v) * I),
        (i[8] = (a * q - o * $ + h * Z) * I),
        (i[9] = (r * $ - t * q - s * Z) * I),
        (i[10] = (R * g - x * u + E * O) * I),
        (i[11] = (f * u - p * g - _ * O) * I),
        (i[12] = (o * re - a * ie - l * Z) * I),
        (i[13] = (t * ie - r * re + n * Z) * I),
        (i[14] = (x * v - R * w - M * O) * I),
        (i[15] = (p * w - f * v + m * O) * I),
        i)
      : null;
  }
  function D(i, e, t) {
    let r = e[0],
      n = e[1],
      s = e[2],
      a = e[3],
      o = e[4],
      l = e[5],
      h = e[6],
      p = e[7],
      f = e[8],
      m = e[9],
      _ = e[10],
      R = e[11],
      x = e[12],
      M = e[13],
      E = e[14],
      O = e[15],
      v = t[0],
      u = t[1],
      w = t[2],
      g = t[3];
    return (
      (i[0] = v * r + u * o + w * f + g * x),
      (i[1] = v * n + u * l + w * m + g * M),
      (i[2] = v * s + u * h + w * _ + g * E),
      (i[3] = v * a + u * p + w * R + g * O),
      (v = t[4]),
      (u = t[5]),
      (w = t[6]),
      (g = t[7]),
      (i[4] = v * r + u * o + w * f + g * x),
      (i[5] = v * n + u * l + w * m + g * M),
      (i[6] = v * s + u * h + w * _ + g * E),
      (i[7] = v * a + u * p + w * R + g * O),
      (v = t[8]),
      (u = t[9]),
      (w = t[10]),
      (g = t[11]),
      (i[8] = v * r + u * o + w * f + g * x),
      (i[9] = v * n + u * l + w * m + g * M),
      (i[10] = v * s + u * h + w * _ + g * E),
      (i[11] = v * a + u * p + w * R + g * O),
      (v = t[12]),
      (u = t[13]),
      (w = t[14]),
      (g = t[15]),
      (i[12] = v * r + u * o + w * f + g * x),
      (i[13] = v * n + u * l + w * m + g * M),
      (i[14] = v * s + u * h + w * _ + g * E),
      (i[15] = v * a + u * p + w * R + g * O),
      i
    );
  }
  function hr(i, e, t) {
    let r = Math.sin(t),
      n = Math.cos(t),
      s = e[4],
      a = e[5],
      o = e[6],
      l = e[7],
      h = e[8],
      p = e[9],
      f = e[10],
      m = e[11];
    return (
      e !== i &&
        ((i[0] = e[0]),
        (i[1] = e[1]),
        (i[2] = e[2]),
        (i[3] = e[3]),
        (i[12] = e[12]),
        (i[13] = e[13]),
        (i[14] = e[14]),
        (i[15] = e[15])),
      (i[4] = s * n + h * r),
      (i[5] = a * n + p * r),
      (i[6] = o * n + f * r),
      (i[7] = l * n + m * r),
      (i[8] = h * n - s * r),
      (i[9] = p * n - a * r),
      (i[10] = f * n - o * r),
      (i[11] = m * n - l * r),
      i
    );
  }
  function dr(i, e, t) {
    let r = Math.sin(t),
      n = Math.cos(t),
      s = e[0],
      a = e[1],
      o = e[2],
      l = e[3],
      h = e[8],
      p = e[9],
      f = e[10],
      m = e[11];
    return (
      e !== i &&
        ((i[4] = e[4]),
        (i[5] = e[5]),
        (i[6] = e[6]),
        (i[7] = e[7]),
        (i[12] = e[12]),
        (i[13] = e[13]),
        (i[14] = e[14]),
        (i[15] = e[15])),
      (i[0] = s * n - h * r),
      (i[1] = a * n - p * r),
      (i[2] = o * n - f * r),
      (i[3] = l * n - m * r),
      (i[8] = s * r + h * n),
      (i[9] = a * r + p * n),
      (i[10] = o * r + f * n),
      (i[11] = l * r + m * n),
      i
    );
  }
  function pr(i, e) {
    return (
      (i[0] = 1),
      (i[1] = 0),
      (i[2] = 0),
      (i[3] = 0),
      (i[4] = 0),
      (i[5] = 1),
      (i[6] = 0),
      (i[7] = 0),
      (i[8] = 0),
      (i[9] = 0),
      (i[10] = 1),
      (i[11] = 0),
      (i[12] = e[0]),
      (i[13] = e[1]),
      (i[14] = e[2]),
      (i[15] = 1),
      i
    );
  }
  function It(i, e, t) {
    let r = t[0],
      n = t[1],
      s = t[2],
      a = Math.sqrt(r * r + n * n + s * s),
      o,
      l,
      h;
    return a < 1e-6
      ? null
      : ((a = 1 / a),
        (r *= a),
        (n *= a),
        (s *= a),
        (o = Math.sin(e)),
        (l = Math.cos(e)),
        (h = 1 - l),
        (i[0] = r * r * h + l),
        (i[1] = n * r * h + s * o),
        (i[2] = s * r * h - n * o),
        (i[3] = 0),
        (i[4] = r * n * h - s * o),
        (i[5] = n * n * h + l),
        (i[6] = s * n * h + r * o),
        (i[7] = 0),
        (i[8] = r * s * h + n * o),
        (i[9] = n * s * h - r * o),
        (i[10] = s * s * h + l),
        (i[11] = 0),
        (i[12] = 0),
        (i[13] = 0),
        (i[14] = 0),
        (i[15] = 1),
        i);
  }
  function fe(i, e, t) {
    let r = e[0],
      n = e[1],
      s = e[2],
      a = e[3],
      o = r + r,
      l = n + n,
      h = s + s,
      p = r * o,
      f = r * l,
      m = r * h,
      _ = n * l,
      R = n * h,
      x = s * h,
      M = a * o,
      E = a * l,
      O = a * h;
    return (
      (i[0] = 1 - (_ + x)),
      (i[1] = f + O),
      (i[2] = m - E),
      (i[3] = 0),
      (i[4] = f - O),
      (i[5] = 1 - (p + x)),
      (i[6] = R + M),
      (i[7] = 0),
      (i[8] = m + E),
      (i[9] = R - M),
      (i[10] = 1 - (p + _)),
      (i[11] = 0),
      (i[12] = t[0]),
      (i[13] = t[1]),
      (i[14] = t[2]),
      (i[15] = 1),
      i
    );
  }
  function ae(i, e) {
    return (i[0] = e[12]), (i[1] = e[13]), (i[2] = e[14]), i;
  }
  function oe(i, e) {
    let t = e[0] + e[5] + e[10],
      r = 0;
    return (
      t > 0
        ? ((r = Math.sqrt(t + 1) * 2),
          (i[3] = 0.25 * r),
          (i[0] = (e[6] - e[9]) / r),
          (i[1] = (e[8] - e[2]) / r),
          (i[2] = (e[1] - e[4]) / r))
        : e[0] > e[5] && e[0] > e[10]
        ? ((r = Math.sqrt(1 + e[0] - e[5] - e[10]) * 2),
          (i[3] = (e[6] - e[9]) / r),
          (i[0] = 0.25 * r),
          (i[1] = (e[1] + e[4]) / r),
          (i[2] = (e[8] + e[2]) / r))
        : e[5] > e[10]
        ? ((r = Math.sqrt(1 + e[5] - e[0] - e[10]) * 2),
          (i[3] = (e[8] - e[2]) / r),
          (i[0] = (e[1] + e[4]) / r),
          (i[1] = 0.25 * r),
          (i[2] = (e[6] + e[9]) / r))
        : ((r = Math.sqrt(1 + e[10] - e[0] - e[5]) * 2),
          (i[3] = (e[1] - e[4]) / r),
          (i[0] = (e[8] + e[2]) / r),
          (i[1] = (e[6] + e[9]) / r),
          (i[2] = 0.25 * r)),
      i
    );
  }
  function fr(i, e, t, r, n) {
    let s = 1 / Math.tan(e / 2),
      a;
    return (
      (i[0] = s / t),
      (i[1] = 0),
      (i[2] = 0),
      (i[3] = 0),
      (i[4] = 0),
      (i[5] = s),
      (i[6] = 0),
      (i[7] = 0),
      (i[8] = 0),
      (i[9] = 0),
      (i[11] = -1),
      (i[12] = 0),
      (i[13] = 0),
      (i[15] = 0),
      n != null && n !== 1 / 0
        ? ((a = 1 / (r - n)), (i[10] = (n + r) * a), (i[14] = 2 * n * r * a))
        : ((i[10] = -1), (i[14] = -2 * r)),
      i
    );
  }
  function mr(i, e) {
    let t = i[0],
      r = i[1],
      n = i[2],
      s = i[3],
      a = i[4],
      o = i[5],
      l = i[6],
      h = i[7],
      p = i[8],
      f = i[9],
      m = i[10],
      _ = i[11],
      R = i[12],
      x = i[13],
      M = i[14],
      E = i[15],
      O = e[0],
      v = e[1],
      u = e[2],
      w = e[3],
      g = e[4],
      F = e[5],
      Z = e[6],
      re = e[7],
      $ = e[8],
      ie = e[9],
      q = e[10],
      pe = e[11],
      I = e[12],
      er = e[13],
      tr = e[14],
      rr = e[15];
    return (
      Math.abs(t - O) <= 1e-6 * Math.max(1, Math.abs(t), Math.abs(O)) &&
      Math.abs(r - v) <= 1e-6 * Math.max(1, Math.abs(r), Math.abs(v)) &&
      Math.abs(n - u) <= 1e-6 * Math.max(1, Math.abs(n), Math.abs(u)) &&
      Math.abs(s - w) <= 1e-6 * Math.max(1, Math.abs(s), Math.abs(w)) &&
      Math.abs(a - g) <= 1e-6 * Math.max(1, Math.abs(a), Math.abs(g)) &&
      Math.abs(o - F) <= 1e-6 * Math.max(1, Math.abs(o), Math.abs(F)) &&
      Math.abs(l - Z) <= 1e-6 * Math.max(1, Math.abs(l), Math.abs(Z)) &&
      Math.abs(h - re) <= 1e-6 * Math.max(1, Math.abs(h), Math.abs(re)) &&
      Math.abs(p - $) <= 1e-6 * Math.max(1, Math.abs(p), Math.abs($)) &&
      Math.abs(f - ie) <= 1e-6 * Math.max(1, Math.abs(f), Math.abs(ie)) &&
      Math.abs(m - q) <= 1e-6 * Math.max(1, Math.abs(m), Math.abs(q)) &&
      Math.abs(_ - pe) <= 1e-6 * Math.max(1, Math.abs(_), Math.abs(pe)) &&
      Math.abs(R - I) <= 1e-6 * Math.max(1, Math.abs(R), Math.abs(I)) &&
      Math.abs(x - er) <= 1e-6 * Math.max(1, Math.abs(x), Math.abs(er)) &&
      Math.abs(M - tr) <= 1e-6 * Math.max(1, Math.abs(M), Math.abs(tr)) &&
      Math.abs(E - rr) <= 1e-6 * Math.max(1, Math.abs(E), Math.abs(rr))
    );
  }
  function A() {
    let i = new L(3);
    return L != Float32Array && ((i[0] = 0), (i[1] = 0), (i[2] = 0)), i;
  }
  function At(i) {
    var e = new L(3);
    return (e[0] = i[0]), (e[1] = i[1]), (e[2] = i[2]), e;
  }
  function pi(i) {
    let e = i[0],
      t = i[1],
      r = i[2];
    return Math.sqrt(e * e + t * t + r * r);
  }
  function H(i, e, t) {
    let r = new L(3);
    return (r[0] = i), (r[1] = e), (r[2] = t), r;
  }
  function Pt(i, e) {
    return (i[0] = e[0]), (i[1] = e[1]), (i[2] = e[2]), i;
  }
  function Ze(i, e, t, r) {
    return (i[0] = e), (i[1] = t), (i[2] = r), i;
  }
  function Be(i, e, t) {
    return (i[0] = e[0] + t[0]), (i[1] = e[1] + t[1]), (i[2] = e[2] + t[2]), i;
  }
  function Ot(i, e, t) {
    return (i[0] = e[0] * t), (i[1] = e[1] * t), (i[2] = e[2] * t), i;
  }
  function ut(i, e) {
    let t = e[0],
      r = e[1],
      n = e[2],
      s = t * t + r * r + n * n;
    return (
      s > 0 &&
        ((s = 1 / Math.sqrt(s)),
        (i[0] = e[0] * s),
        (i[1] = e[1] * s),
        (i[2] = e[2] * s)),
      i
    );
  }
  function ye(i, e) {
    return i[0] * e[0] + i[1] * e[1] + i[2] * e[2];
  }
  function Ge(i, e, t) {
    let r = e[0],
      n = e[1],
      s = e[2],
      a = t[0],
      o = t[1],
      l = t[2];
    return (
      (i[0] = n * l - s * o), (i[1] = s * a - r * l), (i[2] = r * o - n * a), i
    );
  }
  function Lt(i, e, t) {
    let r = e[0],
      n = e[1],
      s = e[2],
      a = t[3] * r + t[7] * n + t[11] * s + t[15];
    return (
      (a = a || 1),
      (i[0] = (t[0] * r + t[4] * n + t[8] * s + t[12]) / a),
      (i[1] = (t[1] * r + t[5] * n + t[9] * s + t[13]) / a),
      (i[2] = (t[2] * r + t[6] * n + t[10] * s + t[14]) / a),
      i
    );
  }
  function Me(i, e, t) {
    let r = t[0],
      n = t[1],
      s = t[2],
      a = t[3],
      o = e[0],
      l = e[1],
      h = e[2],
      p = n * h - s * l,
      f = s * o - r * h,
      m = r * l - n * o,
      _ = n * m - s * f,
      R = s * p - r * m,
      x = r * f - n * p,
      M = a * 2;
    return (
      (p *= M),
      (f *= M),
      (m *= M),
      (_ *= 2),
      (R *= 2),
      (x *= 2),
      (i[0] = o + p + _),
      (i[1] = l + f + R),
      (i[2] = h + m + x),
      i
    );
  }
  function gr(i, e) {
    let t = H(i[0], i[1], i[2]),
      r = H(e[0], e[1], e[2]);
    ut(t, t), ut(r, r);
    let n = ye(t, r);
    return n > 1 ? 0 : n < -1 ? Math.PI : Math.acos(n);
  }
  function Nt(i, e) {
    let t = i[0],
      r = i[1],
      n = i[2],
      s = e[0],
      a = e[1],
      o = e[2];
    return (
      Math.abs(t - s) <= 1e-6 * Math.max(1, Math.abs(t), Math.abs(s)) &&
      Math.abs(r - a) <= 1e-6 * Math.max(1, Math.abs(r), Math.abs(a)) &&
      Math.abs(n - o) <= 1e-6 * Math.max(1, Math.abs(n), Math.abs(o))
    );
  }
  var _r = pi;
  var Ji = (function () {
    let i = A();
    return function (e, t, r, n, s, a) {
      let o, l;
      for (
        t || (t = 3),
          r || (r = 0),
          n ? (l = Math.min(n * t + r, e.length)) : (l = e.length),
          o = r;
        o < l;
        o += t
      )
        (i[0] = e[o]),
          (i[1] = e[o + 1]),
          (i[2] = e[o + 2]),
          s(i, i, a),
          (e[o] = i[0]),
          (e[o + 1] = i[1]),
          (e[o + 2] = i[2]);
      return e;
    };
  })();
  function xr() {
    let i = new L(9);
    return (
      L != Float32Array &&
        ((i[1] = 0),
        (i[2] = 0),
        (i[3] = 0),
        (i[5] = 0),
        (i[6] = 0),
        (i[7] = 0)),
      (i[0] = 1),
      (i[4] = 1),
      (i[8] = 1),
      i
    );
  }
  function Ue() {
    let i = new L(4);
    return (
      L != Float32Array && ((i[0] = 0), (i[1] = 0), (i[2] = 0), (i[3] = 0)), i
    );
  }
  function wr(i) {
    let e = new L(4);
    return (e[0] = i[0]), (e[1] = i[1]), (e[2] = i[2]), (e[3] = i[3]), e;
  }
  function gt(i, e, t, r) {
    let n = new L(4);
    return (n[0] = i), (n[1] = e), (n[2] = t), (n[3] = r), n;
  }
  function vr(i, e) {
    return (i[0] = e[0]), (i[1] = e[1]), (i[2] = e[2]), (i[3] = e[3]), i;
  }
  function _t(i, e, t, r, n) {
    return (i[0] = e), (i[1] = t), (i[2] = r), (i[3] = n), i;
  }
  function yr(i, e) {
    let t = e[0],
      r = e[1],
      n = e[2],
      s = e[3],
      a = t * t + r * r + n * n + s * s;
    return (
      a > 0 &&
        ((a = 1 / Math.sqrt(a)),
        (i[0] = t * a),
        (i[1] = r * a),
        (i[2] = n * a),
        (i[3] = s * a)),
      i
    );
  }
  function $e(i, e, t) {
    let r = e[0],
      n = e[1],
      s = e[2],
      a = e[3];
    return (
      (i[0] = t[0] * r + t[4] * n + t[8] * s + t[12] * a),
      (i[1] = t[1] * r + t[5] * n + t[9] * s + t[13] * a),
      (i[2] = t[2] * r + t[6] * n + t[10] * s + t[14] * a),
      (i[3] = t[3] * r + t[7] * n + t[11] * s + t[15] * a),
      i
    );
  }
  var en = (function () {
    let i = Ue();
    return function (e, t, r, n, s, a) {
      let o, l;
      for (
        t || (t = 4),
          r || (r = 0),
          n ? (l = Math.min(n * t + r, e.length)) : (l = e.length),
          o = r;
        o < l;
        o += t
      )
        (i[0] = e[o]),
          (i[1] = e[o + 1]),
          (i[2] = e[o + 2]),
          (i[3] = e[o + 3]),
          s(i, i, a),
          (e[o] = i[0]),
          (e[o + 1] = i[1]),
          (e[o + 2] = i[2]),
          (e[o + 3] = i[3]);
      return e;
    };
  })();
  function K() {
    let i = new L(4);
    return (
      L != Float32Array && ((i[0] = 0), (i[1] = 0), (i[2] = 0)), (i[3] = 1), i
    );
  }
  function mi(i, e, t) {
    t = t * 0.5;
    let r = Math.sin(t);
    return (
      (i[0] = r * e[0]),
      (i[1] = r * e[1]),
      (i[2] = r * e[2]),
      (i[3] = Math.cos(t)),
      i
    );
  }
  function Ft(i, e, t) {
    let r = e[0],
      n = e[1],
      s = e[2],
      a = e[3],
      o = t[0],
      l = t[1],
      h = t[2],
      p = t[3];
    return (
      (i[0] = r * p + a * o + n * h - s * l),
      (i[1] = n * p + a * l + s * o - r * h),
      (i[2] = s * p + a * h + r * l - n * o),
      (i[3] = a * p - r * o - n * l - s * h),
      i
    );
  }
  function We(i, e, t, r) {
    let n = e[0],
      s = e[1],
      a = e[2],
      o = e[3],
      l = t[0],
      h = t[1],
      p = t[2],
      f = t[3],
      m,
      _,
      R,
      x,
      M;
    return (
      (_ = n * l + s * h + a * p + o * f),
      _ < 0 && ((_ = -_), (l = -l), (h = -h), (p = -p), (f = -f)),
      1 - _ > 1e-6
        ? ((m = Math.acos(_)),
          (R = Math.sin(m)),
          (x = Math.sin((1 - r) * m) / R),
          (M = Math.sin(r * m) / R))
        : ((x = 1 - r), (M = r)),
      (i[0] = x * n + M * l),
      (i[1] = x * s + M * h),
      (i[2] = x * a + M * p),
      (i[3] = x * o + M * f),
      i
    );
  }
  function kt(i, e) {
    let t = e[0],
      r = e[1],
      n = e[2],
      s = e[3],
      a = t * t + r * r + n * n + s * s,
      o = a ? 1 / a : 0;
    return (i[0] = -t * o), (i[1] = -r * o), (i[2] = -n * o), (i[3] = s * o), i;
  }
  function ui(i, e) {
    let t = e[0] + e[4] + e[8],
      r;
    if (t > 0)
      (r = Math.sqrt(t + 1)),
        (i[3] = 0.5 * r),
        (r = 0.5 / r),
        (i[0] = (e[5] - e[7]) * r),
        (i[1] = (e[6] - e[2]) * r),
        (i[2] = (e[1] - e[3]) * r);
    else {
      let n = 0;
      e[4] > e[0] && (n = 1), e[8] > e[n * 3 + n] && (n = 2);
      let s = (n + 1) % 3,
        a = (n + 2) % 3;
      (r = Math.sqrt(e[n * 3 + n] - e[s * 3 + s] - e[a * 3 + a] + 1)),
        (i[n] = 0.5 * r),
        (r = 0.5 / r),
        (i[3] = (e[s * 3 + a] - e[a * 3 + s]) * r),
        (i[s] = (e[s * 3 + n] + e[n * 3 + s]) * r),
        (i[a] = (e[a * 3 + n] + e[n * 3 + a]) * r);
    }
    return i;
  }
  function Mr(i, e, t, r) {
    let n = (0.5 * Math.PI) / 180;
    (e *= n), (t *= n), (r *= n);
    let s = Math.sin(e),
      a = Math.cos(e),
      o = Math.sin(t),
      l = Math.cos(t),
      h = Math.sin(r),
      p = Math.cos(r);
    return (
      (i[0] = s * l * p - a * o * h),
      (i[1] = a * o * p + s * l * h),
      (i[2] = a * l * h - s * o * p),
      (i[3] = a * l * p + s * o * h),
      i
    );
  }
  var Dt = wr,
    Sr = gt,
    xt = vr;
  var Je = yr;
  var hn = (function () {
      let i = A(),
        e = H(1, 0, 0),
        t = H(0, 1, 0);
      return function (r, n, s) {
        let a = ye(n, s);
        return a < -0.999999
          ? (Ge(i, e, n),
            _r(i) < 1e-6 && Ge(i, t, n),
            ut(i, i),
            mi(r, i, Math.PI),
            r)
          : a > 0.999999
          ? ((r[0] = 0), (r[1] = 0), (r[2] = 0), (r[3] = 1), r)
          : (Ge(i, n, s),
            (r[0] = i[0]),
            (r[1] = i[1]),
            (r[2] = i[2]),
            (r[3] = 1 + a),
            Je(r, r));
      };
    })(),
    dn = (function () {
      let i = K(),
        e = K();
      return function (t, r, n, s, a, o) {
        return We(i, r, a, o), We(e, n, s, o), We(t, i, e, 2 * o * (1 - o)), t;
      };
    })(),
    pn = (function () {
      let i = xr();
      return function (e, t, r, n) {
        return (
          (i[0] = r[0]),
          (i[3] = r[1]),
          (i[6] = r[2]),
          (i[1] = n[0]),
          (i[4] = n[1]),
          (i[7] = n[2]),
          (i[2] = -t[0]),
          (i[5] = -t[1]),
          (i[8] = -t[2]),
          Je(e, ui(e, i))
        );
      };
    })();
  var T = Symbol("@@webxr-polyfill/XRRigidTransform"),
    Q = class {
      constructor() {
        if (
          ((this[T] = {
            matrix: null,
            position: null,
            orientation: null,
            inverse: null,
          }),
          arguments.length === 0)
        )
          this[T].matrix = W(new Float32Array(16));
        else if (arguments.length === 1)
          arguments[0] instanceof Float32Array
            ? (this[T].matrix = arguments[0])
            : ((this[T].position = this._getPoint(arguments[0])),
              (this[T].orientation = DOMPointReadOnly.fromPoint({
                x: 0,
                y: 0,
                z: 0,
                w: 1,
              })));
        else if (arguments.length === 2)
          (this[T].position = this._getPoint(arguments[0])),
            (this[T].orientation = this._getPoint(arguments[1]));
        else throw new Error("Too many arguments!");
        if (this[T].matrix) {
          let e = A();
          ae(e, this[T].matrix),
            (this[T].position = DOMPointReadOnly.fromPoint({
              x: e[0],
              y: e[1],
              z: e[2],
            }));
          let t = K();
          oe(t, this[T].matrix),
            (this[T].orientation = DOMPointReadOnly.fromPoint({
              x: t[0],
              y: t[1],
              z: t[2],
              w: t[3],
            }));
        } else
          (this[T].matrix = W(new Float32Array(16))),
            fe(
              this[T].matrix,
              Sr(
                this[T].orientation.x,
                this[T].orientation.y,
                this[T].orientation.z,
                this[T].orientation.w
              ),
              H(this[T].position.x, this[T].position.y, this[T].position.z)
            );
      }
      _getPoint(e) {
        return e instanceof DOMPointReadOnly
          ? e
          : DOMPointReadOnly.fromPoint(e);
      }
      get matrix() {
        return this[T].matrix;
      }
      get position() {
        return this[T].position;
      }
      get orientation() {
        return this[T].orientation;
      }
      get inverse() {
        if (this[T].inverse === null) {
          let e = W(new Float32Array(16));
          j(e, this[T].matrix),
            (this[T].inverse = new Q(e)),
            (this[T].inverse[T].inverse = this);
        }
        return this[T].inverse;
      }
    };
  var P = Symbol("@@webxr-polyfill/XRSpace");
  var V = class {
    constructor(e = null, t = null) {
      this[P] = {
        specialType: e,
        inputSource: t,
        baseMatrix: null,
        inverseBaseMatrix: null,
        lastFrameId: -1,
      };
    }
    get _specialType() {
      return this[P].specialType;
    }
    get _inputSource() {
      return this[P].inputSource;
    }
    _ensurePoseUpdated(e, t) {
      t != this[P].lastFrameId &&
        ((this[P].lastFrameId = t), this._onPoseUpdate(e));
    }
    _onPoseUpdate(e) {
      this[P].specialType == "viewer" &&
        (this._baseMatrix = e.getBasePoseMatrix());
    }
    set _baseMatrix(e) {
      (this[P].baseMatrix = e), (this[P].inverseBaseMatrix = null);
    }
    get _baseMatrix() {
      return (
        this[P].baseMatrix ||
          (this[P].inverseBaseMatrix &&
            ((this[P].baseMatrix = new Float32Array(16)),
            j(this[P].baseMatrix, this[P].inverseBaseMatrix))),
        this[P].baseMatrix
      );
    }
    set _inverseBaseMatrix(e) {
      (this[P].inverseBaseMatrix = e), (this[P].baseMatrix = null);
    }
    get _inverseBaseMatrix() {
      return (
        this[P].inverseBaseMatrix ||
          (this[P].baseMatrix &&
            ((this[P].inverseBaseMatrix = new Float32Array(16)),
            j(this[P].inverseBaseMatrix, this[P].baseMatrix))),
        this[P].inverseBaseMatrix
      );
    }
    _getSpaceRelativeTransform(e) {
      if (!this._inverseBaseMatrix || !e._baseMatrix) return null;
      let t = new Float32Array(16);
      return D(t, this._inverseBaseMatrix, e._baseMatrix), new Q(t);
    }
  };
  var gi = 1.6,
    me = Symbol("@@webxr-polyfill/XRReferenceSpace"),
    et = ["viewer", "local", "local-floor", "bounded-floor", "unbounded"];
  function _i(i) {
    return i === "bounded-floor" || i === "local-floor";
  }
  var ne = class extends V {
    constructor(e, t = null) {
      if (!et.includes(e))
        throw new Error(`XRReferenceSpaceType must be one of ${et}`);
      if ((super(e), e === "bounded-floor" && !t))
        throw new Error(
          "XRReferenceSpace cannot use 'bounded-floor' type if the platform does not provide the floor level"
        );
      _i(e) && !t && ((t = W(new Float32Array(16))), (t[13] = gi)),
        (this._inverseBaseMatrix = t || W(new Float32Array(16))),
        (this[me] = {
          type: e,
          transform: t,
          originOffset: W(new Float32Array(16)),
        });
    }
    _transformBasePoseMatrix(e, t) {
      D(e, this._inverseBaseMatrix, t);
    }
    _originOffsetMatrix() {
      return this[me].originOffset;
    }
    _adjustForOriginOffset(e) {
      let t = new Float32Array(16);
      j(t, this[me].originOffset), D(e, t, e);
    }
    _getSpaceRelativeTransform(e) {
      let t = super._getSpaceRelativeTransform(e);
      return (
        this._adjustForOriginOffset(t.matrix), new XRRigidTransform(t.matrix)
      );
    }
    getOffsetReferenceSpace(e) {
      let t = new ne(this[me].type, this[me].transform, this[me].bounds);
      return D(t[me].originOffset, this[me].originOffset, e.matrix), t;
    }
  };
  var B = Symbol("@@webxr-polyfill/XR"),
    xi = ["inline", "immersive-vr", "immersive-ar"],
    wi = {
      inline: { requiredFeatures: ["viewer"], optionalFeatures: [] },
      "immersive-vr": {
        requiredFeatures: ["viewer", "local"],
        optionalFeatures: [],
      },
      "immersive-ar": {
        requiredFeatures: ["viewer", "local"],
        optionalFeatures: [],
      },
    },
    vi = `Polyfill Error: Must call navigator.xr.isSessionSupported() with any XRSessionMode
or navigator.xr.requestSession('inline') prior to requesting an immersive
session. This is a limitation specific to the WebXR Polyfill and does not apply
to native implementations of the API.`,
    G = class extends Y {
      constructor(e) {
        super(),
          (this[B] = {
            device: null,
            devicePromise: e,
            immersiveSession: null,
            inlineSessions: new Set(),
          }),
          e.then((t) => {
            this[B].device = t;
          });
      }
      async isSessionSupported(e) {
        return (
          this[B].device || (await this[B].devicePromise),
          e != "inline"
            ? Promise.resolve(this[B].device.isSessionSupported(e))
            : Promise.resolve(!0)
        );
      }
      async requestSession(e, t) {
        if (!this[B].device) {
          if (e != "inline") throw new Error(vi);
          await this[B].devicePromise;
        }
        if (!xi.includes(e))
          throw new TypeError(
            `The provided value '${e}' is not a valid enum value of type XRSessionMode`
          );
        let r = wi[e],
          n = r.requiredFeatures.concat(
            t && t.requiredFeatures ? t.requiredFeatures : []
          ),
          s = r.optionalFeatures.concat(
            t && t.optionalFeatures ? t.optionalFeatures : []
          ),
          a = new Set(),
          o = !1;
        for (let f of n)
          this[B].device.isFeatureSupported(f)
            ? a.add(f)
            : (console.error(`The required feature '${f}' is not supported`),
              (o = !0));
        if (o)
          throw new DOMException(
            "Session does not support some required features",
            "NotSupportedError"
          );
        for (let f of s)
          this[B].device.isFeatureSupported(f)
            ? a.add(f)
            : console.log(`The optional feature '${f}' is not supported`);
        let l = await this[B].device.requestSession(e, a),
          h = new XRSession(this[B].device, e, l);
        e == "inline"
          ? this[B].inlineSessions.add(h)
          : (this[B].immersiveSession = h);
        let p = () => {
          e == "inline"
            ? this[B].inlineSessions.delete(h)
            : (this[B].immersiveSession = null),
            h.removeEventListener("end", p);
        };
        return h.addEventListener("end", p), h;
      }
    };
  var zt;
  if ("performance" in mt) zt = () => performance.now();
  else {
    let i = Date.now();
    zt = () => Date.now() - i;
  }
  var wt = zt;
  var Xt = Symbol("@@webxr-polyfill/XRPose"),
    Ee = class {
      constructor(e, t) {
        this[Xt] = { transform: e, emulatedPosition: t };
      }
      get transform() {
        return this[Xt].transform;
      }
      get emulatedPosition() {
        return this[Xt].emulatedPosition;
      }
    };
  var Er = Symbol("@@webxr-polyfill/XRViewerPose"),
    Re = class extends Ee {
      constructor(e, t, r = !1) {
        super(e, r), (this[Er] = { views: t });
      }
      get views() {
        return this[Er].views;
      }
    };
  var tt = Symbol("@@webxr-polyfill/XRViewport"),
    be = class {
      constructor(e) {
        this[tt] = { target: e };
      }
      get x() {
        return this[tt].target.x;
      }
      get y() {
        return this[tt].target.y;
      }
      get width() {
        return this[tt].target.width;
      }
      get height() {
        return this[tt].target.height;
      }
    };
  var Rr = ["left", "right", "none"],
    ue = Symbol("@@webxr-polyfill/XRView"),
    Te = class {
      constructor(e, t, r, n) {
        if (!Rr.includes(r)) throw new Error(`XREye must be one of: ${Rr}`);
        let s = Object.create(null),
          a = new be(s);
        this[ue] = {
          device: e,
          eye: r,
          viewport: a,
          temp: s,
          sessionId: n,
          transform: t,
        };
      }
      get eye() {
        return this[ue].eye;
      }
      get projectionMatrix() {
        return this[ue].device.getProjectionMatrix(this.eye);
      }
      get transform() {
        return this[ue].transform;
      }
      _getViewport(e) {
        if (
          this[ue].device.getViewport(
            this[ue].sessionId,
            this.eye,
            e,
            this[ue].temp
          )
        )
          return this[ue].viewport;
      }
    };
  var N = Symbol("@@webxr-polyfill/XRFrame"),
    br = "XRFrame access outside the callback that produced it is invalid.",
    yi =
      "getViewerPose can only be called on XRFrame objects passed to XRSession.requestAnimationFrame callbacks.",
    Mi = 0,
    ge = class {
      constructor(e, t, r) {
        this[N] = {
          id: ++Mi,
          active: !1,
          animationFrame: !1,
          device: e,
          session: t,
          sessionId: r,
        };
      }
      get session() {
        return this[N].session;
      }
      getViewerPose(e) {
        if (!this[N].animationFrame)
          throw new DOMException(yi, "InvalidStateError");
        if (!this[N].active) throw new DOMException(br, "InvalidStateError");
        let t = this[N].device,
          r = this[N].session;
        r[c].viewerSpace._ensurePoseUpdated(t, this[N].id),
          e._ensurePoseUpdated(t, this[N].id);
        let n = e._getSpaceRelativeTransform(r[c].viewerSpace),
          s = [];
        for (let o of r[c].viewSpaces) {
          o._ensurePoseUpdated(t, this[N].id);
          let l = e._getSpaceRelativeTransform(o),
            h = new Te(t, l, o.eye, this[N].sessionId);
          s.push(h);
        }
        return new Re(n, s, !1);
      }
      getPose(e, t) {
        if (!this[N].active) throw new DOMException(br, "InvalidStateError");
        let r = this[N].device;
        if (e._specialType === "target-ray" || e._specialType === "grip")
          return r.getInputPose(e._inputSource, t, e._specialType);
        {
          e._ensurePoseUpdated(r, this[N].id),
            t._ensurePoseUpdated(r, this[N].id);
          let n = t._getSpaceRelativeTransform(e);
          return n ? new XRPose(n, !1) : null;
        }
        return null;
      }
    };
  var rt = Symbol("@@webxr-polyfill/XRRenderState"),
    Si = Object.freeze({
      depthNear: 0.1,
      depthFar: 1e3,
      inlineVerticalFieldOfView: null,
      baseLayer: null,
    }),
    _e = class {
      constructor(e = {}) {
        let t = Object.assign({}, Si, e);
        this[rt] = { config: t };
      }
      get depthNear() {
        return this[rt].config.depthNear;
      }
      get depthFar() {
        return this[rt].config.depthFar;
      }
      get inlineVerticalFieldOfView() {
        return this[rt].config.inlineVerticalFieldOfView;
      }
      get baseLayer() {
        return this[rt].config.baseLayer;
      }
    };
  var vt = Symbol("@@webxr-polyfill/polyfilled-xr-compatible"),
    it = Symbol("@@webxr-polyfill/xr-compatible");
  var Ie = Symbol("@@webxr-polyfill/XRWebGLLayer"),
    Ei = Object.freeze({
      antialias: !0,
      depth: !1,
      stencil: !1,
      alpha: !0,
      multiview: !1,
      ignoreDepthValues: !1,
      framebufferScaleFactor: 1,
    }),
    nt = class {
      constructor(e, t, r = {}) {
        let n = Object.assign({}, Ei, r);
        if (!(e instanceof U)) throw new Error("session must be a XRSession");
        if (e.ended) throw new Error("InvalidStateError");
        if (t[vt] && t[it] !== !0) throw new Error("InvalidStateError");
        let s = t.getParameter(t.FRAMEBUFFER_BINDING);
        this[Ie] = { context: t, config: n, framebuffer: s, session: e };
      }
      get context() {
        return this[Ie].context;
      }
      get antialias() {
        return this[Ie].config.antialias;
      }
      get ignoreDepthValues() {
        return !0;
      }
      get framebuffer() {
        return this[Ie].framebuffer;
      }
      get framebufferWidth() {
        return this[Ie].context.drawingBufferWidth;
      }
      get framebufferHeight() {
        return this[Ie].context.drawingBufferHeight;
      }
      get _session() {
        return this[Ie].session;
      }
      getViewport(e) {
        return e._getViewport(this);
      }
      static getNativeFramebufferScaleFactor(e) {
        if (!e)
          throw new TypeError(
            "getNativeFramebufferScaleFactor must be passed a session."
          );
        return e[c].ended ? 0 : 1;
      }
    };
  var Bt = Symbol("@@webxr-polyfill/XRInputSourceEvent"),
    le = class extends Event {
      constructor(e, t) {
        super(e, t),
          (this[Bt] = { frame: t.frame, inputSource: t.inputSource }),
          Object.setPrototypeOf(this, le.prototype);
      }
      get frame() {
        return this[Bt].frame;
      }
      get inputSource() {
        return this[Bt].inputSource;
      }
    };
  var Tr = Symbol("@@webxr-polyfill/XRSessionEvent"),
    ee = class extends Event {
      constructor(e, t) {
        super(e, t),
          (this[Tr] = { session: t.session }),
          Object.setPrototypeOf(this, ee.prototype);
      }
      get session() {
        return this[Tr].session;
      }
    };
  var yt = Symbol("@@webxr-polyfill/XRInputSourcesChangeEvent"),
    ce = class extends Event {
      constructor(e, t) {
        super(e, t),
          (this[yt] = {
            session: t.session,
            added: t.added,
            removed: t.removed,
          }),
          Object.setPrototypeOf(this, ce.prototype);
      }
      get session() {
        return this[yt].session;
      }
      get added() {
        return this[yt].added;
      }
      get removed() {
        return this[yt].removed;
      }
    };
  var c = Symbol("@@webxr-polyfill/XRSession"),
    st = class extends V {
      constructor(e) {
        super(e);
      }
      get eye() {
        return this._specialType;
      }
      _onPoseUpdate(e) {
        this._inverseBaseMatrix = e.getBaseViewMatrix(this._specialType);
      }
    },
    U = class extends Y {
      constructor(e, t, r) {
        super();
        let n = t != "inline",
          s = new _e({ inlineVerticalFieldOfView: n ? null : Math.PI * 0.5 });
        (this[c] = {
          device: e,
          mode: t,
          immersive: n,
          ended: !1,
          suspended: !1,
          frameCallbacks: [],
          currentFrameCallbacks: null,
          frameHandle: 0,
          deviceFrameHandle: null,
          id: r,
          activeRenderState: s,
          pendingRenderState: null,
          viewerSpace: new ne("viewer"),
          viewSpaces: [],
          currentInputSources: [],
        }),
          n
            ? this[c].viewSpaces.push(new st("left"), new st("right"))
            : this[c].viewSpaces.push(new st("none")),
          (this[c].onDeviceFrame = () => {
            if (
              this[c].ended ||
              this[c].suspended ||
              ((this[c].deviceFrameHandle = null),
              this[c].startDeviceFrameLoop(),
              this[c].pendingRenderState !== null &&
                ((this[c].activeRenderState = new _e(
                  this[c].pendingRenderState
                )),
                (this[c].pendingRenderState = null),
                this[c].activeRenderState.baseLayer &&
                  this[c].device.onBaseLayerSet(
                    this[c].id,
                    this[c].activeRenderState.baseLayer
                  )),
              this[c].activeRenderState.baseLayer === null)
            )
              return;
            let a = new ge(e, this, this[c].id),
              o = (this[c].currentFrameCallbacks = this[c].frameCallbacks);
            (this[c].frameCallbacks = []),
              (a[N].active = !0),
              (a[N].animationFrame = !0),
              this[c].device.onFrameStart(
                this[c].id,
                this[c].activeRenderState
              ),
              this._checkInputSourcesChange();
            let l = wt();
            for (let h = 0; h < o.length; h++)
              try {
                !o[h].cancelled &&
                  typeof o[h].callback == "function" &&
                  o[h].callback(l, a);
              } catch (p) {
                console.error(p);
              }
            (this[c].currentFrameCallbacks = null),
              (a[N].active = !1),
              this[c].device.onFrameEnd(this[c].id);
          }),
          (this[c].startDeviceFrameLoop = () => {
            this[c].deviceFrameHandle === null &&
              (this[c].deviceFrameHandle = this[c].device.requestAnimationFrame(
                this[c].onDeviceFrame
              ));
          }),
          (this[c].stopDeviceFrameLoop = () => {
            let a = this[c].deviceFrameHandle;
            a !== null &&
              (this[c].device.cancelAnimationFrame(a),
              (this[c].deviceFrameHandle = null));
          }),
          (this[c].onPresentationEnd = (a) => {
            if (a !== this[c].id) {
              (this[c].suspended = !1),
                this[c].startDeviceFrameLoop(),
                this.dispatchEvent("focus", { session: this });
              return;
            }
            (this[c].ended = !0),
              this[c].stopDeviceFrameLoop(),
              e.removeEventListener(
                "@@webxr-polyfill/vr-present-end",
                this[c].onPresentationEnd
              ),
              e.removeEventListener(
                "@@webxr-polyfill/vr-present-start",
                this[c].onPresentationStart
              ),
              e.removeEventListener(
                "@@webxr-polyfill/input-select-start",
                this[c].onSelectStart
              ),
              e.removeEventListener(
                "@@webxr-polyfill/input-select-end",
                this[c].onSelectEnd
              ),
              this.dispatchEvent("end", new ee("end", { session: this }));
          }),
          e.addEventListener(
            "@@webxr-polyfill/vr-present-end",
            this[c].onPresentationEnd
          ),
          (this[c].onPresentationStart = (a) => {
            a !== this[c].id &&
              ((this[c].suspended = !0),
              this[c].stopDeviceFrameLoop(),
              this.dispatchEvent("blur", { session: this }));
          }),
          e.addEventListener(
            "@@webxr-polyfill/vr-present-start",
            this[c].onPresentationStart
          ),
          (this[c].onSelectStart = (a) => {
            a.sessionId === this[c].id &&
              this[c].dispatchInputSourceEvent("selectstart", a.inputSource);
          }),
          e.addEventListener(
            "@@webxr-polyfill/input-select-start",
            this[c].onSelectStart
          ),
          (this[c].onSelectEnd = (a) => {
            a.sessionId === this[c].id &&
              (this[c].dispatchInputSourceEvent("selectend", a.inputSource),
              this[c].dispatchInputSourceEvent("select", a.inputSource));
          }),
          e.addEventListener(
            "@@webxr-polyfill/input-select-end",
            this[c].onSelectEnd
          ),
          (this[c].onSqueezeStart = (a) => {
            a.sessionId === this[c].id &&
              this[c].dispatchInputSourceEvent("squeezestart", a.inputSource);
          }),
          e.addEventListener(
            "@@webxr-polyfill/input-squeeze-start",
            this[c].onSqueezeStart
          ),
          (this[c].onSqueezeEnd = (a) => {
            a.sessionId === this[c].id &&
              (this[c].dispatchInputSourceEvent("squeezeend", a.inputSource),
              this[c].dispatchInputSourceEvent("squeeze", a.inputSource));
          }),
          e.addEventListener(
            "@@webxr-polyfill/input-squeeze-end",
            this[c].onSqueezeEnd
          ),
          (this[c].dispatchInputSourceEvent = (a, o) => {
            let l = new ge(e, this, this[c].id),
              h = new le(a, { frame: l, inputSource: o });
            (l[N].active = !0), this.dispatchEvent(a, h), (l[N].active = !1);
          }),
          this[c].startDeviceFrameLoop(),
          (this.onblur = void 0),
          (this.onfocus = void 0),
          (this.onresetpose = void 0),
          (this.onend = void 0),
          (this.onselect = void 0),
          (this.onselectstart = void 0),
          (this.onselectend = void 0);
      }
      get renderState() {
        return this[c].activeRenderState;
      }
      get environmentBlendMode() {
        return this[c].device.environmentBlendMode || "opaque";
      }
      async requestReferenceSpace(e) {
        if (this[c].ended) return;
        if (!et.includes(e))
          throw new TypeError(`XRReferenceSpaceType must be one of ${et}`);
        if (!this[c].device.doesSessionSupportReferenceSpace(this[c].id, e))
          throw new DOMException(
            `The ${e} reference space is not supported by this session.`,
            "NotSupportedError"
          );
        if (e === "viewer") return this[c].viewerSpace;
        let t = await this[c].device.requestFrameOfReferenceTransform(e);
        if (e === "bounded-floor")
          throw t
            ? this[c].device.requestStageBounds()
              ? new DOMException(
                  `The WebXR polyfill does not support the ${e} reference space yet.`,
                  "NotSupportedError"
                )
              : new DOMException(
                  `${e} XRReferenceSpace not supported by this device.`,
                  "NotSupportedError"
                )
            : new DOMException(
                `${e} XRReferenceSpace not supported by this device.`,
                "NotSupportedError"
              );
        return new ne(e, t);
      }
      requestAnimationFrame(e) {
        if (this[c].ended) return;
        let t = ++this[c].frameHandle;
        return (
          this[c].frameCallbacks.push({
            handle: t,
            callback: e,
            cancelled: !1,
          }),
          t
        );
      }
      cancelAnimationFrame(e) {
        let t = this[c].frameCallbacks,
          r = t.findIndex((n) => n && n.handle === e);
        r > -1 && ((t[r].cancelled = !0), t.splice(r, 1)),
          (t = this[c].currentFrameCallbacks),
          t &&
            ((r = t.findIndex((n) => n && n.handle === e)),
            r > -1 && (t[r].cancelled = !0));
      }
      get inputSources() {
        return this[c].device.getInputSources();
      }
      async end() {
        if (!this[c].ended)
          return (
            this[c].immersive &&
              ((this[c].ended = !0),
              this[c].device.removeEventListener(
                "@@webxr-polyfill/vr-present-start",
                this[c].onPresentationStart
              ),
              this[c].device.removeEventListener(
                "@@webxr-polyfill/vr-present-end",
                this[c].onPresentationEnd
              ),
              this[c].device.removeEventListener(
                "@@webxr-polyfill/input-select-start",
                this[c].onSelectStart
              ),
              this[c].device.removeEventListener(
                "@@webxr-polyfill/input-select-end",
                this[c].onSelectEnd
              ),
              this.dispatchEvent("end", new ee("end", { session: this }))),
            this[c].stopDeviceFrameLoop(),
            this[c].device.endSession(this[c].id)
          );
      }
      updateRenderState(e) {
        if (this[c].ended) {
          let r =
            "Can't call updateRenderState on an XRSession that has already ended.";
          throw new Error(r);
        }
        if (e.baseLayer && e.baseLayer._session !== this) {
          let r =
            "Called updateRenderState with a base layer that was created by a different session.";
          throw new Error(r);
        }
        if (
          e.inlineVerticalFieldOfView !== null &&
          e.inlineVerticalFieldOfView !== void 0
        )
          if (this[c].immersive) {
            let r =
              "inlineVerticalFieldOfView must not be set for an XRRenderState passed to updateRenderState for an immersive session.";
            throw new Error(r);
          } else
            e.inlineVerticalFieldOfView = Math.min(
              3.13,
              Math.max(0.01, e.inlineVerticalFieldOfView)
            );
        if (this[c].pendingRenderState === null) {
          let r = this[c].activeRenderState;
          this[c].pendingRenderState = {
            depthNear: r.depthNear,
            depthFar: r.depthFar,
            inlineVerticalFieldOfView: r.inlineVerticalFieldOfView,
            baseLayer: r.baseLayer,
          };
        }
        Object.assign(this[c].pendingRenderState, e);
      }
      _checkInputSourcesChange() {
        let e = [],
          t = [],
          r = this.inputSources,
          n = this[c].currentInputSources;
        for (let s of r) n.includes(s) || e.push(s);
        for (let s of n) r.includes(s) || t.push(s);
        (e.length > 0 || t.length > 0) &&
          this.dispatchEvent(
            "inputsourceschange",
            new ce("inputsourceschange", {
              session: this,
              added: e,
              removed: t,
            })
          ),
          (this[c].currentInputSources.length = 0);
        for (let s of r) this[c].currentInputSources.push(s);
      }
    };
  var xe = Symbol("@@webxr-polyfill/XRInputSource"),
    Ae = class {
      constructor(e) {
        this[xe] = {
          impl: e,
          gripSpace: new V("grip", this),
          targetRaySpace: new V("target-ray", this),
        };
      }
      get handedness() {
        return this[xe].impl.handedness;
      }
      get targetRayMode() {
        return this[xe].impl.targetRayMode;
      }
      get gripSpace() {
        let e = this[xe].impl.targetRayMode;
        return e === "gaze" || e === "screen" ? null : this[xe].gripSpace;
      }
      get targetRaySpace() {
        return this[xe].targetRaySpace;
      }
      get profiles() {
        return this[xe].impl.profiles;
      }
      get gamepad() {
        return this[xe].impl.gamepad;
      }
    };
  var Gt = Symbol("@@webxr-polyfill/XRReferenceSpaceEvent"),
    Pe = class extends Event {
      constructor(e, t) {
        super(e, t),
          (this[Gt] = {
            referenceSpace: t.referenceSpace,
            transform: t.transform || null,
          }),
          Object.setPrototypeOf(this, Pe.prototype);
      }
      get referenceSpace() {
        return this[Gt].referenceSpace;
      }
      get transform() {
        return this[Gt].transform;
      }
    };
  var Mt = {
    XRSystem: G,
    XRSession: U,
    XRSessionEvent: ee,
    XRFrame: ge,
    XRView: Te,
    XRViewport: be,
    XRViewerPose: Re,
    XRWebGLLayer: nt,
    XRSpace: V,
    XRReferenceSpace: ne,
    XRReferenceSpaceEvent: Pe,
    XRInputSource: Ae,
    XRInputSourceEvent: le,
    XRInputSourcesChangeEvent: ce,
    XRRenderState: _e,
    XRRigidTransform: Q,
    XRPose: Ee,
  };
  var Ut = (i) =>
      typeof i.prototype.makeXRCompatible == "function"
        ? !1
        : ((i.prototype.makeXRCompatible = function () {
            return (this[it] = !0), Promise.resolve();
          }),
          !0),
    Wt = (i) => {
      let e = i.prototype.getContext;
      i.prototype.getContext = function (t, r) {
        let n = e.call(this, t, r);
        return (
          n &&
            ((n[vt] = !0),
            r && "xrCompatible" in r && (n[it] = r.xrCompatible)),
          n
        );
      };
    };
  var Ir = async function (i, e) {};
  var Ri = {
      global: mt,
      webvr: !0,
      cardboard: !0,
      cardboardConfig: null,
      allowCardboardOnDesktop: !1,
    },
    St = ["navigator", "HTMLCanvasElement", "WebGLRenderingContext"],
    He = class {
      constructor(e = {}) {
        (this.config = Object.freeze(Object.assign({}, Ri, e))),
          (this.global = this.config.global),
          (this.nativeWebXR = "xr" in this.global.navigator),
          (this.injected = !1),
          this.nativeWebXR
            ? this._injectCompatibilityShims(this.global)
            : this._injectPolyfill(this.global);
      }
      _injectPolyfill(e) {
        if (!St.every((t) => !!e[t]))
          throw new Error(`Global must have the following attributes : ${St}`);
        for (let t of Object.keys(Mt))
          e[t] !== void 0
            ? console.warn(`${t} already defined on global.`)
            : (e[t] = Mt[t]);
        Ut(e.WebGLRenderingContext) &&
          (Wt(e.HTMLCanvasElement),
          e.OffscreenCanvas && Wt(e.OffscreenCanvas),
          e.WebGL2RenderingContext && Ut(e.WebGL2RenderingContext),
          window.isSecureContext ||
            console.warn(`WebXR Polyfill Warning:
This page is not running in a secure context (https:// or localhost)!
This means that although the page may be able to use the WebXR Polyfill it will
not be able to use native WebXR implementations, and as such will not be able to
access dedicated VR or AR hardware, and will not be able to take advantage of
any performance improvements a native WebXR implementation may offer. Please
host this content on a secure origin for the best user experience.
`)),
          (this.injected = !0),
          this._patchNavigatorXR();
      }
      _patchNavigatorXR() {
        let e = Ir(this.global, this.config);
        (this.xr = new Mt.XRSystem(e)),
          Object.defineProperty(this.global.navigator, "xr", {
            value: this.xr,
            configurable: !0,
          });
      }
      _injectCompatibilityShims(e) {
        if (!St.every((t) => !!e[t]))
          throw new Error(`Global must have the following attributes : ${St}`);
        if (
          e.navigator.xr &&
          "supportsSession" in e.navigator.xr &&
          !("isSessionSupported" in e.navigator.xr)
        ) {
          let t = e.navigator.xr.supportsSession;
          (e.navigator.xr.isSessionSupported = function (r) {
            return t
              .call(this, r)
              .then(() => !0)
              .catch(() => !1);
          }),
            (e.navigator.xr.supportsSession = function (r) {
              return (
                console.warn(
                  "navigator.xr.supportsSession() is deprecated. Please call navigator.xr.isSessionSupported() instead and check the boolean value returned when the promise resolves."
                ),
                t.call(this, r)
              );
            });
        }
      }
    };
  var C = class extends Y {
    constructor(e, t = null, r = 0) {
      super(),
        (this._uid = t || C._generateUID()),
        (this._transform = Xe(e)),
        (this._timestamp = r),
        (this._poseChanged = !0),
        (this._deleted = !1),
        (this._placeholder = !1),
        (this._anchorSpace = new V("anchor")),
        (this._anchorSpace._baseMatrix = Xe(e)),
        (this._anchorSpace.baseMatrix = Xe(e));
      let n = b();
      j(n, e),
        (this._anchorSpace._inverseBaseMatrix = Xe(n)),
        (this._anchorSpace.inverseBaseMatrix = Xe(n));
    }
    get deleted() {
      return this._deleted;
    }
    set deleted(e) {
      this._deleted = e;
    }
    get placeholder() {
      return this._placeholder;
    }
    set placeholder(e) {
      this._placeholder = e;
    }
    isMesh() {
      return !1;
    }
    get timeStamp() {
      return this._timestamp;
    }
    get changed() {
      return this._poseChanged;
    }
    clearChanged() {
      this._poseChanged = !1;
    }
    get modelMatrix() {
      return this._transform;
    }
    updateModelMatrix(e, t) {
      if (((this._timestamp = t), !this._deleted && !mr(this._transform, e))) {
        this._poseChanged = !0;
        for (var r = 0; r < 16; r++) this._transform[r] = e[r];
        try {
          this.dispatchEvent("update", { source: this });
        } catch (n) {
          console.error("XRAnchor update event error", n);
        }
      }
    }
    notifyOfRemoval() {
      try {
        this.dispatchEvent("remove", { source: this });
      } catch (e) {
        console.error("XRAnchor removed event error", e);
      }
    }
    get position() {
      return ae(new Float32Array(3), this._poseMatrix);
    }
    get orientation() {
      return oe(new Float32Array(4), this._poseMatrix);
    }
    get anchorSpace() {
      return this._anchorSpace;
    }
    get uid() {
      return this._uid;
    }
    static _generateUID() {
      return (
        "anchor-" +
        new Date().getTime() +
        "-" +
        Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
      );
    }
    delete() {
      window.VLaunch.webXR._arKitWrapper.removeAnchor(this);
    }
  };
  var we = class extends C {
    constructor(e, t = null) {
      super(t, null),
        (this._anchor = e),
        (this._timestamp = e.timeStamp),
        (this._tempArray = new Float32Array(16)),
        (this._offsetMatrix = b()),
        t && k(this._offsetMatrix, t),
        D(this._transform, e.modelMatrix, this._offsetMatrix),
        (this._handleAnchorUpdateListener =
          this._handleAnchorUpdate.bind(this)),
        (this._notifyOfRemovalListener = this.notifyOfRemoval.bind(this)),
        (this._handleReplaceAnchorListener =
          this._handleReplaceAnchor.bind(this)),
        e.addEventListener("update", this._handleAnchorUpdateListener),
        e.addEventListener("removal", this._notifyOfRemovalListener),
        e.addEventListener("replaceAnchor", this._handleReplaceAnchorListener);
    }
    _handleReplaceAnchor(e) {
      this._anchor.removeEventListener(
        "update",
        this._handleAnchorUpdateListener
      ),
        this._anchor.removeEventListener(
          "removal",
          this._notifyOfRemovalListener
        ),
        this._anchor.removeEventListener(
          "replaceAnchor",
          this._handleReplaceAnchorListener
        ),
        (this._anchor = e),
        this._anchor.addEventListener(
          "update",
          this._handleAnchorUpdateListener
        ),
        this._anchor.addEventListener("removal", this._notifyOfRemovalListener),
        this._anchor.addEventListener(
          "replaceAnchor",
          this._handleReplaceAnchorListener
        );
    }
    _handleAnchorUpdate() {
      D(this._tempArray, this._anchor.modelMatrix, this._offsetMatrix),
        this.updateModelMatrix(
          this._tempArray,
          Math.max(this._anchor.timeStamp, this._timestamp)
        );
    }
    get modelMatrix() {
      return this._transform;
    }
    clearChanged() {
      super.clearChanged();
    }
    get anchor() {
      return this._anchor;
    }
    get offsetMatrix() {
      return this._offsetMatrix;
    }
    set offsetMatrix(e) {
      k(this._offsetMatrix, e), this._handleAnchorUpdate();
    }
  };
  var Ht = !1,
    z = class extends C {
      static setUseGeomArrays() {
        Ht = !0;
      }
      static useGeomArrays() {
        return Ht;
      }
      constructor(e, t, r = null, n = 0) {
        super(e, r, n),
          (this._useGeomArrays = Ht),
          (this._vertexCountChanged = !0),
          (this._vertexPositionsChanged = !0),
          (this._triangleIndicesChanged = !0),
          (this._textureCoordinatesChanged = !0),
          (this._vertexPositions = []),
          (this._triangleIndices = []),
          (this._textureCoordinates = []),
          (this._vertexNormalsChanged = !0),
          (this._vertexNormals = []),
          t && ((this._geometry = t), this._updateGeometry(this._geometry));
      }
      isMesh() {
        return !0;
      }
      get changed() {
        return (
          super.changed ||
          this._vertexPositionsChanged ||
          this._vertexNormalsChanged ||
          this._triangleIndicesChanged ||
          this._vertexCountChanged
        );
      }
      clearChanged() {
        super.clearChanged(),
          (this._vertexPositionsChanged = !1),
          (this._vertexNormalsChanged = !1),
          (this._triangleIndicesChanged = !1),
          (this._vertexCountChanged = !1);
      }
      get vertexCountChanged() {
        return this._vertexCountChanged;
      }
      get vertexPositionsChanged() {
        return this._vertexPositionsChanged;
      }
      get triangleIndicesChanged() {
        this._triangleIndicesChanged;
      }
      get textureCoordinatesChanged() {
        this._textureCoordinatesChanged;
      }
      get vertexNormalsChanged() {
        this._vertexNormalsChanged;
      }
      get vertexPositions() {
        return this._vertexPositions;
      }
      get vertexNormals() {
        return this._vertexNormals;
      }
      get triangleIndices() {
        return this._triangleIndices;
      }
      get textureCoordinates() {
        return this._textureCoordinates;
      }
      get vertexCount() {
        return this._vertexPositions.length;
      }
      get triangleCount() {
        return this._triangleIndices.length;
      }
      get hasNormals() {
        return this._vertexNormals.length > 0;
      }
      get hasTextureCoordinates() {
        return this._textureCoordinates.length > 0;
      }
      _updateGeometry(e) {
        this._geometry = e;
        let t = e;
        if (t.vertexCount == 0) {
          this._vertexPositions.length > 0 &&
            ((this._vertexPositionsChanged = !0),
            (this._vertexNormalsChanged = !0),
            (this._triangleIndicesChanged = !0),
            (this._textureCoordinatesChanged = !0),
            (this._vertexPositions = []),
            (this._vertexNormals = []),
            (this.triangleIndices = []),
            (this._textureCoordinates = []));
          return;
        }
        if (typeof t.vertexCount > "u") {
          console.warn(
            "bad geometry data passed to XRMesh._updateGeometry: no vertex count",
            t
          );
          return;
        }
        let r = 0;
        if (this._vertexPositions.length != t.vertexCount * 3) {
          if (typeof t.vertices > "u") {
            console.warn(
              "bad geometry data passed to XRMesh._updateGeometry: no vertices",
              t
            );
            return;
          }
          (this._vertexCountChanged = !0),
            (this._vertexPositionsChanged = !0),
            (this._vertexPositions = new Float32Array(t.vertexCount * 3)),
            t.textureCoordinates &&
              ((this._textureCoordinatesChanged = !0),
              (this._textureCoordinates = new Float32Array(t.vertexCount * 2)));
        } else if (this._useGeomArrays)
          (this._vertexPositionsChanged =
            typeof t.vertices < "u" &&
            !z.arrayFuzzyEquals(this._vertexPositions, t.vertices)),
            (this._textureCoordinatesChanged =
              typeof t.textureCoordinates < "u" &&
              !z.arrayFuzzyEquals(
                this._textureCoordinates,
                t.textureCoordinates
              ));
        else {
          if (((this._vertexPositionsChanged = !1), t.vertices)) {
            r = 0;
            for (var n = 0, s = t.vertexCount; n < s; n++)
              if (
                Math.abs(this._vertexPositions[r++] - t.vertices[n].x) > 1e-6 ||
                Math.abs(this._vertexPositions[r++] - t.vertices[n].y) > 1e-6 ||
                Math.abs(this._vertexPositions[r++] - t.vertices[n].z) > 1e-6
              ) {
                this._vertexPositionsChanged = !0;
                break;
              }
          }
          if (((this._textureCoordinatesChanged = !1), t.textureCoordinates)) {
            r = 0;
            for (var n = 0, s = t.vertexCount; n < s; n++)
              if (
                Math.abs(
                  this._textureCoordinates[r++] - t.textureCoordinates[n].x
                ) > 1e-6 ||
                Math.abs(
                  this._textureCoordinates[r++] - t.textureCoordinates[n].x
                ) > 1e-6
              ) {
                this._textureCoordinatesChanged = !0;
                break;
              }
          }
        }
        if (
          (t.triangleCount
            ? this._triangleIndices.length != t.triangleCount * 3
              ? ((this._triangleIndicesChanged = !0),
                (this._triangleIndices =
                  z.arrayMax(t.triangleIndices) > 65535
                    ? new Uint32Array(t.triangleCount * 3)
                    : new Uint32Array(t.triangleCount * 3)))
              : (this._triangleIndicesChanged =
                  t.triangleIndicies &&
                  !z.arrayEquals(this._triangleIndices, t.triangleIndices))
            : (this._triangleIndicesChanged = !1),
          this._vertexPositionsChanged)
        )
          if (this._useGeomArrays) this._vertexPositions.set(t.vertices);
          else {
            r = 0;
            for (let a of t.vertices)
              (this._vertexPositions[r++] = a.x),
                (this._vertexPositions[r++] = a.y),
                (this._vertexPositions[r++] = a.z);
          }
        if (this._textureCoordinatesChanged)
          if (((r = 0), this._useGeomArrays))
            this._textureCoordinates.set(t.textureCoordinates);
          else
            for (let a of t.textureCoordinates)
              (this._textureCoordinates[r++] = a.x),
                (this._textureCoordinates[r++] = a.y);
        this._triangleIndicesChanged &&
          this._triangleIndices.set(t.triangleIndices);
      }
      static arrayMax(e) {
        if (e.length === 0) return -1 / 0;
        for (var t = e[0], r = 1, n = e.length; r < n; ++r)
          e[r] > t && (t = e[r]);
        return t;
      }
      static arrayEquals(e, t) {
        if (!e || !t || e.length != t.length) return !1;
        for (var r = 0, n = e.length; r < n; r++) if (e[r] != t[r]) return !1;
        return !0;
      }
      static arrayFuzzyEquals(e, t) {
        if (!e || !t || e.length != t.length) return !1;
        for (var r = 0, n = e.length; r < n; r++)
          if (Math.abs(e[r] - t[r]) > 1e-6) return !1;
        return !0;
      }
    };
  var Oe = class extends z {
      constructor(e, t, r, n = null, s = 0) {
        super(e, t, n, s),
          (this._blendShapes = {}),
          (this._blendShapesChanged = !0),
          this._updateBlendShapes(r);
      }
      get changed() {
        return super.changed || this._blendShapesChanged;
      }
      clearChanged() {
        super.clearChanged(), (this._blendShapesChanged = !1);
      }
      _updateBlendShapes(e) {
        for (let n = 0; n < Ar.length; n++) {
          let s = Ar[n];
          var t = this._blendShapes[s],
            r = e[n];
          Math.abs(t - r) > 1e-6 &&
            ((this._blendShapesChanged = !0), (this._blendShapes[s] = r));
        }
      }
      updateFaceData(e, t, r, n) {
        super.updateModelMatrix(e, n),
          typeof t.vertexCount > "u" &&
            (t.vertexCount = t.vertices.length / (z.useGeomArrays() ? 3 : 1)),
          this._updateGeometry(t),
          this._updateBlendShapes(r);
      }
      get blendShapes() {
        return this._blendShapes;
      }
    },
    Ar = [
      "browDownLeft",
      "browDownRight",
      "browInnerUp",
      "browOuterUpLeft",
      "browOuterUpRight",
      "cheekPuff",
      "cheekSquintLeft",
      "cheekSquintRight",
      "eyeBlinkLeft",
      "eyeBlinkRight",
      "eyeLookDownLeft",
      "eyeLookDownRight",
      "eyeLookInLeft",
      "eyeLookInRight",
      "eyeLookOutLeft",
      "eyeLookOutRight",
      "eyeLookUpLeft",
      "eyeLookUpRight",
      "eyeSquintLeft",
      "eyeSquintRight",
      "eyeWideLeft",
      "eyeWideRight",
      "jawForward",
      "jawLeft",
      "jawOpen",
      "jawRight",
      "mouthClose",
      "mouthDimpleLeft",
      "mouthDimpleRight",
      "mouthFrownLeft",
      "mouthFrownRight",
      "mouthFunnel",
      "mouthLeft",
      "mouthLowerDownLeft",
      "mouthLowerDownRight",
      "mouthPressLeft",
      "mouthPressRight",
      "mouthPucker",
      "mouthRight",
      "mouthRollLower",
      "mouthRollUpper",
      "mouthShrugLower",
      "mouthShrugUpper",
      "mouthSmileLeft",
      "mouthSmileRight",
      "mouthStretchLeft",
      "mouthStretchRight",
      "mouthUpperUpLeft",
      "mouthUpperUpRight",
      "noseSneerLeft",
      "noseSneerRight",
    ];
  var at = Symbol("@@webxr-polyfill/XRHitTestResult"),
    ve = class {
      constructor(e, t) {
        let r = new XRRigidTransform(new Float32Array(t.world_transform));
        this[at] = { frame: e, transform: r, hit: t };
      }
      getPose(e) {
        let t = new V();
        return (
          (t._baseMatrix = k(b(), this[at].transform.matrix)),
          this[at].frame.getPose(t, e)
        );
      }
      get _frame() {
        return this[at].frame;
      }
      get _hit() {
        return this[at].hit;
      }
      createAnchor() {
        return window.VLaunch.webXR._arKitWrapper.createAnchorFromHit(this);
      }
    };
  var te = Symbol("@@webxr-polyfill/XRRay"),
    Le = class {
      constructor(e, t) {
        let r = { x: 0, y: 0, z: 0, w: 1 },
          n = { x: 0, y: 0, z: -1, w: 0 };
        if (e && e instanceof Q) {
          let o = e.matrix,
            l = _t(Ue(), r.x, r.y, r.z, r.w),
            h = _t(Ue(), n.x, n.y, n.z, n.w);
          $e(l, l, o),
            $e(h, h, o),
            (r.x = l[0]),
            (r.y = l[1]),
            (r.z = l[2]),
            (r.w = l[3]),
            (_directionVec4.x = h[0]),
            (_directionVec4.y = h[1]),
            (_directionVec4.z = h[2]),
            (_directionVec4.w = h[3]);
        } else
          e && ((r.x = e.x), (r.y = e.y), (r.z = e.z), (r.w = e.w)),
            t && ((n.x = t.x), (n.y = t.y), (n.z = t.z), (n.w = t.w));
        let s = Math.sqrt(n.x * n.x + n.y * n.y + n.z * n.z) || 1;
        (n.x = n.x / s),
          (n.y = n.y / s),
          (n.z = n.z / s),
          (this[te] = {
            origin: new DOMPointReadOnly(r.x, r.y, r.z, r.w),
            direction: new DOMPointReadOnly(n.x, n.y, n.z, n.w),
            matrix: null,
          });
      }
      get origin() {
        return this[te].origin;
      }
      get direction() {
        return this[te].direction;
      }
      get matrix() {
        if (this[te].matrix) return this[te].matrix;
        let e = Ze(A(), 0, 0, -1),
          t = Ze(A(), this[te].origin.x, this[te].origin.y, this[te].origin.z),
          r = Ze(
            A(),
            this[te].direction.x,
            this[te].direction.y,
            this[te].direction.z
          ),
          n = Ge(A(), r, e),
          s = ye(r, e),
          a = b();
        s > -1 && s < 1
          ? It(a, Math.acos(s), n)
          : s === -1 && It(a, Math.acos(s), Ze(A(), 1, 0, 0));
        let o = pr(b(), t),
          l = D(b(), o, a);
        return (this[te].matrix = l), l;
      }
    };
  var qe = Symbol("@@webxr-polyfill/XRHitTestSource"),
    Ne = class {
      constructor(e, t) {
        if (!t.space) throw new Error("XRHitTestSource requires space.");
        if (t.space._specialType !== "viewer")
          throw new Error(
            "XRHitTestSource supports only viewer space for now."
          );
        if (t.entityTypes) {
          for (let r of t.entityTypes)
            if (r !== "plane")
              throw new Error(
                "XRHitTestSource does not support entityType" + r + " yet."
              );
        }
        if (
          t.offsetRay &&
          (t.offsetRay.origin.x !== 0 ||
            t.offsetRay.origin.y !== 0 ||
            t.offsetRay.origin.z !== 0 ||
            t.offsetRay.origin.w !== 1)
        )
          throw new Error("XRHitTestSource supports offsetRay.origin yet.");
        this[qe] = {
          session: e,
          space: t.space,
          offsetRay: t.offsetRay || new Le(),
          active: !0,
        };
      }
      cancel() {
        this[qe].active = !1;
      }
      get _space() {
        return this[qe].space;
      }
      get _session() {
        return this[qe].session;
      }
      get _offsetRay() {
        return this[qe].offsetRay;
      }
      get _active() {
        return this[qe].active;
      }
    };
  var qt = Symbol("@@webxr-polyfill/XRTransientInputHitTestResult"),
    Ce = class {
      constructor(e, t, r) {
        this[qt] = { frame: e, inputSource: r, results: t };
      }
      get inputSource() {
        return this[qt].inputSource;
      }
      get results() {
        return this[qt].results;
      }
      createAnchor() {
        return window.VLaunch.webXR._arKitWrapper.createAnchorFromHit(this);
      }
    };
  var Ye = Symbol("@@webxr-polyfill/XRTransientInputHitTestSource"),
    Fe = class {
      constructor(e, t) {
        if (t.entityTypes && t.entityTypes.length > 0)
          throw new Error(
            "XRTransientInputHitTestSource does not support entityTypes option yet."
          );
        this[Ye] = {
          session: e,
          profile: t.profile,
          offsetRay: t.offsetRay || new XRRay(),
          active: !0,
        };
      }
      cancel() {
        this[Ye].active = !1;
      }
      get _profile() {
        return this[Ye].profile;
      }
      get _session() {
        return this[Ye].session;
      }
      get _offsetRay() {
        return this[Ye].offsetRay;
      }
      get _active() {
        return this[Ye].active;
      }
    };
  var ke = class extends C {};
  var Pr = Symbol("@@webxr-polyfill/XRLightProbe"),
    De = class {
      constructor(e = {}) {
        this[Pr] = { indirectIrradiance: e.indirectIrradiance };
      }
      get indirectIrradiance() {
        return this[Pr].indirectIrradiance;
      }
      get primaryLightDirection() {
        throw new Error("Not implemented");
      }
      get primaryLightIntensity() {
        throw new Error("Not implemented");
      }
      get sphericalHarmonicsCoefficients() {
        throw new Error("Not implemented");
      }
      get sphericalHarmonicsOrientation() {
        throw new Error("Not implemented");
      }
    };
  var Ve = class extends z {
    constructor(e, t, r, n, s, a = null, o = 0) {
      super(e, null, a, o),
        (this._center = t),
        (this._extent = r),
        (this._alignment = n),
        (this._planeFeatureChanged = !0),
        (this._yAxis = gt(0, 1, 0, 0)),
        (this._normal = Ue()),
        (this._boundaryVerticesChanged = !0),
        (this._boundaryVertices = []),
        (this._geometry = s),
        this._updateGeometry(this._geometry);
    }
    get changed() {
      return super.changed || this._planeFeatureChanged;
    }
    clearChanged() {
      super.clearChanged(), (this._planeFeatureChanged = !1);
    }
    updatePlaneData(e, t, r, n, s, a) {
      super.updateModelMatrix(e, a),
        (!Nt(this._center, t) || !Nt(this._extent, r) || this._alignment) &&
          ((this._center = t),
          (this._extent = r),
          (this._alignment = n),
          (this._planeFeatureChanged = !0)),
        this._updateGeometry(s);
    }
    get center() {
      return this._center;
    }
    get extent() {
      return this._extent;
    }
    get alignment() {
      return this._alignment;
    }
    get boundaryVertices() {
      return this._boundaryVertices;
    }
    get boundaryVerticesChanged() {
      return this._boundaryVerticesChanged;
    }
    get boundaryVertexCount() {
      return this._boundaryVertices.length;
    }
    _updateGeometry(e) {
      super._updateGeometry(e);
      let t = e,
        r = $e(this._normal, this._yAxis, this._transform),
        n = r[0],
        s = r[1],
        a = r[2],
        o = 0;
      if (this._boundaryVertices.length != t.boundaryVertexCount * 3)
        (this._boundaryVerticesChanged = !0),
          (this._boundaryVertices = new Float32Array(t.vertexCount * 3)),
          (this._vertexNormalsChanged = !0),
          (this._vertexNormals = new Float32Array(t.vertexCount * 3));
      else if (
        ((this._vertexNormalsChanged =
          Math.abs(this._vertexNormals[0] - n) > 1e-6 ||
          Math.abs(this._vertexNormals[1] - s) > 1e-6 ||
          Math.abs(this._vertexNormals[2] - a) > 1e-6),
        this._useGeomArrays)
      )
        this._vertexPositionsChanged = !z.arrayFuzzyEquals(
          this._boundaryVertices,
          t.boundaryVertices
        );
      else {
        (this._boundaryVerticesChanged = !1), (o = 0);
        for (var l = 0, h = t.vertexCount; l < h; l++)
          if (
            Math.abs(this._boundaryVertices[o++] - t.boundaryVertices[l].x) >
              1e-6 ||
            Math.abs(this._boundaryVertices[o++] - t.boundaryVertices[l].y) >
              1e-6 ||
            Math.abs(this._boundaryVertices[o++] - t.boundaryVertices[l].z) >
              1e-6
          ) {
            this._boundaryVerticesChanged = !0;
            break;
          }
      }
      if (this._boundaryVerticesChanged)
        if (this._useGeomArrays) this._boundaryVertices.set(t.boundaryVertices);
        else {
          o = 0;
          for (let p of t.boundaryVertices)
            (this._boundaryVertices[o++] = p.x),
              (this._boundaryVertices[o++] = p.y),
              (this._boundaryVertices[o++] = p.z);
        }
      if (this._vertexNormalsChanged) {
        o = 0;
        for (var l = 0; l < t.vertexCount; l++)
          (this._vertexNormals[o++] = n),
            (this._vertexNormals[o++] = s),
            (this._vertexNormals[o++] = a);
      }
    }
  };
  var he = class {
    static decodeLength(e) {
      return (e.length / 4) * 3;
    }
    static decodeArrayBuffer(e, t) {
      var r = (e.length / 4) * 3;
      return (
        (!t || t.byteLength != r) && (t = new ArrayBuffer(r)),
        this.decode(e, t),
        t
      );
    }
    static removePaddingChars(e) {
      var t = this._keyStr.indexOf(e.charAt(e.length - 1));
      return t == 64 ? e.substring(0, e.length - 1) : e;
    }
    static decode(e, t) {
      (e = this.removePaddingChars(e)), (e = this.removePaddingChars(e));
      var r = parseInt((e.length / 4) * 3, 10),
        n,
        s,
        a,
        o,
        l,
        h,
        p,
        f,
        m = 0,
        _ = 0;
      for (
        t ? (n = new Uint8Array(t)) : (n = new Uint8Array(r)),
          e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""),
          m = 0;
        m < r;
        m += 3
      )
        (l = this._keyStr.indexOf(e.charAt(_++))),
          (h = this._keyStr.indexOf(e.charAt(_++))),
          (p = this._keyStr.indexOf(e.charAt(_++))),
          (f = this._keyStr.indexOf(e.charAt(_++))),
          (s = (l << 2) | (h >> 4)),
          (a = ((h & 15) << 4) | (p >> 2)),
          (o = ((p & 3) << 6) | f),
          (n[m] = s),
          p != 64 && (n[m + 1] = a),
          f != 64 && (n[m + 2] = o);
      return n;
    }
    static encode(e) {
      var t = "",
        r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        n = e;
      e instanceof ArrayBuffer
        ? (n = new Uint8Array(arrayBuffer))
        : e instanceof ImageData && (n = e.data);
      for (
        var s = e.length, a = s % 3, o = s - a, l, h, p, f, m, _ = 0;
        _ < o;
        _ = _ + 3
      )
        (m = (n[_] << 16) | (n[_ + 1] << 8) | n[_ + 2]),
          (l = (m & 16515072) >> 18),
          (h = (m & 258048) >> 12),
          (p = (m & 4032) >> 6),
          (f = m & 63),
          (t += r[l] + r[h] + r[p] + r[f]);
      return (
        a == 1
          ? ((m = n[o]),
            (l = (m & 252) >> 2),
            (h = (m & 3) << 4),
            (t += r[l] + r[h] + "=="))
          : a == 2 &&
            ((m = (n[o] << 8) | n[o + 1]),
            (l = (m & 64512) >> 10),
            (h = (m & 1008) >> 4),
            (p = (m & 15) << 2),
            (t += r[l] + r[h] + r[p] + "=")),
        t
      );
    }
  };
  he._keyStr =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var se = [],
    S = class {
      constructor(e, t, r, n) {
        this._buffers = e;
        for (var s = 0; s < e.length; s++)
          if (
            ((e[s]._buffer = e[s].buffer),
            (e[s].buffer = null),
            !e[s]._abCache && typeof e[s]._buffer == "string")
          ) {
            for (
              var a = he.decodeLength(e[s]._buffer), o = 0;
              o < se.length;
              o++
            )
              if (se[o].byteLength == a) {
                (e[s]._abCache = se[o]), se.splice(o, 1);
                break;
              }
          } else if (!e[s]._abCache && e[s]._buffer instanceof ImageData) {
            for (
              var l = e[s]._buffer.data, a = l.length, o = 0;
              o < se.length;
              o++
            )
              if (se[o].byteLength == a) {
                (e[s]._abCache = se[o]), se.splice(o, 1);
                break;
              }
            var h = e[s]._abCache ? e[s]._abCache : new ArrayBuffer(a);
            e[s]._abCache = null;
            for (var p = new Uint8Array(h), f = 0; f < a; f++) p[f] = l[f];
            e[s]._buffer = h;
          }
        (this._pixelFormat = t), (this._timestamp = r), (this._camera = n);
      }
      static createFromMessage(e) {
        return new this(
          e.data.buffers,
          e.data.pixelFormat,
          e.data.timestamp,
          e.data.camera
        );
      }
      numBuffers() {
        this._buffers.length;
      }
      buffer(e) {
        if (e >= 0 && e < this._buffers.length) {
          var t = this._buffers[e];
          return (
            t.buffer ||
              (typeof t._buffer == "string"
                ? ((t._buffer = he.decodeArrayBuffer(t._buffer, t._abCache)),
                  (t._abCache = null),
                  (t.buffer = new Uint8Array(t._buffer)))
                : t._buffer instanceof ArrayBuffer
                ? (t.buffer = new Uint8Array(t._buffer))
                : t._buffer instanceof ImageData &&
                  (t.buffer = ImageData.data)),
            t
          );
        }
        return null;
      }
      get pixelFormat() {
        return this._pixelFormat;
      }
      get timestamp() {
        return this._timestamp;
      }
      get camera() {
        return this._camera;
      }
      release() {
        for (var e = this._buffers, t = 0; t < e.length; t++)
          e[t]._buffer instanceof ArrayBuffer &&
            e[t]._buffer.byteLength > 0 &&
            se.push(e[t]._buffer),
            e[t]._abCache instanceof ArrayBuffer &&
              e[t]._abCache.byteLength > 0 &&
              se.push(e[t]._abCache);
      }
      postMessageToWorker(e, t) {
        var r = Object.assign({}, t || {});
        (r.buffers = this._buffers),
          (r.timestamp = this._timestamp),
          (r.pixelFormat = this._pixelFormat),
          (r.camera = this._camera);
        for (var n = [], s = 0; s < r.buffers.length; s++)
          (r.buffers[s].buffer = r.buffers[s]._buffer),
            (r.buffers[s]._buffer instanceof ArrayBuffer ||
              r.buffers[s]._buffer instanceof ImageData) &&
              n.push(r.buffers[s]._buffer),
            (r.buffers[s]._buffer = null),
            r.buffers[s]._abCache instanceof ArrayBuffer &&
              n.push(r.buffers[s]._abCache);
        e.postMessage(r, n);
      }
      postReplyMessage(e) {
        var t = Object.assign({}, e);
        (t.buffers = this._buffers),
          (t.timestamp = this._timestamp),
          (t.pixelFormat = this._pixelFormat),
          (t.camera = this._camera);
        for (var r = [], n = 0; n < t.buffers.length; n++)
          (t.buffers[n].buffer = null),
            (t.buffers[n]._buffer instanceof ArrayBuffer ||
              t.buffers[n]._buffer instanceof ImageData) &&
              (r.push(t.buffers[n]._buffer),
              (t.buffers[n].buffer = t.buffers[n]._buffer)),
            (t.buffers[n]._buffer = null),
            t.buffers[n]._abCache instanceof ArrayBuffer &&
              r.push(t.buffers[n]._abCache);
        postMessage(t, r);
      }
    };
  S.IMAGEFORMAT_RGBA32 = "RGBA32";
  S.IMAGEFORMAT_BGRA32 = "BGRA32";
  S.IMAGEFORMAT_RGB24 = "RGB24";
  S.IMAGEFORMAT_BGR24 = "BGR24";
  S.IMAGEFORMAT_GRAY8 = "GRAY8";
  S.IMAGEFORMAT_YUV444P = "YUV444P";
  S.IMAGEFORMAT_YUV422P = "YUV422P";
  S.IMAGEFORMAT_YUV420P = "YUV420P";
  S.IMAGEFORMAT_YUV420SP_NV12 = "YUV420SP_NV12";
  S.IMAGEFORMAT_YUV420SP_NV21 = "YUV420SP_NV21";
  S.IMAGEFORMAT_HSV = "HSV";
  S.IMAGEFORMAT_Lab = "Lab";
  S.IMAGEFORMAT_DEPTH = "DEPTH";
  S.IMAGEFORMAT_NULL = "";
  S.IMAGEFORMAT = [
    S.IMAGEFORMAT_RGBA32,
    S.IMAGEFORMAT_BGRA32,
    S.IMAGEFORMAT_RGB24,
    S.IMAGEFORMAT_BGR24,
    S.IMAGEFORMAT_GRAY8,
    S.IMAGEFORMAT_YUV444P,
    S.IMAGEFORMAT_YUV422P,
    S.IMAGEFORMAT_YUV420P,
    S.IMAGEFORMAT_YUV420SP_NV12,
    S.IMAGEFORMAT_YUV420SP_NV21,
    S.IMAGEFORMAT_HSV,
    S.IMAGEFORMAT_Lab,
    S.IMAGEFORMAT_DEPTH,
    S.IMAGEFORMAT_NULL,
  ];
  var de = class {
    type = "screen";
    constructor(e) {
      (this.type = e), (window.XRDOMOverlayState = de);
    }
  };
  var Yt = {
    XRAnchor: C,
    XRAnchorOffset: we,
    XRFaceMesh: Oe,
    XRHitTestResult: ve,
    XRHitTestSource: Ne,
    XRTransientInputHitTestResult: Ce,
    XRTransientInputHitTestSource: Fe,
    XRImageAnchor: ke,
    XRLightProbe: De,
    XRMesh: z,
    XRPlaneMesh: Ve,
    XRRay: Le,
    XRVideoFrame: S,
    XRDOMOverlayState: de,
  };
  var ot = class extends Y {
    constructor(e) {
      super(),
        (this.global = e),
        (this.onWindowResize = this.onWindowResize.bind(this)),
        this.global.window.addEventListener("resize", this.onWindowResize),
        (this.environmentBlendMode = "opaque");
    }
    onBaseLayerSet(e, t) {
      throw new Error("Not implemented");
    }
    isSessionSupported(e) {
      throw new Error("Not implemented");
    }
    isFeatureSupported(e) {
      throw new Error("Not implemented");
    }
    async requestSession(e, t) {
      throw new Error("Not implemented");
    }
    requestAnimationFrame(e) {
      throw new Error("Not implemented");
    }
    onFrameStart(e) {
      throw new Error("Not implemented");
    }
    onFrameEnd(e) {
      throw new Error("Not implemented");
    }
    doesSessionSupportReferenceSpace(e, t) {
      throw new Error("Not implemented");
    }
    requestStageBounds() {
      throw new Error("Not implemented");
    }
    async requestFrameOfReferenceTransform(e, t) {}
    cancelAnimationFrame(e) {
      throw new Error("Not implemented");
    }
    endSession(e) {
      throw new Error("Not implemented");
    }
    getViewport(e, t, r, n) {
      throw new Error("Not implemented");
    }
    getProjectionMatrix(e) {
      throw new Error("Not implemented");
    }
    getBasePoseMatrix() {
      throw new Error("Not implemented");
    }
    getBaseViewMatrix(e) {
      throw new Error("Not implemented");
    }
    getInputSources() {
      throw new Error("Not implemented");
    }
    getInputPose(e, t, r) {
      throw new Error("Not implemented");
    }
    onWindowResize() {
      this.onWindowResize();
    }
  };
  var jt = function (i, e, t = !0, r = !0) {
      var n,
        s,
        a,
        o,
        l = 0,
        h = function () {
          (l = t === !1 ? 0 : Date.now()),
            (n = null),
            (o = i.apply(s, a)),
            n || (s = a = null);
        },
        p = function () {
          var f = Date.now();
          !l && t === !1 && (l = f);
          var m = e - (f - l);
          return (
            (s = this),
            (a = arguments),
            m <= 0 || m > e
              ? (n && (clearTimeout(n), (n = null)),
                (l = f),
                (o = i.apply(s, a)),
                n || (s = a = null))
              : !n && r !== !1 && (n = setTimeout(h, m)),
            o
          );
        };
      return (
        (p.cancel = function () {
          clearTimeout(n), (l = 0), (n = s = a = null);
        }),
        p
      );
    },
    Pa = jt(function (...i) {
      console.log(...i);
    }, 1e3);
  function Kt(i, e) {
    if (typeof OffscreenCanvas < "u") return new OffscreenCanvas(i, e);
    {
      let t = document.createElement("canvas");
      return (t.width = i), (t.height = e), (t.style.display = "none"), t;
    }
  }
  async function Or(i, e, t, r, n) {
    if (e instanceof ImageBitmap) {
      console.warn(
        "Launch: Session start speed and memory usage can be improved by sending ImageData instead of ImageBitmaps for tracked images on iOS."
      );
      let a = new Kt(e.width, e.height).getContext("2d");
      a.drawImage(e, 0, 0), (e = a.getImageData(0, 0, e.width, e.height).data);
    }
    return new Promise((s, a) => {
      this._createDetectionImage(i, e, t, r, n)
        .then((o) => {
          if (o.error) {
            a(o.error);
            return;
          }
          if (!o.created) {
            a(null);
            return;
          }
          s({ uid: i, width: t, height: r, widthInMeters: n });
        })
        .catch((...o) => {
          console.error("could not create image", ...o), a();
        });
    });
  }
  function Lr(i, e, t, r, n) {
    return this._sendMessage("createImageAnchor", {
      uid: i,
      buffer: he.encode(e),
      imageWidth: t,
      imageHeight: r,
      physicalWidth: n,
      anchor: null,
    });
  }
  async function Nr(i) {
    return (
      this.setNumberOfTrackedImages(i.length),
      (this._trackedImages = await Promise.all(
        i.map(
          (e) => (
            (e.uid = crypto.randomUUID()),
            this.createDetectionImage(
              e.uid,
              e.image,
              e.image.width,
              e.image.height,
              e.widthInMeters
            )
          )
        )
      )),
      this._trackedImages.forEach((e) => {
        this.activateDetectionImage(e.uid, !0);
      }),
      this._trackedImages
    );
  }
  function Cr(i) {
    return new Promise((e, t) => {
      this._destroyDetectionImage(i)
        .then((r) => {
          if (r.error) {
            t(r.error);
            return;
          }
          e();
        })
        .catch((...r) => {
          console.error("could not destroy image", ...r), t();
        });
    });
  }
  function Fr(i) {
    return this._sendMessage("destroyImageAnchor", { uid: i });
  }
  function kr(i, e = !1) {
    return new Promise((t, r) => {
      let n = this._anchors.get(i);
      if (n && !n.deleted) {
        t(n);
        return;
      }
      this._activateDetectionImage(i, e)
        .then((s) => {
          if (
            (window.VLaunch.log(s), s.error && (r(s.error), r()), !s.activated)
          ) {
            r(null);
            return;
          }
          this._createOrUpdateAnchorObject(s.imageAnchor),
            (s.imageAnchor.object.deleted = !1);
          let a = this._trackedImages.find((o) => o.uid === s.imageAnchor.uuid);
          (a.imageAnchor = s.imageAnchor),
            (a.score = "trackable"),
            t(s.imageAnchor.object);
        })
        .catch((...s) => {
          console.error("could not activate image", ...s), r();
        });
    });
  }
  function Dr(i, e = !1) {
    return this._sendMessage("activateDetectionImage", {
      uid: i,
      trackable: e,
    });
  }
  function Vr(i) {
    return new Promise((e, t) => {
      this._deactivateDetectionImage(i)
        .then((r) => {
          r.error && t(r.error);
          let n = this._anchors.get(i);
          n &&
            (console.warn(
              "anchor for image target '" +
                i +
                "' still exists after deactivation"
            ),
            this.removeAnchor(n)),
            e();
        })
        .catch((...r) => {
          console.error("could not activate image", ...r), t();
        });
    });
  }
  function zr(i) {
    return this._sendMessage("deactivateDetectionImage", { uid: i });
  }
  function Xr(i) {
    this._sendMessage(
      "setNumberOfTrackedImages",
      { numberOfTrackedImages: typeof i == "number" ? i : 0 },
      !0,
      !1
    );
  }
  function Et(i = null) {
    let e = this;
    i && (e = i);
    let t = e._trackedImages.map((r) => r.score);
    return Promise.resolve(t);
  }
  function Rt(i) {
    return this._trackedImages.map(
      (e, t) => (
        (e.trackingState = "emulated"),
        e.imageSpace ||
          ((e.imageSpace = new V()),
          i && i._baseMatrix
            ? (e.imageSpace._baseMatrix = i._baseMatrix)
            : (e.imageSpace._baseMatrix = new Float32Array([
                1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
              ]))),
        e.imageAnchor &&
          e.imageAnchor.object._poseChanged &&
          ((e.trackingState = "tracked"),
          (e.imageSpace._baseMatrix = e.imageAnchor.object._transform)),
        e.imageSpace._ensurePoseUpdated(),
        {
          index: t,
          trackingState: e.trackingState,
          imageSpace: e.imageSpace,
          uid: e.uid,
          transform: e.transform,
          width: e.width,
          height: e.height,
          measuredWidthInMeters: 0,
        }
      )
    );
  }
  var d = class extends Y {
    constructor() {
      if (
        (super(),
        (this.setNumberOfTrackedImages = Xr.bind(this)),
        (this._deactivateDetectionImage = zr.bind(this)),
        (this.deactivateDetectionImage = Vr.bind(this)),
        (this._activateDetectionImage = Dr.bind(this)),
        (this.activateDetectionImage = kr.bind(this)),
        (this._destroyDetectionImage = Fr.bind(this)),
        (this.destroyDetectionImage = Cr.bind(this)),
        (this._createDetectionImages = Nr.bind(this)),
        (this._createDetectionImage = Lr.bind(this)),
        (this.createDetectionImage = Or.bind(this)),
        (this.getImageTrackingResults = Rt.bind(this)),
        (this.getTrackedImageScores = Et),
        d.HasARKit() === !1 &&
          console.error("ARKit not found. Variant Launch will not work."),
        typeof d.GLOBAL_INSTANCE < "u")
      )
        throw new Error(
          "ARKitWrapper is a singleton. Use ARKitWrapper.GetOrCreate() to get the global instance."
        );
      (this._timestamp = 0),
        (this._lightProbe = null),
        (this._deviceId = null),
        (this._isWatching = !1),
        (this._waitingForSessionStart = !1),
        (this._isInitialized = !1),
        (this._rawARData = null),
        (this._rAF_callbacks = []),
        (this._rAF_currentCallbacks = []),
        (this._frameHandle = 1),
        (this._requestedPermissions = { cameraAccess: !1, worldAccess: !1 }),
        (this._currentPermissions = { cameraAccess: !1, worldAccess: !1 }),
        (this._worldSensingState = { meshDetectionState: !1 }),
        (this._worldInformation = null),
        (this._projectionMatrix = new Float32Array(16)),
        (this._viewMatrix = new Float32Array(16)),
        (this._cameraTransform = new Float32Array(16)),
        (this._anchors = new Map()),
        (this._timeOffsets = []),
        (this._timeOffset = 0),
        (this._timeOffsetComputed = !1),
        (this._dataBeforeNext = 0),
        (this._worldMappingStatus = d.WEB_AR_WORLDMAPPING_NOT_AVAILABLE),
        (this._defaultOptions = {
          location: !0,
          camera: !0,
          objects: !0,
          light_intensity: !0,
          computer_vision_data: !0,
        });
      let e = {
        arkitStartRecording: d.RECORD_START_EVENT,
        arkitStopRecording: d.RECORD_STOP_EVENT,
        arkitDidMoveBackground: d.DID_MOVE_BACKGROUND_EVENT,
        arkitWillEnterForeground: d.WILL_ENTER_FOREGROUND_EVENT,
        arkitInterrupted: d.INTERRUPTED_EVENT,
        arkitInterruptionEnded: d.INTERRUPTION_ENDED_EVENT,
        arkitShowDebug: d.SHOW_DEBUG_EVENT,
        arkitWindowResize: d.WINDOW_RESIZE_EVENT,
        onError: d.ON_ERROR,
        arTrackingChanged: d.AR_TRACKING_CHANGED,
        onComputerVisionData: d.COMPUTER_VISION_DATA,
      };
      for (let t in e)
        window[t] = (r) => {
          r = r || null;
          try {
            this.dispatchEvent(
              e[t],
              new CustomEvent(e[t], { source: this, detail: r })
            );
          } catch (n) {
            console.error(t + " callback error", n);
          }
        };
      (window.onComputerVisionData = (t) => {
        this._onComputerVisionData(t);
      }),
        (window.setNativeTime = (t) => {
          this._timeOffsets.push((performance || Date).now() - t.nativeTime),
            (this._timeOffsetComputed = !0),
            (this._timeOffset = 0);
          for (let r = 0; r < this._timeOffsets.length; r++)
            this._timeOffset += this._timeOffsets[r];
          this._timeOffset = this._timeOffset / this._timeOffsets.length;
        }),
        (window.userGrantedComputerVisionData = (t) => {
          this._sessionCameraAccess |= t.granted;
        }),
        (window.userGrantedWorldSensingData = (t) => {
          this._sessionWorldAccess |= t.granted;
        }),
        (window.userStoppedAR = (t) => {
          this._handleStopped();
          try {
            this.dispatchEvent(
              d.USER_STOPPED_AR,
              new CustomEvent(d.USER_STOPPED_AR, {})
            );
          } catch (r) {
            console.error("USER_STOPPED_AR event error", r);
          }
        });
    }
    static GetOrCreate(e = null) {
      if (typeof d.GLOBAL_INSTANCE > "u") {
        let t = new d();
        (d.GLOBAL_INSTANCE = t), (e = e && typeof e == "object" ? e : {});
        let r = {
            browser: !0,
            points: !0,
            focus: !1,
            rec: !0,
            rec_time: !0,
            mic: !1,
            build: !1,
            plane: !0,
            warnings: !0,
            anchors: !1,
            debug: !0,
            statistics: !1,
          },
          n = typeof e.ui == "object" ? e.ui : {};
        (e.ui = Object.assign(r, n)),
          (e.geometry_arrays = !0),
          z.setUseGeomArrays(),
          t._initAR(e).then((s) => {
            (t._deviceId = s), (t._isInitialized = !0);
            try {
              t.dispatchEvent(
                d.INIT_EVENT,
                new CustomEvent(d.INIT_EVENT, { source: t })
              );
            } catch (a) {
              console.error("INIT_EVENT event error", a);
            }
          });
      }
      return d.GLOBAL_INSTANCE;
    }
    static HasARKit() {
      return typeof window.webkit < "u";
    }
    get deviceId() {
      return this._deviceId;
    }
    get hasSession() {
      return this._isWatching;
    }
    get isInitialized() {
      return this._isInitialized;
    }
    _sendMessage(e, t = {}, r = !0, n = !0) {
      return new Promise((s, a) => {
        if (r && !this._isInitialized) {
          a(new Error("ARKit is not initialized"));
          return;
        }
        let o = {};
        if (n) {
          let l =
            "arkitCallback_" +
            e +
            "_" +
            new Date().getTime() +
            "_" +
            Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
          (window[l] = (h) => {
            delete window[l], s(h);
          }),
            (o.callback = l);
        }
        window.webkit && window.webkit.messageHandlers
          ? window.webkit.messageHandlers[e].postMessage(
              Object.assign({}, t, o)
            )
          : console.warn(
              "window.webkit.messageHandlers is not available. Please contact support and report your device model and OS version."
            ),
          n || s();
      });
    }
    _initAR(e) {
      return this._sendMessage("initAR", { options: e }, !1);
    }
    _requestSession(e, t) {
      return this._sendMessage("requestSession", {
        options: e,
        data_callback: t,
      });
    }
    _hitTest(e, t, r) {
      return this._sendMessage("hitTest", { x: e, y: t, type: r });
    }
    _addAnchor(e, t) {
      return this._sendMessage("addAnchor", { uuid: e, transform: t });
    }
    _removeAnchors(e) {
      return new Promise((t) => {
        window.webkit.messageHandlers.removeAnchors.postMessage(e), t();
      });
    }
    _getWorldMap() {
      return this._sendMessage("getWorldMap");
    }
    _setWorldMap(e) {
      return this._sendMessage("setWorldMap", { worldMap: e.worldMap });
    }
    _stop() {
      return this._sendMessage("stopAR");
    }
    _setUIOptions(e) {
      return this._sendMessage("setUIOptions", e, !0, !1);
    }
    _onUpdate() {
      return window.webkit.messageHandlers.onUpdate.postMessage({});
    }
    _requestComputerVisionData() {
      return this._sendMessage("requestComputerVisionData", {}, !0, !1);
    }
    _startSendingComputerVisionData() {
      return this._sendMessage("startSendingComputerVisionData", {}, !0, !1);
    }
    _stopSendingComputerVisionData() {
      return this._sendMessage("stopSendingComputerVisionData", {}, !0, !1);
    }
    _onData(e) {
      if (
        ((this._rawARData = e),
        (this._worldInformation = null),
        (this._timestamp = this._adjustARKitTime(e.timestamp)),
        (this._lightProbe = new De({
          indirectIrradiance: e.light_intensity / 1e3,
        })),
        k(this._cameraTransform, e.camera_transform),
        k(this._viewMatrix, e.camera_view),
        k(this._projectionMatrix, e.projection_camera),
        (this._worldMappingStatus = e.worldMappingStatus),
        e.newObjects.length)
      )
        for (let t = 0; t < e.newObjects.length; t++) {
          let r = e.newObjects[t],
            n = this._anchors.get(r.uuid);
          n && n.deleted && (n.deleted = !1),
            this._createOrUpdateAnchorObject(r);
        }
      if (e.removedObjects.length)
        for (let t = 0; t < e.removedObjects.length; t++) {
          let r = e.removedObjects[t],
            n = this._anchors.get(r);
          n && (n.notifyOfRemoval(), this._anchors.delete(r));
        }
      if (e.objects.length)
        for (let t = 0; t < e.objects.length; t++) {
          let r = e.objects[t];
          this._createOrUpdateAnchorObject(r);
        }
      try {
        this.dispatchEvent(
          d.WATCH_EVENT,
          new CustomEvent(d.WATCH_EVENT, { source: this, detail: this })
        );
      } catch (t) {
        console.error("WATCH_EVENT event error", t);
      }
      this._rAF_callbacks.length > 0 && this._do_rAF(), this._dataBeforeNext++;
    }
    _onComputerVisionData(e) {
      if (!e) {
        console.error("detail passed to _onComputerVisionData is null"),
          this._requestComputerVisionData();
        return;
      }
      if (!e.frame || !e.frame.buffers || e.frame.buffers.length <= 0) {
        console.error(
          "detail passed to _onComputerVisionData is bad, no buffers"
        ),
          this._requestComputerVisionData();
        return;
      }
      e.camera.arCamera = !0;
      let t = e.camera.interfaceOrientation;
      switch (((e.camera.viewMatrix = e.camera.inverse_viewMatrix), t)) {
        case 1:
          e.camera.cameraOrientation = -90;
          break;
        case 2:
          e.camera.cameraOrientation = 90;
          break;
        case 3:
          e.camera.cameraOrientation = 0;
          break;
        case 4:
          e.camera.cameraOrientation = 180;
          break;
      }
      switch (e.frame.pixelFormatType) {
        case "kCVPixelFormatType_420YpCbCr8BiPlanarFullRange":
          e.frame.pixelFormat = "YUV420P";
          break;
        default:
          e.frame.pixelFormat = e.frame.pixelFormatType;
          break;
      }
      let r = new S(
        e.frame.buffers,
        e.frame.pixelFormat,
        this._adjustARKitTime(e.frame.timestamp),
        e.camera
      );
      try {
        this.dispatchEvent(
          d.COMPUTER_VISION_DATA,
          new CustomEvent(d.COMPUTER_VISION_DATA, { source: this, detail: r })
        );
      } catch (n) {
        console.error("COMPUTER_VISION_DATA event error", n);
      }
    }
    _do_rAF() {
      let e = this._rAF_callbacks;
      return (
        (this._rAF_currentCallbacks = this._rAF_currentCallbacks.concat(
          this._rAF_callbacks
        )),
        (this._rAF_callbacks = []),
        window.requestAnimationFrame((...t) => {
          this.startingRender();
          for (let r = 0; r < e.length; r++) {
            let n = this._rAF_currentCallbacks,
              s = n.findIndex((a) => a && a.handle === e[r].handle);
            s > -1 && n.splice(s, 1);
            try {
              !e[r].cancelled &&
                typeof e[r].callback == "function" &&
                e[r].callback(...e[r].params);
            } catch (a) {
              console.error(a);
            }
          }
          this.finishedRender();
        })
      );
    }
    _createOrUpdateAnchorObject(e) {
      if (e.plane_center) {
        let t = this._anchors.get(e.uuid);
        if (!t || t.placeholder) {
          let r = new Ve(
            e.transform,
            e.plane_center,
            [e.plane_extent.x, e.plane_extent.z],
            e.plane_alignment,
            e.geometry,
            e.uuid,
            this._timestamp
          );
          if (t) {
            try {
              t.dispatchEvent(
                "replaceAnchor",
                new CustomEvent("replaceAnchor", { source: t, detail: r })
              );
            } catch (n) {
              console.error("replaceAnchor event error", n);
            }
            window.VLaunch.log(
              "replace dummy anchor created from hittest with plane"
            ),
              this._anchors.delete(e.uuid);
          }
          this._anchors.set(e.uuid, r), (e.object = r);
        } else
          t &&
            (t.updatePlaneData(
              e.transform,
              e.plane_center,
              [e.plane_extent.x, e.plane_extent.y],
              e.plane_alignment,
              e.geometry,
              this._timestamp
            ),
            (e.object = t));
      } else {
        let t = this._anchors.get(e.uuid);
        if (!t || t.placeholder) {
          let r;
          switch (e.type) {
            case d.ANCHOR_TYPE_FACE:
              r = new Oe(
                e.transform,
                e.geometry,
                e.blendShapes,
                e.uuid,
                this._timestamp
              );
              break;
            case d.ANCHOR_TYPE_ANCHOR:
              r = new C(e.transform, e.uuid, this._timestamp);
              break;
            case d.ANCHOR_TYPE_IMAGE:
              r = new ke(e.transform, e.uuid, this._timestamp);
              break;
          }
          if (t) {
            try {
              t.dispatchEvent(
                "replaceAnchor",
                new CustomEvent("replaceAnchor", {
                  source: t || mesh,
                  detail: r,
                })
              );
            } catch (n) {
              console.error("replaceAnchor event error", n);
            }
            window.VLaunch.log(
              "replaced dummy anchor created from hit test with new anchor"
            );
          }
          this._anchors.set(e.uuid, r), (e.object = r);
        } else {
          switch (e.type) {
            case d.ANCHOR_TYPE_FACE:
              t.updateFaceData(
                e.transform,
                e.geometry,
                e.blendShapes,
                this._timestamp
              );
              break;
            default:
              t.updateModelMatrix(e.transform, this._timestamp);
              break;
          }
          e.object = t;
        }
      }
    }
    _adjustARKitTime(e) {
      return this._timeOffsetComputed
        ? e + this._timeOffset
        : (performance || Date).now();
    }
    get hasData() {
      return this._rawARData !== null;
    }
    getData(e = null) {
      return e
        ? this._rawARData && typeof this._rawARData[e] < "u"
          ? this._rawARData[e]
          : null
        : this._rawARData;
    }
    waitForInit() {
      return new Promise((e, t) => {
        if (this._isInitialized) {
          e();
          return;
        }
        let r = () => {
          this.removeEventListener(d.INIT_EVENT, r, !1), e();
        };
        this.addEventListener(d.INIT_EVENT, r, !1);
      });
    }
    pickBestHit(e) {
      if (e.length === 0) return null;
      let t = e.filter((s) => s.type != d.HIT_TEST_TYPE_FEATURE_POINT),
        r = t.filter(
          (s) => s.type == d.HIT_TEST_TYPE_EXISTING_PLANE_USING_EXTENT
        ),
        n = t.filter((s) => s.type == d.HIT_TEST_TYPE_EXISTING_PLANE);
      return r.length
        ? ((r = r.sort((s, a) => s.distance - a.distance)), r[0])
        : n.length
        ? ((n = n.sort((s, a) => s.distance - a.distance)), n[0])
        : t.length
        ? ((t = t.sort((s, a) => s.distance - a.distance)), t[0])
        : e[0];
    }
    createAnchorFromHit(e) {
      return new Promise((t, r) => {
        let n = e._hit;
        if (n.anchor_transform) {
          let s = this._anchors.get(n.uuid);
          s
            ? s.placeholder &&
              s.updateModelMatrix(n.anchor_transform, this._timestamp)
            : ((s = new C(n.anchor_transform, n.uuid, this._timestamp)),
              window.VLaunch.log("created dummy anchor from hittest"),
              (s.placeholder = !0),
              this._anchors.set(n.uuid, s));
          let a = new we(s, n.local_transform);
          t(a);
        } else {
          let s = this._anchors.get(n.uuid);
          s
            ? ((s.placeholder = !1),
              (s.deleted = !1),
              window.VLaunch.log(
                "hittest was a hit on an existing anchor, without offset"
              ))
            : ((s = new C(n.world_transform, n.uuid)),
              window.VLaunch.log(
                "created dummy anchor (not plane) from hittest"
              ),
              (s.placeholder = !0),
              this._anchors.set(n.uuid, s)),
            t(s);
        }
      });
    }
    requestAnimationFrame(e, ...t) {
      let r = ++this._frameHandle;
      return (
        this._rAF_callbacks.push({
          handle: r,
          callback: e,
          params: t,
          cancelled: !1,
        }),
        (!this._isWatching || this._dataBeforeNext > 0) && this._do_rAF(),
        r
      );
    }
    cancelAnimationFrame(e) {
      let t = this._rAF_callbacks,
        r = t.findIndex((n) => n && n.handle === e);
      r > -1 && ((t[r].cancelled = !0), t.splice(r, 1)),
        (t = this._rAF_currentCallbacks),
        t &&
          ((r = t.findIndex((n) => n && n.handle === e)),
          r > -1 && (t[r].cancelled = !0));
    }
    startingRender() {
      this._dataBeforeNext > 1;
    }
    finishedRender() {
      (this._dataBeforeNext = 0),
        this._anchors.forEach((e) => {
          e.clearChanged();
        }),
        this._onUpdate();
    }
    watch(e = null) {
      return new Promise((t, r) => {
        if (!this._isInitialized) {
          r("ARKitWrapper hasn't been initialized yet");
          return;
        }
        if (this._waitingForSessionStart) {
          r("ARKitWrapper startSession called, waiting to finish");
          return;
        }
        if (this._isWatching) {
          t({
            cameraAccess: this._sessionCameraAccess,
            worldAccess: this._sessionWorldAccess,
            webXRAccess: !0,
          });
          return;
        }
        this._waitingForSessionStart = !0;
        let n = Object.assign({}, this._defaultOptions);
        e !== null && (n = Object.assign(n, e)),
          (this._requestedPermissions.cameraAccess = n.videoFrames),
          (this._requestedPermissions.worldAccess = n.worldSensing),
          n.videoFrames &&
            (delete n.videoFrames, (n.computer_vision_data = !0));
        let s = "arkitCallbackOnData";
        window[s] === void 0 &&
          (window[s] = (a) => {
            this._onData(a);
          }),
          this._requestSession(n, s).then((a) => {
            if (!a.webXRAccess) {
              r(
                new Error(
                  "user did not give permission to start a webxr session"
                )
              );
              return;
            }
            (this._waitingForSessionStart = !1),
              (this._isWatching = !0),
              (this._currentPermissions.cameraAccess = a.cameraAccess),
              (this._currentPermissions.worldAccess = a.worldAccess),
              t(a);
          });
      });
    }
    stop() {
      return new Promise((e, t) => {
        if (!this._isWatching) {
          e();
          return;
        }
        this._stop().then((r) => {
          this._handleStopped(), e(r);
        });
      });
    }
    _handleStopped() {
      (this._isWatching = !1), this._rAF_callbacks.length > 0 && this._do_rAF();
    }
    hitTest(e, t, r = d.HIT_TEST_TYPE_ALL) {
      return this._hitTest(e, t, r);
    }
    createAnchor(e) {
      return new Promise((t, r) => {
        let n = new C(e, null, this._timestamp);
        this._addAnchor(n.uid, e)
          .then((s) => {
            if (s.error) {
              r(s.error);
              return;
            }
            let a = this._anchors.get(s.uuid);
            a
              ? ((a.placeholder = !1),
                (a.deleted = !1),
                a.updateModelMatrix(s.transform, this._timestamp),
                t(a))
              : (this._anchors.set(s.uuid, n), t(n));
          })
          .catch((...s) => {
            console.error("could not create anchor", ...s), r();
          });
      });
    }
    removeAnchor(e) {
      let t = this._anchors.get(e.uid);
      if (t.placeholder) {
        this._anchors.delete(e.uid);
        return;
      }
      t && (t.deleted = !0), e instanceof we || this._removeAnchors([e.uid]);
    }
    getWorldMap() {
      return new Promise((e, t) => {
        this._getWorldMap()
          .then((r) => {
            if (r.saved === !0) e(r.worldMap);
            else if (r.error !== null) {
              t(r.error);
              return;
            } else {
              t(null);
              return;
            }
          })
          .catch((...r) => {
            console.error("could not get world map", ...r), t();
          });
      });
    }
    setWorldMap(e) {
      return this._setWorldMap(e);
    }
    getLightProbe() {
      return new Promise((e, t) => {
        this._lightProbe
          ? e(this._lightProbe)
          : t(new Error("Not populated yet"));
      });
    }
    setUIOptions(e) {
      return this._setUIOptions(e);
    }
    updateWorldSensingState(e) {
      return (
        e.hasOwnProperty("meshDetectionState") &&
        this._currentPermissions.worldAccess
          ? (this._worldSensingState.meshDetectionState =
              e.meshDetectionState.enabled || !1)
          : (this._worldSensingState.meshDetectionState = !1),
        this._worldSensingState
      );
    }
    getWorldInformation() {
      if (this._worldInformation) return this._worldInformation;
      let e = {};
      return (
        this._worldSensingState.meshDetectionState &&
          ((e.meshes = []),
          this._anchors.forEach((t) => {
            t.isMesh() && !t.deleted && !t.placeholder && e.meshes.push(t);
          })),
        (this._worldInformation = e),
        e
      );
    }
  };
  d.INIT_EVENT = "arkit-init";
  d.WATCH_EVENT = "arkit-watch";
  d.RECORD_START_EVENT = "arkit-record-start";
  d.RECORD_STOP_EVENT = "arkit-record-stop";
  d.DID_MOVE_BACKGROUND_EVENT = "arkit-did-move-background";
  d.WILL_ENTER_FOREGROUND_EVENT = "arkit-will-enter-foreground";
  d.INTERRUPTED_EVENT = "arkit-interrupted";
  d.INTERRUPTION_ENDED_EVENT = "arkit-interruption-ended";
  d.SHOW_DEBUG_EVENT = "arkit-show-debug";
  d.WINDOW_RESIZE_EVENT = "arkit-window-resize";
  d.ON_ERROR = "on-error";
  d.USER_STOPPED_AR = "user-stopped-ar";
  d.AR_TRACKING_CHANGED = "ar_tracking_changed";
  d.COMPUTER_VISION_DATA = "cv_data";
  d.USER_GRANTED_COMPUTER_VISION_DATA = "user-granted-cv-data";
  d.USER_GRANTED_WORLD_SENSING_DATA = "user-granted-world-sensing-data";
  d.ORIENTATION_UP = 1;
  d.ORIENTATION_UP_MIRRORED = 2;
  d.ORIENTATION_DOWN = 3;
  d.ORIENTATION_DOWN_MIRRORED = 4;
  d.ORIENTATION_LEFT_MIRRORED = 5;
  d.ORIENTATION_RIGHT = 6;
  d.ORIENTATION_RIGHT_MIRRORED = 7;
  d.ORIENTATION_LEFT = 8;
  d.WEB_AR_WORLDMAPPING_NOT_AVAILABLE = "ar_worldmapping_not_available";
  d.WEB_AR_WORLDMAPPING_LIMITED = "ar_worldmapping_limited";
  d.WEB_AR_WORLDMAPPING_EXTENDING = "ar_worldmapping_extending";
  d.WEB_AR_WORLDMAPPING_MAPPED = "ar_worldmapping_mapped";
  d.HIT_TEST_TYPE_FEATURE_POINT = 1;
  d.HIT_TEST_TYPE_ESTIMATED_HORIZONTAL_PLANE = 2;
  d.HIT_TEST_TYPE_ESTIMATED_VERTICAL_PLANE = 4;
  d.HIT_TEST_TYPE_EXISTING_PLANE = 8;
  d.HIT_TEST_TYPE_EXISTING_PLANE_USING_EXTENT = 16;
  d.HIT_TEST_TYPE_EXISTING_PLANE_USING_GEOMETRY = 32;
  d.HIT_TEST_TYPE_ALL =
    d.HIT_TEST_TYPE_FEATURE_POINT |
    d.HIT_TEST_TYPE_EXISTING_PLANE |
    d.HIT_TEST_TYPE_ESTIMATED_HORIZONTAL_PLANE |
    d.HIT_TEST_TYPE_EXISTING_PLANE_USING_EXTENT;
  d.HIT_TEST_TYPE_EXISTING_PLANES =
    d.HIT_TEST_TYPE_EXISTING_PLANE |
    d.HIT_TEST_TYPE_EXISTING_PLANE_USING_EXTENT;
  d.ANCHOR_TYPE_PLANE = "plane";
  d.ANCHOR_TYPE_FACE = "face";
  d.ANCHOR_TYPE_ANCHOR = "anchor";
  d.ANCHOR_TYPE_IMAGE = "image";
  var lt = class {
    constructor(e) {
      (this._subscribed = !1), (this._arKitWrapper = e), this.subscribe();
    }
    subscribe() {
      this._subscribed ||
        ((this._subscribed = !0),
        this._arKitWrapper.addEventListener(
          d.INIT_EVENT,
          this.handleARKitInit.bind(this)
        ),
        this._arKitWrapper.addEventListener(
          d.WATCH_EVENT,
          this.handleARKitUpdate.bind(this)
        ),
        this._arKitWrapper.addEventListener(
          d.WINDOW_RESIZE_EVENT,
          this.handleARKitWindowResize.bind(this)
        ),
        this._arKitWrapper.addEventListener(
          d.ON_ERROR,
          this.handleOnError.bind(this)
        ),
        this._arKitWrapper.addEventListener(
          d.AR_TRACKING_CHANGED,
          this.handleArTrackingChanged.bind(this)
        ),
        this._arKitWrapper.addEventListener(
          d.COMPUTER_VISION_DATA,
          this.handleComputerVisionData.bind(this)
        ),
        this._arKitWrapper.addEventListener(
          d.USER_STOPPED_AR,
          this.handleUserStoppedAR.bind(this)
        ));
    }
    handleARKitInit() {}
    handleARKitUpdate() {}
    handleARKitWindowResize(e) {}
    handleOnError() {}
    handleArTrackingChanged(e) {}
    handleComputerVisionData() {}
    handleUserStoppedAR() {}
  };
  var bi = {
      mapping: "",
      profiles: ["google-daydream", "generic-trigger-touchpad"],
      buttons: { length: 3, 0: null, 1: null, 2: 0 },
    },
    Ti = {
      mapping: "xr-standard",
      profiles: ["htc-vive-focus", "generic-trigger-touchpad"],
      buttons: { length: 3, 0: 1, 1: null, 2: 0 },
    },
    Ii = {
      mapping: "xr-standard",
      profiles: ["oculus-go", "generic-trigger-touchpad"],
      buttons: { length: 3, 0: 1, 1: null, 2: 0 },
      gripTransform: { orientation: [Math.PI * 0.11, 0, 0, 1] },
    },
    Br = {
      mapping: "xr-standard",
      displayProfiles: {
        "Oculus Quest": [
          "oculus-touch-v2",
          "oculus-touch",
          "generic-trigger-squeeze-thumbstick",
        ],
      },
      profiles: ["oculus-touch", "generic-trigger-squeeze-thumbstick"],
      axes: { length: 4, 0: null, 1: null, 2: 0, 3: 1 },
      buttons: { length: 7, 0: 1, 1: 2, 2: null, 3: 0, 4: 3, 5: 4, 6: null },
      gripTransform: {
        position: [0, -0.02, 0.04, 1],
        orientation: [Math.PI * 0.11, 0, 0, 1],
      },
    },
    Ai = {
      mapping: "xr-standard",
      profiles: ["htc-vive", "generic-trigger-squeeze-touchpad"],
      displayProfiles: {
        "HTC Vive": ["htc-vive", "generic-trigger-squeeze-touchpad"],
        "HTC Vive DVT": ["htc-vive", "generic-trigger-squeeze-touchpad"],
        "Valve Index": [
          "valve-index",
          "generic-trigger-squeeze-touchpad-thumbstick",
        ],
      },
      buttons: { length: 3, 0: 1, 1: 2, 2: 0 },
      gripTransform: { position: [0, 0, 0.05, 1] },
      targetRayTransform: { orientation: [Math.PI * -0.08, 0, 0, 1] },
      userAgentOverrides: { Firefox: { axes: { invert: [1, 3] } } },
    },
    Pi = {
      mapping: "xr-standard",
      profiles: ["samsung-gearvr", "generic-trigger-touchpad"],
      buttons: { length: 3, 0: 1, 1: null, 2: 0 },
      gripTransform: { orientation: [Math.PI * 0.11, 0, 0, 1] },
    },
    Oi = {
      mapping: "xr-standard",
      profiles: [
        "samsung-odyssey",
        "microsoft-mixed-reality",
        "generic-trigger-squeeze-touchpad-thumbstick",
      ],
      buttons: { length: 4, 0: 1, 1: 0, 2: 2, 3: 4 },
      gripTransform: {
        position: [0, -0.02, 0.04, 1],
        orientation: [Math.PI * 0.11, 0, 0, 1],
      },
    },
    Qt = {
      mapping: "xr-standard",
      profiles: [
        "microsoft-mixed-reality",
        "generic-trigger-squeeze-touchpad-thumbstick",
      ],
      buttons: { length: 4, 0: 1, 1: 0, 2: 2, 3: 4 },
      gripTransform: {
        position: [0, -0.02, 0.04, 1],
        orientation: [Math.PI * 0.11, 0, 0, 1],
      },
    },
    Li = {
      "Daydream Controller": bi,
      "Gear VR Controller": Pi,
      "HTC Vive Focus Controller": Ti,
      "Oculus Go Controller": Ii,
      "Oculus Touch (Right)": Br,
      "Oculus Touch (Left)": Br,
      "OpenVR Gamepad": Ai,
      "Spatial Controller (Spatial Interaction Source) 045E-065A": Qt,
      "Spatial Controller (Spatial Interaction Source) 045E-065D": Oi,
      "Windows Mixed Reality (Right)": Qt,
      "Windows Mixed Reality (Left)": Qt,
    },
    Gr = Li;
  var Ur = H(0.155, -0.465, -0.15),
    Ni = H(-0.155, -0.465, -0.15),
    Ci = H(0, 0, -0.25),
    Fi = H(0, 0, 0.05),
    Wr = H(-0.08, 0.14, 0.08),
    Hr = 0.4,
    ki = 0.4,
    Di = 0.61,
    Vi = 0.175,
    zi = 0.12,
    Xi = 0.87,
    qr = 180 / Math.PI;
  function Bi(i, e, t) {
    function r(l, h, p) {
      return l < h ? h : l > p ? p : l;
    }
    var n = e[0] * e[0],
      s = e[1] * e[1],
      a = e[2] * e[2],
      o = e[3] * e[3];
    if (t === "XYZ")
      (i[0] = Math.atan2(2 * (e[0] * e[3] - e[1] * e[2]), o - n - s + a)),
        (i[1] = Math.asin(r(2 * (e[0] * e[2] + e[1] * e[3]), -1, 1))),
        (i[2] = Math.atan2(2 * (e[2] * e[3] - e[0] * e[1]), o + n - s - a));
    else if (t === "YXZ")
      (i[0] = Math.asin(r(2 * (e[0] * e[3] - e[1] * e[2]), -1, 1))),
        (i[1] = Math.atan2(2 * (e[0] * e[2] + e[1] * e[3]), o - n - s + a)),
        (i[2] = Math.atan2(2 * (e[0] * e[1] + e[2] * e[3]), o - n + s - a));
    else if (t === "ZXY")
      (i[0] = Math.asin(r(2 * (e[0] * e[3] + e[1] * e[2]), -1, 1))),
        (i[1] = Math.atan2(2 * (e[1] * e[3] - e[2] * e[0]), o - n - s + a)),
        (i[2] = Math.atan2(2 * (e[2] * e[3] - e[0] * e[1]), o - n + s - a));
    else if (t === "ZYX")
      (i[0] = Math.atan2(2 * (e[0] * e[3] + e[2] * e[1]), o - n - s + a)),
        (i[1] = Math.asin(r(2 * (e[1] * e[3] - e[0] * e[2]), -1, 1))),
        (i[2] = Math.atan2(2 * (e[0] * e[1] + e[2] * e[3]), o + n - s - a));
    else if (t === "YZX")
      (i[0] = Math.atan2(2 * (e[0] * e[3] - e[2] * e[1]), o - n + s - a)),
        (i[1] = Math.atan2(2 * (e[1] * e[3] - e[0] * e[2]), o + n - s - a)),
        (i[2] = Math.asin(r(2 * (e[0] * e[1] + e[2] * e[3]), -1, 1)));
    else if (t === "XZY")
      (i[0] = Math.atan2(2 * (e[0] * e[3] + e[1] * e[2]), o - n + s - a)),
        (i[1] = Math.atan2(2 * (e[0] * e[2] + e[1] * e[3]), o + n - s - a)),
        (i[2] = Math.asin(r(2 * (e[2] * e[3] - e[0] * e[1]), -1, 1)));
    else {
      console.log("No order given for quaternion to euler conversion.");
      return;
    }
  }
  var ct = class {
    constructor() {
      (this.hand = "right"),
        (this.headElbowOffset = Ur),
        (this.controllerQ = K()),
        (this.lastControllerQ = K()),
        (this.headQ = K()),
        (this.headPos = A()),
        (this.elbowPos = A()),
        (this.wristPos = A()),
        (this.time = null),
        (this.lastTime = null),
        (this.rootQ = K()),
        (this.position = A());
    }
    setHandedness(e) {
      this.hand != e &&
        ((this.hand = e),
        this.hand == "left"
          ? (this.headElbowOffset = Ni)
          : (this.headElbowOffset = Ur));
    }
    update(e, t) {
      (this.time = wt()),
        e &&
          (xt(this.lastControllerQ, this.controllerQ), xt(this.controllerQ, e)),
        t && (ae(this.headPos, t), oe(this.headQ, t));
      let r = this.getHeadYawOrientation_(),
        n = this.quatAngle_(this.lastControllerQ, this.controllerQ),
        s = (this.time - this.lastTime) / 1e3;
      n / s > Di
        ? We(this.rootQ, this.rootQ, r, Math.min(n / Vi, 1))
        : xt(this.rootQ, r);
      let o = H(0, 0, -1);
      Me(o, o, this.controllerQ);
      let l = ye(o, [0, 1, 0]),
        h = this.clamp_((l - zi) / Xi, 0, 1),
        p = Dt(this.rootQ);
      kt(p, p), Ft(p, p, this.controllerQ);
      let f = this.elbowPos;
      Pt(f, this.headPos), Be(f, f, this.headElbowOffset);
      let m = At(Wr);
      Ot(m, m, h), Be(f, f, m);
      let R = this.quatAngle_(p, K()) * qr,
        x = 1 - Math.pow(R / 180, 4);
      sssss;
      let M = Hr,
        E = 1 - Hr,
        O = x * (M + E * h * ki),
        v = K();
      We(v, v, p, O);
      let u = kt(K(), v),
        w = Dt(p);
      Ft(w, w, u);
      let g = this.wristPos;
      Pt(g, Fi), Me(g, g, v), Be(g, g, Ci), Me(g, g, w), Be(g, g, f);
      let F = At(Wr);
      Ot(F, F, h),
        Be(this.position, this.wristPos, F),
        Me(this.position, this.position, this.rootQ),
        (this.lastTime = this.time);
    }
    getPosition() {
      return this.position;
    }
    getHeadYawOrientation_() {
      let e = A();
      return Bi(e, this.headQ, "YXZ"), Mr(K(), 0, e[1] * qr, 0);
    }
    clamp_(e, t, r) {
      return Math.min(Math.max(e, t), r);
    }
    quatAngle_(e, t) {
      let r = [0, 0, -1],
        n = [0, 0, -1];
      return Me(r, r, e), Me(n, n, t), gr(r, n);
    }
  };
  var X = Symbol("@@webxr-polyfill/XRRemappedGamepad"),
    Yr = { pressed: !1, touched: !1, value: 0 };
  Object.freeze(Yr);
  var Zt = class {
      constructor(e, t, r) {
        if ((r || (r = {}), r.userAgentOverrides)) {
          for (let h in r.userAgentOverrides)
            if (navigator.userAgent.includes(h)) {
              let p = r.userAgentOverrides[h];
              for (let f in p)
                f in r ? Object.assign(r[f], p[f]) : (r[f] = p[f]);
              break;
            }
        }
        let n = new Array(
            r.axes && r.axes.length ? r.axes.length : e.axes.length
          ),
          s = new Array(
            r.buttons && r.buttons.length ? r.buttons.length : e.buttons.length
          ),
          a = null;
        if (r.gripTransform) {
          let h = r.gripTransform.orientation || [0, 0, 0, 1];
          (a = b()), fe(a, Je(h, h), r.gripTransform.position || [0, 0, 0]);
        }
        let o = null;
        if (r.targetRayTransform) {
          let h = r.targetRayTransform.orientation || [0, 0, 0, 1];
          (o = b()),
            fe(o, Je(h, h), r.targetRayTransform.position || [0, 0, 0]);
        }
        let l = r.profiles;
        r.displayProfiles &&
          t.displayName in r.displayProfiles &&
          (l = r.displayProfiles[t.displayName]),
          (this[X] = {
            gamepad: e,
            map: r,
            profiles: l || [e.id],
            mapping: r.mapping || e.mapping,
            axes: n,
            buttons: s,
            gripTransform: a,
            targetRayTransform: o,
          }),
          this._update();
      }
      _update() {
        let e = this[X].gamepad,
          t = this[X].map,
          r = this[X].axes;
        for (let s = 0; s < r.length; ++s)
          t.axes && s in t.axes
            ? t.axes[s] === null
              ? (r[s] = 0)
              : (r[s] = e.axes[t.axes[s]])
            : (r[s] = e.axes[s]);
        if (t.axes && t.axes.invert)
          for (let s of t.axes.invert) s < r.length && (r[s] *= -1);
        let n = this[X].buttons;
        for (let s = 0; s < n.length; ++s)
          t.buttons && s in t.buttons
            ? t.buttons[s] === null
              ? (n[s] = Yr)
              : (n[s] = e.buttons[t.buttons[s]])
            : (n[s] = e.buttons[s]);
      }
      get id() {
        return "";
      }
      get _profiles() {
        return this[X].profiles;
      }
      get index() {
        return -1;
      }
      get connected() {
        return this[X].gamepad.connected;
      }
      get timestamp() {
        return this[X].gamepad.timestamp;
      }
      get mapping() {
        return this[X].mapping;
      }
      get axes() {
        return this[X].axes;
      }
      get buttons() {
        return this[X].buttons;
      }
      get hapticActuators() {
        return this[X].gamepad.hapticActuators;
      }
    },
    ht = class {
      constructor(e, t, r = 0, n = -1) {
        (this.polyfill = e),
          (this.display = t),
          (this.nativeGamepad = null),
          (this.gamepad = null),
          (this.inputSource = new Ae(this)),
          (this.lastPosition = A()),
          (this.emulatedPosition = !1),
          (this.basePoseMatrix = b()),
          (this.outputMatrix = b()),
          (this.primaryButtonIndex = r),
          (this.primaryActionPressed = !1),
          (this.primarySqueezeButtonIndex = n),
          (this.primarySqueezeActionPressed = !1),
          (this.handedness = ""),
          (this.targetRayMode = "screen"),
          (this.armModel = null);
      }
      get profiles() {
        return ["generic-touchscreen"];
      }
      updateFromGamepad(e) {
        this.nativeGamepad !== e &&
          ((this.nativeGamepad = e),
          e
            ? (this.gamepad = new Zt(e, this.display, Gr[e.id]))
            : (this.gamepad = null)),
          (this.handedness = e.hand === "" ? "none" : e.hand),
          this.gamepad && this.gamepad._update(),
          (this.targetRayMode = "screen"),
          (this.emulatedPosition = !1);
      }
      updateBasePoseMatrix() {
        if (this.nativeGamepad && this.nativeGamepad.pose) {
          let e = this.nativeGamepad.pose,
            t = e.position,
            r = e.orientation;
          if (!t && !r) return;
          t
            ? ((this.lastPosition[0] = t[0]),
              (this.lastPosition[1] = t[1]),
              (this.lastPosition[2] = t[2]))
            : e.hasPosition
            ? (t = this.lastPosition)
            : (this.armModel || (this.armModel = new ct()),
              this.armModel.setHandedness(this.nativeGamepad.hand),
              this.armModel.update(r, this.polyfill.getBasePoseMatrix()),
              (t = this.armModel.getPosition())),
            fe(this.basePoseMatrix, r, t);
        } else k(this.basePoseMatrix, this.polyfill.getBasePoseMatrix());
        return this.basePoseMatrix;
      }
      getXRPose(e, t) {
        switch ((this.updateBasePoseMatrix(), t)) {
          case "target-ray":
            e._transformBasePoseMatrix(this.outputMatrix, this.basePoseMatrix),
              this.gamepad &&
                this.gamepad[X].targetRayTransform &&
                D(
                  this.outputMatrix,
                  this.outputMatrix,
                  this.gamepad[X].targetRayTransform
                );
            break;
          case "grip":
            if (!this.nativeGamepad || !this.nativeGamepad.pose) return null;
            e._transformBasePoseMatrix(this.outputMatrix, this.basePoseMatrix),
              this.gamepad &&
                this.gamepad[X].gripTransform &&
                D(
                  this.outputMatrix,
                  this.outputMatrix,
                  this.gamepad[X].gripTransform
                );
            break;
          default:
            return null;
        }
        return (
          e._adjustForOriginOffset(this.outputMatrix),
          new XRPose(
            new XRRigidTransform(this.outputMatrix),
            this.emulatedPosition
          )
        );
      }
    };
  var je = class extends ot {
      constructor(e) {
        super(e),
          (this._throttledLogPose = jt(this.logPose, 1e3)),
          (this._sessions = new Map()),
          (this._activeSession = null),
          (this._frameSession = null),
          (this._hackySessionLock = !1),
          (this._trackedImages = []),
          (this.getTrackedImageScores = Et.bind(this)),
          (this.getImageTrackingResults = Rt.bind(this)),
          (this._wrapperDiv = document.createElement("div")),
          this._wrapperDiv.setAttribute("class", "arkit-device-wrapper"),
          (this._floorOffsetMatrix = b());
        let t = () => {
          document.body.insertBefore(
            this._wrapperDiv,
            document.body.firstChild || null
          );
        };
        document.body ? t() : document.addEventListener("DOMContentLoaded", t),
          (this._headModelMatrix = b()),
          (this._headModelMatrixInverse = b()),
          (this._projectionMatrix = b()),
          (this._deviceProjectionMatrix = b()),
          (this._eyeLevelMatrix = W(b())),
          (this._stageMatrix = W(b())),
          (this._stageMatrix[13] = 1.3),
          (this._identityMatrix = W(b())),
          (this._baseFrameSet = !1),
          (this._frameOfRefRequestsWaiting = []),
          (this._depthNear = 0.1),
          (this._depthFar = 1e3);
        try {
          (this._arKitWrapper = d.GetOrCreate()),
            (this._arWatcher = new $t(this._arKitWrapper, this));
        } catch (s) {
          console.error("Error initializing the ARKit wrapper", s),
            (this._arKitWrapper = null),
            (this._arWatcher = null);
        }
        (this._hitTestSources = []),
          (this._hitTestResults = new Map()),
          (this._hitTestResultsForNextFrame = new Map()),
          (this._transientHitTestSources = []),
          (this._transientHitTestResults = new Map()),
          (this._transientHitTestResultsForNextFrame = new Map()),
          (this._domOverlayRoot = null),
          (this._topMostDomElement = null),
          (this._activeXRSession = null),
          (this._gamepads = []),
          (this._gamepadInputSources = []),
          (this._touches = []);
        let r = 0;
        this._gamepads.push(Gi("", "none", 1, !1)),
          this._gamepadInputSources.push(new ht(this, {}, 0)),
          (this._gamepadInputSources[0]._active = !1),
          (this._gamepadInputSources[0].gamepad = this._gamepads[0]),
          this._touches.push({ x: 0, y: 0 });
        let n = (s, a) => {
          if (!this._domOverlayRoot) return null;
          let o = document.elementsFromPoint(s, a);
          for (let l of o) if (this._domOverlayRoot.contains(l)) return l;
          return null;
        };
        document.addEventListener("touchstart", (s) => {
          if (!s.touches || s.touches.length == 0) return;
          let a = s.touches[0],
            o = a.clientX,
            l = a.clientY;
          (this._topMostDomElement = n(o, l)),
            (this._touches[0].x = o),
            (this._touches[0].y = l);
          let h = this._gamepads[0];
          (h.axes[0] = (o / window.innerWidth) * 2 - 1),
            (h.axes[1] = (l / window.innerHeight) * 2 - 1);
          let p = this._gamepads[0].buttons[r];
          (p.pressed = !0), (p.value = 1);
        }),
          document.addEventListener("touchmove", (s) => {
            if (!s.touches || s.touches.length == 0) return;
            let a = s.touches[0],
              o = a.clientX,
              l = a.clientY,
              h = this._gamepads[0];
            (h.axes[0] = (o / window.innerWidth) * 2 - 1),
              (h.axes[1] = (l / window.innerHeight) * 2 - 1),
              (this._topMostDomElement = n(o, l)),
              (this._touches[0].x = o),
              (this._touches[0].y = l);
          }),
          document.addEventListener("touchend", (s) => {
            let a = this._touches[0].x,
              o = this._touches[0].y;
            this._topMostDomElement = n(a, o);
            let l = this._gamepads[0].buttons[r];
            (l.pressed = !1), (l.value = 0);
            let h = this._gamepads[0];
          });
      }
      static initStyles() {
        let e = () => {
          let t = document.createElement("style");
          document.head.appendChild(t);
          let r = t.sheet;
          r.insertRule(
            ".arkit-device-wrapper { z-index: -1; display: none; }",
            0
          ),
            r.insertRule(
              ".arkit-device-wrapper, .xr-canvas { background-color: transparent; position: absolute; top: 0; left: 0; bottom: 0; right: 0; }",
              0
            ),
            r.insertRule(
              ".arkit-device-wrapper, .arkit-device-wrapper canvas { width: 100%; height: 100%; padding: 0; margin: 0; -webkit-user-select: none; user-select: none; }",
              0
            );
        };
        document.body ? e() : window.addEventListener("DOMContentLoaded", e);
      }
      logPose() {
        window.VLaunch.log(
          "pose",
          ae(new Float32Array(3), this._headModelMatrix),
          oe(new Float32Array(4), this._headModelMatrix)
        );
      }
      addHitTestSource(e) {
        this._hitTestSources.includes(e) || this._hitTestSources.push(e);
      }
      addTransientHitTestSource(e) {
        this._transientHitTestSources.includes(e) ||
          this._transientHitTestSources.push(e);
      }
      _runHitTest() {
        this._hitTestResults.clear();
        let e = 0;
        for (let t = 0; t < this._hitTestSources.length; t++) {
          let r = this._hitTestSources[t];
          r._active &&
            (r._session[c].ended
              ? r.cancel()
              : ((this._hitTestSources[e++] = r),
                this._hitTestResultsForNextFrame.has(r) &&
                  this._hitTestResults.set(
                    r,
                    this._hitTestResultsForNextFrame.get(r)
                  )));
        }
        if (
          ((this._hitTestSources.length = e),
          this._hitTestResultsForNextFrame.clear(),
          !this._arKitWrapper)
        ) {
          console.error("Hit test requires ARKitWrapper.");
          return;
        }
        for (let t of this._hitTestSources) {
          let r = A();
          (r[0] = t._offsetRay.direction.x),
            (r[1] = t._offsetRay.direction.y),
            (r[2] = t._offsetRay.direction.z),
            Lt(r, r, this._arKitWrapper._projectionMatrix);
          let n = (r[0] + 1) * 0.5,
            s = (-r[1] + 1) * 0.5;
          this._arKitWrapper
            .hitTest(n, s, d.HIT_TEST_TYPE_EXISTING_PLANE_USING_GEOMETRY)
            .then((a) => {
              this._hitTestResultsForNextFrame.has(t) ||
                this._hitTestResultsForNextFrame.set(t, []);
              let o = this._hitTestResultsForNextFrame.get(t);
              for (let l of a) o.push(l);
            });
        }
      }
      _runTransientHitTest() {
        this._transientHitTestResults.clear();
        let e = 0;
        for (let t = 0; t < this._transientHitTestSources.length; t++) {
          let r = this._transientHitTestSources[t];
          r._active &&
            (r._session[c].ended
              ? r.cancel()
              : ((this._transientHitTestSources[e++] = r),
                this._transientHitTestResultsForNextFrame.has(r) &&
                  this._transientHitTestResults.set(
                    r,
                    this._transientHitTestResultsForNextFrame.get(r)
                  )));
        }
        if (
          ((this._transientHitTestSources.length = e),
          this._transientHitTestResultsForNextFrame.clear(),
          !this._arKitWrapper)
        ) {
          console.error("Transient hit test requires ARKitWrapper.");
          return;
        }
        for (let t of this._transientHitTestSources) {
          let r = A();
          (r[0] = t._offsetRay.direction.x),
            (r[1] = t._offsetRay.direction.y),
            (r[2] = t._offsetRay.direction.z),
            Lt(r, r, this._arKitWrapper._projectionMatrix);
          let n = (r[0] + 1) * 0.5,
            s = (-r[1] + 1) * 0.5;
          this._arKitWrapper
            .hitTest(n, s, d.HIT_TEST_TYPE_EXISTING_PLANE_USING_GEOMETRY)
            .then((a) => {
              this._transientHitTestResultsForNextFrame.has(t) ||
                this._transientHitTestResultsForNextFrame.set(t, []);
              let o = this._transientHitTestResultsForNextFrame.get(t);
              for (let l of a) o.push(l);
            });
        }
      }
      getHitTestResults(e) {
        return this._hitTestResults.has(e) ? this._hitTestResults.get(e) : [];
      }
      getTransientHitTestResults(e) {
        return this._transientHitTestResults.has(e)
          ? this._transientHitTestResults.get(e)
          : [];
      }
      setDomOverlayRoot(e) {
        this._domOverlayRoot = e;
      }
      setActiveXRSession(e) {
        this._activeXRSession = e;
      }
      _shouldSuppressSelectEvents() {
        if (this._topMostDomElement && this._topMostDomElement.dispatchEvent) {
          let e = new ee("beforexrselect", {
            session: this._activeXRSession,
            cancelable: !0,
          });
          if ((this._topMostDomElement.dispatchEvent(e), e.defaultPrevented))
            return !0;
        }
        return !1;
      }
      setProjectionMatrix(e) {
        k(this._deviceProjectionMatrix, e);
      }
      setBaseViewMatrix(e) {
        if (
          (k(this._headModelMatrixInverse, e),
          j(this._headModelMatrix, this._headModelMatrixInverse),
          !this._baseFrameSet)
        ) {
          this._baseFrameSet = !0;
          for (let t = 0; t < this._frameOfRefRequestsWaiting.length; t++) {
            let r = this._frameOfRefRequestsWaiting[t];
            try {
              r();
            } catch (n) {
              console.error(
                "finalization of reference frame requests failed: ",
                n
              );
            }
          }
          this._frameOfRefRequestsWaiting.length = 0;
        }
      }
      get depthNear() {
        return this._depthNear;
      }
      set depthNear(e) {
        this._depthNear = e;
      }
      get depthFar() {
        return this._depthFar;
      }
      set depthFar(e) {
        this._depthFar = e;
      }
      isSessionSupported(e) {
        return e === "immersive-ar" || e === "inline";
      }
      isFeatureSupported(e) {
        switch (e) {
          case "viewer":
            return !0;
          case "local":
            return !0;
          case "image-tracking":
            return !0;
          case "hit-test":
            return !0;
          case "dom-overlay":
            return !0;
          case "anchors":
            return !0;
          case "local-floor":
            return !0;
          case "bounded":
            return !1;
          case "unbounded":
            return !1;
          case "computer-vision-launch":
            return !0;
          case "computer-vision":
            return !1;
          case "alignEUS":
            return !0;
          default:
            return !1;
        }
      }
      doesSessionSupportReferenceSpace(e, t) {
        let r = this._sessions.get(e);
        if (r.ended || !r.enabledFeatures.has(t)) return !1;
        switch (t) {
          case "viewer":
            return !0;
          case "local":
            return !0;
          case "local-floor":
            return !0;
          case "bounded":
            return !1;
          case "unbounded":
            return !1;
          default:
            return !1;
        }
      }
      async setDetectionImages(e) {
        if (this._arKitWrapper)
          return (
            e.forEach((t) => {
              if (t.widthInMeters === void 0 || t.widthInMeters === null)
                throw new Error("trackedImages must have widthInMeters set", t);
              if (t.width < 100 || t.height < 100)
                throw new Error(
                  "trackedImages must have width/height > 100 pixels",
                  t
                );
            }),
            (this._trackedImages =
              await this._arKitWrapper._createDetectionImages(e)),
            window.VLaunch.log("setDetectionImages", this._trackedImages),
            this._trackedImages
          );
      }
      async requestSession(e, t) {
        if (!this.isSessionSupported(e))
          return console.error("Invalid session mode", e), Promise.reject();
        if (e === "inline") {
          let s = new bt(e, t);
          return this._sessions.set(s.id, s), Promise.resolve(s.id);
        }
        if (!this._arKitWrapper)
          return (
            console.error("Session requested without an ARKitWrapper"),
            Promise.reject()
          );
        if (this._activeSession !== null)
          return (
            console.error(
              "Tried to start a second session while first is running."
            ),
            Promise.reject()
          );
        let r = {};
        return (
          t.has("worldSensing") && (r.worldSensing = !0),
          t.has("camera-access-launch") &&
            ((r.videoFrames = !0), (r.worldSensing = !0)),
          t.has("computerVision") && (r.videoFrames = !0),
          t.has("alignEUS") && (r.alignEUS = !0),
          t.has("image-tracking") && (r.imageTracking = !0),
          await this._arKitWrapper
            .waitForInit()
            .then(() => {})
            .catch(
              (...s) => (
                console.error("app failed to initialize: ", ...s),
                Promise.reject()
              )
            ),
          await this._arKitWrapper
            .watch(r)
            .then(async (s) => {
              let a = new bt(e, t);
              return (
                this._sessions.set(a.id, a),
                (this._activeSession = a),
                window.VLaunch.log("session created: ", this._activeSession.id),
                this.dispatchEvent("@@webxr-polyfill/vr-present-start", a.id),
                r.imageTracking &&
                  (window.VLaunch.log(
                    "pre _createDetectionImages",
                    this._trackedImages
                  ),
                  (this._trackedImages =
                    await this._arKitWrapper._createDetectionImages(
                      this._trackedImages
                    )),
                  window.VLaunch.log(
                    "post _createDetectionImages",
                    this._trackedImages
                  )),
                Promise.resolve(a.id)
              );
            })
            .catch(
              (...s) => (
                console.error("session request failed: ", ...s),
                Promise.reject()
              )
            )
        );
      }
      onBaseLayerSet(e, t) {
        if (this._hackySessionLock == !0) return;
        let r = this._sessions.get(e),
          n = t.context.canvas,
          s = r.baseLayer;
        if (((r.baseLayer = t), !!r.immersive)) {
          if (s !== null) {
            let f = s.context.canvas;
            this._wrapperDiv.removeChild(f),
              (f.style.width = r.canvasWidth),
              (f.style.height = r.canvasHeight),
              (f.style.display = r.canvasDisplay),
              (f.style.backgroundColor = r.canvasBackground);
          }
          document.body &&
            ((r.bodyBackgroundColor = document.body.style.backgroundColor),
            (r.bodyBackgroundImage = document.body.style.backgroundImage),
            (document.body.style.backgroundColor = "transparent"),
            (document.body.style.backgroundImage = "none"));
          var a = document.body.children;
          this._hackySessionLock = !0;
          for (var o = 0; o < a.length; o++) {
            var l = a[o],
              h = !1;
            if (
              (this._domOverlayRoot &&
                this._domOverlayRoot.contains(l) &&
                (h = !0),
              l != this._wrapperDiv && l != n && l.id !== "eruda" && !h)
            ) {
              var p = l.style.display;
              (l._displayChanged = !0),
                (l._displayWas = p),
                (l.style.display = "none");
            }
          }
          (r.canvasParent = n.parentNode),
            (r.canvasNextSibling = n.nextSibling),
            (r.canvasDisplay = n.style.display),
            (n.style.display = "block"),
            (r.canvasBackground = n.style.backgroundColor),
            (n.style.backgroundColor = "transparent"),
            (r.canvasWidth = n.style.width),
            (r.canvasHeight = n.style.height),
            (n.style.width = "100%"),
            (n.style.height = "100%"),
            this._wrapperDiv.appendChild(n),
            (this._wrapperDiv.style.display = "block");
        }
      }
      userEndedSession() {
        if (this._activeSession) {
          let e = this._activeSession;
          e.immersive &&
            !e.ended &&
            (this.endSession(e.id),
            this.dispatchEvent("@@webxr-polyfill/vr-present-end", e.id));
        }
      }
      endSession(e) {
        let t = this._sessions.get(e);
        if (!(!t || t.ended)) {
          if (((t.ended = !0), t.baseLayer !== null)) {
            for (var r = document.body.children, n = 0; n < r.length; n++) {
              var s = r[n];
              s != this._wrapperDiv &&
                s._displayChanged == !0 &&
                (s._displayWas
                  ? (s.style.display = s._displayWas)
                  : s.style.removeProperty("display"),
                (s._displayWas = ""),
                (s._displayChanged = !1));
            }
            let a = t.baseLayer.context.canvas;
            this._wrapperDiv.removeChild(a),
              t.canvasNextSibling
                ? t.canvasNextSibling.before(a)
                : t.canvasParent && t.canvasParent.appendChild(a),
              (t.canvasParent = null),
              (t.canvasNextSibling = null),
              (a.style.width = t.canvasWidth),
              (a.style.height = t.canvasHeight),
              (a.style.display = t.canvasDisplay),
              (a.style.backgroundColor = t.canvasBackground),
              document.body &&
                ((document.body.style.backgroundColor = t.bodyBackgroundColor),
                (document.body.style.backgroundImage = t.bodyBackgroundImage));
          }
          (this._wrapperDiv.style.display = "none"),
            (this._activeSession = null),
            W(this._headModelMatrix),
            this._arKitWrapper.stop(),
            (this._domOverlayRoot = null),
            (this._topMostDomElement = null),
            (this._activeXRSession = null),
            (this._hackySessionLock = !1),
            (this._frameSession = null);
        }
      }
      requestAnimationFrame(e, ...t) {
        return this._arKitWrapper.requestAnimationFrame(e, t);
      }
      cancelAnimationFrame(e) {
        return this._arKitWrapper.cancelAnimationFrame(e);
      }
      onFrameStart(e, t) {
        let r = this._sessions.get(e);
        if (((this._frameSession = r), r.immersive)) {
          if (
            (k(this._projectionMatrix, this._deviceProjectionMatrix),
            r.baseLayer)
          ) {
            let n = r.baseLayer.context,
              s = n.getParameter(n.COLOR_CLEAR_VALUE),
              a = n.getParameter(n.DEPTH_CLEAR_VALUE),
              o = n.getParameter(n.STENCIL_CLEAR_VALUE);
            n.clearColor(0, 0, 0, 0),
              n.clearDepth(1, 0),
              n.clearStencil(0),
              n.clear(
                n.DEPTH_BUFFER_BIT | n.COLOR_BUFFER_BIT | n.STENCIL_BUFFER_BIT
              ),
              n.clearColor(s[0], s[1], s[2], s[3]),
              n.clearDepth(a),
              n.clearStencil(o);
          }
        } else if (r.baseLayer) {
          let n = r.baseLayer.context.canvas;
          fr(
            this._projectionMatrix,
            t.inlineVerticalFieldOfView,
            n.width / n.height,
            t.depthNear,
            t.depthFar
          );
        }
        if (r.immersive)
          for (let n = 0; n < this._gamepads.length; ++n) {
            let s = this._gamepads[n],
              a = this._gamepadInputSources[n];
            if (
              (a.updateFromGamepad(s),
              (a.targetRayMode = "screen"),
              a.primaryButtonIndex !== -1)
            ) {
              let o = s.buttons[a.primaryButtonIndex].pressed;
              o && !a.primaryActionPressed
                ? (this._gamepadInputSources[0]._active = !0)
                : !o &&
                  a.primaryActionPressed &&
                  (this._shouldSuppressSelectEvents() ||
                    this.dispatchEvent("@@webxr-polyfill/input-select-end", {
                      sessionId: r.id,
                      inputSource: a.inputSource,
                    }),
                  (this._gamepadInputSources[0]._active = !1));
            }
          }
        this._runHitTest(), this._runTransientHitTest();
      }
      onFrameEnd(e) {
        let t = this._sessions.get(e);
        if (t.immersive)
          for (let r = 0; r < this._gamepads.length; ++r) {
            let n = this._gamepads[r],
              s = this._gamepadInputSources[r];
            if (s.primaryButtonIndex !== -1) {
              let a = n.buttons[s.primaryButtonIndex].pressed;
              a &&
                !s.primaryActionPressed &&
                !this._shouldSuppressSelectEvents() &&
                this.dispatchEvent("@@webxr-polyfill/input-select-start", {
                  sessionId: t.id,
                  inputSource: s.inputSource,
                }),
                (s.primaryActionPressed = a);
            }
          }
        this._frameSession = null;
      }
      requestFrameOfReferenceTransform(e, t) {
        return new Promise((r, n) => {
          let s = (a) => {
            this._baseFrameSet ? a() : this._frameOfRefRequestsWaiting.push(a);
          };
          switch (e) {
            case "viewer":
              s(() => {
                r(this._headModelMatrix);
              });
              return;
            case "local":
              s(() => {
                r(this._eyeLevelMatrix);
              });
              return;
            case "local-floor":
              s(() => {
                r(this._stageMatrix);
              });
              return;
            case "bounded-floor":
            case "unbounded":
              n(new Error("not supported " + e));
              return;
            default:
              n(new Error("Unsupported frame of reference type " + e));
              return;
          }
        });
      }
      getViewport(e, t, r, n) {
        let { width: s, height: a } = r.context.canvas;
        return (n.x = 0), (n.y = 0), (n.width = s), (n.height = a), !0;
      }
      getProjectionMatrix(e) {
        return this._projectionMatrix;
      }
      getBasePoseMatrix() {
        return this._frameSession.immersive
          ? this._headModelMatrix
          : this._identityMatrix;
      }
      getBaseViewMatrix(e) {
        return this._frameSession.immersive
          ? this._headModelMatrix
          : this._identityMatrix;
      }
      requestStageBounds() {
        return null;
      }
      getInputSources() {
        let e = [];
        for (let t of this._gamepadInputSources)
          t._active && e.push(t.inputSource);
        return e;
      }
      getInputPose(e, t, r) {
        for (let n = 0; n < this._gamepadInputSources.length; n++) {
          let s = this._gamepadInputSources[n];
          if (s._active && s.inputSource === e) {
            let o = 2 * Math.atan(1 / this._projectionMatrix[5]) * 0.5,
              l = this._projectionMatrix[14] / (this._projectionMatrix[10] - 1),
              h = this._projectionMatrix[5] / this._projectionMatrix[0],
              p = document.documentElement.clientWidth,
              f = document.documentElement.clientHeight,
              m = this._touches[n].x,
              _ = this._touches[n].y,
              R = (m / p) * 2 - 1,
              x = -(_ / f) * 2 + 1,
              M = j(b(), this._headModelMatrix);
            t._transformBasePoseMatrix(M, M);
            let E = W(b());
            dr(E, E, -R * o * h),
              hr(E, E, x * o),
              (E[12] = R * Math.tan(o) * l * h),
              (E[13] = x * Math.tan(o) * l),
              (E[14] = -l),
              D(E, M, E);
            let v = this._gamepads[n].pose;
            k(this._floorOffsetMatrix, E),
              ae(this._floorOffsetMatrix, E),
              oe(v.orientation, E);
            let u = s.getXRPose(t, r);
            return (
              fe(u.transform.matrix, v.orientation, this._floorOffsetMatrix),
              j(u.transform.inverse.matrix, u.transform.matrix),
              u
            );
          }
        }
        return null;
      }
      onWindowResize() {
        this._sessions.forEach((e, t) => {});
      }
    },
    Gi = (i, e, t, r) => {
      let n = [];
      for (let s = 0; s < t; s++)
        n.push({ pressed: !1, touched: !1, value: 0 });
      return {
        id: i || "",
        pose: {
          hasPosition: r,
          position: new Float32Array([0, 0, 0]),
          orientation: new Float32Array([0, 0, 0, 1]),
        },
        buttons: n,
        hand: "",
        mapping: "xr-standard",
        axes: [0, 0],
        index: -1,
        connected: !0,
        profiles: ["generic-touchscreen"],
      };
    },
    Ui = 100,
    bt = class {
      constructor(e, t) {
        (this.mode = e),
          (this.enabledFeatures = t),
          (this.immersive = e == "immersive-ar"),
          (this.ended = null),
          (this.baseLayer = null),
          (this.id = ++Ui);
      }
    },
    $t = class extends lt {
      constructor(e, t) {
        super(e), (this._arKitDevice = t);
      }
      handleARKitInit() {
        window.VLaunch.log("ARKit initialized");
        let e = new CustomEvent("vlaunch-ar-status", {
          detail: { status: "started" },
        });
        dispatchEvent(e);
      }
      handleArTrackingChanged(e) {
        window.VLaunch.log("Tracking changed " + JSON.stringify(e.detail));
        let t = new CustomEvent("vlaunch-ar-tracking", { detail: e.detail });
        dispatchEvent(t);
      }
      handleARKitUpdate(e) {
        this._arKitDevice.setBaseViewMatrix(
          this._arKitWrapper._cameraTransform
        ),
          this._arKitDevice.setProjectionMatrix(
            this._arKitWrapper._projectionMatrix
          );
      }
      handleOnError(...e) {
        console.error("ARKit error", ...e);
      }
      handleUserStoppedAR() {
        this._arKitDevice.userEndedSession(),
          window.VLaunch.log("ARKit stopped");
        let e = new CustomEvent("vlaunch-ar-status", {
          detail: { status: "stopped" },
        });
        dispatchEvent(e);
      }
    };
  var dt = class {
    imageSpace = null;
    index = -1;
    trackingState = "emulated";
    measuredWidthInMeters = 0;
    constructor() {}
  };
  var jr = b(),
    Lo = b(),
    pt = class {
      _arKitWrapper = null;
      xrPolyfill = null;
      constructor() {
        if (
          ((He.prototype._patchNavigatorXR = function () {
            (this.xr = new G(Promise.resolve(new je(this.global)))),
              Object.defineProperty(this.global.navigator, "xr", {
                value: this.xr,
                configurable: !0,
              });
          }),
          (this.xrPolyfill = new He(null, { webvr: !1, cardboard: !1 })),
          this.xrPolyfill && this.xrPolyfill.injected && navigator.xr)
        ) {
          (this._arKitWrapper = d.GetOrCreate()),
            je.initStyles(),
            window.XRSystem &&
              ((G.prototype._isSessionSupported =
                G.prototype.isSessionSupported),
              (G.prototype._requestSession = G.prototype.requestSession)),
            this.installAnchorsExtension(),
            this.installHitTestingExtension(),
            this.installRealWorldGeometryExtension(),
            this.installLightingEstimationExtension(),
            this.installNonstandardExtension();
          for (let e of Object.keys(Yt))
            window[e] !== void 0
              ? console.warn(`${e} already defined on global.`)
              : (window[e] = Yt[e]);
          this.installImageTrackingExtension(),
            (G.prototype.requestSession = () => {
              console.error("Variant Launch not Initialized");
            }),
            (G.prototype.isSessionSupported = () => {
              console.error("Variant Launch not Initialized");
            });
        }
        return this;
      }
      init() {
        this.xrPolyfill &&
          this.xrPolyfill.injected &&
          navigator.xr &&
          ((G.prototype.isSessionSupported = function (e) {
            return e === "immersive-ar" || e === "inline"
              ? this._isSessionSupported(e)
              : Promise.resolve(!1);
          }),
          (G.prototype.requestSession = async function (e, t) {
            if (!(e === "immersive-ar" || e === "inline"))
              throw new DOMException(
                "Polyfill Error: only immersive-ar or inline mode is supported."
              );
            window.VLaunch.log("requestSession", e, t);
            let r = await this._requestSession(e, t);
            if (
              (e === "immersive-ar" &&
                (t.requiredFeatures &&
                t.requiredFeatures.includes("local-floor")
                  ? await r.requestReferenceSpace("local-floor")
                  : (r[c]._localSpace = await r.requestReferenceSpace(
                      "local"
                    ))),
              t && t.domOverlay && t.domOverlay.root)
            ) {
              r.domOverlayState = new de("screen");
              let n = r[c].device;
              n.setDomOverlayRoot(t.domOverlay.root), n.setActiveXRSession(r);
            }
            return (
              t &&
                t.trackedImages &&
                (await r[c].device.setDetectionImages(t.trackedImages)),
              (window.VLaunch.session = r),
              window.VLaunch.cameraVisibilityCheck(),
              window.VLaunch.log("session", r),
              r
            );
          }));
      }
      installAnchorsExtension() {
        window.XRFrame !== void 0 &&
          (Object.defineProperty(XRFrame.prototype, "trackedAnchors", {
            get: function () {
              let t = this.session[c].device._arKitWrapper._anchors;
              return new Set(t.values());
            },
            enumerable: !0,
            configurable: !0,
          }),
          (XRFrame.prototype.createAnchor = function (t, r) {
            return this.session[c].immersive
              ? this.addAnchor(t.matrix, r)
              : Promise.reject();
          }),
          (XRFrame.prototype.addAnchor = async function (t, r) {
            if (!this.session[c].immersive) return Promise.reject();
            let n = this.session[c].device;
            if ((t instanceof Q && (t = t.matrix), t instanceof Float32Array)) {
              let s = this.session[c]._localSpace;
              k(jr, this.getPose(s, r).transform.matrix);
              let a = D(b(), jr, t);
              return await n._arKitWrapper.createAnchor(a);
            } else
              return Promise.reject("invalid value passed to addAnchor " + t);
          }),
          (C.prototype.delete = function () {
            this._arKitWrapper && this._arKitWrapper.removeAnchor(this);
          }));
      }
      installHitTestingExtension() {
        window.XRSession !== void 0 &&
          ((U.prototype.requestHitTestSource = function (t = {}) {
            let r = new Ne(this, t);
            return this[c].device.addHitTestSource(r), Promise.resolve(r);
          }),
          (U.prototype.requestHitTestSourceForTransientInput = function (
            t = {}
          ) {
            let r = {
                profile: t.profile ? t.profile : "generic-touchscreen",
                offsetRay: t.offsetRay,
              },
              n = new Fe(this, r);
            return (
              this[c].device.addTransientHitTestSource(n), Promise.resolve(n)
            );
          }),
          (XRFrame.prototype.getHitTestResults = function (t) {
            let n = this.session[c].device.getHitTestResults(t),
              s = [];
            for (let a of n) s.push(new ve(this, a));
            return s;
          }),
          (XRFrame.prototype.getHitTestResultsForTransientInput = function (t) {
            let r = this.session[c].device,
              n = r._gamepadInputSources[0].inputSource,
              s = r.getTransientHitTestResults(t);
            s.sort((o, l) => o.distance - l.distance);
            let a = [];
            for (let o = 0; o < s.length; o++) {
              let l = s[o];
              a.push(new ve(this, l));
            }
            return [new Ce(this, a, n)];
          }));
      }
      installImageTrackingExtension() {
        (window.XRImageTrackingResult = dt),
          (U.prototype.getTrackedImageScores = function () {
            if (!this.session || !this.session[c])
              return (
                window.VLaunch.log(
                  "getTrackedImageScores : image tracking not initialized"
                ),
                Promise.resolve([])
              );
            let t = this.session[c].device;
            return t._arKitWrapper.getTrackedImageScores(t);
          }),
          (XRFrame.prototype.getImageTrackingResults = function () {
            if (!this.session || !this.session[c])
              return (
                window.VLaunch.log(
                  "getImageTrackingResults : image tracking not initialized"
                ),
                Promise.resolve([])
              );
            let t = this.session[c].device,
              r = this.session[c]._localSpace;
            return t.getImageTrackingResults(r);
          });
      }
      installRealWorldGeometryExtension() {
        window.XRFrame === void 0 ||
          window.XRSession === void 0 ||
          (Object.defineProperty(XRFrame.prototype, "worldInformation", {
            get: function () {
              if (!this.session[c].immersive)
                throw new Error("Not implemented");
              return this._arKitWrapper.getWorldInformation();
            },
          }),
          (U.prototype.updateWorldSensingState = function (t) {
            if (!this[c].immersive) throw new Error("Not implemented");
            return this._arKitWrapper.updateWorldSensingState(t);
          }));
      }
      installLightingEstimationExtension() {
        window.XRFrame !== void 0 &&
          ((XRFrame.prototype.getGlobalLightEstimate = function () {
            if (!this.session[c].immersive) throw new Error("Not implemented");
            return this._arKitWrapper.getLightProbe();
          }),
          (XRFrame.prototype.getGlobalReflectionProbe = function () {
            throw new Error("Not implemented");
          }));
      }
      installNonstandardExtension() {
        window.XRSession !== void 0 &&
          ((U.prototype.nonStandard_getWorldMap = function () {
            if (!this[c].immersive) throw new Error("Not implemented");
            return this._arKitWrapper.getWorldMap();
          }),
          (U.prototype.nonStandard_setWorldMap = function (t) {
            if (!this[c].immersive) throw new Error("Not implemented");
            return _arKitWrapper.setWorldMap(t);
          }),
          (U.prototype.nonStandard_getWorldMappingStatus = function () {
            if (!this[c].immersive) throw new Error("Not implemented");
            return this._arKitWrapper._worldMappingStatus;
          }));
      }
    };
  function Jt() {
    try {
      let n = function (o, l) {
          let h = window
              .getComputedStyle(o)
              .getPropertyValue("background-color"),
            p = window.getComputedStyle(o).getPropertyValue("background"),
            f = window.getComputedStyle(o).getPropertyValue("opacity"),
            m = (x) =>
              !!(
                x === "transparent" ||
                ((x.startsWith("rgba") || x.startsWith("hsla")) &&
                  parseFloat(x.slice(x.lastIndexOf(",") + 1, x.length - 1)) ===
                    0)
              ),
            R = p.split(",").some((x) => m(x));
          !m(h) &&
            !m(p) &&
            !R &&
            parseFloat(f) == 1 &&
            console.warn(
              `Variant Launch: The ${l} element is not transparent. This may block your video feed. You can ignore this message if you set transparency on session start`,
              o
            );
        },
        i = document.body,
        e = document.documentElement,
        t = document.querySelector("canvas");
      if (!t) {
        console.warn(
          "Variant Launch: No Canvas found. Skipping visibility check."
        );
        return;
      }
      let r = t.getBoundingClientRect();
      n(t, "canvas"),
        [
          { x: r.left + r.width / 2, y: r.top + r.height / 2 },
          { x: r.left + r.width * 0.1, y: r.top + r.height * 0.1 },
          { x: r.left + r.width * 0.9, y: r.top + r.height * 0.1 },
          { x: r.left + r.width * 0.1, y: r.top + r.height * 0.9 },
          { x: r.left + r.width * 0.9, y: r.top + r.height * 0.9 },
        ]
          .reduce((o, l) => {
            let h = [],
              p = document.elementsFromPoint(l.x, l.y).reverse();
            for (let f of p) {
              if (f === t) break;
              o.includes(f) || h.push(f);
            }
            return [...o, ...h];
          }, [])
          .forEach((o) => {
            n(o, o.tagName);
          });
    } catch (i) {
      console.error(i);
    }
  }
  var Wi = ((r) => (
      (r.NotAsked = "not-asked"),
      (r.Denied = "denied"),
      (r.Granted = "granted"),
      r
    ))(Wi || {}),
    Hi = ((r) => (
      (r.Unsupported = "unsupported"),
      (r.LaunchRequired = "launch-required"),
      (r.Supported = "supported"),
      r
    ))(Hi || {}),
    qi = {
      dev: { API_URL: "https://dev.launchar.app/api/v1" },
      staging: { API_URL: "https://staging.launchar.app/api/v1" },
      test: { API_URL: "https://staging.launchar.app/api/v1" },
      production: { API_URL: "https://launchar.app/api/v1" },
    },
    Tt = class {
      constructor() {
        this.initialized = !1;
        this.cameraPermission = "not-asked";
        this.webXRStatus = "unsupported";
        this.platform = "desktop";
        this.environment = "production";
        this.polyfillInstalled = !1;
        this.appleBrowser = "none";
        this.debug = !1;
        this.autoLaunchRedirect = !1;
        this.injectedKey = "PgCkcRz0dyNiU3cWrOBw3PIB7cFYnuu8";
        this.injectedEnv = "production";
        this.injectedAutoRedirect = "true";
        (this.platform = or()),
          (this.getLaunchPageData = ar),
          (this.cameraVisibilityCheck = Jt),
          window.location.search.includes("VLdebug") && (this.debug = !0),
          ze().then((e) => {
            (this.appleBrowser = e),
              this.appleBrowser === "launch-viewer" &&
                ((this.webXR = new pt()),
                this.webXR.init(),
                this.log("XR support patched"),
                (this.polyfillInstalled = !0)),
              this.injectedKey.includes("LAUNCH_SDK_KEY") ||
                this.init({
                  key: this.injectedKey,
                  env: this.injectedEnv,
                  autoLaunchRedirect: this.injectedAutoRedirect === "true",
                });
          });
      }
      async init(e) {
        (this.environment = e.env ?? "production"),
          this.environment !== "production" &&
            ((this.debug = !0),
            this.log("VLaunch debug mode enabled"),
            this.log(e)),
          this.appleBrowser == "none" && (this.appleBrowser = await ze()),
          (e.autoLaunchRedirect === !0 || e.autoLaunchRedirect === !1) &&
            (this.autoLaunchRedirect = e.autoLaunchRedirect);
        let t = await fetch(`${qi[this.environment].API_URL}/sdk/init`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sdkKey: e.key,
            domain: window.location.hostname,
            browser: this.appleBrowser,
            url: e.url ?? window.location.href,
          }),
        });
        if (!t.ok) {
          let a = await t.json();
          throw new Error("Variant API error: " + a.error);
        }
        let r = await t.json(),
          n = {};
        (n.launchUrl = r.launchUrl),
          (this.initUrl = r.launchUrl),
          (n.browser = this.appleBrowser),
          (n.platform = this.platform),
          (n.launchRequired = !1),
          (n.launchInstructions = null),
          this.platform === "ios" &&
            this.appleBrowser !== "launch-viewer" &&
            ((n.launchRequired = !0),
            (n.launchInstructions = await this.getLaunchPageData()
              .launchInstructions)),
          (this.webXRStatus = this.resolveWebXRStatus()),
          (n.webXRStatus = this.webXRStatus),
          this.debug && (console.log("VLaunch initialized", e), console.log(n)),
          (this.initialized = !0);
        let s = new CustomEvent("vlaunch-initialized", { detail: n });
        return (
          window.dispatchEvent(s),
          this.log(s),
          this.autoLaunchRedirect === !0 &&
            n.launchRequired &&
            (window.location.href = n.launchUrl),
          n
        );
      }
      resolveWebXRStatus() {
        let e = "unsupported";
        return (
          this.platform === "ios" &&
            this.appleBrowser !== "launch-viewer" &&
            (e = "launch-required"),
          this.platform !== "ios" &&
            navigator.xr &&
            navigator.xr.isSessionSupported &&
            (e = "supported"),
          this.appleBrowser === "launch-viewer" && (e = "supported"),
          e
        );
      }
      launch(e, t) {
        if (!this.initialized)
          throw new Error("Variant Launch not initialized");
        if (
          (e || (e = window.location.href),
          this.appleBrowser === "launch-viewer")
        ) {
          window.location.href = e;
          return;
        }
        let r = this.getLaunchUrl(e);
        if (t) {
          if (!t.startsWith("https://"))
            throw new Error(
              "launchPage iframe must be a secure url (https://): " + t
            );
          r += "&iframe=" + encodeURIComponent(t);
        }
        window.location.href = r;
      }
      getLaunchUrl(e) {
        if (!this.initialized || !this.initUrl)
          throw new Error("Variant Launch not initialized");
        let t = new URL(this.initUrl);
        return (
          t.searchParams.set("url", e),
          t.searchParams.set("browser", this.appleBrowser),
          t.toString()
        );
      }
      async browserType() {
        return await ze();
      }
      requestVideoFrame(e, t) {
        if (!this.webXR._arKitWrapper)
          throw new Error(
            "Variant Launch: AR is not initialized. Cannot request video frame."
          );
        this.webXR._arKitWrapper._requestComputerVisionData(),
          this.webXR._arKitWrapper.addEventListener(
            "cv_data",
            (r) => {
              let n = {
                width: r.detail._buffers[0].size.width,
                height: r.detail._buffers[0].size.height,
                data: r.detail._buffers[0]._buffer,
                format: "base64Jpeg",
              };
              e(n);
            },
            { once: !0 }
          );
      }
      log(...e) {
        this.debug && console.log(...e);
      }
    };
  window.VLaunch = window.VLaunch || new Tt();
})();
//# sourceMappingURL=variant-launch.min.js.map
