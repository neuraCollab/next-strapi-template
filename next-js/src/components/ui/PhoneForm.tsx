"use client"

import React, { FC, useEffect } from "react"
import dynamic from "next/dynamic"

interface PhoneFormProps {
  placeholder: string
  buttonText: string
}
const FlowbiteScript = dynamic(() => import("flowbite/dist/flowbite"), {
  ssr: false,
})

const PhoneForm: FC<PhoneFormProps> = () => {
  return (
    <form className="max-w-sm mx-auto">
      <div className="flex items-center mt-2">
        {/* Country Code Dropdown Button */}
        <button
          id="dropdown-phone-button"
          data-dropdown-toggle="dropdown-phone"
          className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
          type="button"
        >
          {/* Example Flag Icon */}
          <svg fill="none" aria-hidden="true" className="h-4 w-4 mr-2" viewBox="0 0 20 15">
            <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
            <mask id="a" className="mask-type-[luminance]" width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
              <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
            </mask>
            <g mask="url(#a)">
              <path
                fill="#D02F44"
                fillRule="evenodd"
                d="M19.6.5H0v.933h19.6V.5zm0 1.867H0V3.3h19.6v-.933zM0 4.233h19.6v.934H0v-.934zM19.6 6.1H0v.933h19.6V6.1zM0 7.967h19.6V8.9H0v-.933zm19.6 1.866H0v.934h19.6v-.934zM0 11.7h19.6v.933H0V11.7zm19.6 1.867H0v.933h19.6v-.933z"
                clipRule="evenodd"
              />
              <path fill="#46467F" d="M0 .5h8.4v6.533H0z" />
              {/* ... rest of the paths */}
            </g>
          </svg>
          +1
          <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        <div id="dropdown-phone" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-52 dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-phone-button">
            <li>
              <button
                type="button"
                className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
              >
                <span className="inline-flex items-center">
                  {/* Another Flag Icon */}
                  <svg fill="none" aria-hidden="true" className="h-4 w-4 mr-2" viewBox="0 0 20 15">
                    {/* ... */}
                  </svg>
                  United States (+1)
                </span>
              </button>
            </li>
            {/* Add more <li> items for other countries */}
          </ul>
        </div>

        {/* Phone Number Input */}
        <label htmlFor="phone-input" className="text-sm font-medium sr-only text-gray-900 dark:text-white">
          Phone number:
        </label>
        <div className="relative w-full">
          <input
            type="text"
            id="phone-input"
            aria-describedby="helper-text-explanation"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 border-e-0 border-s-0 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder="123-456-7890"
            required
          />
        </div>

        {/* Verification Option Dropdown Button */}
        <button
          id="dropdown-verification-option-button"
          data-dropdown-toggle="dropdown-verification-option"
          className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-e-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
          type="button"
        >
          Send SMS
          <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
          </svg>
        </button>

        {/* Verification Option Dropdown */}
        <div
          id="dropdown-verification-option"
          className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-36 dark:bg-gray-700"
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-verification-option-button">
            <li>
              <button
                type="button"
                className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
              >
                Send SMS
              </button>
            </li>
            <li>
              <button
                type="button"
                className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
              >
                Call
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Activate account
      </button>
    </form>
  )
}

export default PhoneForm
