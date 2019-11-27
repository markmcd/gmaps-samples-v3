load("@npm//nunjucks-cli:index.bzl", npm_nunjucks="nunjucks")
load("@build_bazel_rules_nodejs//:index.bzl", "nodejs_binary")


def nunjucks():
    [ _nunjucks(jsfiddle) for jsfiddle in [False, True] ]

def _nunjucks(jsfiddle):
    _html = "_html_jsfiddle" if jsfiddle else "_html"
    html = "html_jsfiddle" if jsfiddle else "html"
    out = "jsfiddle.html" if jsfiddle else "index.html"

    if jsfiddle:
        nodejs_binary(
            name = "json",
            entry_point = "@npm//:node_modules/json/lib/json.js",
        )
        
        native.genrule(
            name="_data_jsfiddle_file",
            cmd="./$(location json) -f $(location data.json) -e 'this.jsfiddle=true' > $@",
            srcs=[":data.json"],
            tools=[":json"],
            outs=["_data_jsfiddle.json"],
            local=1
        )
        
        _data = "_data_jsfiddle.json"
    else:
        _data = "data.json"

    npm_nunjucks(
        name = _html,
        args = [
            "$(location src/index.njk)",
            "-p",
            ".",
            "$(location {})".format(_data), 
            "--out",
            "$@"       
        ],
        data = [
            ":src/index.njk",
            _data, 
            "//shared:templates"
            
        ],
        output_dir = True
    )

    # this genrule moves the generated html file to the correct location
    # nunjucks-cli does not allow specifying a single output file
    # nunjucks-cli converts the .njk to a .html by default
    # TODO: consider an alias? wrap nodejs_binary in genrule?
    native.genrule(
        name=html,
        srcs=[_html],
        cmd="cat $(location {})/{}/src/index.html > $@".format(_html, native.package_name()),
        outs=[out],
        visibility= ["//visibility:public"]
    ) 