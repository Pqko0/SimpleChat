import { socket } from "./socket"
import { useEffect, useRef } from "react"

function Text() {
    const InputRef = useRef(null)

    const onSend = function() {
        const message = String(InputRef.current.value).trim()

        if (message.length > 0) {
            socket.emit("send", message);
        }

        InputRef.current.value = ""
    }

    useEffect(() => {
        const current = InputRef.current    
        const handleKeyPress = function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                onSend();
            }
        };

        current.addEventListener("keypress", handleKeyPress);

        return () => {
            current.removeEventListener("keypress", handleKeyPress);
        };
    }, []); 

    return <div className="flex">
        <input className="text-white rounded-bl-md w-full pl-2 bg-transparent border-l-2 border-b-2 border-gray-500 ring-0" placeholder="Message" ref={InputRef}></input>
        <button className="border-r-2 border-b-2 border-gray-500 text-white rounded-br-lg p-2 font-bold" onClick={onSend}>Send</button>
    </div>
}

export default Text