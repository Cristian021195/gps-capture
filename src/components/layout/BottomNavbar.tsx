import { Icon, Tabbar, TabbarLink } from "konsta/react"
import { useLocation, useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";
import { BoxSeamIcon, GpsIcon, PinMapIcon } from "../svg/UtilsIcon";
import { RouteIcon } from "../svg/FormIcons";

export const BottomNavbar = () => {
    const navigate = useNavigate();
    const {formatMessage:tr} = useIntl(); 
    const {pathname} = useLocation();
    return (
      <Tabbar bgClassName="bg-[#FAF9FE] dark:bg-[#131B1C]" className={`left-0 bottom-0 fixed ${pathname.match(/(?:^|\/)(info|privacy|config|instructivo|lang|notfound|proveedores|pruebas)(?:\/|$)/) && 'hidden'}`}>
          <TabbarLink 
            className="k-title"
            active={pathname === '/'}
            onClick={()=>{
              navigate('/',{replace:true});
            }}
            icon={
                <Icon
                  className="py-1 k-title"
                  ios={<PinMapIcon/>}
                  material={<PinMapIcon/>}
                />
            }
            label={<p>{tr({id:'home'})}</p>}
          />
          <TabbarLink 
            className="k-title"
            active={pathname === '/ruta'}
            onClick={()=>{
              navigate('/ruta',{replace:true});
            }}
            icon={
                <Icon 
                  className="py-1 k-title"
                  ios={<RouteIcon/>}
                  material={<RouteIcon/>}
                />
            }
            label={<p>{tr({id:'ruta'})}</p>}
          />
          <TabbarLink 
            className="k-title"
            active={pathname === '/coordenadas'}
            onClick={()=>{
              navigate('/coordenadas');
            }}
            icon={
                <Icon
                  className="py-1 k-title"
                  ios={<GpsIcon/>}
                  material={<GpsIcon/>}
                />
            }
            label={<p>{tr({id:'coordenadas'})}</p>}
          />
          <TabbarLink 
            className="k-title"
            active={pathname === '/gestion-proveedores'}
            onClick={()=>{
              navigate('/gestion-proveedores');
            }}
            icon={
                <Icon
                  className="py-1 k-title"
                  ios={<BoxSeamIcon/>}
                  material={<BoxSeamIcon/>}
                />
            }
            label={<p>{tr({id:'prov.sm'})}</p>}
          />
      </Tabbar>
    );
}