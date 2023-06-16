const useListScroll = (listRef) => {
  const scrollToIndex = (index) => {
    const offset = 0;
    const animated = true;
    const viewPosition = 0.5;

    if (index !== null) {
      listRef.current?.scrollToIndex({
        index,
        animated,
        viewPosition,
      });
    } else {
      listRef.current?.scrollToOffset({
        offset,
        animated,
      });
    }
  };

  return scrollToIndex;
};

export default useListScroll;
