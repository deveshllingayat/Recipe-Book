import { Injectable } from '@angular/core';

//it is recommended to provide services using @Injectable({provideIn:'root'}) or in app.module
//if you provide it in other modules like providers:[Service] and they are lazy loaded then that module will have a different instance of 
//the same service, even if you provided that service in shared module i.e eagrly-loaded module(module imported in app.module) and you import that shared module in a lazy loaded module
//then that lazy loaded module will have another instance of the service
@Injectable({ providedIn: 'root' })
export class LoggingService {
  lastlog: string;
  printLog(message: string) {
    console.log(message);
    console.log(this.lastlog);
    this.lastlog = message;
  }
}
