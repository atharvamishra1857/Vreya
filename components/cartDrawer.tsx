"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/cartcontext";
import Image from "next/image";

// --- MOCK DATA (Until we connect real backend) ---
const MOCK_ITEMS = [
  {
    id: 1,
    name: "Banarasi Silk Saree",
    color: "Royal Maroon",
    price: 4500,
    quantity: 1,
    image: "https://placehold.co/600x800/5D1224/FFF?text=Banarasi+Silk",
  },
  {
    id: 2,
    name: "Kanjivaram Gold",
    color: "Deep Gold",
    price: 8000,
    quantity: 1,
    image: "https://placehold.co/600x800/D4AF37/000?text=Kanjivaram",
  },
];

export default function CartDrawer() {
  const { isOpen, closeCart } = useCart();
  const [items, setItems] = useState(MOCK_ITEMS);

  // Calculate Subtotal
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[60]" onClose={closeCart}>
        {/* Dark Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-brand-maroon/40 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              {/* The Drawer Panel */}
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
                  <div className="flex h-full flex-col bg-brand-cream shadow-2xl border-l border-brand-maroon/10">
                    {/* --- HEADER --- */}
                    <div className="flex items-center justify-between px-4 py-6 sm:px-6 bg-white">
                      <Dialog.Title className="text-lg font-serif font-bold text-brand-maroon flex items-center gap-2">
                        <ShoppingBag size={20} />
                        Your Collection
                      </Dialog.Title>
                      <button
                        type="button"
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        onClick={closeCart}
                      >
                        <X size={24} />
                      </button>
                    </div>

                    {/* --- ITEMS LIST --- */}
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flow-root">
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {items.map((product) => (
                            <li key={product.id} className="flex py-6">
                              {/* Image */}
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>

                              {/* Details */}
                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>{product.name}</h3>
                                    <p className="ml-4 font-bold text-brand-maroon">
                                      ₹{product.price}
                                    </p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">
                                    {product.color}
                                  </p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  {/* Quantity Controls */}
                                  <div className="flex items-center border border-gray-300 rounded-md">
                                    <button className="px-2 py-1 text-gray-600 hover:bg-gray-100">
                                      -
                                    </button>
                                    <span className="px-2 font-medium">
                                      {product.quantity}
                                    </span>
                                    <button className="px-2 py-1 text-gray-600 hover:bg-gray-100">
                                      +
                                    </button>
                                  </div>

                                  <button
                                    type="button"
                                    className="font-medium text-brand-maroon hover:text-red-800"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* --- FOOTER --- */}
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6 bg-white">
                      <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                        <p>Subtotal</p>
                        <p className="text-xl font-bold text-brand-maroon">
                          ₹{subtotal}
                        </p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500 mb-6">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <a
                          href="#"
                          className="flex items-center justify-center rounded-md border border-transparent bg-brand-maroon px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-brand-maroon/90 transition-all group"
                        >
                          Proceed to Checkout
                          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </a>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{" "}
                          <button
                            type="button"
                            className="font-medium text-brand-maroon hover:text-brand-gold"
                            onClick={closeCart}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
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
