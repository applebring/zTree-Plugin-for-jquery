if (window.jQuery || window.Zepto) {
	(function ($) {
		var transfertree = function (selector, config) {
			/*
			高亮样式设置
			*/
			function getFontCss(treeId, treeNode) {
				return (!!treeNode.highlight) ? {
					color: "#A60000",
					"font-weight": "bold"
				} : {
					color: "#333",
					"font-weight": "normal"
				};
			}
			/*
				zNodes:树图数据,
				filter：搜索关键字
				setting:树图配置
			 */
			var defaults = {
				zNodes: [],
				filter: "",
				setting: {
					check: {
						enable: true
					},
					data: {
						simpleData: {
							enable: true
						}
					},
					view: {
						fontCss: getFontCss
					},
					callback: {
						onClick: this.clickFn,
						onCheck:this.checkFn
					}
				}
			}
			this.option = $.extend(defaults, config);
			this.$ztreeid = $(selector).attr("id");
			this.$ztree = $(selector);	
			this.$inittree = $.fn.zTree.init(this.$ztree, this.option.setting, this.option.zNodes);
			this.$getzTree = $.fn.zTree.getZTreeObj(this.$ztreeid);
			// this.checkFn();
			return this;
		}
		transfertree.prototype = {
			getzTree: function () {
				return this.$getzTree;
			},
			init:function(){ 
				this.checkFn();
				this.removeData();
				this.searchData();
			},
			clickFn: function (event, treeId, treeNode) {
				//将点击事件与复选框事件关联
				var zTree = $.fn.zTree.getZTreeObj("treeDemo");
				zTree.checkNode(treeNode, !treeNode.checked, true);
				checkChangeFn(event, treeId, treeNode);
				var curSelect = $ztree.find(".curSelectedNode"); //控制选中项背景样式
				treeNode.checked == true ? (curSelect.hasClass("unactive") ? curSelect.removeClass("unactive") : '') : curSelect.addClass("unactive");
			},
			/*主要功能：将点击事件与checked事件关联，判断是否最后一个元素，如果是，将最后一个元素放入渲染数组，再将数组渲染到右侧
				eventjs event 对象
				treeIdString  对应 zTree 的 treeId，便于用户操控
				treeNodeJSON  被点击的节点 JSON 数据对象
			*/
			checkFn: function (event, treeId, treeNode) {
			 	var _this =this;
				var zTree = (this.$getzTree?this.$getzTree:_this.getZTreeObj(treeId));//this
				var rightArr = [];
				var checkedNode = zTree.getCheckedNodes(true);
				$.each(checkedNode, function (i, item) {
					if (!item.isParent) { /*item.isLastNode判断结点是否为最后一个结点*/
						rightArr.push(item);
					}
				});
				var rhtml = "";
				$.each(rightArr, function (i, item) {
					rhtml += "<li data-item='" + JSON.stringify(item) + "'><span>" + item.name + "</span><span class='close'>x</span></li>";
				});
				$(".choose-content").html(rhtml);
			},
			resetData: function () {

			},
			getCheckData:function(){
				
			},
			removeData:function(){
				var zTree =this.getzTree();
				//右侧选框删除事件
				$(".choose-content").on("click", ".close", function () {
					var tId = $(this).parent("li").data("item").tId;
					//通过id找到节点，改变状态
					zTree.checkNode(zTree.getNodeByTId(tId), false, true);
					//移除元素
					$(this).parent("li").remove();
				});
			},
			searchData:function(){
				var zTree =this.getzTree();
				/*
				搜索树节点，如果找到则高亮显示，没找到提示
				*/
				function updateNodes(highlight, nodeList) {
					if($("#filter-text").val()!=""){zTree.expandAll(false);}//先折叠所有节点，再展开相应的节点
					for (var i = 0, l = nodeList.length; i < l; i++) {
						nodeList[i].highlight = highlight;
						zTree.expandNode(nodeList[i].getParentNode(), true, false, false); //将搜索到的节点的父节点展开
						zTree.updateNode(nodeList[i]);
					}
				}
				function searchNode() {
					var filter = $("#filter-text").val();
					var filterArr = zTree.getNodesByParamFuzzy("name", filter, null);;
					if (filter === ""){updateNodes(false,filterArr);$(".no-data").css("display","none");return;};
					if(filter!=""&&filterArr.length==0){$(".no-data").css("display","block");}else{$(".no-data").css("display","none");}
					updateNodes(true, filterArr);
				}
				/*输入框添加输入监听*/
				$("#filter-text").on("propertychange", searchNode).on("input", searchNode);
			}
		}
		$.fn.TransferTree = function (params) {
			var that = $(this);
			var instance = new transfertree(that[0], params);
			instance.init();
			return that;
		}
	})(window.jQuery || window.Zepto);
}