!function() {
        function getVariable(a) {
            return a.replace(REMOVE_RE, "").replace(SPLIT_RE, ",").replace(KEYWORDS_RE, "").replace(NUMBER_RE, "").replace(BOUNDARY_RE, "").split(SPLIT2_RE)
        }
        function stringify(a) {
            return "'" + a.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'"
        }
        function compiler(source, options) {
            function html(a) {
                return line += a.split(/\n/).length - 1,
                compress && (a = a.replace(/\s+/g, " ").replace(/<!--[\w\W]*?-->/g, "")),
                a && (a = replaces[1] + stringify(a) + replaces[2] + "\n"),
                    a
            }
            function logic(a) {
                var c,
                    d,
                    b = line;
                return parser ? a = parser(a, options) : debug && (a = a.replace(/\n/g,
                    function() {
                        return line++,
                        "$line=" + line + ";"
                    })),
                0 === a.indexOf("=") && (c = escape && !/^=[=#]/.test(a), a = a.replace(/^=[=#]?|[\s;]*$/g, ""), c ? (d = a.replace(/\s*\([^\)]+\)/, ""), utils[d] || /^(include|print)$/.test(d) || (a = "$escape(" + a + ")")) : a = "$string(" + a + ")", a = replaces[1] + a + replaces[2]),
                debug && (a = "$line=" + b + ";" + a),
                    forEach(getVariable(a),
                        function(a) {
                            if (a && !uniq[a]) {
                                var b;
                                b = "print" === a ? print: "include" === a ? include: utils[a] ? "$utils." + a: helpers[a] ? "$helpers." + a: "$data." + a,
                                    headerCode += a + "=" + b + ",",
                                    uniq[a] = !0
                            }
                        }),
                a + "\n"
            }
            var code,
                debug = options.debug,
                openTag = options.openTag,
                closeTag = options.closeTag,
                parser = options.parser,
                compress = options.compress,
                escape = options.escape,
                line = 1,
                uniq = {
                    $data: 1,
                    $filename: 1,
                    $utils: 1,
                    $helpers: 1,
                    $out: 1,
                    $line: 1
                },
                isNewEngine = "".trim,
                replaces = isNewEngine ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"],
                concat = isNewEngine ? "$out+=text;return $out;": "$out.push(text);",
                print = "function(){var text=''.concat.apply('',arguments);" + concat + "}",
                include = "function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);" + concat + "}",
                headerCode = "'use strict';var $utils=this,$helpers=$utils.$helpers," + (debug ? "$line=0,": ""),
                mainCode = replaces[0],
                footerCode = "return new String(" + replaces[3] + ");";
            forEach(source.split(openTag),
                function(a) {
                    var b,
                        c;
                    a = a.split(closeTag),
                        b = a[0],
                        c = a[1],
                        1 === a.length ? mainCode += html(b) : (mainCode += logic(b), c && (mainCode += html(c)))
                }),
                code = headerCode + mainCode + footerCode,
            debug && (code = "try{" + code + "}catch(e){" + "throw {" + "filename:$filename," + "name:'Render Error'," + "message:e.message," + "line:$line," + "source:" + stringify(source) + ".split(/\\n/)[$line-1].replace(/^\\s+/,'')" + "};" + "}");
            try {
                return eval("var Render = function($data, $filename){" + code + "};"),
                    Render.prototype = utils,
                    Render
            } catch(e) {
                throw e.temp = "function anonymous($data,$filename) {" + code + "}",
                    e
            }
        }
        var defaults,
            cacheStore,
            renderFile,
            toString,
            escapeMap,
            escapeFn,
            escapeHTML,
            isArray,
            each,
            utils,
            helpers,
            showDebugInfo,
            compile,
            forEach,
            KEYWORDS,
            REMOVE_RE,
            SPLIT_RE,
            KEYWORDS_RE,
            NUMBER_RE,
            BOUNDARY_RE,
            SPLIT2_RE,
            template = function(a, b) {
                return "string" == typeof b ? compile(b, {
                    filename: a
                }) : renderFile(a, b)
            };
        template.version = "3.0.0",
            template.config = function(a, b) {
                defaults[a] = b
            },
            defaults = template.defaults = {
                openTag: "<%",
                closeTag: "%>",
                escape: !0,
                cache: !0,
                compress: !1,
                parser: null
            },
            cacheStore = template.cache = {},
            template.render = function(a, b) {
                return compile(a, b)
            },
            renderFile = template.renderFile = function(a, b) {
                var c = template.get(a) || showDebugInfo({
                        filename: a,
                        name: "Render Error",
                        message: "Template not found"
                    });
                return b ? c(b) : c
            },
            template.get = function(a) {
                var b,
                    c,
                    d;
                return cacheStore[a] ? b = cacheStore[a] : "object" == typeof document && (c = document.getElementById(a), c && (d = (c.value || c.innerHTML).replace(/^\s*|\s*$/g, ""), b = compile(d, {
                    filename: a
                }))),
                    b
            },
            toString = function(a, b) {
                return "string" != typeof a && (b = typeof a, "number" === b ? a += "": a = "function" === b ? toString(a.call(a)) : ""),
                    a
            },
            escapeMap = {
                "<": "&#60;",
                ">": "&#62;",
                '"': "&#34;",
                "'": "&#39;",
                "&": "&#38;"
            },
            escapeFn = function(a) {
                return escapeMap[a]
            },
            escapeHTML = function(a) {
                return toString(a).replace(/&(?![\w#]+;)|[<>"']/g, escapeFn)
            },
            isArray = Array.isArray ||
            function(a) {
                return "[object Array]" === {}.toString.call(a)
            },
            each = function(a, b) {
                var c,
                    d;
                if (isArray(a)) for (c = 0, d = a.length; d > c; c++) b.call(a, a[c], c, a);
                else for (c in a) b.call(a, a[c], c)
            },
            utils = template.utils = {
                $helpers: {},
                $include: renderFile,
                $string: toString,
                $escape: escapeHTML,
                $each: each
            },
            template.helper = function(a, b) {
                helpers[a] = b
            },
            helpers = template.helpers = utils.$helpers,
            template.onerror = function(a) {
                var c,
                    b = "Template Error\n\n";
                for (c in a) b += "<" + c + ">\n" + a[c] + "\n\n";
                "object" == typeof console && console.error(b)
            },
            showDebugInfo = function(a) {
                return template.onerror(a),
                    function() {
                        return "{Template Error}"
                    }
            },
            compile = template.compile = function(a, b) {
                function g(c) {
                    try {
                        return new e(c, d) + ""
                    } catch(f) {
                        return b.debug ? showDebugInfo(f)() : (b.debug = !0, compile(a, b)(c))
                    }
                }
                var c,
                    d,
                    e;
                b = b || {};
                for (c in defaults) void 0 === b[c] && (b[c] = defaults[c]);
                d = b.filename;
                try {
                    e = compiler(a, b)
                } catch(f) {
                    return f.filename = d || "anonymous",
                        f.name = "Syntax Error",
                        showDebugInfo(f)
                }
                return g.prototype = e.prototype,
                    g.toString = function() {
                        return e.toString()
                    },
                d && b.cache && (cacheStore[d] = g),
                    g
            },
            forEach = utils.$each,
            KEYWORDS = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",
            REMOVE_RE = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,
            SPLIT_RE = /[^\w$]+/g,
            KEYWORDS_RE = new RegExp(["\\b" + KEYWORDS.replace(/,/g, "\\b|\\b") + "\\b"].join("|"), "g"),
            NUMBER_RE = /^\d[^,]*|,\d[^,]*/g,
            BOUNDARY_RE = /^,+|,+$/g,
            SPLIT2_RE = /^$|,+/,
            "function" == typeof define ? define(function() {
                return template
            }) : "undefined" != typeof exports ? module.exports = template: this.template = template
    } ();
var getPositionLite = function(el) {
    var x = 0,
        y = 0;
    while (el) {
        x += el.offsetLeft || 0;
        y += el.offsetTop || 0;
        el = el.offsetParent

    }
    return {
        x: x,
        y: y

    }

};
