const postParaphraseText = async (inputText: string, language: string) => {
    const response = await fetch(
        "https://mq8jurhdveczbx-8000.proxy.runpod.net/paraphrase",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sentence: inputText,
                language: language,
            }),
        },
    )

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.paraphrase
}

export { postParaphraseText }
