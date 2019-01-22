	$(function () {
			page.init();
		});
		var page = (function () {
			var treeInit = function () {
				/*
				渲染数组到右侧
				arr:  渲染的数组
				*/
				function renderData(arr) {

				}
				/*主要功能：将点击事件与checked事件关联，判断是否最后一个元素，如果是，将最后一个元素放入渲染数组，再将数组渲染到右侧
				eventjs event 对象
				treeIdString  对应 zTree 的 treeId，便于用户操控
				treeNodeJSON  被点击的节点 JSON 数据对象
				*/
				function checkChangeFn(event, treeId, treeNode) {
					var rightArr = [];
					var checkedNode = zTree.getCheckedNodes(true);
					$.each(checkedNode, function (i, item) {
						if (!item.isParent) {/*item.isLastNode判断结点是否为最后一个结点*/
							rightArr.push(item);
						}
					});
					var rhtml = "";
					$.each(rightArr, function (i, item) {
						rhtml += "<li data-item='" + JSON.stringify(item) + "'><span>" + item.name + "</span><span class='close'>x</span></li>";
					});
					$(".choose-content").html(rhtml);
				}
				/*
				高亮样式设置
				*/
				function getFontCss(treeId, treeNode) {
					return (!!treeNode.highlight) ? { color: "#A60000", "font-weight": "bold" } : { color: "#333", "font-weight": "normal" };
				}
				var setting = {
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
						onClick: function (event, treeId, treeNode) {
							//将点击事件与复选框事件关联
							var zTree = $.fn.zTree.getZTreeObj("treeDemo");
							zTree.checkNode(treeNode, !treeNode.checked, true);
							checkChangeFn(event, treeId, treeNode);
							var curSelect = $("#treeDemo").find(".curSelectedNode");//控制选中项背景样式
							treeNode.checked == true ? (curSelect.hasClass("unactive") ? curSelect.removeClass("unactive") : '') : curSelect.addClass("unactive");
						},
						onCheck: checkChangeFn
					}
				};
				var zNodes = [
					{ id: 1, pId: 0, name: "集团", open: true, checked: false,searchdata:"集团" },
					{ id: 11, pId: 1, name: "一汽", open: true, checked: false,searchdata:'集团一汽' },
					{ id: 111, pId: 11, name: "一汽子成员1", checked: false,searchdata:'集团一汽一汽子成员1' },
					{ id: 112, pId: 11, name: "一汽子成员2", checked: false,searchdata:'集团一汽一汽子成员2' },
					{ id: 12, pId: 1, name: "二汽", open: true, checked: false,searchdata:'集团二汽' },
					{ id: 121, pId: 12, name: "二汽子成员1", checked: false,searchdata:'集团二汽二汽子成员1' },
					{ id: 122, pId: 12, name: "二汽子成员2", checked: false,searchdata:'集团二汽二汽子成员2' },
					{ id: 2, pId: 0, name: "集团 2", checked: true, open: true,searchdata:'' },
					{ id: 21, pId: 2, name: "一汽", checked: true,searchdata:'' },
					{ id: 22, pId: 2, name: "二汽", open: true, checked: false,searchdata:'' },
					{ id: 221, pId: 22, name: "二汽1", checked: true,searchdata:'' },
					{ id: 222, pId: 22, name: "二汽2", checked: true,searchdata:'' },
					{ id: 23, pId: 2, name: "三汽", checked: false,searchdata:'' }
				];
				$.fn.zTree.init($("#treeDemo"), setting, zNodes);
				var zTree = $.fn.zTree.getZTreeObj("treeDemo");
				//初始化数据，调用树图check事件
				zTree.setting.callback.onCheck();
				//清空搜索框内容
				$("#filter-text").val("");
			};
			//组件初始化；
			var componentInit = function () {
				//右侧选框删除事件
				$(".choose-content").on("click", ".close", function () {
					var tId = $(this).parent("li").data("item").tId;
					var zTree = $.fn.zTree.getZTreeObj("treeDemo");
					//通过id找到节点，改变状态
					zTree.checkNode(zTree.getNodeByTId(tId), false, true);
					//移除元素
					$(this).parent("li").remove();
				});
				/*
				搜索树节点，如果找到则高亮显示，没找到提示
				*/
				function updateNodes(highlight, nodeList) {
					var zTree = $.fn.zTree.getZTreeObj("treeDemo");
					if($("#filter-text").val()!=""){zTree.expandAll(false);}//先折叠所有节点，再展开相应的节点
					for (var i = 0, l = nodeList.length; i < l; i++) {
						nodeList[i].highlight = highlight;
						zTree.expandNode(nodeList[i].getParentNode(), true, false, false); //将搜索到的节点的父节点展开
						zTree.updateNode(nodeList[i]);
					}
				}
				function searchNode() {
					var filter = $("#filter-text").val();
					var zTree = $.fn.zTree.getZTreeObj("treeDemo");
					var filterArr = zTree.getNodesByParamFuzzy("name", filter, null);;
					if (filter === ""){updateNodes(false,filterArr);$(".no-data").css("display","none");return;};
					if(filter!=""&&filterArr.length==0){$(".no-data").css("display","block");}else{$(".no-data").css("display","none");}
					updateNodes(true, filterArr);
				}
				/*输入框添加输入监听*/
				$("#filter-text").on("propertychange", searchNode).on("input", searchNode);
			};
			return {
				init: function () {
					treeInit();
					componentInit();
				}
			}
		})();