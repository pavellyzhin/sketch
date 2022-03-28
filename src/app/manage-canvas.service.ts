import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManageCanvasService {

  context: CanvasRenderingContext2D;

  constructor() { }

  public clrRect(x:number,y:number,width:number,height:number){
    this.context.clearRect(x,y,width,height);
  }

  public fillRect(x:number,y:number,width:number,height:number,color:string='black'){
    this.context.fillStyle = color;
    this.context.fillRect(x,y,width,height);
  }

  public strokeRect(x:number, y:number, width:number, height:number,color:string='black'){
    this.context.strokeStyle = color;
    this.context.strokeRect(x,y,width,height);
  }

  public createImage(url,coordinate:{x:number,y:number},width:number=1,height:number=1){
    let img = new Image();
    img.src = url;
    
    img.width = width;
    img.height = height;
    
    let loaded:boolean = false;
    img.onload = function(){
      loaded = true;
      
      
    }
    return {img:img,loaded:loaded,x:coordinate.x,y:coordinate.y,width:width,height:height};

    
  }
 


  public fon(url,fillRectVal:{x:number,y:number,width:number,height:number},repeat:string='repeat'){
    let img = new Image();
    img.src = url;
    let c = this.context;
    
           
      var pattern = c.createPattern(img, repeat);
      c.fillStyle = pattern;
      c.fillRect(fillRectVal.x, fillRectVal.y, fillRectVal.width, fillRectVal.height);
    
  }

  public getImage(canvas){
    var imageData = canvas.toDataURL();
    var image = new Image();
    image.src = imageData;
    return image;
  }
 
}
