import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { dataBase } from '../data';
import { eyebrowsModel, eyesModel, faceImgModel, faceModel, headModel, imgModel, mouthModel, noseModel } from '../interface.model';
import { ManageBrowsService } from '../manage-brows.service';
import { ManageCanvasService } from '../manage-canvas.service';
import { ManageDataService } from '../manage-data.service';
import { ManageEyesService } from '../manage-eyes.service';
import { ManageHeadService } from '../manage-head.service';
import { ManageMouthService } from '../manage-mouth.service';
import { ManageNoseService } from '../manage-nose.service';
import { ManageTouchService } from '../manage-touch.service';

@Component({
  selector: 'app-sketch',
  templateUrl: './sketch.component.html',
  styleUrls: ['./sketch.component.css']
})
export class SketchComponent implements OnInit {

  @ViewChild('sketch',{static:false})
  sketch: ElementRef<HTMLCanvasElement>;
  public context: CanvasRenderingContext2D;
  public face: faceModel = new faceModel();
  
  public select:string='head';

  public head: number | null= null;
  public nose: number | null= null;
  public eyes: number | null= null;
  public eyeBrows: number | null= null;
  public mouth: number | null= null;

  public imgs:faceImgModel = new faceImgModel();
  public intervalID:any;
  public on:{
              head:boolean,
              eyes:boolean,
              eyeBrows:boolean,
              nose:boolean,
              mouth:boolean
            } = {head:false,eyes:false,eyeBrows:false,nose:false,mouth:false};
  public imageDownload: HTMLImageElement = new Image();
  public bindIntervalId:any[]=[];
  public canvasMouseDown:boolean = false;
  constructor(
    private manageCanvas: ManageCanvasService,
    private manageData: ManageDataService,
    private manageEyes: ManageEyesService,
    private manageHead: ManageHeadService,
    private manageNose: ManageNoseService,
    private manageMouth: ManageMouthService,
    private manageEyeBrows: ManageBrowsService,
    private manageTouch: ManageTouchService,
    private cdr: ChangeDetectorRef,
   private data: dataBase
  ) { 
    
  }


  public ontouch(event:TouchEvent){
    this.manageTouch.ontouch(event);
  }

  public touchmove(evnt:TouchEvent){
    let evet:TouchList = evnt.changedTouches;
    let event:Touch = evet[0];
    
    switch(this.select){
      case 'head' : this.imgs.head.x=event.clientX-(this.imgs.head.width/2);
                    this.imgs.head.y=event.clientY-(this.imgs.head.height/2); 
                    break;
      case 'eyes' : this.imgs.eyes.l.x=event.clientX-(this.imgs.eyes.l.width/2);
                    this.imgs.eyes.l.y=event.clientY-(this.imgs.eyes.l.height/2); 
                    this.imgs.eyes.r.x= this.imgs.eyes.l.x + this.imgs.eyes.distance;
                    this.imgs.eyes.r.y=this.imgs.eyes.l.y ;
                    break;
      case 'brows' : this.imgs.eyeBrows.l.x=event.clientX-(this.imgs.eyeBrows.l.width/2);
                        this.imgs.eyeBrows.l.y=event.clientY-(this.imgs.eyeBrows.l.height/2); 
                        this.imgs.eyeBrows.r.x= this.imgs.eyeBrows.l.x + this.imgs.eyeBrows.distance;
                        this.imgs.eyeBrows.r.y=this.imgs.eyeBrows.l.y ;
                        break;
      case 'nose' : this.imgs.nose.x=event.clientX-(this.imgs.nose.width/2);
                    this.imgs.nose.y=event.clientY-(this.imgs.nose.height/2); 
                    break;
      case 'mouth' : this.imgs.mouth.x=event.clientX-(this.imgs.mouth.width/2);
                     this.imgs.mouth.y=event.clientY-(this.imgs.mouth.height/2); 
                      break;
      
    }
  }

  public canvasMngStart(event: MouseEvent){
    this.canvasMouseDown = true;
    
  }

  public canvasMngMove(event: MouseEvent){
    if(this.canvasMouseDown){
      
      switch(this.select){
        case 'head' : this.imgs.head.x=event.offsetX-(this.imgs.head.width/2);
                      this.imgs.head.y=event.offsetY-(this.imgs.head.height/2); 
                      break;
        case 'eyes' : this.imgs.eyes.l.x=event.offsetX-(this.imgs.eyes.l.width/2);
                      this.imgs.eyes.l.y=event.offsetY-(this.imgs.eyes.l.height/2); 
                      this.imgs.eyes.r.x= this.imgs.eyes.l.x + this.imgs.eyes.distance;
                      this.imgs.eyes.r.y=this.imgs.eyes.l.y ;
                      break;
        case 'brows' : this.imgs.eyeBrows.l.x=event.offsetX-(this.imgs.eyeBrows.l.width/2);
                          this.imgs.eyeBrows.l.y=event.offsetY-(this.imgs.eyeBrows.l.height/2); 
                          this.imgs.eyeBrows.r.x= this.imgs.eyeBrows.l.x + this.imgs.eyeBrows.distance;
                          this.imgs.eyeBrows.r.y=this.imgs.eyeBrows.l.y ;
                          break;
        case 'nose' : this.imgs.nose.x=event.offsetX-(this.imgs.nose.width/2);
                      this.imgs.nose.y=event.offsetY-(this.imgs.nose.height/2); 
                      break;
        case 'mouth' : this.imgs.mouth.x=event.offsetX-(this.imgs.mouth.width/2);
                       this.imgs.mouth.y=event.offsetY-(this.imgs.mouth.height/2); 
                        break;
        
      }
    }
  }

  public canvasMngEnd(){
    this.destSetInt();
    this.canvasMouseDown=false;
  }

  /*  HEAD HEAD HEAD HEAD  */
  public nextHead(num:number):void{
    this.imgs.head = this.manageHead.next(num);
    this.head = this.manageHead.headID;
  }

  public sizeHead(num:number):void{
    this.imgs.head = this.manageHead.size(num);
  }

  public reCoordHead(x:number=0,y:number=0):void{
    this.imgs.head = this.manageHead.reCoord(x,y);
  }


  /*  EYES  EYES  EYES  EYES  */
  public sizeEyes(num:number):void{
    this.imgs.eyes = this.manageEyes.size(num);
  }

  public reCoordEyes(x:number=0,y:number=0):void{
    this.imgs.eyes = this.manageEyes.reCoord(x,y);
  }

  
  public reCoordEyess(x:number=0,y:number=0):void{
    this.imgs.eyes = this.manageEyes.reCoord(x,y);
  }

  public distanceEyes(num:number):void{
    this.imgs.eyes = this.manageEyes.distance(num);
  }

  public nextEyes(num:number):void{
    this.imgs.eyes = this.manageEyes.next(num);
    this.eyes = this.manageEyes.eyesID;
  }

  // NOSE NOSE NOSE NOSE NOSE
  public nextNose(num:number):void{
    this.imgs.nose = this.manageNose.next(num);
    this.nose = this.manageNose.noseID;
  }

  public sizeNose(num:number):void{
    this.imgs.nose = this.manageNose.size(num);
  }

  public reCoordNose(x:number=0,y:number=0):void{
    this.imgs.nose = this.manageNose.reCoord(x,y);
  }

  public setInt(key:string,val:number){
    this.bindIntervalId.push(setInterval(()=>{
      switch(key){
        case 'head-x' : this.reCoordHead(val); break;
        case 'head-y' : this.reCoordHead(0,val); break;
        case 'eyes-x' : this.reCoordEyes(val); break;
        case 'eyes-y' : this.reCoordEyes(0,val); break;
        case 'eyeBrows-x' : this.reCoordEyeBrows(val); break;
        case 'eyeBrows-y' : this.reCoordEyeBrows(0,val); break;
        case 'nose-x' : this.reCoordNose(val); break;
        case 'nose-y' : this.reCoordNose(0,val); break;
        case 'mouth-x' : this.reCoordMouth(val); break;
        case 'mouth-y' : this.reCoordMouth(0,val); break;
        case 'head-size' : this.sizeHead(val); break;
        case 'eyeBrows-size' : this.sizeEyeBrows(val); break;
        case 'eyes-size' : this.sizeEyes(val); break;
        case 'nose-size' : this.sizeNose(val); break;
        case 'mouth-size' : this.sizeMouth(val); break;
        case 'eyes-distance' : this.distanceEyes(val); break;
        case 'eyeBrows-distance' : this.distanceEyeBrows(val); break;
        default: '';
      }
      },100));
  }

  public destSetInt(){
    for(let i =0; i < this.bindIntervalId.length; i++){
      clearInterval(this.bindIntervalId[i]);
    }
    
  }
  // MOUTH
  public nextMouth(num:number):void{
    this.imgs.mouth = this.manageMouth.next(num);
    this.mouth = this.manageMouth.mouthID;
  }

  public sizeMouth(num:number):void{
    this.imgs.mouth = this.manageMouth.size(num);
  }

  public reCoordMouth(x:number=0,y:number=0):void{
    this.imgs.mouth = this.manageMouth.reCoord(x,y);
  }

  public sizeEyeBrows(num:number):void{
    this.imgs.eyeBrows = this.manageEyeBrows.size(num);
  }

  public reCoordEyeBrows(x:number=0,y:number=0):void{
    this.imgs.eyeBrows = this.manageEyeBrows.reCoord(x,y);
  }
 

  public distanceEyeBrows(num:number):void{
    this.imgs.eyeBrows = this.manageEyeBrows.distance(num);
  }

  public nextEyeBrows(num:number):void{
    this.imgs.eyeBrows = this.manageEyeBrows.next(num);
    this.eyeBrows = this.manageEyeBrows.eyeBrowsID;
  }

  ngOnInit() {
   
  }

  ngOnDestroy(){
    clearInterval(this.intervalID);
  }


  ngAfterViewInit(): void {
    this.data.head$.subscribe((e)=>{
    this.manageCanvas.context = this.sketch.nativeElement.getContext('2d');
    
    this.imgs.head = this.manageHead.next(0);
    this.imgs.eyeBrows = this.manageEyeBrows.next(0);
    this.imgs.eyes = this.manageEyes.next(0);
    this.select = 'head';
    this.imgs.nose = this.manageNose.next(0);
    this.imgs.mouth = this.manageMouth.next(0);
    this.cdr.detectChanges();
    
    this.intervalID = setInterval(()=>{
      this.manageCanvas.clrRect(0,0,500,500);
      if(this.imgs.head.img.onload && this.on.head){
        this.manageCanvas.context.drawImage(this.imgs.head.img,this.imgs.head.x,this.imgs.head.y,this.imgs.head.width,this.imgs.head.height);
      }

      if(this.imgs.eyes.l.img.onload && this.imgs.eyes.r.img.onload && this.on.eyes){
        this.manageCanvas.context.drawImage(this.imgs.eyes.l.img,this.imgs.eyes.l.x,this.imgs.eyes.l.y,this.imgs.eyes.l.width,this.imgs.eyes.l.height);
        this.manageCanvas.context.drawImage(this.imgs.eyes.r.img,this.imgs.eyes.l.x+this.imgs.eyes.distance,this.imgs.eyes.l.y,this.imgs.eyes.r.width,this.imgs.eyes.r.height);
      }

      if(this.imgs.eyeBrows.l.img.onload && this.imgs.eyeBrows.r.img.onload && this.on.eyeBrows){
        this.manageCanvas.context.drawImage(this.imgs.eyeBrows.l.img,this.imgs.eyeBrows.l.x,this.imgs.eyeBrows.l.y,this.imgs.eyeBrows.l.width,this.imgs.eyeBrows.l.height);
        this.manageCanvas.context.drawImage(this.imgs.eyeBrows.r.img,this.imgs.eyeBrows.l.x+this.imgs.eyeBrows.distance,this.imgs.eyeBrows.l.y,this.imgs.eyeBrows.r.width,this.imgs.eyeBrows.r.height);
      }

      if(this.imgs.nose.img.onload && this.on.nose){
        this.manageCanvas.context.drawImage(this.imgs.nose.img,this.imgs.nose.x,this.imgs.nose.y,this.imgs.nose.width,this.imgs.nose.height);
      }

      if(this.imgs.mouth.img.onload && this.on.mouth){
        this.manageCanvas.context.drawImage(this.imgs.mouth.img,this.imgs.mouth.x,this.imgs.mouth.y,this.imgs.mouth.width,this.imgs.mouth.height);
      }
      this.imageDownload = this.manageCanvas.getImage(this.sketch.nativeElement);
    },100);
    
  });
  }
  
}
