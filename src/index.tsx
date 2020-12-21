import React, { useRef, useEffect, useState } from 'react';

interface Props {
  children: JSX.Element[];
  pageSize: number;
  loader?: JSX.Element;
  onFinish?: () => void;
  refreshKey?: any;
}

const style = {
  width: '100%',
  height: '100%',
  overflow: 'scroll',
};

/**
 * 分批渲染
 *
 * 一次性提供所有数据, 组件自动根据 pageSize 分页并分批渲染.
 *
 * @param {JSX.Element[]} children 所有需要渲染的元素
 * @param {number} pageSize 每页渲染的数量
 * @param {JSX.Element} [loader=undefined] 渲染时提示, 常用于显示 loading
 * @param {function} [onFinish] 全部加载完成后回调
 * @param {any} [refreshKey] children 如果经常变化, 此参数需要同时变化, 否则无法更新
 *
 * @author Witee <github.com/Witee>
 * @date 2020-12-18
 */
const ListRenderer = (props: Props): JSX.Element => {
  const { children, pageSize, loader, onFinish, refreshKey } = props;

  const ref: any = useRef(HTMLDivElement);

  const [current, setCurrent] = useState<JSX.Element[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(!(children.length <= pageSize));
  const [page, setPage] = useState(0);

  const addEventListener = () => {
    const offset = ref.current.scrollHeight - ref.current.scrollTop - ref.current.clientHeight;

    if (offset <= 0) {
      setLoading(true);
      setPage((p) => p + 1);
    }
  };

  useEffect(() => {
    ref.current?.addEventListener('scroll', addEventListener);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (page > 0) {
      const start = page * pageSize;
      const end = start + pageSize;

      const els = children.slice(start, end);

      setCurrent((curr) => ([] as JSX.Element[]).concat(curr, els));

      if (els.length < pageSize) {
        // hasMore 由 true 变为 false 时才需要回调
        hasMore && onFinish && onFinish();

        setHasMore(false);
      } else {
        setHasMore(true);
      }

      setLoading(false);
    }
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    const init = children.slice(0, pageSize);
    setCurrent(init);

    setPage(0);

    if (init.length === pageSize) {
      setHasMore(true);
    }

    ref.current?.scroll(0, 0);
    // eslint-disable-next-line
  }, [refreshKey]);

  return (
    <div ref={ref} style={style}>
      {current}
      {hasMore && loading && loader}
    </div>
  );
};

export default ListRenderer;
