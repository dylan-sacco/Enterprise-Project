



(function () {
    function wrapped() {

        (function (window) {

  /**
   * This is the SMCX singleton for the publisher DOM
   */
  var SMCX = window.SMCX = new (function PublisherSMCX() {
    var that = this;

    /**
     * Before SMCX is initialized, it is an array that holds any user-defined
     * settings created via `SMCX.push`. When SMCX is initialized, it consumes
     * the original array, passing it along to the App's Configuration object,
     * but continues to act like an array with push semantics (i.e. users can
     * still call `SMCX.push`)
     */
    that.__settings__ = window.SMCX || [];
    that.push = function () {
      that.__settings__.push.apply(that.__settings__, arguments);
    };

    that.onerror = window.onerror;

    /**
     * Pass this as a query parameter in the publisher page's URL to enable
     * debug mode within the application
     *
     * Usage:
     *
     * http://www.example.com/pages/test?smcx_debug=true
     *
     */
    that.DEBUG_QUERY_PARAM = 'smcx_debug';

    that.initialize = function (options) {
      log("Initializing SMCX");

      withDocumentBody(function () {
        if (shouldAbortInit()) {
          log("Aborted");
          return;
        }

        // A dictionary of performance data, see `SMCX.Sandbox.T` for usage
        that.PERF = {0: +new Date};
        options.perf = that.PERF;

        options.settings = that.__settings__;

        that.env = new SMCX.Publisher.Env;
        that.env.initialize(options);
      });
    };

    that.boot = function () {
      if (that.env) {
        that.env.boot();
      }
    };

    that.destroy = function () {
      that.__settings__ = [];

      if (that.env) {
        that.env.destroy();
        that.env = null;
      }
    };

    that.debug = function () {
      if (that.env && that.env.DEBUG) {
        return true;
      }

      var queryParams = SMCX.Utils.queryParams(window);
      return queryParams.indexOf(that.DEBUG_QUERY_PARAM) !== -1;
    };

    function withDocumentBody(callback) {
      if (document.body) {
        return callback();
      }

      // Poll for up to 10 seconds to see if `document.body`
      // shows up for the party
      var id, count = 0;
      id = setInterval(function () {
        if (document.body || count > 100) {
          clearInterval(id);
          if (document.body) {
            callback();
          }
        }
        log("Called withDocumentBody");
        count++;
      }, 100);
    }

    function shouldAbortInit() {
      // Abort if the browser doesn't support cross-domain messaging
      if (!SMCX.Utils.xdmSupported(window)) {
        return true;
      }

      // Abort if on IE8 and we would be adding more stylesheets than it can
      // handle (we add 2 and it can support up to 30)
      if (SMCX.Utils.browserHasLowStylesLimit(window) &&
        SMCX.Utils.numStyles(window) > 28) {
        return true;
      }

      return false;
    }

    // Logging

    function log(message) {
      SMCX.log(message);
    }

  })();

  window.SMCX.Publisher = {};

}(window));

(function (window) {

  /**
   * This is the SMCX JS SDK log function
   *
   * If you're looking for the main application's log function, it lives
   * at `/app/assets/javascripts/lib/log.js`
   *
   */
  window.SMCX.log = function (message, options) {
    options = options || {};

    if (SMCX.debug() || options.force) {
      if (window.console) {
        // Only add namespaces to messages that are strings so as not to mess up
        // the nice object inspection functionality in modern browsers
        if (typeof message === 'string') {
          if (options.namespace) {
            message = '[smcx.' + options.namespace + '] ' + message;
          } else {
            message = '[smcx] ' + message;
          }
        }

        console.log(message);
      }
    }
  };

}(window));

(function (window) {
  window.SMCX.Utils = {

    /**
     * Get the query parameters from the target window's URL
     *
     * @param targetWindow Window
     * @returns String
     */
    queryParams: function (targetWindow) {
      return targetWindow.document.location.search;
    },

    /**
     * Determine if the current viewport is a mobile device
     *
     * @returns Boolean
     */
    onMobile: function (targetWindow) {
      var innerWidth, clientWidth, width;

      clientWidth = targetWindow.document.documentElement.clientWidth;
      innerWidth = targetWindow.innerWidth;
      width = Math.max(innerWidth, clientWidth || 0);

      return width <= 760;
    },

    /**
     * Check if the browser supports cross-domain messaging (XDM)
     *
     * To support XDM, browsers need to implement the `postMessage` method,
     * which is true for IE8+ and all modern browsers
     *
     * @param targetWindow
     * @returns Boolean
     */
    xdmSupported: function (targetWindow) {
      return !!targetWindow['postMessage'];
    },

    /**
     * Detect whether the current browser has a low stylesheet limit
     *
     * This is used when determining whether to initialize a widget (which would
     * inject another stylesheet) because IE8 has a hard limit of 31 stylesheets
     * and/or style tags on a given page
     *
     * FYI: modern browsers have a limit in the thousands, so for all intents
     * and purposes, we don't need to care about stylesheet limits on any
     * browser other than IE8
     *
     * @returns Boolean
     */
    browserHasLowStylesLimit: function (targetWindow) {
      return !('getComputedStyle' in targetWindow);
    },

    /**
     * Get the # of stylesheets and style tags on the page
     *
     * @param targetWindow Window
     * @returns Integer
     */
    numStyles: function (targetWindow) {
      var doc, numLinks, numStyles;

      doc = targetWindow.document;
      numLinks = doc.getElementsByTagName('link').length;
      numStyles = doc.getElementsByTagName('style').length;

      return numLinks + numStyles;
    }
  }

}(window));

/**
 * This is the SMCX singleton for the publisher DOM
 */
(function (window, document, undefined) {

  var Env = SMCX.Publisher.Env = function () {
    var that = this;

    /**
     *
     * @param options
     * @param options.sandbox
     * @param options.sandbox.init (optional)
     * @param options.sandbox.boot (optional)
     * @param options.sandbox.js
     * @param options.sandbox.data
     */
    this.initialize = function (options) {
      /**
       * Set which type of singleton this is so it's possible to differentiate
       * among the three different types
       *
       * @type String
       * @private
       */
      that.__TYPE__ = 'publisher';

      /**
       * The current environment
       *
       * This is originally set by the parameter passed to `InitV{n}View` on
       * the server
       *
       * @type String
       */
      that.NAME = options.env;

      that.DEBUG = options.debug;

      log("Initializing environment (type=publisher, mode=" + that.NAME + ")");

      that.options = extractOptions(options);

      that.settings = that.options.settings;

      // reference to the sandboxed SMCX singleton
      that.__SMCX__ = null;

      that.events = {
        'smcx.container:sdkjs:loaded': [onSandboxedJSLoaded],
        'smcx.sandbox:init': [],
        'smcx.sandbox:boot': []
      };

      that.container = new SMCX.Publisher.Container();
      that.container.initialize(optionsForContainer());
    };

    function extractOptions(options) {
      if (options.sandbox === undefined) {
        throw("`options.sandbox` must be defined");
      }

      if (options.sandbox.data === undefined) {
        throw("`options.sandbox.data` must be defined");
      }

      if (options.sandbox.js === undefined) {
        throw("`options.sandbox.js` must be defined");
      }

      if (typeof(options.sandbox.js) !== 'string') {
        throw("`options.sandbox.js` must be a string");
      }

      if (that.DEBUG) {
        options.sandbox.js = JSON.parse(options.sandbox.js);
      }

      if (typeof(options.sandbox.data) !== 'object') {
        throw("`options.sandbox.data` must be an object");
      }

      if (options.data['cookie_url'] === undefined) {
        throw("`options.data.cookie_url` must be defined");
      }

      if (options.sandbox.init === undefined) {
        options.sandbox.init = true;
      }

      if (options.sandbox.boot === undefined) {
        options.sandbox.boot = true;
      }

      return options;
    }

    this.boot = function () {
      configureContainer(that.container);
      that.container.render();
    };

    this.addCallback = function (eventName, callback) {
      if (that.events[eventName] === undefined) {
        throw(eventName + ' is not a valid event name');
      }
      that.events[eventName].push(callback);
    };

    this.trigger = function () {
      var eventName = Array.prototype.shift.apply(arguments); // pop first arg
      logEvent(eventName);
      runCallbacksFor(eventName, arguments);
    }

    this.destroy = function () {
      log("Destroying SMCX (type=publisher)");

      that.settings = [];

      if (that.__SMCX__) {
        that.__SMCX__.destroy();
        that.__SMCX__ = null;
      }

      // NB: destroying the container (and its frame) must come after its child
      // objects are destroyed and events unbound, otherwise it creates a race
      // condition that can cause script errors
      if (that.container) {
        that.container.destroy();
        that.container = null;
      }
    };

    this.debug = function () {
      return that.DEBUG;
    };

    // Container

    function optionsForContainer() {
      return {
        debug: that.DEBUG,
        div: {
          id: '__smcx__'
        },
        frame: {
          id: 'smcx_frame'
        }
      }
    }

    /**
     * Build up the HTML we want to `document.write` into the container's frame
     *
     * @param container
     */
    function configureContainer(container) {
      container.addRemoteScript({src: that.constructor.JQUERY_URL});
      container.addRemoteScript({src: buildCookieUrl()});

      /**
       * Inject the script element(s) for the JS SDK
       *
       * In debug mode, `js` will be a set of <script> tags that each
       * reference a file in the `sdk-sandbox-manifest.js` (which makes it
       * possible to use the browser's debugging functionality), therefore we
       * don't need to wrap the string. Otherwise, `js` is the bundled
       * source of `sdk-sandbox-manifest.js`, thus it needs to be wrapped in a
       * single <script> tag so that the JS gets evaluated once it's written
       * into the sandbox frame.
       *
       * NB: IE8 will not wait for remote scripts to finish before beginning to
       * parse inline scripts, thus when not in debug mode there would exist
       * a race condition between jQuery and the inlined JS for the SDK. To
       * avoid this, we wrap the JS SDK in an `onload` callback that will
       * only execute after the window's `onload` event. While this eliminates
       * the race condition, it is still possible that the jQuery request fails
       * (highly unlikely, but it's possible that the Google CDN experiences
       * downtime), so we also have to guard against that possibility.
       *
       * sp: disabled debug load to avoid loading static assets one by one
       */
      if (that.DEBUG) {
        var urls = that.options.sandbox.js;
        for (var i = 0; i < urls.length; i++) {
          container.addRemoteScript({src: urls[i]});
        }
      } else {
        var bundle = that.options.sandbox.js;
        bundle = wrapWithJQueryGuard(bundle);
        container.addInlineScript({text: bundle, on: 'load'});
      }
    }

    // FIXME: docs
    function buildCookieUrl() {
      return that.options.data['cookie_url'] + "?_=" + (+new Date);
    }

    function wrapWithJQueryGuard(js) {
      return 'if (window.jQuery){' + js + '}';
    }

    /**
     * This callback gets run when all of the sandboxed Javascript has been
     * parsed by the browser
     *
     * @param frameWindow
     */
    function onSandboxedJSLoaded(frameWindow) {
      that.__SMCX__ = frameWindow.SMCX;
    }

    // Events

    /**
     * Run callbacks for the given event in FIFO order
     *
     * @param eventName String
     * @param args Arguments
     */
    function runCallbacksFor(eventName, args) {
      var callbacks, callback;
      callbacks = that.events[eventName].reverse();
      while (callbacks.length) {
        callback = callbacks.pop();
        callback.apply(callback, args);
      }
    }

    // Logging

    function log(message) {
      SMCX.log(message, {namespace: that.__TYPE__});
    }

    function logEvent(eventName) {
      var message = "Received '" + eventName + "' event";
      log(message);
    }

  }

  SMCX.Publisher.Env.JQUERY_URL = 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.js';

}(window, document));

(function (window, document) {

  /**
   * Provides a way to create an isolated container using the sourceless-iframe
   * technique pioneered by Meebo
   *
   * https://github.com/meebo/embed-code/blob/master/embed-code.js
   *
   * @constructor
   */
  SMCX.Publisher.Container = function () {
    var that = this;

    this.initialize = function (options) {
      log("Initializing an SMCX.Publisher.Container");

      SMCX.Publisher.Container.current = this;

      this.options = {};
      this.options.div = options.div;
      this.options.frame = options.frame;
      this.options.frame.head = [];
      this.options.frame.body = [];
      this.debug = options.debug;
    };

    this.render = function () {
      log("Rendering an SMCX.Publisher.Container");

      // Create an (invisible) container element in the publisher's DOM to
      // hold all future elements that we are going to insert
      that.containerEl = document.createElement('div');
      that.containerEl.id = that.options.div.id;
      that.containerEl.style.display = 'none';
      document.body.appendChild(that.containerEl);

      // Create a sourceless iframe in the publisher's DOM to sandbox the SDK
      that.frameEl = document.createElement('iframe');
      that.frameEl.frameBorder = '0';
      that.frameEl.id = that.options.frame.id;
      that.frameEl.allowTransparency = 'true';
      that.containerEl.appendChild(that.frameEl);
      that.frameWindow = that.frameEl.contentWindow;

      try {

        // Try to access the frame window's document and open it
        //
        // NB: in IE8-10, this will fail is the parent window's `document.domain`
        // has been set (even if if it's the same as `window.location.hostname`),
        // because those browsers' security policy prevents accessing a frame's
        // document if the frame's `document.domain` differs from the parent's).
        // We catch this exception and handle opening the document in a
        // different way below.
        //
        // NB: you cannot avoid this exception by always setting `document.domain`
        // to match the parent window's before trying to access the frame's
        // document because if the parent window hasn't explicitly set
        // `document.domain`, setting it on the frame's document will cause IE
        // to deny access the frame's document (this is because IE doesn't just
        // do a strict equality check of the value of `document.domain`, it
        // actually tracks whether the document's `domain` property has been
        // explicitly set)
        //
        that.frameEl.contentWindow.document.open();

      } catch (e) {

        logDocumentOpenError(e);

        // If an exception occurred while attempting to access the document,
        // that implies that `document.domain` has been set on the parent window.
        //
        // In order to access the frame's document, we need to ensure its
        // `document.domain` matches the parent window's (without opening the
        // frame's document itself...). There's a clever hack to accomplish this,
        // which is to inject a JS snippet via the frame's `src` attribute
        // using the `javascript:` directive
        //
        that.frameEl.src = domainSrcFor(document.domain);

      }

      try {

        // Get a reference to the frame's document again (should work every
        // time now that we have ensured `document.domain` matches)
        that.frameDocument = that.frameEl.contentWindow.document;

        // Write the HTML into the blank iframe (this works in IE8+)
        var html = buildFrameHTML();
        that.frameDocument.write(html);

        // Must call `document.close` to trigger the frame's `onload` event
        that.frameDocument.close();

        // Polyfill `document.head` (which isn't implemented in IE < 9)
        that.frameDocument.head = that.frameDocument.head ||
          that.frameDocument.getElementsByTagName('head')[0];

      } catch (e) {
        logDocumentWriteError(e);
      }
    };

    this.destroy = function () {
      log('Destroying SMCX.Publisher.Container');

      if (that.containerEl) {
        that.containerEl.removeChild(that.frameEl);
        document.body.removeChild(that.containerEl);
      }
    };

    /**
     * Add a string to the list of strings to write into the frame's document
     * for a given element
     *
     * NB: generally, you'll want to use one of the convenience wrappers for
     * this method (`addRemoteScript`, `addInlineScript`, etc)
     *
     * @param options
     * @param options.el String ('head' or 'body', default is 'head')
     * @param options.prepend Boolean (default is False)
     */
    this.addString = function (options) {
      var queue = that.options.frame[options.el || 'head'];
      options.prepend ? queue.unshift(options.text) : queue.push(options.text);
    };

    /**
     * Add a remote script to the list of strings to be written into the
     * frame's document
     *
     * Example:
     *
     *    addRemoteScript({src: 'https://foo.com/bar.js'})
     *
     * This will add the following string to `options.frame.head`:
     *
     *    "<script src='https://foo.com/bar.js'></script>"
     *
     * See `addString` for more details about available options
     *
     * @param options Object
     * @param options.src String (the path or url to the script)
     */
    this.addRemoteScript = function (options) {
      var script = '<' + 'script src="' + options.src + '"></script' + '>';
      this.addString({text: script, el: options.el});
    };

    /**
     * Add an inline script to the list of strings to be written into the
     * frame's document
     *
     * Example:
     *
     *    addInlineScript({text: 'alert("foo");'})
     *
     * This will add the following string to `options.frame.head`:
     *
     *    "<script>alert("foo");</script>"
     *
     * See `addString` for more details about available options
     *
     * @param options Object
     * @param options.text String (escaped Javascript)
     */
    this.addInlineScript = function (options) {
      var script, text;

      if (options['on'] === 'load') {
        text = wrapInOnLoadCallback(options.text);
      } else {
        text = options.text;
      }

      script = '<' + 'script>' + text + '</script' + '>';

      this.addString({text: script, el: options.el});
    };

    /**
     * Build a JS snippet to set a frame's `document.domain` via its `src`
     * attribute
     *
     * @param domain
     * @returns {string}
     */
    function domainSrcFor(domain) {
      var src = "javascript:";
      src += "var d=document.open(); d.domain='" + document.domain + "';";
      src += 'void(0);'
      return src;
    }

    /**
     * Build the HTML markup for the document
     *
     * NB: we include a DOCTYPE here to ensure that iframes getting rendered
     * in IE don't fall in to Quirks Mode (in which certain standard libraries,
     * such as JSON, aren't available)
     *
     * @returns {string}
     */
    function buildFrameHTML() {
      var s = String();

      s += '<!DOCTYPE html>';
      s += '<' + 'html>';
      s += '<' + 'head>';
      s += that.options.frame.head.join('\n');
      s += '<' + '/head>';
      s += '<' + 'body>';
      s += that.options.frame.body.join('\n');
      s += '</body' + '>';
      s += '</html' + '>';

      return s;
    }

    /**
     * Helper to wrap a script in a callback function that will only execute
     * after the page's `onload` event has fired
     *
     * @param text
     * @returns {string}
     */
    function wrapInOnLoadCallback(text) {
      var wrapped = String();
      wrapped += '(function(){'
      wrapped += 'var eventer = window.addEventListener ? window.addEventListener : window.attachEvent;';
      wrapped += 'var name = window.addEventListener ? "load" : "onload";';
      wrapped += 'eventer(name, function(e){' + text + '});';
      wrapped += '}());';
      return wrapped;
    }

    // Logging

    function log(message) {
      SMCX.log(message, {namespace: 'container'});
    }

    function logDocumentOpenError(e) {
      log(e);
      log("could not open document, falling back to a `javascript:` src");
    }

    function logDocumentWriteError(e) {
      log(e);
      log("document.write failed, aborting");
    }

  };

}(window, document));

        
        SMCX.initialize({
            env: 'prod',
            debug: false,
            data: {'cookie_url': 'https://widget.surveymonkey.com/collect/website/js/cookie.js'},
            sandbox: {
                js: '(function(e){var t=/\\+/g;function n(e){return a.raw?e:encodeURIComponent(e)}function i(e){return a.raw?e:decodeURIComponent(e)}function o(e){return n(a.json?JSON.stringify(e):String(e))}function s(e){if(e.indexOf(\'\"\')===0){e=e.slice(1,-1).replace(/\\\\\"/g,\'\"\').replace(/\\\\\\\\/g,\"\\\\\")}try{e=decodeURIComponent(e.replace(t,\" \"));return a.json?JSON.parse(e):e}catch(e){}}function r(t,n){var i=a.raw?t:s(t);return e.isFunction(n)?n(i):i}var a=e.cookie=function(t,s,d){if(arguments.length>1&&!e.isFunction(s)){d=e.extend({},a.defaults,d);if(typeof d.expires===\"number\"){var c=d.expires,l=d.expires=new Date;l.setTime(+l+c*864e5)}return document.cookie=[n(t),\"=\",o(s),d.expires?\"; expires=\"+d.expires.toUTCString():\"\",d.path?\"; path=\"+d.path:\"\",d.domain?\"; domain=\"+d.domain:\"\",d.secure?\"; secure\":\"\"].join(\"\")}var u=t?undefined:{};var f=document.cookie?document.cookie.split(\"; \"):[];for(var g=0,p=f.length;g<p;g++){var S=f[g].split(\"=\");var m=i(S.shift());var h=S.join(\"=\");if(t&&t===m){u=r(h,s);break}if(!t&&(h=r(h))!==undefined){u[m]=h}}return u};a.defaults={};e.removeCookie=function(t,n){if(e.cookie(t)===undefined){return false}e.cookie(t,\"\",e.extend({},n,{expires:-1}));return!e.cookie(t)};e.readCookie=r})(jQuery);(function(e,t){var n=e.CoreObject;var i=e.CoreObject=function e(){};i.extend=function(e,t){var n,s;n=this;if(n.constructor!=Function||typeof e!=\"function\"){throw\"`extend` only supports function-based inheritance\"}e.prototype=new n;for(s in n){if(n.hasOwnProperty(s)){if(s===\"_super\"||s===\"extend\"||s===\"create\"){continue}e[s]=n[s]}}for(s in t){if(t.hasOwnProperty(s)){e[s]=t[s]}}e._super=n;e.prototype.constructor=e;e.__name__=e.prototype.__name__=o(e);e.prototype.__class__=e;e.extend=i.extend;e.create=i.create;return e};i.create=function(){var e=this;var n=new e;if(n.initialize!==t){n.initialize.apply(n,arguments)}return n};i.noConflict=function(){e.CoreObject=n;return i};function o(e){var t=/function\\s+(.+?)\\s*\\(/;var n=t.exec(e.toString());return n&&n.length>1?n[1]:\"\"}})(window);(function(e,t){var n,i;n=e.location.origin;i=e.locationOrigin;e.locationOrigin={noConflict:function(){var t=e.location.origin;e.location.origin=n;e.locationOrigin=i;return t}};if(!e.location.origin){e.location.origin=e.location.protocol+\"//\"+e.location.hostname+(e.location.port?\":\"+e.location.port:\"\")}})(window);(function(e){var t=e.SMCX=new function n(){var i=this;this.window=e;this.jQuery=this.$=jQuery.noConflict(true);this.locationOrigin=e.locationOrigin.noConflict();this.Object=e.CoreObject.noConflict();this.DEBUG_QUERY_PARAM=\"smcx_debug\";this.FORCE_SHOW_QUERY_PARAM=\"smcx_force_show\";i.initialize=function(e){i.PERF=e.perf;t.T(\"initializing\");i.env=new t.Sandbox.Env;i.env.initialize(e)};i.boot=function(e){i.env.boot(e)};i.destroy=function(){if(i.env){i.env.destroy()}};i.debug=function(){if(i.env&&i.env.DEBUG){return true}var n=t.Utils.queryParams(e.parent);return n.indexOf(i.DEBUG_QUERY_PARAM)!==-1};i.T=function(e){i.PERF[e]=new Date-i.PERF[0]};function o(e,n){n=n||{};n.namespace=\"sandbox\";t.log(e,n)}};e.SMCX.Sandbox={}})(window,document);(function(e){e.SMCX.log=function(t,n){n=n||{};if(SMCX.debug()||n.force){if(e.console){if(typeof t===\"string\"){if(n.namespace){t=\"[smcx.\"+n.namespace+\"] \"+t}else{t=\"[smcx] \"+t}}console.log(t)}}}})(window);(function(e){e.SMCX.Utils={queryParams:function(e){return e.document.location.search},onMobile:function(e){var t,n,i;n=e.document.documentElement.clientWidth;t=e.innerWidth;i=Math.max(t,n||0);return i<=760},xdmSupported:function(e){return!!e[\"postMessage\"]},browserHasLowStylesLimit:function(e){return!(\"getComputedStyle\"in e)},numStyles:function(e){var t,n,i;t=e.document;n=t.getElementsByTagName(\"link\").length;i=t.getElementsByTagName(\"style\").length;return n+i}}})(window);SMCX.UUID={generate:function(){var e=(new Date).getTime();return\"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx\".replace(/[xy]/g,function(t){var n=(e+Math.random()*16)%16|0;e=Math.floor(e/16);return(t==\"x\"?n:n&3|8).toString(16)})}};(function(e,t){SMCX.Cookie={filter:function(e,n){this.log(\"Extracting CX cookies\");var i,o,s,r,a;if(e===t){this.log(\"WARNING: tried to extract CX cookies from undefined cookie\");return}o={};e=e.replace(/\\+/g,\" \");e=decodeURIComponent(e);i=e.split(\";\");for(var d=0,c=i.length;d<c;d++){i[d]=SMCX.$.trim(i[d]);try{s=i[d].split(\"=\");r=s[0];a=s[1];if(r&&a&&n(r,a)){o[r]=a}}catch(e){this.log(\"WARNING: malformed cookie key-value pair\")}}return o},log:function(e,t){t=t||{};t.namespace=\"cookie\";SMCX.log(e,t)}}})(window);(function(e){SMCX.Messenger=function(){var e;this.initialize=function(t){e=this;e.bindings={};e.window=t.window};this.bind=function(t,n){c(t);if(!e.bindings[t]){e.bindings[t]=[]}e.bindings[t].push(n)};this.send=function(t,n){var i,o,s;i=n.target;o=n.targetOrigin;s=n.data||{};s.eventName=t;s.eventID=d();l(t,s);if(n.success){e.bindings[s.eventID]=[n.success]}s=SMCX.JSON.stringify(s);i.postMessage(s,o)};this.request=function(t,n){e.log(\"Request: \"+t);if(!e.providerFrame){throw\"Cannot send a request without loading the provider\"}n.target=e.providerFrame;n.targetOrigin=e.providerOrigin;e.send(t,n)};this.respondTo=function(t,n,i){var o;e.bind(t,function(s,r){o=n(s,r);o.requestID=s.eventID;e.send(t,{target:e.window.parent,targetOrigin:i.targetOrigin,data:o})})};this.destroy=function(){e.log(\"Destroying SMCX.Messenger\");t()};this.bindOnMessageReceived=function(){if(e.window.addEventListener){e.window.addEventListener(\"message\",n,false)}else{e.window.attachEvent(\"onmessage\",n)}};this.log=function(e){SMCX.log(e,{namespace:\"messenger\"})};function t(){e.log(\"==> unbinding onMessageReceived\");if(e.window.addEventListener){e.window.removeEventListener(\"message\",n)}else{e.window.detachEvent(\"onmessage\",n)}}function n(e){var t=o(e);if(i(t)){if(t.requestID){r(t,e)}else{s(t,e)}}}function i(e){return e&&e.eventName&&e.eventName.substring(0,3)===\"sm:\"}function o(t){var n=t.data;if(typeof n===\"string\"){try{n=SMCX.JSON.parse(n)}catch(t){e.log(\"Invalid JSON: could not parse data\");return null}}return n}function s(t,n){var i=t.eventName,o=e.bindings[i];u(t);if(o){a(o,[t,n])}else{e.log(\"No bindings for \"+i)}}function r(t,n){var i=t.eventName,o=t.requestID,s=e.bindings[o];f(t);if(s){a(s,[t,n],function(){delete e.bindings[o]})}else{e.log(\"No bindings for \"+i)}}function a(e,t,n){var i=0,o=e.length,s;for(;i<o;i++){s=e[i];s.apply(this,t);if(n){n()}}}function d(){return SMCX.UUID.generate()}function c(t){var n=e.role||\"messenger\";e.log(\"Binding \"+t+\" in \"+n)}function l(t,n){var i=\"Sending \"+t+\"#\"+n.eventID;e.log(i)}function u(t){var n=\"Message received: \"+t.eventName;if(t.eventID){n+=\"#\"+t.eventID}e.log(n)}function f(t){var n=\"Response received for request: \"+t.eventName+\"#\"+t.requestID;e.log(n)}}})(window);(function(){var e={\"&\":\"&amp;\",\"<\":\"&lt;\",\">\":\"&gt;\",\'\"\':\"&quot;\",\"\'\":\"&#39;\",\"/\":\"&#x2F;\"};SMCX.escapeHTML=function(t){return String(t).replace(/[&<>\"\'\\/]/g,function(t){return e[t]})};SMCX.unescapeBreaks=function(e){return e.replace(/&lt;br&gt;/g,\"<br>\")};SMCX.nl2br=function(e){var t=\"<br>\";return(e+\"\").replace(/([^>\\r\\n]?)(\\r\\n|\\n\\r|\\r|\\n)/g,\"$1\"+t+\"$2\")}})();(function(e,t){SMCX.Sandbox.Env=function n(){var i=this;this.initialize=function(t){i.NAME=t.env;i.DEBUG=t.debug;this.__TYPE__=\"sandbox\";o(\"Initializing environment (type=sandbox, debug=\"+i.DEBUG+\")\");i.$parentWindow=SMCX.$(e.parent);i.$parentDocument=SMCX.$(e.parent.document);i.$parentBody=SMCX.$(e.parent.document.body);i.$stage=i.$parentBody.find(\"#__smcx__\");i.CX_COOKIES=SMCX.Cookie.filter(e[\"SM_COOKIE\"],function(e){return e.slice(0,2)===\"CX\"});i.app=SMCX.Sandbox.App.create(t.data,t.settings);SMCX.T(\"initialized\");i.initialized=true;e.parent.SMCX.env.trigger(\"smcx.sandbox:init\",e,SMCX)};this.boot=function(n){SMCX.T(\"booting\");o(\"Booting SMCX\");SMCX.$(t).ready(function(){i.app.boot(function(){SMCX.T(\"booted\");i.app.render(function(){SMCX.T(\"rendered\");o(SMCX.PERF,{force:true});e.parent.SMCX.env.trigger(\"smcx.sandbox:boot\",e,SMCX);if(n){n(SMCX)}})})})};this.destroy=function(){o(\"Destroying SMCX (type=sandbox)\");if(i.app){i.app.destroy();i.app=null}};function o(e,t){t=t||{};t.namespace=\"sandbox.env\";SMCX.log(e,t)}}})(window,document);SMCX.Sandbox.App=SMCX.Object.extend(function e(){var t=this;this.initialize=function(e,i){t.log(\"Initializing SMCX.Sandbox.App\");t.booted=false;t.widget=null;t.widgetView=null;t.assets={css:[]};t.config=SMCX.Sandbox.Configuration.create(i);t.messenger=new SMCX.Messenger;t.messenger.initialize({window:window.parent});SMCX.TEMPLATES=n(e[\"sdk_html\"]);t.assets.css.push(e[\"sdk_css\"]);t.assets.css.push(e[\"widget_css\"]);t.widget=SMCX.Sandbox.WidgetFactory.create(e[\"widget_attrs\"]);t.widgetView=SMCX.Sandbox.WidgetViewFactory.create(t.widget)};this.boot=function(e){t.log(\"Booting SMCX.Sandbox.App\");SMCX.$(document).ready(function(){i();t.booted=true;o();if(e){e.call(e)}})};this.render=function(e){t.log(\"Rendering SMCX.Sandbox.App\");r(e)};this.destroy=function(){t.log(\"Destroying SMCX.Sandbox.App\");if(t.messenger){t.messenger.destroy();t.messenger=null}if(t.booted){t.widgetView.$el.remove();SMCX.env.$parentBody.find(\".smcx-style\").remove()}};this.log=function(e){SMCX.log(e,{namespace:\"app\"})};function n(e){var t={},n,i,o;o=SMCX.$(e);o.map(function(e,o){i=o.id;if(i){i=i.replace(\"smcx_\",\"\").replace(\"_template\",\"\");n=SMCX.$.trim(o.innerHTML);n=n.replace(/(\\r\\n|\\n|\\r)/gm,\"\").replace(/\\s{2,}/g,\"\");t[i]=n}});return t}function i(){var e=t.assets[\"css\"];for(var n=0;n<e.length;n++){var i=e[n];a(i)}}function o(){t.messenger.bindOnMessageReceived();t.messenger.bind(\"sm:close_window\",s)}function s(){t.widgetView.animateOut()}function r(e){t.widgetView.isShowable(function(n){if(n){t.widgetView.insert().animateIn(function(){if(e){e.call(e)}})}else{t.log(\"widgetView was not showable\");if(e){e.call(e)}}})}function a(e){var t=\"<style class=\'smcx-style\' type=\'text/css\'>\"+e+\"</style>\";SMCX.env.$stage.append(SMCX.$(t))}});SMCX.Sandbox.Configuration=SMCX.Object.extend(function e(){var t=this;this.settings=null;this.initialize=function(e){this.settings=e};this.settingsFor=function(e){var n=0,i=t.settings.length,o,s,r,a={};for(;n<i;n++){o=t.settings[n];if(o[0]==e){s=o[1];r=o[2];a[s]=r}}return a}});SMCX.Sandbox.WidgetFactory=new function e(){var t=this;this.WIDGET_TYPES={EmbedWidget:\"EmbedWidget\",ModalInvitationWidget:\"ModalInvitationWidget\",ModalSurveyWidget:\"ModalSurveyWidget\"};this.create=function(e,t){var i,o;o=n(e.type);i=new o;i.initialize(e,t);return i};function n(e){var n,i;n=t.WIDGET_TYPES[e];if(!n){i=e+\" is an invalid type for SMCX.Sandbox.Widget\";throw i}return SMCX.Sandbox[n]}};(function(e,t){SMCX.Sandbox.Widget=SMCX.Object.extend(function e(){var n;this.COLLECTOR_STATUSES={open:\"open\",closed:\"closed\"};this.initialize=function(e){n=this;n.id=e[\"id\"];n.smCollectorId=e[\"sm_collector_id\"];n.type=e[\"type\"];n.collectorStatus=e[\"collector_status\"];n.url=e[\"url\"];n.hideBranding=!!e[\"hide_branding\"];n.allowMultipleResponses=!!e[\"allow_multiple_responses\"]};this.isEmbed=function(){return this.type==\"EmbedWidget\"};this.isModalInvitation=function(){return this.type==\"ModalInvitationWidget\"};this.isModalSurvey=function(){return this.type==\"ModalSurveyWidget\"};this.isSampleable=function(){return n.sampleRate!==t};this.collectorIsOpen=function(){return n.collectorStatus==n.COLLECTOR_STATUSES.open};this.collectorIsClosed=function(){return n.collectorStatus==n.COLLECTOR_STATUSES.closed};this.modifyIframeUrlForIosBrowsers=function(e){if(!e.hasOwnProperty(\"embedded\")){e.embedded=\"1\"}return e},this.parametrizedUrl=function(e){var t,i,o;t=n.url;o=\"\";i=SMCX.env.app.config.settingsFor(\"custom_variable\");if(e){i=n.modifyIframeUrlForIosBrowsers(i)}if(!SMCX.$.isEmptyObject(i)){o+=SMCX.$.param(i)}if(o.length){t+=\"?\"+o}return t}})})(window);SMCX.Sandbox.EmbedWidget=SMCX.Sandbox.Widget.extend(function e(){var t=SMCX.Sandbox.EmbedWidget.prototype;this.initialize=function(e){t.initialize.apply(this,arguments);this.bgColorA=e[\"bg_color_a\"];this.hideOnRepeatVisits=e[\"hide_on_repeat_visits\"]}});SMCX.Sandbox.ModalInvitationWidget=SMCX.Sandbox.Widget.extend(function e(){var t=SMCX.Sandbox.ModalInvitationWidget.prototype;this.initialize=function(e){t.initialize.apply(this,arguments);this.headline=e[\"headline\"];this.message=e[\"message\"];this.primaryBtnText=e[\"primary_btn_text\"];this.secondaryBtnText=e[\"secondary_btn_text\"];this.bgColorA=e[\"bg_color_a\"];this.sampleRate=e[\"sample_rate\"]}});SMCX.Sandbox.ModalSurveyWidget=SMCX.Sandbox.Widget.extend(function e(){var t=SMCX.Sandbox.ModalSurveyWidget.prototype;this.initialize=function(e){t.initialize.apply(this,arguments);this.headline=e[\"headline\"];this.bgColorA=e[\"bg_color_a\"];this.sampleRate=e[\"sample_rate\"]}});SMCX.Sandbox.WidgetViewFactory=new function e(){var t=this;this.TYPE_TO_VIEW_MAP={EmbedWidget:\"EmbedWidgetView\",ModalInvitationWidget:\"ModalInvitationWidgetView\",ModalSurveyWidget:\"ModalSurveyWidgetView\"};this.create=function(e,t){var i,o;o=n(e.type);i=new o;i.initialize(e,t);return i};function n(e){var n=t.TYPE_TO_VIEW_MAP[e];if(!n){throw\"Invalid type: must be one of \'EmbedWidget\', \"+\"\'ModalInvitationWidget\', or \'ModalSurveyWidget\', but it was \"+e}return SMCX.Sandbox[n]}};SMCX.Sandbox.WidgetView=SMCX.Object.extend(function e(){var t;this.WIDGET_TYPES={embed:\"EmbedWidget\",modalInvitation:\"ModalInvitationWidget\",modalSurvey:\"ModalSurveyWidget\"};this.ANIMATION_DURATION=300;this.SHOW_CLASS=\"smcx-show\";this.HIDE_CLASS=\"smcx-hide\";this.initialize=function(e,n){t=this;t.widget=e;t.classes={off:[],on:[]};if(!t.templateName){throw\"Subclasses of WidgetView must set `templateName`\"}t.$el=t._createElement(t.templateName);t._setClasses();t._bindEvents(t.$el)};this._createElement=function(e){var t=SMCX.TEMPLATES[e];return SMCX.$(t)};this._setClasses=function(){var e=t.widget.bgColorA.replace(\"#\",\"\");if(parseInt(e,16)>13421771){t.classes.on.push(\"smcx-widget-light\")}else{t.classes.on.push(\"smcx-widget-dark\")}if(t.widget.hideBranding){t.classes.on.push(\"smcx-hide-branding\")}};this._bindEvents=function(){};this.render=function(){SMCX.log(\"Rendering an SMCX.Sandbox.WidgetView\");this.$el.addClass(n(this));return this};this.insert=function(){};this.animateIn=function(e){var t=this;t.$el.removeClass(t[\"HIDE_CLASS\"]).addClass(t[\"SHOW_CLASS\"]);setTimeout(function(){t.$el.removeClass(n(t)).addClass(i(t));t.setLastShownAt();if(e){e.call(e)}},0)};this.animateOut=function(e){var t=this;t.$el.removeClass(i(t)).addClass(n(t));setTimeout(function(){t.$el.removeClass(t[\"SHOW_CLASS\"]).addClass(t[\"HIDE_CLASS\"]);if(e){e.call(e)}},t[\"ANIMATION_DURATION\"])};function n(e){return e.classes.off.join(\" \")}function i(e){return e.classes.on.join(\" \")}function o(){var e=SMCX.Utils.queryParams(window.parent);return e.indexOf(SMCX.FORCE_SHOW_QUERY_PARAM)>0||document.location.protocol===\"file:\"}this.isShowable=function(e){var t,n,i,s,r;t=this;n=false;if(o()){n=true;e.call(e,n);return}if(t.widget.isEmbed()&&!SMCX.$(window.parent.document).find(\"body #smcx-sdk\").length){SMCX.log(\"WidgetView is not showable because script is in <head>\");n=false;e.call(e,n);return}r=t.respondentStatusFor(t.widget.smCollectorId);SMCX.log(\"User has taken survey? \"+r.userHasTakenSurvey);if(t.widget.collectorIsOpen()){if(r[\"userHasTakenSurvey\"]&&!t.widget.allowMultipleResponses){if(t.widget.isEmbed()&&!t.widget.hideOnRepeatVisits){n=true}}else{if(t.widget.isEmbed()){n=true}else{if(t.widget.isSampleable()){i=Math.random()>t.widget.sampleRate/100;s=t.getLastShownAt();if(!i&&!s){n=true}}else{n=true}}}}e.call(e,n)};this.getLastShownAt=function(){var e;if(SMCX.$.cookie(\"smcx_\"+t.widget.smCollectorId+\"_last_shown_at\")){e=SMCX.$.cookie(\"smcx_\"+t.widget.smCollectorId+\"_last_shown_at\")}else if(SMCX.$.cookie(\"smcx_0_last_shown_at\")){e=SMCX.$.cookie(\"smcx_0_last_shown_at\")}return e};this.setLastShownAt=function(){var e=\"smcx_\"+t.widget.smCollectorId+\"_last_shown_at\";var n=(new Date).getTime();SMCX.$.cookie(e,n,{path:\"/\"})};this.respondentStatusFor=function(e){var t,n,i;i=\"CX_\"+e;n=SMCX.env.CX_COOKIES[i];t={userHasTakenSurvey:Boolean(n)};return t}});SMCX.Sandbox.EmbedWidgetView=SMCX.Sandbox.WidgetView.extend(function e(){var t=SMCX.Sandbox.EmbedWidgetView.prototype;this.templateName=\"embed\";this.render=function(){t.render.call(this);this.$el.find(\"iframe\").attr(\"src\",this.widget.parametrizedUrl(true));return this};this.insert=function(){SMCX.env.$parentBody.find(\"#smcx-sdk\").before(this.render().$el);t.insert.call(this);return this};this._setClasses=function(){t._setClasses.call(this)};this._bindEvents=function(){t._bindEvents.call(this)}});SMCX.Sandbox.ModalInvitationWidgetView=SMCX.Sandbox.WidgetView.extend(function e(){var t=this;var n=SMCX.Sandbox.ModalInvitationWidgetView.prototype;t.templateName=\"modal_invitation\";t.render=function(){n.render.call(t);var e,i,o,s,r;e=SMCX.escapeHTML(t.widget.headline);i=SMCX.unescapeBreaks(SMCX.escapeHTML(SMCX.nl2br(t.widget.message)));o=SMCX.escapeHTML(t.widget.primaryBtnText);s=SMCX.escapeHTML(t.widget.secondaryBtnText);r=t.widget.parametrizedUrl();t.$el.find(\"[smcx-modal-headline]\").html(e);t.$el.find(\"[smcx-modal-message]\").html(i);t.$el.find(\"[smcx-btn-primary]\").html(o);t.$el.find(\"[smcx-btn-secondary]\").html(s);t.$el.find(\"[smcx-btn-primary]\").attr(\"href\",r);return t};t.insert=function(){SMCX.env.$parentBody.append(t.render().$el);n.insert.call(t);return t};t._setClasses=function(){n._setClasses.call(t);t.classes.off.push(\"smcx-modal-offset-bottom\");t.classes.off.push(\"smcx-transparent\");t.classes.on.push(\"smcx-opaque\")};t._bindEvents=function(){n._bindEvents.call(t);t.$el.find(\".smcx-modal-close\").on(\"click\",function(e){e.preventDefault();t.animateOut()});t.$el.find(\"[smcx-btn-primary]\").on(\"click\",function(e){t.animateOut()});t.$el.find(\"[smcx-btn-secondary]\").on(\"click\",function(e){e.preventDefault();t.animateOut()})}});SMCX.Sandbox.ModalSurveyWidgetView=SMCX.Sandbox.WidgetView.extend(function e(){var t=this;var n=SMCX.Sandbox.ModalSurveyWidgetView.prototype;t.templateName=\"modal_survey\";t.render=function(){n.render.call(t);var e,i;e=SMCX.escapeHTML(t.widget.headline);i=t.widget.parametrizedUrl(true);t.$el.find(\"[smcx-modal-headline]\").html(e);t.$el.find(\"iframe\").attr(\"src\",i);return t};t.insert=function(){SMCX.env.$parentBody.append(t.render().$el);n.insert.call(t);return t};t._setClasses=function(){n._setClasses.call(t);t.classes.off.push(\"smcx-modal-offset-bottom\");t.classes.off.push(\"smcx-transparent\");t.classes.on.push(\"smcx-opaque\")};t._bindEvents=function(){n._bindEvents.call(t);t.$el.find(\".smcx-modal-close\").on(\"click\",function(e){e.preventDefault();t.animateOut()})}});(function(e){if(!parent||!parent.SMCX||!parent.SMCX.env||!parent.window.SMCX.env){return}var t=parent.SMCX.env;if(t.NAME===\"test\"){e.onerror=e.parent.SMCX.onerror}t.trigger(\"smcx.container:sdkjs:loaded\",e);if(t.options.sandbox.init){SMCX.initialize({env:t.NAME,debug:t.DEBUG,data:t.options.sandbox.data,settings:t.settings,perf:parent.SMCX.PERF});if(t.options.sandbox.boot){if(SMCX.env.initialized){SMCX.boot()}}}})(window);',
                data: {
                    'sdk_css': ".smcx-widget{display:block;margin:0;padding:0 !important;position:static;z-index:999997;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-weight:100;font-size:13px;line-height:13px;color:black;opacity:1.0;transform:translate3d(0, 0, 0);-webkit-transition:all 300ms ease 0;-moz-transition:all 300ms ease 0;-ms-transition:all 300ms ease 0;-o-transition:all 300ms ease 0;transition:all 300ms ease 0}.smcx-widget,.smcx-widget *{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.smcx-widget-footer{position:relative;width:100%;height:35px;margin:0;padding:0 10px}.smcx-widget-footer>.smcx-branding{display:block;position:absolute;top:0;right:10px;width:300px;height:35px;line-height:35px;background-position:right 3px;background-attachment:scroll;background-repeat:no-repeat;cursor:pointer}.smcx-widget-footer>.smcx-branding>.smcx-powered-by{position:absolute;top:0;right:146px;height:35px;margin:0;padding:0;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:11px;font-weight:normal;line-height:35px;text-align:right}.smcx-embed{position:static !important;width:470px;height:295px;overflow:hidden;border:1px solid #ccc;background-color:#FFF;-webkit-border-top-left-radius:0;-webkit-border-top-right-radius:0;-webkit-border-bottom-right-radius:3px;-webkit-border-bottom-left-radius:3px;-moz-border-radius-topleft:0;-moz-border-radius-topright:0;-moz-border-radius-bottomright:3px;-moz-border-radius-bottomleft:3px;border-top-left-radius:0;border-top-right-radius:0;border-bottom-right-radius:3px;border-bottom-left-radius:3px}.smcx-embed-footer{-webkit-border-top-left-radius:0;-webkit-border-top-right-radius:0;-webkit-border-bottom-right-radius:3px;-webkit-border-bottom-left-radius:3px;-moz-border-radius-topleft:0;-moz-border-radius-topright:0;-moz-border-radius-bottomright:3px;-moz-border-radius-bottomleft:3px;border-top-left-radius:0;border-top-right-radius:0;border-bottom-right-radius:3px;border-bottom-left-radius:3px}.smcx-modal{position:fixed !important;width:470px;height:295px;left:50%;top:50%;margin:-147.5px 0 0 -235px;padding:0;background:#80802f;background:-webkit-gradient(linear, left top, left bottom, from(#BCD732), to(#B2CB2C));background:-moz-linear-gradient(center top, #BCD732 0%, #B2CB2C 100%);background:-moz-gradient(center top, #BCD732 0%, #B2CB2C 100%);border-radius:5px}.smcx-modal-header{position:relative;width:100%;height:35px;margin:0;padding:0 10px}.smcx-modal-header>.smcx-modal-title{height:35px;line-height:35px;margin:0;padding:0;font-size:14px;font-weight:bold;color:#FFFFFF}.smcx-modal-content{position:relative;height:250px;margin:0;padding:20px;background:white;-webkit-background-clip:padding-box;-moz-background-clip:padding-box;-webkit-border-radius:3px;-moz-border-radius:3px;-ms-border-radius:3px;border-radius:3px;background-clip:padding-box;overflow:none}.smcx-modal-content>.smcx-modal-h1{margin:20px 0 15px 0;padding:0;color:#000;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:28px;font-weight:normal;line-height:28px;text-align:center;word-wrap:break-word}.smcx-modal-content>.smcx-modal-p{color:#333;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:14px;font-weight:normal;line-height:18px;text-align:center;word-wrap:break-word}.smcx-iframe-container{height:100%;overflow:hidden;margin:0 !important}.smcx-modal-actions{position:absolute;bottom:10px;left:0;width:100%;height:57px;padding:10px 20px}.smcx-modal-close{position:absolute;top:10px;right:10px;width:16px;height:16px;background:#E8E8E8 url(\"https://prod.smassets.net/assets/responseweb/responseweb/1.0.0/assets/images/website/x.png\") 2px 2px scroll no-repeat;cursor:pointer;-webkit-background-clip:padding-box;-moz-background-clip:padding-box;-webkit-border-radius:3px;-moz-border-radius:3px;-ms-border-radius:3px;border-radius:3px;background-clip:padding-box;-webkit-transition:background-color 300ms ease 0;-moz-transition:background-color 300ms ease 0;-ms-transition:background-color 300ms ease 0;-o-transition:background-color 300ms ease 0;transition:background-color 300ms ease 0}.smcx-modal-close:hover{background-color:#C8C8C8}.smcx-modal-invitation>.smcx-modal-content{margin:10px 10px 0 10px}.smcx-modal-survey>.smcx-modal-content{margin:0 10px;padding:0}.smcx-btn{display:inline-block;margin-bottom:0;font-weight:bold;text-align:center;vertical-align:middle;cursor:pointer;background-image:none;border:1px solid transparent;white-space:nowrap;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;padding:8px 14px;font-size:14px;line-height:1.42857;-webkit-background-clip:padding-box;-moz-background-clip:padding-box;-webkit-border-radius:3px;-moz-border-radius:3px;-ms-border-radius:3px;border-radius:3px;background-clip:padding-box}.smcx-btn,.smcx-btn:hover{text-decoration:none}.smcx-btn-secondary{color:#333;background:gray;background:-webkit-gradient(linear, left top, left bottom, from(#F8F8F8), to(#E8E8E8));background:-moz-linear-gradient(center top, #F8F8F8 0%, #E8E8E8 100%);background:-moz-gradient(center top, #F8F8F8 0%, #E8E8E8 100%);border:none;-webkit-background-clip:padding-box;-moz-background-clip:padding-box;-webkit-border-radius:3px;-moz-border-radius:3px;-ms-border-radius:3px;border-radius:3px;background-clip:padding-box}.smcx-btn-secondary:hover{color:#333}.smcx-btn-primary{color:#FFF;background:#808036;background:-webkit-gradient(linear, left top, left bottom, from(#BED830), to(#86A33B));background:-moz-linear-gradient(center top, #BED830 0%, #86A33B 100%);background:-moz-gradient(center top, #BED830 0%, #86A33B 100%);border:none}.smcx-btn-primary:hover{color:#FFF;background:#808044;background:-webkit-gradient(linear, left top, left bottom, from(#c5dc45), to(#95b642));background:-moz-linear-gradient(center top, #c5dc45 0%, #95b642 100%);background:-moz-gradient(center top, #c5dc45 0%, #95b642 100%)}.smcx-widget-light .smcx-widget-footer>.smcx-branding{background-image:url(\"https://prod.smassets.net/assets/responseweb/responseweb/1.0.0/assets/images/website/sm-logo-grey-145x30.png\")}.smcx-widget-light .smcx-widget-footer>.smcx-branding>.smcx-powered-by{color:#60604A}.smcx-widget-dark .smcx-widget-footer>.smcx-branding{background-image:url(\"https://prod.smassets.net/assets/responseweb/responseweb/1.0.0/assets/images/website/sm-logo-white-145x30.png\")}.smcx-widget-dark .smcx-widget-footer>.smcx-branding>.smcx-powered-by{color:#FFF}.smcx-widget.smcx-hide-branding .smcx-embed-footer{display:none}.smcx-widget.smcx-hide-branding .smcx-modal-footer{height:10px}.smcx-widget.smcx-hide-branding .smcx-modal-footer>.smcx-branding{display:none}.smcx-show{display:block}.smcx-hide{display:none}.smcx-transparent{opacity:0.0 !important}.smcx-opaque{opacity:1.0 !important}.smcx-offscreen-top{top:-100px !important}.smcx-offscreen-bottom{bottom:-100px !important}.smcx-offscreen-left{left:-100px !important}.smcx-offscreen-right{right:-100px !important}.smcx-modal-offset-top{margin-top:-185px !important}.smcx-modal-offset-bottom{margin-top:-105px !important}.smcx-top{top:0}.smcx-bottom{bottom:0}.smcx-left{left:0}.smcx-right{right:0}.smcx-pull-left{float:left}.smcx-pull-right{float:right}\n",
                    'sdk_html': "<div data-type=\"text/x-smcx-template\" id=\"smcx_modal_invitation_template\">\n\n  <div class=\"smcx-widget smcx-modal smcx-modal-invitation smcx-hide\">\n    <div class=\"smcx-modal-content\">\n      <div smcx-modal-close class=\"smcx-modal-close\"></div>\n      <h1 smcx-modal-headline class=\"smcx-modal-h1\"></h1>\n\n      <p smcx-modal-message class=\"smcx-modal-p\"></p>\n\n      <div class=\"smcx-modal-actions smcx-clearfix\">\n        <a smcx-btn-secondary href=\"#\"\n           class=\"smcx-btn smcx-btn-secondary smcx-pull-left\"></a>\n        <a smcx-btn-primary href=\"#\" target=\"_blank\"\n           class=\"smcx-btn smcx-btn-primary smcx-pull-right\"></a>\n      </div>\n    </div>\n    <div class=\"smcx-widget-footer smcx-modal-footer\">\n      <a class=\"smcx-branding\" href=\"https://www.surveymonkey.com/?ut_source=powered_by&ut_source2=new_website_collector\" target=\"_blank\">\n        <span class=\"smcx-powered-by\">\n            powered by\n        </span>\n      </a>\n    </div>\n  </div>\n\n</div>\n\n<div data-type=\"text/x-smcx-template\" id=\"smcx_modal_survey_template\">\n\n  <div class=\"smcx-widget smcx-modal smcx-modal-survey smcx-hide\">\n    <div class=\"smcx-modal-header\">\n      <div smcx-modal-headline class=\"smcx-modal-title\"></div>\n      <div smcx-modal-close class=\"smcx-modal-close\"></div>\n    </div>\n\n    <div class=\"smcx-modal-content\">\n      <div class=\"smcx-iframe-container\">\n        <iframe width=\"100%\" height=\"100%\" frameborder=\"0\"\n                allowtransparency=\"true\"></iframe>\n      </div>\n    </div>\n\n    <div class=\"smcx-widget-footer smcx-modal-footer\">\n      <a class=\"smcx-branding\" href=\"https://www.surveymonkey.com/?ut_source=powered_by&ut_source2=new_website_collector\" target=\"_blank\">\n        <span class=\"smcx-powered-by\">\n            powered by\n        </span>\n      </a>\n    </div>\n  </div>\n\n</div>\n\n<div data-type=\"text/x-smcx-template\" id=\"smcx_embed_template\">\n\n  <div class=\"smcx-widget smcx-embed smcx-hide\">\n    <div class=\"smcx-iframe-container\">\n      <iframe width=\"100%\" height=\"100%\" frameborder=\"0\"\n              allowtransparency=\"true\"></iframe>\n    </div>\n    <div class=\"smcx-widget-footer smcx-embed-footer\">\n      <a class=\"smcx-branding\" href=\"https://www.surveymonkey.com/?ut_source=powered_by&ut_source2=new_website_collector\" target=\"_blank\">\n        <span class=\"smcx-powered-by\">\n            powered by\n        </span>\n      </a>\n    </div>\n  </div>\n\n</div>",
                    'widget_css': ".smcx-modal{width:98%;max-width:500px;height:300px;margin-left:-250px !important;margin-top:-150px !important;background:#282c34}.smcx-modal>.smcx-modal-content{max-width:480px;height:255px}@media (max-width: 500px){.smcx-modal{left:0 !important;margin-left:1% !important}}.smcx-modal.smcx-hide-branding>.smcx-modal-content{height:280px}.smcx-modal-actions>.smcx-btn-primary{background:#61dafb;color:#000}.smcx-modal-actions>.smcx-btn-secondary{background:#d0d2d3;color:#000}\n",
                    'widget_attrs': {"id": 0, "type": "ModalInvitationWidget", "url": "https://www.surveymonkey.com/r/CCPP62S", "sm_collector_id": 404685963, "collector_status": "open", "survey_url": "https://www.surveymonkey.com/r/CCPP62S", "allow_multiple_responses": false, "width": 500, "height": 300, "message": "Help us make the site even better by answering a few quick questions!", "bg_color_a": "#282c34", "bg_color_b": null, "branding_url": "https://www.surveymonkey.com/?ut_source=powered_by&ut_source2=new_website_collector", "hide_branding": true, "active": true, "primary_btn_bg_color_a": "#61dafb", "primary_btn_bg_color_b": null, "secondary_btn_bg_color_a": "#d0d2d3", "secondary_btn_bg_color_b": null, "primary_btn_text_color": "#000000", "secondary_btn_text_color": "#000", "primary_btn_text": "Give Feedback", "secondary_btn_text": "No Thanks", "sample_rate": "1", "token_version": 2, "headline": "How are we doing?"}
                }
            }
        });

        SMCX.boot();
    }

    
    
        wrapped.call(wrapped);
    

}());