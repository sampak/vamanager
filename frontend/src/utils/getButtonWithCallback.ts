import { VisibleButton } from './getVisibleButtons';

export const getButtonWithCallback = <T extends string>(
  callbacks: { [x in T]?: () => void },
  button: VisibleButton
) => {
  if (!button) {
    return null;
  }

  if (callbacks[button.key]) {
    return callbacks[button.key];
  }
};
