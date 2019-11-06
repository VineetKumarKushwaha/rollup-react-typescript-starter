
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
    typeof define === 'function' && define.amd ? define(['react'], factory) :
    (global = global || self, global.demo = factory(global.React));
}(this, (function (React) { 'use strict';

    React = React && React.hasOwnProperty('default') ? React['default'] : React;

    var promiseSettled = function (args) { return Promise.all(args.map(function (promise) { return promise.then(function (data) { return ({ data: data, isRejected: false }); }, function (error) { return ({ error: error, isRejected: true }); }); })); };

    var styles = {"bold":"index_bold__30CiK","italic":"index_italic__1MINR"};

    var VerySimpleComponent = function (props) { return React.createElement("p", null, props.title); };
    var SimpleComponent = function () {
        var _a = React.useState(true), flag = _a[0], toggleFlag = _a[1];
        return React.createElement("h1", { onClick: function () { return toggleFlag(!flag); }, className: flag ? styles.bold : styles.italic },
            "Simple component",
            React.createElement(VerySimpleComponent, { title: "Hello" }));
    };

    var style = {"someSelector":"css_someSelector__3u2nO"};

    var styles$1 = {"prefix":"demo_prefix__CwzMi"};

    var index = {
        component: SimpleComponent,
        someStyle: style.someSelector + styles$1.prefix,
        settled: promiseSettled
    };

    return index;

})));
//# sourceMappingURL=index.js.map
