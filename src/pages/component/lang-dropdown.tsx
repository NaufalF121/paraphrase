import { useEffect, useState } from "react"

const LanguageDropdown = ({ language }: { language: string[] }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedLanguage, setSelectedLanguage] = useState("")
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        if (isClient) {
            setSelectedLanguage(
                localStorage.getItem("selectedLanguage") ||
                    (language.length > 0 ? language[0] : ""),
            )
        }
    }, [isClient, language])

    const handleDropdownClick = () => {
        setIsOpen(!isOpen)
    }

    const handleOptionClick = (lang: string) => {
        setSelectedLanguage(lang)
        setIsOpen(false)
        if (typeof window !== "undefined") {
            localStorage.setItem("selectedLanguage", lang)
        }
    }

    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    onClick={handleDropdownClick}
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-gray-100 focus:ring-sky-500 focus:ring-opacity-25 transition duration-200 ease-in-out"
                    id="options-menu"
                    aria-haspopup="true"
                    aria-expanded="true"
                >
                    {selectedLanguage}
                    <svg
                        className="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                    >
                        {language.map((lang) => (
                            <a
                                key={lang}
                                onClick={() => handleOptionClick(lang)}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                role="menuitem"
                            >
                                {lang}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default LanguageDropdown
