import { Injectable } from '@angular/core';
import { imgModel } from './interface.model';
import { ManageCanvasService } from './manage-canvas.service';
import { ManageDataService } from './manage-data.service';

@Injectable({
  providedIn: 'root'
})
export class ManageHeadService {

  public head: imgModel = new imgModel();

  public headID:number = 0;

  constructor(
    private manageData: ManageDataService,
    private manageCanvas: ManageCanvasService
  ) { }

  public next(num:number){
    this.headID = (this.manageData.length.head <= this.headID+num) ? 0 : this.headID+num;
    this.headID = (0 > this.headID) ? this.manageData.length.head-1 : this.headID;
    let a = this.manageData.getHead(this.headID);
    this.head = this.manageCanvas.createImage(this.manageData.host+a.url,{x:50,y:50},a.width,a.height);
    
    return this.head;
    
    
  }

  public size(num:number){
    let newWH = this.manageData.reSize(this.head,num);
    this.head.width  = newWH.w;
    this.head.height = newWH.h;
    return this.head;
  }

  public reCoord(x:number=0,y:number=0){
    this.head.x += x;
    this.head.y += y;
    
    return this.head;
  }
}
