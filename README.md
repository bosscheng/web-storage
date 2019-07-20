# 简介
提供 localstorage 存储机制，当不支持localstorage（safari 无痕模式，app（跨页面存储） 存储问题）的情况下 采用cookie 机制去存储。

备注： app 在跨页面 去共享localstorage 数据的时候，数据会存在问题，会有不更新，还是老数据的问题。


## 使用

```
// AMD
import snStorage from 'web-storage';

snStorage.setItem('a',1);
```


```
// CMD
var snStorage = require('./storage');

snStorage.setItem('a',1);

```


```
// browser
var snStorage = window.storage;

storage.setItem('a',1);
```

## api


### setItem(key,value)
```
var storage = window.storage;


// setItem
storage.setItem('a',1);
```


### getItem(key)
```
var storage = window.storage;


// getItem
var result = storage.getItem('a');
storage.log(result)
// a
```


### removeItem(key)
```
var storage = window.storage;


// removeItem
storage.removeItem('a');
```

## 注意事项
