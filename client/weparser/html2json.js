var HTMLParser = require('htmlparser.js');

// Empty Elements - HTML 5
var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr");

// Block Elements - HTML 5
var block = makeMap("a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video");

// Inline Elements - HTML 5
var inline = makeMap("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");

// Elements that you can, intentionally, leave open
// (and which close themselves)
var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

// Attributes that have their values filled in disabled="disabled"
var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");

// Special Elements (can contain anything)
var special = makeMap("script,style");

function q(v) {
  return '"' + v + '"';
}

const DEBUG = false;
var debug = DEBUG ? console.log.bind(console) : function () { };

function removeDOCTYPE(html) {
  return html
    .replace(/<\?xml.*\?>\n/, '')
    .replace(/<!doctype.*\>\n/, '')
    .replace(/<!DOCTYPE.*\>\n/, '');
}

function html2json(html) {
  html = removeDOCTYPE(html);
  var bufArray = [];
  var results = {
    node: 'root',
    child: [],
  };
  HTMLParser(html, {
    start: function (tag, attrs, unary) {
      // node for this element
      var node = {
        node: 'element',
        tag: tag,
      };

      if (block[tag]) {
        node.tagType = "block";
      } else if (inline[tag]) {
        node.tagType = "inline";
      } else if (closeSelf[tag]) {
        node.tagType = "closeSelf";
      }

      if (attrs.length !== 0) {
        node.attr = attrs.reduce(function (pre, attr) {
          var name = attr.name;
          var value = attr.value;

          if (name == 'class') {
            // console.dir(value);
            // value = value.join("")
            node.classStr = value;
          }
          // has multi attibutes
          // make it array of attribute
          if (name == 'style') {
            // console.dir(value);
            // value = value.join("")
            node.styleStr = value;
          }

          // has multi attibutes
          // make it array of attribute
          if (value.match(/ /)) {
            value = value.split(' ');
          }

          // if attr already exists
          // merge it
          if (pre[name]) {
            if (Array.isArray(pre[name])) {
              // already array, push to last
              pre[name].push(value);
            } else {
              // single value, make it array
              pre[name] = [pre[name], value];
            }
          } else {
            // not exist, put it
            pre[name] = value;
          }

          return pre;
        }, {});
      }
      if (unary) {
        // if this tag dosen't have end tag
        // like <img src="hoge.png"/>
        // add to parents
        var parent = bufArray[0] || results;
        if (parent.child === undefined) {
          parent.child = [];
        }
        parent.child.push(node);
      } else {
        bufArray.unshift(node);
      }
    },
    end: function (tag) {
      // merge into parent tag
      var node = bufArray.shift();
      if (node.tag !== tag) console.error('invalid state: mismatch end tag');

      if (bufArray.length === 0) {
        results.child.push(node);
      } else {
        var parent = bufArray[0];
        if (parent.child === undefined) {
          parent.child = [];
        }
        parent.child.push(node);
      }
    },
    chars: function (text) {
      var node = {
        node: 'text',
        text: text,
      };
      if (bufArray.length === 0) {
        results.child.push(node);
      } else {
        var parent = bufArray[0];
        if (parent.child === undefined) {
          parent.child = [];
        }
        parent.child.push(node);
      }
    },
    comment: function (text) {
      debug(text);
      var node = {
        node: 'comment',
        text: text,
      };
      var parent = bufArray[0];
      if (parent.child === undefined) {
        parent.child = [];
      }
      parent.child.push(node);
    },
  });
  return results;
};

function makeMap(str) {
  var obj = {}, items = str.split(",");
  for (var i = 0; i < items.length; i++)
    obj[items[i]] = true;
  return obj;
}

module.exports = html2json;
