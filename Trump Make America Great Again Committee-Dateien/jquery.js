/*
 * Shopify.Cart object.
 * version: 1.0 (29/05/2011)
 * @requires any version of jQuery
 *
 * Copyright 2011 Caroline Hill <mllegeorgesand@gmail.com>
 *
 * Instructions: https://github.com/carolineschnapp/limiter/blob/master/README.textile
 *
 * To use in Shopify to limit quantities of products ordered.
 *
 */

if((typeof Shopify)==="undefined"){Shopify={}}Shopify.Cart=(function(){var c={limitQuantity:1,limitPer:"product",limitProductHandles:[],limitSkipCartPage:false};var a="";var h=0;var d={};var f={};var e={};var g=function(k){return/^\s*function Array/.test(String(k.constructor))};var b=function(k){if(c.limitProductHandles.length){if(jQuery.inArray(k,c.limitProductHandles)===-1){return false}else{return true}}else{return true}};var j=function(){var k=false;jQuery("[name^=updates]").each(function(){var m=parseInt(jQuery(this).attr("id").replace("updates_",""),10);if(b(f[m])){switch(c.limitPer){case"product":if(k==false){var n=parseInt(jQuery(this).val(),10);var l=c.limitQuantity;l-=d[f[m]];l+=n;if(n>l){k=true;jQuery(this).val(Math.max(0,l))}}break;case"variant":if(parseInt(jQuery(this).val(),10)>c.limitQuantity){k=true;jQuery(this).val(c.limitQuantity)}break;case"order":if(k==false){var n=parseInt(jQuery(this).val(),10);var l=c.limitQuantity;l-=h;l+=n;if(n>l){k=true;jQuery(this).val(Math.max(0,l))}}break}}});if(k){jQuery('form[action="/cart"]').get(0).submit()}};var i=function(){var k=window.location.pathname;if(k.indexOf("/products/")!==-1){a=k.match(/\/products\/([a-z0-9\-]+)/)[1]}if(a!==""){jQuery.ajaxSetup({cache:false})}if(a!==""||k==="/cart"){jQuery.getJSON("/cart.js",function(n){var l=n.items;h=n.item_count;for(var m=0;m<l.length;m++){if(typeof d[l[m].handle]==="undefined"){d[l[m].handle]=l[m].quantity}else{d[l[m].handle]+=l[m].quantity}f[l[m].id]=l[m].handle;e[l[m].id]=l[m].quantity}if(k==="/cart"){j()}})}jQuery(function(){jQuery('form[action="/cart/add"]').unbind("submit").submit(function(p){if(b(a)){var o=jQuery(this).find("[name=quantity]");var q=parseInt(o.val(),10)||1;var l=parseInt(jQuery(this).find("[name=id]").val(),10);var m=0;switch(c.limitPer){case"product":m=d[a]||0;break;case"variant":m=e[l]||0;break;case"order":m=h;break}var n=c.limitQuantity-m;n=Math.min(n,q);if(n<0){n=0}if(o.size()===0){jQuery(this).append('<input type="hidden" name="quantity" value="'+n+'"></input>')}else{if(o.is("select")&&n===0){o.attr("disabled","disabled");jQuery(this).append('<input type="hidden" name="quantity" value="0"></input>')}else{o.val(n)}}}jQuery(this).find("[name=return_to]").remove();if(c.limitSkipCartPage){jQuery(this).append('<input type="hidden" name="return_to" value="/checkout"></input>')}return true});jQuery("[name^=updates]").change(function(){var m=parseInt(jQuery(this).attr("id").replace("updates_",""),10);if(b(f[m])){var n=parseInt(jQuery(this).val(),10);var l=c.limitQuantity;switch(c.limitPer){case"product":l-=d[f[m]];l+=e[m];if(n>l){jQuery(this).val(l)}break;case"variant":if(n>c.limitQuantity){jQuery(this).val(c.limitQuantity)}break;case"order":l-=h;l+=e[m];if(n>l){jQuery(this).val(l)}break}}jQuery('form[action="/cart"]').get(0).submit()})})};return{limit:function(l){l=l||{};if(typeof l.limitQuantity!=="undefined"){l.limitQuantity=parseInt(l.limitQuantity,10);if(isNaN(l.limitQuantity)){l.limitQuantity=1}}if(typeof l.limitPer!=="undefined"){var k=["product","variant","order"];if(jQuery.inArray(l.limitPer,k)===-1){l.limitPer="product"}}if(typeof l.limitProductHandles!=="undefined"){if(!g(l.limitProductHandles)){l.limitProductHandles=jQuery.trim(l.limitProductHandles.toString()).split(/[\s,;]+/)}if(l.limitProductHandles[0]===""){l.limitProductHandles=[]}}if(typeof l.limitSkipCartPage!=="boolean"){l.limitSkipCartPage=false}jQuery.extend(c,l);i()},getConfig:function(){return c},getLimitQuantity:function(){return c.limitQuantity},getLimitPer:function(){return c.limitPer},getLimitProductHandles:function(){return c.limitProductHandles},getLimitSkipCartPage:function(){return c.limitSkipCartPage},setProductHandle:function(k){if(k&&typeof k==="string"){a=k}}}})();