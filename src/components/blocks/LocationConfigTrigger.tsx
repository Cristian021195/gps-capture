import { Button, List, ListItem, Preloader } from "konsta/react"
import { useGeolocation, useLocationPermission } from "../../hooks/useGeolocation";
import { useIntl } from "react-intl";

export const LocationConfigTrigger = () => {
    const { loading, error, requestLocation } = useGeolocation();
    const geo_permission = useLocationPermission();
    const {formatMessage:tr} = useIntl();

    return <List strong className="bg-transparent dark:bg-transparent">
        <ListItem
          label
          title={tr({id:'location'})}
          className="mb-0 pb-0"
          after={
            loading
            ? <div className="mx-auto text-center w-36"><Preloader/></div>
            : <Button title="Ver" small className="w-fit k-btn-tonal" onClick={requestLocation}>
              { tr({id:'gps.'+geo_permission}) }
            </Button>
          }
          >
          {
            error ? <div className="mx-6 italic">
                <small>
                    {tr({id:error})}
                </small>
            </div>
            : <div className="mx-6 italic">
                <small>
                    {tr({id:'gps.advice'})}
                </small>
            </div>
          }
          
        </ListItem>        
    </List>
}

export const LocationConfigAdvice = () => {
    const { loading, error, requestLocation } = useGeolocation();
    const geo_permission = useLocationPermission();
    const {formatMessage:tr} = useIntl();

    if(geo_permission !== 'granted'){
        return <div className="mx-4">
            {
                loading
                ? <div className="mx-auto text-center w-36"><Preloader/></div>
                : <Button title="Ver" small className="w-fit k-btn-tonal mx-auto" onClick={requestLocation}>
                { tr({id:'gps.'+geo_permission}) }
                </Button>
            }
        </div>
    }
    return <div className="mx-4">
        {
            error && <div className="mx-6 italic">
                <small>
                    {tr({id:error})}
                </small>
            </div>
        }
    </div>
}