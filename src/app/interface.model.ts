export class eyesModel {
    public left: string;
    public right: string;
    public distance: number;
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    constructor(leftEye:string='',rightEye:string='',distance:number=0,x:number=0,y:number=0,width:number=0,height:number=0){
        this.left = leftEye;
        this.right = rightEye;
        this.distance = distance;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

export class mouthModel {
    public url: string;
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    constructor(mouth:string='',x:number=0,y:number=0,width:number=0,height:number=0){
        this.url = mouth;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }
}

export class noseModel {
    public url: string;
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    constructor(nose:string='',x:number = 0,y:number = 0,width:number=0,height:number=0){
        this.url = nose;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

export class eyebrowsModel {
    public left: string;
    public right: string;
    public distance: number;
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    constructor(leftBrow:string='',rightBrow:string='',distance:number=0,x:number=0,y:number=0,width:number=0,height:number=0){
        this.left = leftBrow;
        this.right = rightBrow;
        this.distance = distance;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

export class headModel {
    public url:string;
    public x:number;
    public y:number;
    public width: number;
    public height: number;

    constructor(head:string='',x:number=50,y:number=50,width:number=50,height:number=50){
        this.url = head;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

export class faceModel {
    public head: headModel;
    public eyes: eyesModel;
    public nose: noseModel;
    public eyeBrows: eyebrowsModel;
    public mouth: mouthModel;

    constructor(head:headModel=new headModel(),eyes:eyesModel=new eyesModel(),nose:noseModel=new noseModel(),eyesBrows:eyebrowsModel=new eyebrowsModel(),mouth:mouthModel=new mouthModel()){
        this.eyeBrows = eyesBrows;
        this.eyes  = eyes;
        this.mouth = mouth;
        this.nose  = nose;
        this.head = head;
    }

}


export class imgModel {
    public img:HTMLImageElement;
    public loaded:boolean;
    public x:number;
    public y:number;
    public width:number;
    public height:number;
    public ratio?: number;

    constructor(img?:HTMLImageElement,
    loaded:boolean=false,x:number=0,y:number=0,width:number=1,height:number=1){
        this.img = img;
        this.loaded = loaded;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.ratio = width/height;

    }
}

export class imgDoubleModel {
    public img:HTMLImageElement;
    public imgSec:HTMLImageElement;
    public loaded:boolean;
    public x:number;
    public y:number;
    public width:number;
    public height:number;
    public ratio?: number;
    public distance: number;

    constructor(
        img?:HTMLImageElement,
        imgSec?:HTMLImageElement,
        loaded:boolean=false,
        x:number=0,
        y:number=0,
        width:number=1,
        height:number=1,
        distance:number=1
    ){
        this.img = img;
        this.imgSec = imgSec;
        this.loaded = loaded;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.ratio = width/height;
        this.distance = distance;
    }
}


export class faceImgModel{
    public head: imgModel;
    public eyes: {l:imgModel,r:imgModel,distance:number};
    public nose: imgModel;
    public eyeBrows: {l:imgModel,r:imgModel,distance:number};;
    public mouth: imgModel;

    constructor(
        head:imgModel=new imgModel(),
        eyes:{l:imgModel,r:imgModel,distance:number}={l:new imgModel(),r:new imgModel(),distance:1},
        nose:imgModel=new imgModel(),
        eyesBrows:{l:imgModel,r:imgModel,distance:number}={l:new imgModel(),r:new imgModel(),distance:1},
        mouth:imgModel=new imgModel){
        this.eyeBrows = eyesBrows;
        this.eyes  = eyes;
        this.mouth = mouth;
        this.nose  = nose;
        this.head = head;
    }

}
