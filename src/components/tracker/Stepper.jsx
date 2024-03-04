import React, { useCallback } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";

const HorizontalFlow = ({ data }) => {
  const flatArray = Object.entries(data).flatMap(([key, events]) =>
    events.map((event) => ({
      name: `${key}.${event.name}`,
      status: event.status,
      reason: event.reason,
    }))
  );

  console.log(flatArray);

  const initialNodes = [
    {
      id: "msa",
      sourcePosition: "right",
      type: "input",
      data: { label: "MSA" },
      position: { x: 0, y: 100 },
      style: { backgroundColor: "#00FF00" },
    },
    {
      id: "createExchange",
      sourcePosition: "right",
      targetPosition: "left",
      data: { label: "Create Exchange" },
      position: { x: 250, y: 0 },
    },
    {
      id: "orderCreateEvent",
      sourcePosition: "right",
      targetPosition: "left",
      data: { label: "Order Create Event" },
      position: { x: 250, y: 160 },
    },
    {
      id: "orderDeliveredEvent",
      sourcePosition: "right",
      targetPosition: "left",
      data: { label: "Order Delivered Event" },
      position: { x: 250, y: 300 },
    },
    {
      id: "createExchange.checkIMEI",
      sourcePosition: "right",
      targetPosition: "left",
      data: { label: "Check IMEI" },
      position: { x: 450, y: 0 },
    },
    {
      id: "createExchange.checkGSMA",
      sourcePosition: "right",
      targetPosition: "left",
      data: { label: "check GSMA" },
      position: { x: 650, y: 0 },
    },
    {
      id: "createExchange.checkDuplicateIMEI",
      sourcePosition: "right",
      targetPosition: "left",
      data: { label: "Check Duplicate IMEI" },
      position: { x: 850, y: 0 },
    },
    {
      id: "createExchange.createExchangeSavedInDB",
      type: "output",
      sourcePosition: "right",
      data: { label: "Create Exchange Saved In DB" },
      position: { x: 1050, y: 0 },
    },
    {
      id: "orderCreateEvent.queuedMessage",
      sourcePosition: "right",
      targetPosition: "left",
      data: { label: "Queued Message" },
      position: { x: 450, y: 160 },
    },
    {
      id: "orderCreateEvent.messageHistoryProcess",
      sourcePosition: "right",
      targetPosition: "left",
      data: { label: "Message History Process" },
      position: { x: 650, y: 160 },
    },
    {
      id: "orderCreateEvent.getExchangeDetails",
      sourcePosition: "right",
      targetPosition: "left",
      data: { label: "Get Exchange Details" },
      position: { x: 850, y: 160 },
    },
    {
      id: "orderCreateEvent.getOrderFromHybris",
      sourcePosition: "right",
      targetPosition: "left",
      data: { label: "Get Order From Hybris" },
      position: { x: 1050, y: 160 },
    },
    {
      id: "orderCreateEvent.creatingTradeInProcess(MTR)",
      sourcePosition: "right",
      targetPosition: "left",
      data: { label: "Creating TradeIn process (MTR)" },
      position: { x: 1250, y: 160 },
    },
    {
      id: "orderCreateEvent.orderStatusUpdate",
      type: "output",
      sourcePosition: "right",
      data: { label: "Order Status Update" },
      position: { x: 1450, y: 160 },
    },
    {
      id: "orderDeliveredEvent.queuedMessage",
      sourcePosition: "right",
      targetPosition: "left",
      data: { label: "Queued Message" },
      position: { x: 450, y: 300 },
    },
    {
      id: "orderDeliveredEvent.messageHistoryProcess",
      sourcePosition: "right",
      targetPosition: "left",
      data: { label: "Message History Process" },
      position: { x: 650, y: 300 },
    },
    {
      id: "orderDeliveredEvent.getExchangeDetails",
      sourcePosition: "right",
      targetPosition: "left",
      data: { label: "Get Exchange Details" },
      position: { x: 850, y: 300 },
    },
    {
      id: "orderDeliveredEvent.getOrderFromHybris",
      sourcePosition: "right",
      targetPosition: "left",
      data: { label: "Get Order From Hybris" },
      position: { x: 1050, y: 300 },
    },
    {
      id: "orderDeliveredEvent.confirmTradeInProcess(MTR)",
      type: "output",
      sourcePosition: "right",
      data: { label: "Confirm TradeIn process (MTR)" },
      position: { x: 1250, y: 300 },
    },
  ];
  const createExchangeConnection = [
    {
      id: "MSA-CreateExchange",
      source: "msa",
      target: "createExchange",
    },
    {
      id: "createExchange-createExchange.checkIMEI",
      source: "createExchange",
      target: "createExchange.checkIMEI",
    },
    {
      id: "createExchange.checkIMEI-createExchange.checkGSMA",
      source: "createExchange.checkIMEI",
      target: "createExchange.checkGSMA",
    },
    {
      id: "createExchange.checkGSMA-createExchange.checkDuplicateIMEI",
      source: "createExchange.checkGSMA",
      target: "createExchange.checkDuplicateIMEI",
    },
    {
      id: "createExchange.checkDuplicateIMEI-createExchange.createExchangeSavedInDB",
      source: "createExchange.checkDuplicateIMEI",
      target: "createExchange.createExchangeSavedInDB",
    },
  ];

  const orderCreateEventConnection = [
    {
      id: "msa-orderCreateEvent",
      source: "msa",
      target: "orderCreateEvent",
    },
    {
      id: "orderCreateEvent-orderCreateEvent.queuedMessage",
      source: "orderCreateEvent",
      target: "orderCreateEvent.queuedMessage",
    },
    {
      id: "orderCreateEvent.queuedMessage-orderCreateEvent.messageHistoryProcess",
      source: "orderCreateEvent.queuedMessage",
      target: "orderCreateEvent.messageHistoryProcess",
    },
    {
      id: "orderCreateEvent.messageHistoryProcess-orderCreateEvent.getExchangeDetails",
      source: "orderCreateEvent.messageHistoryProcess",
      target: "orderCreateEvent.getExchangeDetails",
    },
    {
      id: "orderCreateEvent.getExchangeDetails-orderCreateEvent.getOrderFromHybris",
      source: "orderCreateEvent.getExchangeDetails",
      target: "orderCreateEvent.getOrderFromHybris",
    },
    {
      id: "orderCreateEvent.getOrderFromHybris-orderCreateEvent.creatingTradeInProcess(MTR)",
      source: "orderCreateEvent.getOrderFromHybris",
      target: "orderCreateEvent.creatingTradeInProcess(MTR)",
    },
    {
      id: "orderCreateEvent.creatingTradeInProcess(MTR)-orderCreateEvent.orderStatusUpdate",
      source: "orderCreateEvent.creatingTradeInProcess(MTR)",
      target: "orderCreateEvent.orderStatusUpdate",
    },
  ];

  const orderDeliveredEventConnection = [
    {
      id: "msa-orderDeliveredEvent",
      source: "msa",
      target: "orderDeliveredEvent",
      reason: "hello"
    },
    {
      id: "orderDeliveredEvent-orderDeliveredEvent.queuedMessage",
      source: "orderDeliveredEvent",
      target: "orderDeliveredEvent.queuedMessage",
      reason: "hello"
    },
    {
      id: "orderDeliveredEvent.queuedMessage-orderDeliveredEvent.messageHistoryProcess",
      source: "orderDeliveredEvent.queuedMessage",
      target: "orderDeliveredEvent.messageHistoryProcess",
      reason: "hello"},
    {
      id: "orderDeliveredEvent.messageHistoryProcess-orderDeliveredEvent.getExchangeDetails",
      source: "orderDeliveredEvent.messageHistoryProcess",
      target: "orderDeliveredEvent.getExchangeDetails",
      reason: "hello"
    },
    {
      id: "orderDeliveredEvent.getExchangeDetails-orderDeliveredEvent.getOrderFromHybris",
      source: "orderDeliveredEvent.getExchangeDetails",
      target: "orderDeliveredEvent.getOrderFromHybris",
      reason: "hello"
    },
    {
      id: "orderDeliveredEvent.getOrderFromHybris-orderDeliveredEvent.creatingTradeInProcess(MTR)",
      source: "orderDeliveredEvent.getOrderFromHybris",
      target: "orderDeliveredEvent.creatingTradeInProcess(MTR)",
      reason: "hello"
    },
    {
      id: "orderDeliveredEvent.getOrderFromHybris-orderDeliveredEvent.confirmTradeInProcess(MTR)",
      source: "orderDeliveredEvent.getOrderFromHybris",
      target: "orderDeliveredEvent.confirmTradeInProcess(MTR)",
      reason: "hello"
    },
  ];

  let initialEdges = [
    ...createExchangeConnection,
    ...orderCreateEventConnection,
    ...orderDeliveredEventConnection,
  ];
  const redBoxStyle = { backgroundColor: "#FF0000" };
  const greenBoxStyle = { backgroundColor: "#00FF00" };
  const redStroke = { stroke: "#FF0000" };
  const greenStroke = { stroke: "#00FF00" };

  initialEdges = initialEdges.map((node) => {
    const name = node.id.split("-")[1];
    const filterOut = flatArray.find((da) => da.name === name);
    if (filterOut && filterOut.status === "Success") {
      node.style = greenStroke;
      const index = initialNodes.findIndex((obj) => obj.id === name);
      initialNodes[index].style = greenBoxStyle;
      if (
        (filterOut.name === "createExchange.checkIMEI" &&
        filterOut.status === "Success")
      ) {
        initialNodes[1].style = greenBoxStyle;
        node.style = greenStroke;
      }
      if (
        (filterOut.name === "orderCreateEvent.queuedMessage" &&
        filterOut.status === "Success")
      ) {
        initialNodes[2].style = greenBoxStyle;
        node.style = greenStroke;
      } 
      if (
        (filterOut.name === "orderDeliveredEvent.queuedMessage" &&
        filterOut.status === "Success")
      ) {
        initialNodes[3].style = greenBoxStyle;
        node.style = greenStroke;
      } 
    } else if (filterOut && filterOut.status === "Failed") {
      node.style = redStroke;
      const index = initialNodes.findIndex((obj) => obj.id === name);
      initialNodes[index].style = redBoxStyle;
    }
    return node;
  });

  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    []
  );

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        attributionPosition="bottom-left"
      />
    </div>
  );
};

export default HorizontalFlow;
