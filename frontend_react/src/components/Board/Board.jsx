import { useEffect, useState } from "react";
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

/** Updates a pallet in the specified location */
function updatePallet(zone, palletData) {
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

/** Removes all pallets associated with an order (when order is deleted) */
function deletePalletsByOrderId(zone, orderId) {
  if (!zone?.lines) return zone;

  return {
    ...zone,
    lines: zone.lines.map((line) => ({
      ...line,
      places: line.places.map((place) =>
        place.pallet?.order?.id === orderId
          ? { ...place, pallet: null } // Remove the pallet
          : place
      ),
    })),
  };
}

// Main Component

const Board = () => {
  const [selectedZone, selectZone] = useState();
  const [currentZone, setCurrentZone] = useState();
  const { order, setOrder } = useOrder();
  const apiClient = useAuthApi();
  const [wsReady, wsVal, wsSend] = useWs();

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

  // Handle WebSocket messages
  useEffect(() => {
    if (!wsVal) return;

    try {
      const { type, event, data } = JSON.parse(wsVal);
      if (!type || !event || !data) return;

      if (type === "pallet.update") {
        setCurrentZone((prev) => {
          if (event === "delete") {
            return deletePallet(prev, data.id);
          } else {
            return updatePallet(prev, data);
          }
        });
      } else if (type === "order.update") {
        setOrder((prev) => {
          if (!prev) return;
          if (data.id !== prev.id) return prev;

          if (event === "delete") {
            return undefined;
          } else if (event === "update") {
            return data;
          }
        });
        setCurrentZone((prev) => {
          if (event === "delete") {
            // If order is deleted → remove all associated pallets
            return deletePalletsByOrderId(prev, data.id);
          } else {
            // If order is updated → update it in all pallets
            return updateOrderInAllPallets(prev, data);
          }
        });
      }
    } catch (error) {
      console.error("Failed to parse WebSocket message:", error);
    }
  }, [wsVal]);

  return (
    <div className="board">
      <Header selectedZone={selectedZone} selectZone={selectZone} />
      <Search />
      {currentZone && <Storage zone={currentZone} />}
    </div>
  );
};

export default Board;
