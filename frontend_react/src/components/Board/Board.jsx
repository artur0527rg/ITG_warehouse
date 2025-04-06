import { useEffect, useState } from "react";
import useAuthApi from "../../utils/useAuthApi";
import Header from "./Header/Header";
import Search from "./Search/Search";
import Storage from "./Storage/Storage";
import "./board.css";
import { useWs } from "../../utils/useWs";
import { useBoard } from "../../contexts/BoardProvider";

const Board = () => {
  const [selectedZone, selectZone] = useState();
  const apiClient = useAuthApi();
  const {
    selectedOrder,
    selectOrder,
    lines,
    setLines,
    places,
    setPlaces,
    orders,
    setOrders,
    pallets,
    setPallets,
  } = useBoard();
  const [wsReady, getWsMessages, wsSend, wsTrigger, ackMessage] = useWs();

  // Fetch zone data when selectedZone changes
  useEffect(() => {
    const fetchBoard = async () => {
      try {
        // Fetch lines
        let response;
        response = await apiClient.get("lines/", {
          params: {
            zone: selectedZone,
          },
        });
        const lines = response.data;
        setLines(lines);
        // Fetch places
        response = await apiClient.get("places/", {
          params: {
            line__in: lines.map((line) => line.id).toString(),
          },
        });
        const places = response.data;
        setPlaces(places);
        // Fetch pallets and orders
        response = await apiClient.get("pallets/", {
          params: {
            place__in: places.map((place) => place.id).toString(),
          },
        });
        const pallets = response.data;
        response = await apiClient.get("orders/", {
          params: {
            id__in: Array.from(
              new Set(pallets.map((pallet) => pallet.order))
            ).toString(),
          },
        });
        const orders = response.data;
        setOrders(orders);
        setPallets(pallets);
      } catch (error) {
        console.error("Failed to fetch zone:", error);
      }
    };

    if (selectedZone) {
      fetchBoard();
    }
  }, [selectedZone]);

  // Process WS messages
  useEffect(() => {
    const messages = getWsMessages();

    if (messages.length === 0) return;

    let palletsNeedUpdate = false;
    let ordersNeedUpdate = false;
    let orderNeedsUpdate = false;
    let updatedPallets = pallets;
    let updatedOrders = orders;
    let updatedOrder = selectedOrder;

    messages.forEach(({ uuid, type, event, data }) => {
      if (!type || !event || !data) return;

      if (type === "pallet.update") {
        palletsNeedUpdate = true;
        const orderData = data.order;
        const palletData = {
          ...data,
          order: orderData.id,
        };
        if (event === "delete") {
          updatedPallets = updatedPallets.filter(
            (pallet) => pallet.id !== palletData.id
          );
        } else if (event === "create") {
          updatedPallets = [...updatedPallets, palletData];
          if (!updatedOrders.find((order) => order.id === orderData.id)) {
            ordersNeedUpdate = true;
            updatedOrders = [...updatedOrders, orderData];
          }
        }
      }

      if (type === "order.update") {
        const orderData = data;

        if (event === "delete") {
          ordersNeedUpdate = true;
          updatedOrders = updatedOrders.filter(
            (order) => order.id !== orderData.id
          );

          if (selectedOrder?.id === orderData.id) {
            orderNeedsUpdate = true;
            updatedOrder = undefined;
          }
        }
      }

      ackMessage(uuid);
    });

    if (palletsNeedUpdate) {
      setPallets(updatedPallets);
    }

    if (ordersNeedUpdate) {
      setOrders(updatedOrders);
    }

    if (orderNeedsUpdate) {
      selectOrder(updatedOrder);
    }
  }, [wsTrigger]);

  return (
    <div className="board">
      <Header selectedZone={selectedZone} selectZone={selectZone} />
      <Search />
      {selectedZone && <Storage zone={selectedZone} />}
    </div>
  );
};

export default Board;
