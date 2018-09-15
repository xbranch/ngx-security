import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService implements StorageService {

  private session: { [key: string]: any } = {};

  constructor() {
  }

  get(key: string): any {
    return this.session[key];
  }

  put(key: string, value: any): void {
    this.session[key] = value;
  }

  remove(key: string): void {
    delete this.session[key];
  }

  clear(): void {
    this.session = {};
  }
}
