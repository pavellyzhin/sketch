import { Injectable } from '@angular/core';
import { imgModel } from './interface.model';
import { ManageCanvasService } from './manage-canvas.service';
import { ManageDataService } from './manage-data.service';

@Injectable({
  providedIn: 'root'
})
export class ManageNoseService {

  public nose: imgModel = new imgModel();

  public noseID:number = 0;

  constructor(
    private manageData: ManageDataService,
    private manageCanvas: ManageCanvasService
  ) { }

  public next(num:number){
    this.noseID = (this.manageData.length.nose <= this.noseID+num) ? 0 : this.noseID+num;
    this.noseID = (0 > this.noseID) ? this.manageData.length.nose-1 : this.noseID;
    let a = this.manageData.getNose(this.noseID);
    this.nose = this.manageCanvas.createImage(this.manageData.host+a.url,{x:50,y:50},a.width,a.height);
    return this.nose;
  }

  public size(num:number){
    let newWH = this.manageData.reSize(this.nose,num);
    this.nose.width  = newWH.w;
    this.nose.height = newWH.h;
    return this.nose;
  }

  public reCoord(x:number=0,y:number=0){
    this.nose.x += x;
    this.nose.y += y;
    
    return this.nose;
  }
}
