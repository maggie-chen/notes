/**
 * Created by zhangzhen on 17/12/30.
 */



function Mvvm(options = {}) {
    //将所有的数据绑定在$options并储存在vm._data中
    this.$options = options

    var data = this._data = this.$options.data;

    // //增加发布订阅
    observe(data)
    // 具体工作：
    // 递归所有data 绑定get（添加订阅） set（触发更新） 方法
    // 订阅方法new Dep：
    // add方法添加订阅者，notify方法通知订阅者更新，触发所有Watcher实例的update方法

    // //数据代理方式
    proxyData(data, this)
    // 具体工作：
    // 去掉复杂的查询方式，简化._data.msg，直接用.msg来查找msg对象。

    // //计算
    computed.call(this)
    // 具体工作：
    // 通过继承this，把fn当作数据挂在mvvm上

    // //模板编译
    compile(options.el, this)
    // 具体工作：
    // 根据el遍历旗下所有子元素，然后储存于内存中（利用createDocumentFragment，其特性：append已存在元素，会将元素从原有dom中移除）
    // 对内存中的所有dom进行处理（如果为文本且含模版语法，正则来匹配 {{}}通过递归的方式来更换每一个数据（ary.forEach会触发defineProperty中get），替换模板语句并添加到发布订阅模式。如果为标签，遍历所有attr，如有v-，则进行特殊处理，如表单控件+model会根据控件类型自动选取正确的方法来更新元素，if根据逻辑判断（Mustache 语法不能作用在 HTML 特性上，遇到这种情况应该使用 v-bind），并添加到发布订阅模式。如果有子元素则递归。）
    // 发布订阅模式new Watcher: 触发defineProperty中get，其中有target控制器，指向Watcher的实例，把当前对象加入到订阅者数组中。
    // 类中包含当前vm，data，fn，实例拥有update方法：根据data得到的val，执行fn()

}