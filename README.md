# list-renderer

批量渲染列表, 优化性能.

应用场景:

可以一次性拿到所有列表数据, 滚动到底部时可以自动加载一部分新数据, 再次滚动可以再次加载, 直到全部加载完成.

| 参数       | 是否必选 | 类型          | 说明                                                                    |
| ---------- | -------- | ------------- | ----------------------------------------------------------------------- |
| children   | 是       | JSX.Element[] | 需要批量加载的元素列表                                                  |
| pageSize   | 是       | number        | 每页渲染的数量                                                          |
| loader     | 否       | JSX.Element   | 加载时底部显示的加载指示符                                              |
| onFinish   | 否       | function      | 全部加载完成后的回调                                                    |
| refreshKey | 否       | any           | 此值更新时将重新获取 children 参数, 否则一直使用第一次加载时的 children |


示例代码如下:
<iframe src="https://codesandbox.io/embed/peaceful-microservice-cyygg?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="peaceful-microservice-cyygg"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>


#### 使用` refreshKey` 的情况:

<iframe src="https://codesandbox.io/embed/blissful-wood-3wwtz?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="blissful-wood-3wwtz"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

如果是一个列表, 如果 `a[]` 在做为` useEffect` 的依赖时, 会认为每次都是个新的对象, 这里使用 `refreshKey={_items.map((i) => i.key).join()` 作为依赖参数, 可以解决这个问题.