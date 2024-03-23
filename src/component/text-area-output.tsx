import LoadOutput from "@/component/load-output"

import { AppContext } from "@/AppContextProvider"
import { useContext } from "react"
import { FaCopy, FaDownload } from "react-icons/fa"

export function TextAreaOutput() {
    const { output, isLoading } = useContext(AppContext)

    const copyToClipboard = () => {
        navigator.clipboard
            .writeText(output)
            .then((_) => alert("Copied to clipboard"))
    }

    const downloadText = () => {
        const element = document.createElement("a")
        const file = new Blob([output], { type: "text/plain" })
        element.href = URL.createObjectURL(file)
        element.download = "output.txt"
        document.body.appendChild(element)
        element.click()
    }

    return (
        <div className="flex flex-col p-5 space-y-4 bg-white rounded-lg shadow-md">
            <label
                htmlFor="output"
                className="text-gray-700 font-semibold select-none"
            >
                Paraphrased Text
            </label>
            <div className="relative flex justify-center items-center">
                <textarea
                    title="Paraphrased text will appear here"
                    name="User Output"
                    rows={15}
                    className="p-4 outline-none w-full bg-gray-100 rounded shadow-inner"
                    readOnly
                    value={output}
                    style={{ resize: "none", fontFamily: "Inter, sans-serif" }}
                    placeholder="Paraphrased text will appear here..."
                />
                <div
                    className={`${isLoading ? "flex backdrop-blur-sm h-full w-full justify-center items-center rounded-md" : "hidden"} absolute`}
                >
                    <LoadOutput />
                </div>
            </div>
            <div className="flex justify-end items-center space-x-4">
                <button
                    onClick={copyToClipboard}
                    title="Copy Paraphrased Text"
                    className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-600 transition duration-200"
                >
                    <FaCopy />
                </button>

                <button
                    onClick={downloadText}
                    title="Download Paraphrased Text"
                    className="bg-green-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-green-600 transition duration-200"
                >
                    <FaDownload />
                </button>
            </div>
        </div>
    )
}