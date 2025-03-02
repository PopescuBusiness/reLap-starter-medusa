"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import { XMark } from "@medusajs/icons"
import { Fragment, useEffect, useState } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

const SideMenuItems = {
  Store: "/store",
  Account: "/account",
  Cart: "/cart",
}

const SideMenu = ({ regions }: { regions: HttpTypes.StoreRegion[] | null }) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        {isMobile ? (
          <Popover className="h-full flex">
            {({ open, close }) => (
              <>
                <div className="relative flex h-full">
                  <Popover.Button
                    data-testid="nav-menu-button"
                    className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base"
                  >
                    Menu
                  </Popover.Button>
                </div>

                <Transition
                  show={open}
                  as={Fragment}
                  enter="transition ease-out duration-150"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <PopoverPanel className="fixed inset-0 w-full h-screen z-30 bg-[rgba(3,7,18,0.95)]">
                    <div
                      data-testid="nav-menu-popup"
                      className="flex flex-col h-full p-6"
                    >
                      {/* Close button at the top-right corner */}
                      <div className="flex justify-end">
                        <button
                          data-testid="close-menu-button"
                          onClick={close}
                          className="p-2 hover:bg-ui-fg-disabled rounded-full"
                        >
                          {/* Custom SVG for the close button */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-12 h-12"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Scrollable links container */}
                      <div className="flex-1 overflow-y-auto mt-6">
                        <ul className="flex flex-col gap-6 items-start justify-start">
                          {Object.entries(SideMenuItems).map(([name, href]) => {
                            return (
                              <li key={name}>
                                <LocalizedClientLink
                                  href={href}
                                  className="text-3xl leading-10 hover:text-ui-fg-disabled"
                                  onClick={close}
                                  data-testid={`${name.toLowerCase()}-link`}
                                >
                                  {name}
                                </LocalizedClientLink>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    </div>
                  </PopoverPanel>
                </Transition>
              </>
            )}
          </Popover>
        ) : (
          <div className="flex items-center h-full">
            <ul className="flex gap-6 items-center justify-start">
              {Object.entries(SideMenuItems).map(([name, href]) => {
                return (
                  <li key={name}>
                    <LocalizedClientLink
                      href={href}
                      className="text-lg leading-10 hover:text-ui-fg-disabled"
                      data-testid={`${name.toLowerCase()}-link`}
                    >
                      {name}
                    </LocalizedClientLink>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default SideMenu
