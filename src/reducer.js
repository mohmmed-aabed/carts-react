const reducer = (state, action) => {
  if (action.type === 'CLEAR_CART') {
    return { ...state, carts: [] };
  }

  if (action.type === 'REMOVE_CART') {
    const id = action.payload;
    const newCarts = state.carts.filter((item) => item.id !== id);
    return { ...state, carts: newCarts };
  }

  if (action.type === 'CHANGE') {
    const id = action.payload.id;
    const type = action.payload.type;
    const newCarts = state.carts
      .map((item) => {
        if (id === item.id) {
          if (type === 'inc') {
            return { ...item, amount: item.amount + 1 };
          }
          if (type === 'dec') {
            return { ...item, amount: item.amount - 1 };
          }
        }
        return item;
      })
      .filter((item) => item.amount > 0);
    return { ...state, carts: newCarts };
  }

  if (action.type === 'GET_TOTAL') {
    let total = 0;
    let amount = 0;
    state.carts.forEach((item) => {
      total += item.price * item.amount;
      amount += item.amount;
    });
    total = parseFloat(total.toFixed(2));
    return { ...state, total, amount };
  }

  if (action.type === 'LOADING') {
    return { ...state, loading: true };
  }

  if (action.type === 'DISPLAY_CARTS') {
    const carts = action.payload;
    return { ...state, carts: carts, loading: false };
  }

  throw new Error('No matching action type!');
};

export default reducer;
