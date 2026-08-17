import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'bookverse_cart'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

function addItem(book, qty = 1) {
  setItems((prev) => {
    const existing = prev.find((i) => i.id === book.id);

    if (existing) {
      return prev.map((i) =>
        i.id === book.id
          ? { ...i, qty: i.qty + qty }
          : i
      );
    }

    return [
      ...prev,
      {
        id: book.id,
        title: book.title,
        author: book.author,
        price: Number(book.price || 0),

        // Keep the Firestore image URL
        imageUrl: book.imageUrl || book.image || "",

        spine: book.spine,
        qty,
      },
    ];
  });
}

  function removeItem(id) {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  function updateQty(id, qty) {
    if (qty <= 0) return removeItem(id)
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)))
  }

  function clearCart() {
    setItems([])
  }

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items],
  )
  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items])

  const value = { items, addItem, removeItem, updateQty, clearCart, subtotal, count }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}