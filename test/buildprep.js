(function prep() {
    "use strict";
    var node  = {
            child: require("child_process").exec
        },
        msg   = "",
        delay = function prep_delay() {
            setTimeout(function prep_delay_timeout() {
                if (msg === "") {
                    console.log("Waiting...");
                    prep_delay();
                } else {
                    console.log(msg);
                }
            }, 1000);
        };
    node.child("git clone https://github.com/prettydiff/biddle.git", function prep_clone(cer, stdcout, stdcer) {
        if (cer !== null && cer.toString().indexOf("Cloning into 'biddle'...") < 0) {
            msg = cer;
            console.log("cer");
            return console.log(cer);
        }
        if (stdcer !== null && stdcer !== "" && stdcer.toString().indexOf("Cloning into 'biddle'...") < 0) {
            msg = stdcer;
            console.log("stdcer");
            return console.log(stdcer);
        }
        console.log("biddle clone complete!");
        node.child("node biddle global", {cwd:"biddle"}, function prep_clone_global(ger, stdgout, stdger) {
            if (ger !== null) {
                msg = ger;
                console.log("ger");
                return console.log(ger);
            }
            if (stdger !== null && stdger !== "") {
                msg = stdger;
                console.log("stdger");
                return console.log(stdger);
            }
            console.log("biddle global complete!");
            node.child("biddle install http://prettydiff.com/downloads/jslint/jslint_latest.zip", function prep_clone_global_install(ier, stdiout, stdier) {
                var test = require("./lint.js");
                if (ier !== null) {
                    msg = ier;
                    console.log("ier");
                    return console.log(ier);
                }
                if (stdier !== null && stdier !== "") {
                    msg = stdier;
                    console.log("stdier");
                    return console.log(stdier);
                }
                msg = "jslint installed by biddle";
                console.log("Pretty Diff test execute!");
                test();
                return [stdcout, stdgout, stdiout];
            });
        });
    });
    delay();
}());