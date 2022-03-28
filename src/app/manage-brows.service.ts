import { Injectable } from '@angular/core';
import { imgModel } from './interface.model';
import { ManageCanvasService } from './manage-canvas.service';
import { ManageDataService } from './manage-data.service';

@Injectable({
  providedIn: 'root'
})
export class ManageBrowsService {

 
  public eyeBrows: {l:imgModel,r:imgModel,distance:number} = {l:new imgModel(),r:new imgModel(), distance:0};
  public eyeBrowsID:number = 0;

  constructor(
    private manageData: ManageDataService,
    private manageCanvas: ManageCanvasService
  ) { }

  public size(num:number){
    let newWH = this.manageData.reSize(this.eyeBrows.l,num);
    this.eyeBrows.l.width  = newWH.w;
    this.eyeBrows.l.height = newWH.h;
    this.eyeBrows.r.width  = newWH.w;
    this.eyeBrows.r.height = newWH.h;

    return this.eyeBrows;
  }

  public reCoord(x:number=0,y:number=0){
    this.eyeBrows.l.x += x;
    this.eyeBrows.r.x += x;
    this.eyeBrows.l.y += y;
    this.eyeBrows.r.y += y;
    
    return this.eyeBrows;
  }

  public distance(num:number){
    this.eyeBrows.distance += num;
    return this.eyeBrows;
  }

  public next(num:number){
    // для этого нужно взять текущий head[i]
    // и прибавить значение
    this.eyeBrowsID = (this.manageData.length.eyeBrows <= this.eyeBrowsID+num) ? 0 : this.eyeBrowsID+num;
    this.eyeBrowsID = (this.eyeBrowsID < 0) ? this.manageData.length.eyeBrows-1 : this.eyeBrowsID;
    
    let a = this.manageData.getBrows(this.eyeBrowsID);
    this.eyeBrows.l =this.manageCanvas.createImage(this.manageData.host+a.left  , {x:50, y:50}, a.width, a.height);
    this.eyeBrows.r =this.manageCanvas.createImage(this.manageData.host+a.right , {x:50+a.distance, y:50}, a.width, a.height);
    this.eyeBrows.distance = a.distance;

    return this.eyeBrows;
  }

}
