import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { eyebrowsModel, eyesModel, faceModel, headModel, mouthModel, noseModel } from "./interface.model";

export class dataBase {

    public nose: noseModel[] = [];
    public eyes: eyesModel[] = [];
    public eyeBrows: eyebrowsModel[] = [];
    public mouth: mouthModel[] = [];
    public head: headModel[] = [];
    public face: faceModel[] = [];
    public head$: Subject<any>;

    public host: string = 'http://localhost:4200/upload';
    constructor(
        private http: HttpClient
    ){
        this.head$ = new Subject();
        this.http.get('assets/data.json').subscribe((data:any) =>{
            this.head$.subscribe((e)=>{
              this.eyeBrows = e.eyeBrows.items;
              this.eyes = e.eyes.items;
              this.nose = e.nose.items;
              this.mouth = e.mouth.items;
            });

            this.head$.next(data);
        } );
       
    }

 



}