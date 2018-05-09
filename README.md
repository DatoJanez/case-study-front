# case-study-front
Frontend application for case study


For compiling application Rollup is used. It compiles typescript, rolles it up, finaly uglifyes. Treeshaking can be added here. 
`rollup -c rollup-config.js`
 
[Annyang](https://github.com/DatoJanez/case-study-front/blob/master/src/annyang.ts)
Wrapper class for Annyang library. Handles speech recognition and command matching tasks.

[App](https://github.com/DatoJanez/case-study-front/blob/master/src/app.ts)
Application Bootstrap class. Declares all clases

[Converter](https://github.com/DatoJanez/case-study-front/blob/master/src/converter.ts)
Converts correncies and subscribes to convert streams

[Online](https://github.com/DatoJanez/case-study-front/blob/master/src/online.ts)
Online class listens to network and fires stream on network status changes.

[ServiceWorkerController](https://github.com/DatoJanez/case-study-front/blob/master/src/service-worker-controller.ts)
A class for registering and controlling service worker

[DataCollector](https://github.com/DatoJanez/case-study-front/blob/master/src/data-collector.ts)
Fetches data and decides which source to use.

[dexye](https://github.com/DatoJanez/case-study-front/blob/master/src/dexye.ts)
Wrapper class for Dexie. With methods for indexedDb

[Dom](https://github.com/DatoJanez/case-study-front/blob/master/src/dom.ts)
Dom manipulation class

[ServiceWorker](https://github.com/DatoJanez/case-study-front/blob/master/sw/data-synchroniser.service.js)
Which enablas application cache and offline accessebility
