# howxm-js

此NPM包自动注入Howxm JavaScript客户端并导出一个对象，该对象包装了所有客户端方法。所有方法调用都会被排队执行，直到Howxm JavaScript客户端完全加载。

## 安装

```sh
npm install howxm-js
// or
yarn add howxm-js
```

## 使用

### 快速连通

复制并粘贴以下代码到您的应用程序中，并替换静态值'APP_ID'。您可以在您的浩客的“应用设置>SDK代码中”中找到您的应用ID。

```js
import Howxm from 'howxm-js'

Howxm('setAppID', 'APP_ID')
```

### identify
传入用户身份信息，实现复杂的免打扰机制，以及对于人群的定向投放
```js
import Howxm from 'howxm-js'

Howxm('identify', {
    uid:  '00000001' , // 用户唯一ID, 默认字段, 必填，string 类型
    name: 'howxm', // 名称，默认字段，非必填，string 类型
    mobile: '15380000000', // 手机号，默认字段，非必填，string类型，会进行校验
    email: 'demo@howxm.com', // 邮箱，默认字段，非必填，string类型，会进行校验

    //以下字段为示例，可以进行自定义的传递
    login_times: 14, // 登录次数，numeric 类型
    last_visit_at: '2022-08-30T09:07:06.701Z', // 最近访问时间, date类型
    plan:'basic', // 套餐, string 类型
    level: "a",
    role: "hr"
})
```
#### 错误情况：
如果在identity的时候，缺失uid，console中会有异常提示：Error: invalid argument

### event
通过事件触发

```js
import Howxm from 'howxm-js'
// 接口定义
// Howxm('event', '<event_code>', {<attributes>})
// Example
Howxm('event',            // 必填
    'payment_clicked',    // event_code 必填
    {                     // event属性非必填
        product: 'pro_plan',
        price: 199
    }
)
```
传入参数说明：

| 字段  | 说明 | 是否必填  | 类型 | 备注 |  
| ----- | --- |----- | --- |----- |  
| event_code  | 事件code | 必填  | String | 只能包含由数字、字母、下划线，且不能以数字开头 |

### open
通过open手动弹出评价/问卷，用于用户完成某些动作后的，精准投放等

```js
import Howxm from 'howxm-js'

Howxm('open', {
  campaignId: '投放ID',  // 必填
  // 手动触发时可以传入当前的用户信息，选填
  customer: {
    uid:  '00000001' , // 用户唯一ID, 默认字段, 必填，string 类型
    name: 'howxm', // 名称，默认字段，非必填，string 类型
    mobile: '15380000000', // 手机号，默认字段，非必填，string类型，会进行校验
    email: 'demo@howxm.com', // 邮箱，默认字段，非必填，string类型，会进行校验
  },
  // 选填
  extra: {
    // 其他属性
  },
  completed(data) {}, // {success: boolean; errMsg?: string}
})
```

传入参数说明：

| 字段  | 说明   | 是否必填  | 类型 | 备注 |  
| ----- |------|----- | --- |--- |  
| campaignId  | 投放Id | 必填  | String | 问卷组件对应的投放Id |

#### customer 属性字段说明（选填）
用于记录填写问卷时的用户的信息，参数格式与 identify中的格式相同

#### extra 属性说明 （选填）
用于记录填写问卷时其他的自定义属性，也可以单独调用setExtraAttributes接口来进行传入

#### 错误情况：
如果传入的campaignId不存在，console中会提示：{success: false, errMsg: 'campaign not found'}

### checkOpen
检查问卷是否可以正常投放
```js
import Howxm from 'howxm-js'

Howxm('checkOpen', {
    campaignId: '投放ID（必填）',  // 必填
    uid: '当前用户的唯一ID（必填）', // 必填
    onSuccess() {},
    onFailed(data) {}, // {result: boolean; errMsg?: string}
})
```
传入参数说明：

| 字段  | 说明   | 是否必填  | 类型 | 备注 |  
| ----- |------|----- | --- |--- |  
| campaignId  | 投放Id | 必填  | String | 问卷组件对应的投放Id |
| uid  | 用户id | 必填  | String | 用于识别唯一用户身份 |

#### 错误情况：
传入不存在的campaignId，网络请求404

### setExtraAttributes
设置自定义属性，一般是跟场景相关信息，如某次课程、某个动作、某次场景等。扩展属性的信息，会附属到用户提交的当条数据上。
```js
import Howxm from 'howxm-js'
// 设置自定义参数,key-value的形式，key只需要以字母或者下划线开头即可
_howxm("setExtraAttributes", {
    login_times: 14, // 登录次数
    last_visit_at: '2022-08-30T09:07:06.701Z', // 最近访问时间
    plan: 'basic',                    // 套餐
    vip_level: '1',                  // 当前用户的vip等级
    course_name: '《浩客体验管理》',   // 用户参与的网络直播的课程名
    //...其他需要收集的当刻的属性信息
})

```

更多信息，请查看我们的[帮助文档](https://howxm.com/help/articles/npm-web-sdk-intro)。
