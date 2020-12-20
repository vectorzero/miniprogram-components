## 滚动组件

### 属性
|  字段   | 类型  | 默认  | 说明  |
| ---- | ---- | ---- | ---- |
| resultObj  | Object | { } | 接口返回的结果 |
| dataField  | String | 'data' | 接口返回的列表数据的字段名称 |
| countField  | String | 'count' | 接口返回的分页总数的字段名称 |
| pageField  | String | 'page' | 接口返回的分页当前页数的字段名称 |
| limitField  | String | 'limit' | 接口返回的分页每页页数的字段名称 |


### 方法
|  名称   | 作用  |
| ---- | ---- |
| getList  | 获取列表数据 |
| setList  | 设置列表数据 |


### 引入

将它们放到*components*目录下

将以下代码写入使用该组件的页面json文件：

**hello.json**

```json
"usingComponents": {
    "list-view": "/components/list-view/list-view"
}
```

### 使用

**hello.wxml**
```html
<view class="container">
  <view class="search-box"></view>
  <view class="list-view">
    <list-view id="list" pageField="pageNum" limitField="pageSize" resultObj="{{resultObj}}" bind:setList="setList" bind:getList="getList">
      <view wx:for="{{list}}" wx:key="index">{{item.name}}</view>
    </list-view>
  </view>
</view>
```

**hello.js**
```js
Page({
  data: {
    keyword: '',
    list: [],
    resultObj: {}
  },
  onLoad (options) {
    this.listView = this.selectComponent('#list')
    this.listView.getList()
  },
  async getList (e) {
    const params = e.detail
    const data = { ...params, keyword: this.data.keyword }
    const res = await address('xxx_api',data)
    this.setData({
      resultObj: res || {}
    })
  },
  setList (e) {
    this.setData({
      list: e.detail
    })
  }
})

```

**hello.css**

```css
page {
  height: 100%;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}
.search-box {
  height: 100rpx;
}
.list-view {
  flex: 1;
  width: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  padding: 20rpx 32rpx 0 32rpx;
  background: #f6f6f6;
}
```

