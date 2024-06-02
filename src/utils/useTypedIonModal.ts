import { ReactComponentOrElement, useIonModal } from "@ionic/react";
import type { ModalOptions } from "@ionic/core/components";
import type { HookOverlayOptions } from "@ionic/react/dist/types/hooks/HookOverlayOptions";

/**
 * useTypedIonModal defines:
 * @type T Type defining what other props can be passed to Modal
 * @type K Type defining data returning from Modal component
 * @returns Returns inside values of dismiss (data: K) and closing role (role: string)
 **/

export const useTypedIonModal = <T extends GeneralModalType<K>, K = any>(
  component: ReactComponentOrElement,
  componentProps?: T,
): NewUseIonModalResult<K> => {
  return useIonModal(component, componentProps as T) as unknown as NewUseIonModalResult<K>;
};

export type NewUseIonModalResult<K> = [
  (options?: Omit<ModalOptions, "component" | "componentProps"> & HookOverlayOptions) => void,
  (data?: K, role?: string) => void
]

export type GeneralModalType<K = any> = { dismiss: (data?: K, role?: string) => void };