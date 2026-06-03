import { useNavigate, useLocation } from "react-router-dom";
//v:'bottommodal' | 'actionsheet' | 'modal' | 'panel' | 'popupbox'|undefined

/**
 * valores de updateParams({ emergent: 'bottommodal' | 'actionsheet' | 'modal' | 'panel' | 'popupbox' })
 * @returns un actualizador de parametros url con efectos sobre renderizado
 */
export const useUpdateSearchParams = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    updates: Record<string, string | null>,
    options?: { replace?: boolean }
  ) => {
    const params = new URLSearchParams(location.search);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    navigate(
      {
        pathname: location.pathname,
        search: params.toString(),
      },
      { replace: options?.replace }
    );
  };
};