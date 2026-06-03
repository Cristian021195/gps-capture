import { QRShareIcon } from "../svg/FormIcons"
import { SmartphoneIcon, WarningIconFill } from "../svg/UtilsIcon"

export const DeviceScannerWarning = () => {
    return <div className="relative w-fit mx-auto mb-2 hithere">
              <div className="absolute bottom-24 left-24">
                  <WarningIconFill width={64} height={64} fill="#FBC02D"/>
              </div>
              <div className="flex justify-center">
                  <SmartphoneIcon width={128} height={128}/>
                  <div className="absolute mt-4">
                    <QRShareIcon width={56} height={56}/>
                  </div>
              </div>
          </div>
}