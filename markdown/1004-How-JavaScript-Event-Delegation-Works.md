/*<<

 Title: How JavaScript Event Delegation Works
 Date: 2014-06-25 11:34:26
 Tags: javaScript, Event Delegation
 Category: Front
 Sources:
   event-delegate: http://davidwalsh.name/event-delegate
>>*/

原文： http://davidwalsh.name/event-delegate

在JavaScript的世界里，事件代理是一种炙手可热的得方法，这是有充足理由得．事件代理允许你避免添加事件监听器到特别的节点，取而代之得是，一个事件监听器添加到一个父节点．这个事件监听器分析冒泡事件找到匹配得子元素．基本概念相当简单，但是很多人不明白事件代理时这样工作的．让我来解释事件代理是如何工作的，并提供纯JavaScript的基本事件代理例子．

现在我们有一个父元素UL，和几个子元素：

<pre class="prettyprint">
<ul id="parent-list">
	<li id="post-1">Item 1</li>
	<li id="post-2">Item 2</li>
	<li id="post-3">Item 3</li>
	<li id="post-4">Item 4</li>
	<li id="post-5">Item 5</li>
	<li id="post-6">Item 6</li>
</ul>
</pre>

让我们来说说将要发生得事情，当每个子元素被点击．你应该为每个li元素添加单独得事件监听器，但是如果li元素会频繁得从列表中添加和移除．添加和移除事件监听器将是噩梦，特别是添加和移除的代码在你应用得不同地方．更好得解决方法时给父元素ul添加一个事件监听器．但是加入你给父元素添加了事件监听器，你如何知道时哪个子元素被点击了呢？

简单：当事件冒泡到ul元素时，你检查事件对象得target属性来获得实际被点击得节点得引用．这里有一个非常简单得JavaScript片段来说明事件代理．

<pre class="prettyprint">
// Get the element, add a click listener...
document.getElementById("parent-list").addEventListener("click",function(e) {
	// e.target is the clicked element!
	// If it was a list item
	if(e.target && e.target.nodeName == "LI") {
		// List item found!  Output the ID!
		console.log("List item ",e.target.id.replace("post-", "")," was clicked!");
	}
});
a < b
</pre>

开始给父元素添加事件监听器，当事件监听器触发是，检查事件元素确保元素类型是需要得．假如这是一个LI元素，欢呼：我们拿到了我们需要得！加入没有一个元素是我们需要得，这个事件会被忽略掉．这个例子相当简单．－－UL和LI是一个直线的比较．让我们试一试一些困难得．让我们有一个父DIV有许多子元素，当是我们只关心一个有＂classA＂CSS类的A标签:

<pre class="prettyprint">
// Get the parent DIV, add click listener...
document.getElementById("myDiv").addEventListener("click",function(e) {
	// e.target was the clicked element
	if(e.target && e.target.nodeName == "A") {
		// Get the CSS classes
		var classes = e.target.className.split(" ");
		// Search for the CSS class!
		if(classes) {
			// For every CSS class the element has...
			for(var x = 0; x < classes.length; x++) {
				// If it has the CSS class we want...
				if(classes[x] == "classA") {
					// Bingo!
					console.log("Anchor element clicked!");
					
					
					// Now do something here....
					
					
					
				}
			}
		}
		
	}
});
</pre>

上面得例子中不仅需要匹配标签，还匹配了CSS类．这有点复杂了，当在一个巨大规模事情里仍然很简单了．举个例子，假如Ａ元素有一个SPAN标签在里面，SPAN标签是目标元素．这种情况下我们需要从DOM树里找包含A.classA得元素．

因为许多开发人员使用JavaScript库来操作DOM元素和事件，我推荐使用库的事件代理方法，因为它们能捕获高级得代理和元素．

希望这能帮助你看到事件代理背后得概念和认识它得力量．

