# @SmileSun 基于zTree和jQuery封装的仿QQ添加群成员功能树图插件
## 使用方法
## 在页面引入相关文件

## css
```
	<link rel="stylesheet" href="./css/zTreeStyle.css" type="text/css">
	<link rel="stylesheet" href="./css/tree.css">
```

## javascript
```
	<script type="text/javascript" src="./js/jquery-2.2.3.min.js"></script>
	<script type="text/javascript" src="./js/jquery.ztree.core.js"></script>
	<script type="text/javascript" src="./js/jquery.ztree.excheck.js"></script>
	<script type="text/javascript" src="./js/tree.js"></script>
```
## 页面html结构如下
```
<div class="content_wrap">
		<div class="zTreeDemoBackground left">
			<div class="input-search">
				<input type="text" placeholder="输入关键字查询" id="filter-text" class="empty" /><span style="color:red;font-size:12px;position:absolute;left:0;right:0;top:40px;display:none;" class="no-data">查找不到结果~</span>
			</div>
			<div class="tree-content">
				<ul id="treeDemo" class="ztree"></ul>
			</div>
		</div>
		<div class="right">
			<ul class="choose-content">
			</ul>
		</div>
	</div>
```

## 初始化插件
`var tree = $("selector").TransferTree(params);`

## 配置参数selector,params
字段|参数值
-|-|
selector|树图id
params| Object 参数对象{zNodes:[],setting:{}}
zNodes| Array 树图zNodes值
setting|Object 树图配置项
## api
api名称|api用途
-|-|
getzTree|拿取树图对象
resetData|重置选中值
getCheckData|获取已选中值

## 使用示范
```
		//拿取树图对象
		var tree = $("#treeDemo").TransferTree({
			zNodes:zNodes
		});
		//通过树节点id拿取所有选中的节点id数组[0,1,2,3]
		var getData = tree.getCheckData('id');
		//点击确认后拿取所有选中节点obj数组对象[{},{}]
		var getData2 = tree.getCheckData('obj');
```



