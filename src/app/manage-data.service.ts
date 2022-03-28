import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { dataBase } from './data';
import { eyebrowsModel, eyesModel, faceModel, headModel, mouthModel, noseModel } from './interface.model';


@Injectable({
  providedIn: 'root'
})
export class ManageDataService {

  public length: {
                    face:number,
                    nose:number,
                    head:number,
                    mouth:number,
                    eyes:number,
                    eyeBrows:number
                  } = {face:0,nose:0,head:0,mouth:0,eyeBrows:0,eyes:0};
  public host: string= '';
  public data: any;
  constructor(
    private dataS: dataBase
  ) { 
    this.host = dataS.host;
    this.dataS.head$.subscribe((e)=>{
      this.data = e;
      this.length.eyeBrows = this.data.eyeBrows.items.length;
      this.length.eyes  = this.data.eyes.items.length  ;
      
      this.length.head  = this.data.head.items.length  ;
      this.length.nose  = this.data.nose.items.length  ;
      this.length.mouth = this.data.mouth.items.length ; 
    }); 
  }


  public distance(item:eyesModel|eyebrowsModel,num:number):eyebrowsModel|eyesModel{
    item.distance+=num;
    item.x += num/2;
    return item;
  }

  public reSize(item:eyesModel|any,num:number):{w:number,h:number} {
    let ratio: number = (item.width > item.height)
                          ? item.width / item.height
                          : item.height / item.width ;
    if(item.width > item.height) {

      item.width += num;
      item.height = item.width / ratio;

    } else {

      item.height += num;
      item.width = item.height / ratio;

    }

    return {w:item.width,h:item.height};
  }


  public reCoord(item:any,x:number=0,y:number=0){
    item.x += x;
    item.y += y;

    return item;
    
  }


  public getEye(id:number):eyesModel{
    if(id >= this.data.eyes.length){
      return this.data.eyes.items[0];
    } else {
      if(id < 0){
        return this.data.eyes.items[this.data.eyes.items.length-1];
      }else {
        return this.data.eyes.items[id];
      }
    }
  }

  public getMouth(id:number):mouthModel{
    if(id >= this.data.mouth.length){
      return this.data.mouth.items[0];
    } else {
      if(id < 0) {
        return this.data.mouth.items[this.data.mouth.items.length-1];
      } else {
        return this.data.mouth.items[id];
      }
      
    }
  }

  public getBrows(id:number):eyebrowsModel{
    if(id >= this.data.eyeBrows.items.length){
      return this.data.eyeBrows.items[0];
    } else {
      if(id < 0){
        return this.data.eyeBrows.items[this.data.eyeBrows.items.length];
      } else {
        return this.data.eyeBrows.items[id];
      }
    }
  }

  public getNose(id:number):noseModel{
    if(id >= this.data.nose.items.length){
      return this.data.nose.items[0];
    } else {
      if(id < 0){
        return this.data.nose.items[this.data.nose.items.length-1];
      }else {
        return this.data.nose.items[id];
      }
    }
  }

  

  public getHead(id:number):headModel{
    
    if(id >= this.data.head.items.length){
      id=0;
      return this.data.head.items[0] ? this.data.head.items[0] : new headModel();
    } else {
      if(id < 0){
        id=this.data.head.items.length-1;
        return this.data.head.items[this.data.head.items.length-1];
      } else {
        return this.data.head.items[id];
      }
    }
  }
}

