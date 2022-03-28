import { Injectable } from '@angular/core';
import { imgModel } from './interface.model';
import { ManageCanvasService } from './manage-canvas.service';
import { ManageDataService } from './manage-data.service';

@Injectable({
  providedIn: 'root'
})
export class ManageMouthService {

  public mouth: imgModel = new imgModel();

  public mouthID:number = 0;

  constructor(
    private manageData: ManageDataService,
    private manageCanvas: ManageCanvasService
  ) { }

  public next(num:number){
    this.mouthID = (this.manageData.length.mouth <= this.mouthID+num) ? 0 : this.mouthID+num;
    this.mouthID = (0 > this.mouthID) ? this.manageData.length.mouth-1 : this.mouthID;
    let a = this.manageData.getMouth(this.mouthID);
    this.mouth = this.manageCanvas.createImage(this.manageData.host+a.url,{x:50,y:50},a.width,a.height);
    return this.mouth;
  }

  public size(num:number){
    let newWH = this.manageData.reSize(this.mouth,num);
    this.mouth.width  = newWH.w;
    this.mouth.height = newWH.h;
    return this.mouth;
  }

  public reCoord(x:number=0,y:number=0){
    this.mouth.x += x;
    this.mouth.y += y;
    
    return this.mouth;
  }
}
