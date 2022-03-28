import { Injectable } from '@angular/core';
import { ManageCanvasService } from './manage-canvas.service';

@Injectable({
  providedIn: 'root'
})
export class ManageTouchService {

  private touches: Touch[] = [];
  public event: any;

  public touched:boolean = false;

  constructor(
    private manageCanvas: ManageCanvasService
  ) { }

  public ontouch(event:TouchEvent){
      let touches = event.changedTouches;

      for(let i =0; i< touches.length; i++){
        this.touches.push(touches[i]);
        
      }
  }

  public touchmove(){
    
  }

}
