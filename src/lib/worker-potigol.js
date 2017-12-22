importScripts("worker-base.js");
ace.define('ace/worker/worker-potigol',["require","exports","module","ace/lib/oop","ace/worker/mirror"], function(require, exports, module) {
    "use strict";

    var oop = require("ace/lib/oop");
    var Mirror = require("ace/worker/mirror").Mirror;

    var PotigolWorker = function(sender) {
        Mirror.call(this, sender);
        this.setTimeout(200);
        this.$dialect = null;
    };

    oop.inherits(PotigolWorker, Mirror);

    (function() {

        this.onUpdate = function() {
            var value = this.doc.getValue();
            var annotations = validate(value);
            this.sender.emit("annotate", annotations);
        };

    }).call(PotigolWorker.prototype);

    exports.PotigolWorker = PotigolWorker;
});

var validate = function(input) {
    return [ { row: 0, column: 0, text: "MyMode says Hello!", type: "error" } ];
};