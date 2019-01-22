if (window.jQuery || window.Zepto) {
  (function () {
    var zTreePlugin = function (selector, config) {
      var defaults = {
        data: [],
        dataright: [],
        searchdata: ''
      }
      this.option = $.extend(defaults, config);
      this.$tree = $(selector);
    }
    zTreePlugin.prototype = {
      renderTree: function () {
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
          { id: 1, pId: 0, name: "集团", open: true, checked: false, searchdata: "集团" },
          { id: 11, pId: 1, name: "一汽", open: true, checked: false, searchdata: '集团一汽' },
          { id: 111, pId: 11, name: "一汽子成员1", checked: false, searchdata: '集团一汽一汽子成员1' },
          { id: 112, pId: 11, name: "一汽子成员2", checked: false, searchdata: '集团一汽一汽子成员2' },
          { id: 12, pId: 1, name: "二汽", open: true, checked: false, searchdata: '集团二汽' },
          { id: 121, pId: 12, name: "二汽子成员1", checked: false, searchdata: '集团二汽二汽子成员1' },
          { id: 122, pId: 12, name: "二汽子成员2", checked: false, searchdata: '集团二汽二汽子成员2' },
          { id: 2, pId: 0, name: "集团 2", checked: true, open: true, searchdata: '' },
          { id: 21, pId: 2, name: "一汽", checked: true, searchdata: '' },
          { id: 22, pId: 2, name: "二汽", open: true, checked: false, searchdata: '' },
          { id: 221, pId: 22, name: "二汽1", checked: true, searchdata: '' },
          { id: 222, pId: 22, name: "二汽2", checked: true, searchdata: '' },
          { id: 23, pId: 2, name: "三汽", checked: false, searchdata: '' }
        ];
        $.fn.zTree.init($("#treeDemo"), setting, zNodes);
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        //初始化数据，调用树图check事件
        zTree.setting.callback.onCheck();
        //清空搜索框内容
        $("#filter-text").val("");
      }
    }
  })(window.jQuery || window.Zepto);
}