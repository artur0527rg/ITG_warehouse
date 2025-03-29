import { useEffect, useRef, useState } from "react";
import useAuthApi from "../../utils/useAuthApi";
import Header from "./Header/Header";
import Search from "./Search/Search";
import Storage from "./Storage/Storage";
import "./board.css";
import { useWs } from "../../utils/useWs";
import { useOrder } from "../../contexts/OrderProvider";

// Helper Functions

/** Removes a pallet by its ID */
function deletePallet(zone, palletId) {
  if (!zone?.lines) return zone;

  return {
    ...zone,
    lines: zone.lines.map((line) => ({
      ...line,
      places: line.places.map((place) =>
        place.pallet?.id === palletId ? { ...place, pallet: null } : place
      ),
    })),
  };
}

/** Create a pallet in the specified location */
function createPallet(zone, palletData) {
  if (!zone?.lines) return zone;

  return {
    ...zone,
    lines: zone.lines.map((line) => ({
      ...line,
      places: line.places.map((place) =>
        place.id === palletData.place ? { ...place, pallet: palletData } : place
      ),
    })),
  };
}

/** Updates order information in all pallets */
function updateOrderInAllPallets(zone, orderData) {
  if (!zone?.lines) return zone;

  return {
    ...zone,
    lines: zone.lines.map((line) => ({
      ...line,
      places: line.places.map((place) => {
        if (!place.pallet || place.pallet.order?.id !== orderData.id) {
          return place; // Skip if pallet isn't associated with this order
        }
        return {
          ...place,
          pallet: {
            ...place.pallet,
            order: orderData, // Update order data
          },
        };
      }),
    })),
  };
}

// Main Component

const Board = () => {
  const [selectedZone, selectZone] = useState();
  const [currentZone, setCurrentZone] = useState();
  const { order, setOrder } = useOrder();
  const apiClient = useAuthApi();
  const [wsReady, getWsMessages, wsSend, wsTrigger, ackMessage] = useWs();

  // Fetch zone data when selectedZone changes
  useEffect(() => {
    const fetchZone = async () => {
      try {
        const zone = await apiClient(`zones/${selectedZone}`);
        setCurrentZone(zone.data);
      } catch (error) {
        console.error("Failed to fetch zone:", error);
      }
    };

    if (selectedZone) {
      fetchZone();
    }
  }, [selectedZone]);

  // Process WS messages
  useEffect(() => {
    const messages = getWsMessages();

    if (messages.length === 0) return;

    let zoneNeedsUpdate = false;
    let updatedZone = currentZone;
    let orderNeedsUpdate = false;
    let updatedOrder = order;

    messages.forEach(({ uuid, type, event, data }) => {
      if (!type || !event || !data) return;

      if (type === "pallet.update") {
        zoneNeedsUpdate = true;
        if (event === 'delete'){
          updatedZone = deletePallet(updatedZone, data.id)
        } else if (event === 'create') {
          updatedZone = createPallet(updatedZone, data)
        }
      }

      if (type === "order.update") {
        if(order?.id === data.id){
          orderNeedsUpdate = true;
          if (event === 'delete'){
            updatedOrder = undefined;
          } else if (event === 'update') {
            updatedOrder = data
          }
        }

        if (event === 'update') {
          zoneNeedsUpdate = true;
          updatedZone = updateOrderInAllPallets(updatedZone, data);
        }
      }

      ackMessage(uuid);
    });

    if (zoneNeedsUpdate) {
      setCurrentZone(updatedZone);
    }

    if (orderNeedsUpdate) {
      setOrder(updatedOrder);
    }
  }, [wsTrigger]);

  return (
    <div className="board">
      <Header selectedZone={selectedZone} selectZone={selectZone} />
      <Search />
      {currentZone && <Storage zone={currentZone} />}
    </div>
  );
};

export default Board;
