const getAssetURL = (image) =>{
  //参数1：相对路径 参数2：当前路径
  return new URL(`../assets/img/${image}`,import.meta.url).href
  //返回创建的URL语句
  //具体来说，这个语句使用了 URL 构造函数，它接受两个参数：第一个参数是一个字符串，表示要创建的 URL 地址；第二个参数是一个可选的基础 URL，用于解析相对路径。在这个语句中，第一个参数是一个模板字符串，其中包含一个占位符 ${image}，它会被变量 image 的值所替换，生成一个字符串 ../assets/img/xxx，其中 xxx 是变量 image 的值。这个字符串表示了一个相对于当前模块的上级目录的 assets/img 目录中的某个文件的路径。

  //第二个参数是 import.meta.url，这是一个元数据属性，表示当前模块的绝对 URL 地址。它在解析相对路径时非常有用。
}

export default getAssetURL