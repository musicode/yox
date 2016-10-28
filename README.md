# Cola

[![Build Status](https://travis-ci.org/musicode/cola.svg?branch=master)](https://travis-ci.org/musicode/cola) [![Coverage Status](https://coveralls.io/repos/github/musicode/cola/badge.svg)](https://coveralls.io/github/musicode/cola)

从面向未来和移动优先的考虑，Cola 采用 ES6 编写。

为了适配低版本浏览器，需要实现以下几个的 ES5 方法：

* Date.now()
* Object.keys()
* String.prototype.trim
* String.prototype.startsWith
* String.prototype.endsWith
* Array.prototype.forEach
* Array.prototype.indexOf
* Array.prototype.reduce

## 结构

```javascript
new Cola({
    el: '',
    template: '',
    data: {},
    computed: {},
    watchers: {},
    components: {},
    partials: {},
    filters: {},
    methods: {},
    oninit: function,
    oncompile: function,
    onattach: function,
    onupdate: function,
    ondetach: function,
})
```

## 模板

我们选择了 `Mustache` 风格。

### 插值

```
{{variable}}
```

### 不转义插值

```
{{{variable}}}
```

### 判断

```
{{#if condition}}
    ...
{{else if condition}}
    ...
{{/if}}
```

### 循环数组

```
{{#each array}}
	...
{{/each}}
```

如果需要用数组下标，加上 `:index`。

```
{{#each array:index}}
	...
{{/each}}
```

如果数组的每一项是基本类型，则用 `this` 表示当前项。

```
{{#each array}}
	{{this}}
{{/each}}
```

### 循环对象

在实现**循环数组**的时候，顺便实现了循环对象，因此语法相同。

```
{{#each object:key}}
	...
{{/each}}
```

### 定义子模板

```
{{#partial name}}
	...
{{/each}}
```

### 导入子模板

```
{{> name}}
```

### 函数调用

```
{{formatDate(date)}}
```

### 特殊变量

当触发事件时，可用 `$event` 表示当前事件对象，如下：

```html
<button @click="submit($event)">
    submit
</button>
```

在模板的任何位置，可用 `$keypath` 表示当前的 keypath（后面细说），如下：

```html
{{#each array}}
	{{$keypath}}
{{/each}}
```

## 表达式

Cola 中的表达式符合 js 语法，并无扩展。

为了限制复杂度，我们限定只能使用一元、二元和三目运算符。

为了满足扩展的需求（比如过滤器），我们实现了函数调用。


## 须知

### html 属性必须有引号

为了项目的代码风格保持一致，html 属性值必须有引号。

建议使用双引号，但在某些特殊场景下，如属性值带有双引号，可使用单引号。

```html
<div id="app">

</div>
```

### 组件标签名称限定两种格式

为了减少无谓的代码量，我们约定组件标签名称只能是如下两种格式：

* 包含大写字母，如 `<AppHeader prop="value" />`
* 包含连字符，如 `<app-header prop="value" />`

是否以 `/>` 结尾不是必须的，项目可自行决定（反正都无视）。

> 虽然 html 标签大小写不敏感，但是作为一个专业的前端，`<div>` 非要写成 `<DIV>`，那只能说我们不合适。

### 组件必须有一个根元素

为了保证组件有一个稳定的 DOM 元素（生命周期内一直存在），必须有根元素。

```html
<div class="root">
  {{#if username}}
    hi, {{username}}!
  {{/if}}
</div>
```

不能写成如下形式，因为判断条件一旦变化，DOM 元素也变了，这样不利于后续很多工作的展开，比如事件代理。

```html
{{#if username}}
  <div class="root">
    hi, {{username}}!
  </div>
{{else}}
  <div class="root">
    sign in.
  </div>
{{/if}}
```

### 用户的使用常识

我们假定用户有基本常识，如 IE8- 不能用 svg，用户需要对自己的行为负责。
