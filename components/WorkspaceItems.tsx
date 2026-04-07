"use client";

import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { getProductById, getMonitorLayout, SLOT_MAP, DESK_CONFIGS } from "@/data/products";
import { useShallow } from "zustand/react/shallow";
import WorkspaceModel from "./WorkspaceModel";
import FallbackModel from "./FallbackModel";

const WorkspaceItems = () => {
  const selectedDesk = useWorkspaceStore((s) => s.selectedDesk);
  const selectedChair = useWorkspaceStore((s) => s.selectedChair);
  const { monitorSelections } = useWorkspaceStore(
    useShallow((s) => ({ monitorSelections: s.monitorSelections }))
  );
  const selectedTech = useWorkspaceStore((s) => s.selectedTech);
  const selectedKeyboard = useWorkspaceStore((s) => s.selectedKeyboard);
  const selectedMouse = useWorkspaceStore((s) => s.selectedMouse);
  const selectedAccessories = useWorkspaceStore((s) => s.selectedAccessories);
  const surfaceY = useWorkspaceStore((s) => s.getSurfaceY());

  // Flatten monitor selections into a list of monitor objects
  const selectedMonitors: ReturnType<typeof getProductById>[] = [];
  Object.entries(monitorSelections).forEach(([id, count]) => {
    const product = getProductById(id);
    if (product) {
      for (let i = 0; i < count; i++) {
        selectedMonitors.push(product);
      }
    }
  });

  const monitorLayout = getMonitorLayout(selectedMonitors.length);

  // Helper: render a single slotted product
  const renderSlotted = (id: string, keyPrefix: string) => {
    const product = getProductById(id);
    if (!product) return null;
    const slots = SLOT_MAP[product.category];
    if (!slots || !slots[0]) return null;
    const slot = slots[0];

    return (
      <WorkspaceModel
        key={`${keyPrefix}-${id}`}
        modelPath={product.modelPath}
        position={[
          slot.position[0],
          slot.position[1] + surfaceY,
          slot.position[2],
        ]}
        scale={product.scale}
        rotation={[
          (slot.rotation?.[0] || 0) + (product.rotation?.[0] || 0),
          (slot.rotation?.[1] || 0) + (product.rotation?.[1] || 0),
          (slot.rotation?.[2] || 0) + (product.rotation?.[2] || 0),
        ]}
        autoAnchorBottom={true}
        fallback={
          <FallbackModel
            type="accessory"
            position={[
              slot.position[0],
              slot.position[1] + surfaceY,
              slot.position[2],
            ]}
            rotation={[
              (slot.rotation?.[0] || 0) + (product.rotation?.[0] || 0),
              (slot.rotation?.[1] || 0) + (product.rotation?.[1] || 0),
              (slot.rotation?.[2] || 0) + (product.rotation?.[2] || 0),
            ]}
          />
        }
      />
    );
  };

  return (
    <group>
      {/* ── Desk ── */}
      {selectedDesk && (() => {
        const desk = getProductById(selectedDesk);
        if (!desk) return null;
        const deskConfig = DESK_CONFIGS[desk.id];
        const pos = deskConfig?.modelPosition || [0, 0, 0];
        return (
          <WorkspaceModel
            key={desk.id}
            modelPath={desk.modelPath}
            position={pos}
            scale={desk.scale}
            rotation={desk.rotation}
            fallback={<FallbackModel type="desk" position={pos} />}
          />
        );
      })()}

      {/* ── Chair ── */}
      {selectedChair && (() => {
        const chair = getProductById(selectedChair);
        if (!chair) return null;

        const slot = SLOT_MAP.chair[0];
        const offset = chair.positionOffset || [0, 0, 0];
        const finalPosition: [number, number, number] = [
          slot.position[0] + offset[0],
          slot.position[1] + offset[1],
          slot.position[2] + offset[2],
        ];

        return (
          <WorkspaceModel
            key={chair.id}
            modelPath={chair.modelPath}
            position={finalPosition}
            scale={chair.scale}
            rotation={slot.rotation || chair.rotation}
            fallback={
              <FallbackModel
                type="chair"
                position={finalPosition}
                rotation={slot.rotation || chair.rotation}
              />
            }
          />
        );
      })()}

      {/* ── Monitors ── */}
      {selectedMonitors.map((monitor, i) => {
        if (!monitor) return null;
        const layout = monitorLayout[i];
        if (!layout) return null;
        return (
          <WorkspaceModel
            key={`monitor-${monitor.id}-${i}`}
            modelPath={monitor.modelPath}
            position={[
              layout.position[0],
              layout.position[1] + surfaceY,
              layout.position[2],
            ]}
            scale={monitor.scale}
            rotation={[
              layout.rotation[0] + (monitor.rotation?.[0] || 0),
              layout.rotation[1] + (monitor.rotation?.[1] || 0),
              layout.rotation[2] + (monitor.rotation?.[2] || 0),
            ]}
            autoAnchorBottom={true}
            fallback={
              <FallbackModel
                type="monitor"
                position={[
                  layout.position[0],
                  layout.position[1] + surfaceY,
                  layout.position[2],
                ]}
                rotation={[
                  layout.rotation[0] + (monitor.rotation?.[0] || 0),
                  layout.rotation[1] + (monitor.rotation?.[1] || 0),
                  layout.rotation[2] + (monitor.rotation?.[2] || 0),
                ]}
              />
            }
          />
        );
      })}

      {/* ── Tech (computer) ── */}
      {selectedTech && renderSlotted(selectedTech, "tech")}

      {/* ── Keyboard ── */}
      {selectedKeyboard && renderSlotted(selectedKeyboard, "keyboard")}

      {/* ── Mouse ── */}
      {selectedMouse && renderSlotted(selectedMouse, "mouse")}

      {/* ── Accessories (lamp, mic, toys, etc.) ── */}
      {selectedAccessories.map((accId) => renderSlotted(accId, "acc"))}
    </group>
  );
};

export default WorkspaceItems;
