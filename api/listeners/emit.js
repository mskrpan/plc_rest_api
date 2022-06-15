import { io } from "../../server.js";

export const emit = (arg, data) =>{
    //send data over io socket with emmit
    io.sockets.emit(arg, data)
}
