import { OPCUAClient} from "node-opcua";
import {def_nodes} from "./data_to_read.js";
import {emit} from "../listeners/emit.js";
import {save_data_to_DB} from "./save_data.js"

const endpointUrl = "opc.tcp://192.168.0.1:4840";
const client = OPCUAClient.create({ endpointMustExist: false });


//connecting i kreiranje sesije
export const connAndRead = async () => {
    //connection
    await client.connect(endpointUrl);
    console.log("connected!!!")
    //createSession
    const session = await client.createSession();
    console.log("session created!!");

    //def of what nodes to read
    const nodes = def_nodes();

    async function read(){
        let dataAmps = await session.read(nodes.nodeToReadAmps)
        let dataVoltage = await session.read(nodes.nodeToReadVoltage)
        let dataTorque = await session.read(nodes.nodeToReadTorque)
        let datas = {
            amps: (dataAmps.value.value).toFixed(2),
            voltage: (dataVoltage.value.value).toFixed(2),
            torque: (dataTorque.value.value).toFixed(2),
          }

        //send data over websocket
        emit("random", (datas))
        //save data to mongoDB
        save_data_to_DB("Motor 1", datas)


        console.log(`amps: ${(dataAmps.value.value).toFixed(2)}`);
        console.log(`voltage: ${(dataVoltage.value.value.toFixed(2))}`);
        console.log(`torque: ${(dataTorque.value.value).toFixed(2)}`);
    }
    setInterval(read, 10000)
}