this["JST"] = this["JST"] || {};
this["JST"]["addTask"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<input type=\"text\" id=\"new-todo\" placeholder=\"What needs to be done?\" />\n<input type=\"checkbox\" id=\"toggle-all\">";
},"useData":true});
this["JST"]["remove-completed"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<button id=\"clear-completed\">\n     Clear completed ("
    + this.escapeExpression(this.lambda((depth0 != null ? depth0.length : depth0), depth0))
    + ")\n</button>";
},"useData":true});
this["JST"]["task-item"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return " checked ";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<input type=\"checkbox\" class=\"toggle\" "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.completed : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">\n<form><input type=\"text\" class=\"edit\" value=\""
    + alias3(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"content","hash":{},"data":data}) : helper)))
    + "\"></form><label class=\"read\">"
    + alias3(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"content","hash":{},"data":data}) : helper)))
    + "</label><button class=\"destroy\"></button>";
},"useData":true});
this["JST"]["task-list"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<input type=\"checkbox\" id=\"toggle-all\">";
},"useData":true});
this["JST"]["tasks-remaining"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<strong class=\"todos-left\">"
    + this.escapeExpression(this.lambda((depth0 != null ? depth0.length : depth0), depth0))
    + "</strong> todos left";
},"useData":true});