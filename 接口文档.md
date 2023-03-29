# HYTrip

https://documenter.getpostman.com/view/12387168/UzXPxcSi

## 一. 首页

GET

### 1.1. 热门建议

http://codercba.com:1888/api/home/hotSuggests

Example Request

热门建议

```js
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://codercba.com:1888/api/home/hotSuggests", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

GET

### 1.2. 推荐类别

http://codercba.com:1888/api/home/categories

Example Request

推荐类别

```js
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://codercba.com:1888/api/home/categories", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

GET

### 1.3. 房屋列表

http://codercba.com:1888/api/home/houselist?page=1

PARAMS

page

1



Example Request

房屋列表

```js
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://codercba.com:1888/api/home/houselist?page=1", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

## 城市

GET

### 所有城市

http://codercba.com:1888/api/city/all

Example Request

所有城市

```js
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://codercba.com:1888/api/city/all", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

## 二. 详情

GET

### 2.1. 房子详情

http://codercba.com:1888/api/favor/list

Example Request

房子详情

```js
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://codercba.com:1888/api/favor/list", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

## 三. 收藏

GET

### 3.1. 收藏列表

http://codercba.com:1888/api/favor/list

Example Request

收藏列表

```js
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://codercba.com:1888/api/favor/list", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

GET

### 3.2. 浏览历史

http://codercba.com:1888/api/favor/history

Example Request

浏览历史

```js
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://codercba.com:1888/api/favor/history", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

## 四. 订单

GET

### 4.1. 订单列表

http://codercba.com:1888/api/order/list?type=pend

type=pend 未完成订单 type=recent 最近订单 type=all 全部订单



Example Request

订单列表

```js
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://codercba.com:1888/api/order/list?type=pend", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

## 五. 搜索

GET

### 5.1. 搜索顶部

http://codercba.com:1888/api/search/top

Example Request

搜索顶部

```javascript
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://codercba.com:1888/api/search/top", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

GET

### 5.2. 搜素结果

http://codercba.com:1888/api/search/result

Example Request

搜素结果

```javascript
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://codercba.com:1888/api/search/result", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```
