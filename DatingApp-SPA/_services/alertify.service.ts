import { Injectable } from '@angular/core';

// 'declare' is used to tell the compiler 'this thing (usually a variable) exists already,
//  and therefore can be referenced by other code, also there is no need to compile this statement
//   into any JavaScript"
declare let alertify: any;

@Injectable({
  providedIn: 'root',
})
export class AlertifyService {
  constructor() {}

  confirm(message: string, okCallBack: () => any) {
    alertify.confirm(message, function (e) {
      if (e) {
        okCallBack();
      } else {
      }
    });
  }

  success(message: string) {
    alertify.success(message);
  }
  error(message: string) {
    alertify.error(message);
  }
  warning(message: string) {
    alertify.warning(message);
  }
  message(message: string) {
    alertify.message(message);
  }
}
