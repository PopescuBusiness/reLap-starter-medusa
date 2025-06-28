"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import { ArrowRightMini, XMark, BarsThree } from "@medusajs/icons"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import { HttpTypes } from "@medusajs/types"

const SideMenuItems = {
  Home: "/",
  Store: "/store",
  Account: "/account",
  Cart: "/cart",
}

const SideMenu = ({ regions }: { regions: HttpTypes.StoreRegion[] | null }) => {
  const toggleState = useToggleState()

  return (
    <div className="h-full">
      <Popover className="h-full flex">
        {({ open, close }) => (
          <>
            <Popover.Button
              data-testid="nav-menu-button"
              className="flex items-center p-2 rounded-md transition hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              aria-label="Open menu"
            >
              <BarsThree className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </Popover.Button>

            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 -translate-x-4"
              enterTo="opacity-100 translate-x-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 -translate-x-4"
            >
              <PopoverPanel className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-start">
                <div className="bg-white dark:bg-gray-900 w-4/5 max-w-sm h-full p-6 flex flex-col shadow-xl">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-semibold">Menu</span>
                    <button onClick={close} aria-label="Close menu">
                      <XMark className="w-6 h-6 text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white" />
                    </button>
                  </div>

                  <nav className="flex-1 overflow-y-auto">
                    <ul className="space-y-4">
                      {Object.entries(SideMenuItems).map(([name, href]) => (
                        <li key={name}>
                          <LocalizedClientLink
                            href={href}
                            onClick={close}
                            data-testid={`${name.toLowerCase()}-link`}
                            className="block text-lg font-medium text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white transition"
                          >
                            {name}
                          </LocalizedClientLink>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  {regions && (
                    <div className="mt-6">
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onMouseEnter={toggleState.open}
                        onMouseLeave={toggleState.close}
                      >
                        <CountrySelect
                          toggleState={toggleState}
                          regions={regions}
                        />
                        <ArrowRightMini
                          className={clx(
                            "transition-transform duration-150",
                            toggleState.state ? "-rotate-90" : ""
                          )}
                        />
                      </div>
                    </div>
                  )}

                  <Text className="mt-6 text-xs text-gray-500 dark:text-gray-400 text-center">
                    © {new Date().getFullYear()} Relap Store. All rights
                    reserved.
                  </Text>
                </div>
              </PopoverPanel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}

export default SideMenu
