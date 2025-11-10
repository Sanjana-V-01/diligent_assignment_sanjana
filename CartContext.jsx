import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'eshop_cart_v1';

function loadInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: {} };
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : { items: {} };
  } catch {
    return { items: {} };
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity = 1 } = action.payload;
      const existing = state.items[product.id];
      const nextQty = (existing?.quantity || 0) + quantity;
      return {
        ...state,
        items: {
          ...state.items,
          [product.id]: { product, quantity: nextQty },
        },
      };
    }
    case 'REMOVE_ITEM': {
      const next = { ...state.items };
      delete next[action.payload.id];
      return { ...state, items: next };
    }
    case 'SET_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        const next = { ...state.items };
        delete next[id];
        return { ...state, items: next };
      }
      const current = state.items[id];
      if (!current) return state;
      return {
        ...state,
        items: {
          ...state.items,
          [id]: { ...current, quantity },
        },
      };
    }
    case 'CLEAR':
      return { items: {} };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadInitialState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore persistence errors
    }
  }, [state]);

  const totalItems = useMemo(
    () => Object.values(state.items).reduce((sum, item) => sum + item.quantity, 0),
    [state.items]
  );

  const subtotal = useMemo(
    () => Object.values(state.items).reduce((sum, item) => sum + (Number(item.product.price) || 0) * item.quantity, 0),
    [state.items]
  );

  const value = useMemo(
    () => ({
      itemsMap: state.items,
      items: Object.values(state.items),
      totalItems,
      subtotal,
      addItem: (product, quantity = 1) => dispatch({ type: 'ADD_ITEM', payload: { product, quantity } }),
      removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', payload: { id } }),
      setQuantity: (id, quantity) => dispatch({ type: 'SET_QUANTITY', payload: { id, quantity } }),
      clear: () => dispatch({ type: 'CLEAR' }),
    }),
    [state.items, subtotal, totalItems]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}


