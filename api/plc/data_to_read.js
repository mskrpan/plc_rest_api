import { AttributeIds } from "node-opcua";

export const def_nodes = (attId) => {
    const nodeToReadAmps = {nodeId:"ns=3;s=\"OPCUA\".amps", attributeId:AttributeIds.Value}
    const nodeToReadVoltage = {nodeId:"ns=3;s=\"OPCUA\".voltage", attributeId:AttributeIds.Value}
    const nodeToReadTorque = {nodeId:"ns=3;s=\"OPCUA\".torque", attributeId:AttributeIds.Value}

    const nodes = { nodeToReadAmps, nodeToReadTorque, nodeToReadVoltage}
    return nodes;
}