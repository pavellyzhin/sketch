import { Injectable } from '@angular/core';
import { imgModel } from './interface.model';
import { ManageCanvasService } from './manage-canvas.service';
import { ManageDataService } from './manage-data.service';

@Injectable({
  providedIn: 'root'
})
export class ManageEyesService {

  public eyes: {l:imgModel,r:imgModel,distance:number} = {l:new imgModel(),r:new imgModel(), distance:0};
  public eyesID:number = 0;

  constructor(
    private manageData: ManageDataService,
    private manageCanvas: ManageCanvasService
  ) { }

  public size(num:number){
    let newWH = this.manageData.reSize(this.eyes.l,num);
    this.eyes.l.width  = newWH.w;
    this.eyes.l.height = newWH.h;
    this.eyes.r.width  = newWH.w;
    this.eyes.r.height = newWH.h;

    return this.eyes;
  }

  public reCoord(x:number=0,y:number=0){
    this.eyes.l.x += x;
    this.eyes.r.x += x;
    this.eyes.l.y += y;
    this.eyes.r.y += y;
    
    return this.eyes;
  }

  public distance(num:number){
    this.eyes.distance += num;
    return this.eyes;
  }

  public next(num:number){
    // для этого нужно взять текущий head[i]
    // и прибавить значение
    this.eyesID = (this.manageData.length.eyes <= this.eyesID+num) ? 0 : this.eyesID+num;
    this.eyesID = (this.eyesID < 0) ? this.manageData.length.eyes-1 : this.eyesID;
    
    let a = this.manageData.getEye(this.eyesID);
    this.eyes.l =this.manageCanvas.createImage(this.manageData.host+a.left  , {x:50, y:50}, a.width, a.height);
    this.eyes.r =this.manageCanvas.createImage(this.manageData.host+a.right , {x:50+a.distance, y:50}, a.width, a.height);
    this.eyes.distance = a.distance;

    return this.eyes;
  }

}
