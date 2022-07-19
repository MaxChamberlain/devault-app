import { useState } from "react";

export default function useCopy(){
    const [ copied, setCopied ] = useState(null);

    const copyToClipboard = async(text) => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 5000);
    }

    return [ copied, copyToClipboard ]
}