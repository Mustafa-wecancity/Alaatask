// nav.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  private _isNavOpen = new BehaviorSubject<boolean>(false);
  isNavOpen$ = this._isNavOpen.asObservable();

  toggleNav() {
    this._isNavOpen.next(!this._isNavOpen.value);
  }
}
