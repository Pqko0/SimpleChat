import axios from 'axios'
import { useRef } from "react"
import { socket } from "./socket"

function TextArea() {
    const TextAreaRef = useRef(null)

    const addInnerhtml = (htmlContent) => {
        if (TextAreaRef.current) {
            TextAreaRef.current.innerHTML += htmlContent;
        }
    };

    axios.get("http://localhost:81/messages").catch((x) => {
        addInnerhtml(`<h1 class=" text-white text-lg ml-4 mb-1 mt-1 bg-red-600 rounded-xl pl-3 pr-3 pt-1 pb-1 text-center">Failed to fetch old messages!</h1>`)
    }).then((x) => {
        (x.data).forEach(element => {
            addInnerhtml(`<h1 class=" text-white text-lg ml-4 mb-1 mt-1 bg-blue-600 rounded-xl pl-3 pr-3 pt-1 pb-1">${element}</h1>`)
        });
    })

    socket.on("connect", () => {
        addInnerhtml(`<h1 class=" text-white text-lg ml-4 mb-1 mt-1 bg-red-600 rounded-xl pl-3 pr-3 pt-1 pb-1">Connected to chat</h1>`)
    })

    socket.on("disconnect", () => {
        addInnerhtml(`<h1 class=" text-white text-lg ml-4 mb-1 mt-1 bg-red-600 rounded-xl pl-3 pr-3 pt-1 pb-1">Lost conenction, Attempting to reconnect</h1>`)
    })


    socket.on("message", (message) => {
        addInnerhtml(`<h1 class=" text-white text-lg ml-4 mb-1 mt-1 bg-blue-600 rounded-xl pl-3 pr-3 pt-1 pb-1">${message}</h1>`)
    })

    return (
        <div className="border-2 h-full rounded-md flex flex-col items-start overflow-auto" ref={TextAreaRef}>

        </div>
    )
}

export default TextArea