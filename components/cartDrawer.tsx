"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/cartcontext";
import Image from "next/image";
import Link from "next/link";

export default function CartDrawer() {
  // Pulling our logic directly from the "Brain"
  const {
    isOpen,
    closeCart,
    cartItems,
    updateQuantity,
    removeFromCart,
    cartTotal,
  } = useCart();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[200]" onClose={closeCart}>
        {/* Background Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#5D1224]/40 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              {/* Sliding Drawer */}
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-[#FDFBF7] shadow-2xl">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-6 border-b border-[#5D1224]/10">
                      <Dialog.Title className="text-xl font-brand font-bold text-[#5D1224] tracking-widest">
                        YOUR CART
                      </Dialog.Title>
                      <button
                        onClick={closeCart}
                        className="text-[#5D1224]/60 hover:text-[#D4AF37] transition-colors"
                      >
                        <X size={24} />
                      </button>
                    </div>

                    {/* Cart Items Mapping */}
                    <div className="flex-1 overflow-y-auto px-6 py-8">
                      {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-[#5D1224]/40 space-y-4">
                          <ShoppingBag size={48} strokeWidth={1} />
                          <p className="tracking-widest text-sm uppercase">
                            Your cart is empty
                          </p>
                        </div>
                      ) : (
                        <ul className="space-y-8">
                          {cartItems.map((item) => (
                            <li key={item.id} className="flex py-2">
                              {/* Product Image */}
                              <div className="relative h-28 w-24 flex-shrink-0 overflow-hidden rounded-md border border-[#5D1224]/10">
                                <Image
                                  src={item.image}
                                  alt={item.title}
                                  fill
                                  className="object-cover object-center"
                                />
                              </div>

                              {/* Product Details & Controls */}
                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-[#5D1224]">
                                    <h3 className="font-serif">
                                      <Link
                                        href={`/product/${item.handle}`}
                                        onClick={closeCart}
                                      >
                                        {item.title}
                                      </Link>
                                    </h3>
                                    <p className="ml-4">
                                      ₹
                                      {(
                                        item.price * item.quantity
                                      ).toLocaleString()}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex flex-1 items-end justify-between text-sm">
                                  {/* --- THE LOGIC CONTROLS --- */}
                                  <div className="flex items-center border border-[#5D1224]/20 rounded-sm">
                                    <button
                                      onClick={() =>
                                        updateQuantity(item.id, -1)
                                      }
                                      className="p-1 px-2 text-[#5D1224]/60 hover:text-[#D4AF37] transition-colors"
                                    >
                                      <Minus size={14} />
                                    </button>
                                    <span className="px-3 py-1 font-medium text-[#5D1224]">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() => updateQuantity(item.id, 1)}
                                      className="p-1 px-2 text-[#5D1224]/60 hover:text-[#D4AF37] transition-colors"
                                    >
                                      <Plus size={14} />
                                    </button>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => removeFromCart(item.id)}
                                    className="font-medium text-[#5D1224]/50 hover:text-[#D4AF37] transition-colors flex items-center gap-1"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Footer / Price Distribution */}
                    {cartItems.length > 0 && (
                      <div className="border-t border-[#5D1224]/10 px-6 py-6 bg-white space-y-6">
                        {/* Breakdown */}
                        <div className="space-y-3 text-sm text-[#5D1224]/70">
                          <div className="flex justify-between">
                            <p>Subtotal</p>
                            <p className="font-medium text-[#5D1224]">
                              ₹{cartTotal.toLocaleString()}
                            </p>
                          </div>
                          <div className="flex justify-between">
                            <p>Shipping</p>
                            <p className="text-[#D4AF37] text-xs uppercase tracking-wider mt-0.5">
                              Calculated at checkout
                            </p>
                          </div>
                          <div className="flex justify-between">
                            <p>Taxes</p>
                            <p className="text-[#D4AF37] text-xs uppercase tracking-wider mt-0.5">
                              Calculated at checkout
                            </p>
                          </div>
                        </div>

                        {/* Total */}
                        <div className="flex justify-between items-end pt-4 border-t border-[#5D1224]/10">
                          <div>
                            <p className="text-xl font-bold text-[#5D1224] font-serif">
                              Total
                            </p>
                            <p className="text-xs text-[#5D1224]/50 mt-1">
                              INR (inclusive of all taxes)
                            </p>
                          </div>
                          <p className="text-2xl font-bold text-[#5D1224]">
                            ₹{cartTotal.toLocaleString()}
                          </p>
                        </div>

                        {/* Checkout Button */}
                        <button className="w-full bg-[#5D1224] text-[#FDFBF7] py-4 uppercase tracking-[0.2em] text-sm font-bold hover:bg-[#D4AF37] hover:text-[#5D1224] transition-all duration-300 shadow-lg mt-4">
                          Checkout securely
                        </button>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
