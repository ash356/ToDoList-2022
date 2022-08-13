import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class MethodsService {
  vis: boolean;
  constructor() { this.vis = false; }

  hide() { this.vis = false; }

  show() { this.vis = true; }

  toggle() { this.vis = !this.vis; }

}
