import { NavigateFunction } from 'react-router-dom';

export const navigateInsideWorkspace = (
  navigate: NavigateFunction,
  workspaceId: string | undefined,
  path: string
) => {
  navigate(`/workspace/${workspaceId}${path}`);
};
