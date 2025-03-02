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
                  enterTo="opacity-100 backdrop-blur-2xl"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 backdrop-blur-2xl"
                  leaveTo="opacity-0"
                >
                  <PopoverPanel className="flex flex-col absolute w-full pr-4 sm:pr-0 sm:w-1/3 2xl:w-1/4 sm:min-w-min h-[calc(100vh-1rem)] z-30 inset-x-0 text-sm text-ui-fg-on-color m-2 backdrop-blur-2xl">
                    <div
                      data-testid="nav-menu-popup"
                      className="flex flex-col h-full bg-[rgba(3,7,18,0.5)] rounded-rounded justify-between p-6"
                    >
                      <div className="flex justify-end" id="xmark">
                        <button data-testid="close-menu-button" onClick={close}>
                          <XMark />
                        </button>
                      </div>
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
