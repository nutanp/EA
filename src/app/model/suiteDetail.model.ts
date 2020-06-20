import {GrowthModelingService} from '../service/growthModeling.service';

export class SuiteDetail {
    LINE_ITEM_ID: string;
    LICENSE_DISCOUNT: string;
    NET_EA_LICENSE_AMOUNT : string;
    FOUNDATION_C1_CREDIT: string;
    ADVANCED_C1_CREDIT: string;
    FOUNDATION_ANCHOR_CREDIT: string;
    FOUNDATION_EA_QTY: string;
    ADVANCED_EA_QTY: string;
    ADVANCED_ANCHOR_CREDIT: string;
    NET_EA_SUPPORT_PRICE: string;
    NET_SWSS_RESIDUAL_AMOUNT: string;
    NET_TCV: string;
    NET_C1_CREDIT : string = "";
    NET_ANCHOR_CREDIT : string = "";
    NET_C1_CREDIT_toINT : number ;
    NET_ANCHOR_CREDIT_toINT : number;
    manualFndnQty : string = "0";
    manualAdvQty : string="0";
    suite : string;
    lineItemId : string;
    features: string;
    createdBy: string;
    prospectrefid : string;
    createdDate : string;

    public constructor(json: any, suiteType: string, prospectrefid){
        this.LINE_ITEM_ID = json.LINE_ITEM_ID;
        this.FOUNDATION_EA_QTY = json.FOUNDATION_EA_QTY;
        this.ADVANCED_EA_QTY = json.ADVANCED_EA_QTY;
        this.LICENSE_DISCOUNT = json.LICENSE_DISCOUNT;
        this.NET_EA_LICENSE_AMOUNT = json.NET_EA_LICENSE_AMOUNT;
        this.FOUNDATION_C1_CREDIT = json.FOUNDATION_C1_CREDIT;
        this.ADVANCED_C1_CREDIT = json.ADVANCED_C1_CREDIT;
        this.FOUNDATION_ANCHOR_CREDIT = json.FOUNDATION_ANCHOR_CREDIT;
        this.ADVANCED_ANCHOR_CREDIT = json.ADVANCED_ANCHOR_CREDIT;
        this.NET_EA_SUPPORT_PRICE = json.NET_EA_SUPPORT_PRICE;
        this.NET_SWSS_RESIDUAL_AMOUNT = json.NET_SWSS_RESIDUAL_AMOUNT;
        this.NET_TCV = json.NET_TCV;
        this.manualFndnQty = json.FOUNDATION_EA_QTY;
        this.manualAdvQty = json.ADVANCED_EA_QTY;
        this.suite = suiteType;

        //TODO : remove these once you change the API for naming consistency
        this.lineItemId = json.LINE_ITEM_ID;
        this.features = "Pricing";
        this.createdBy = "saprasa2";
        this.createdDate = "2017-02-10";
        this.prospectrefid = prospectrefid;        
        this.NET_C1_CREDIT_toINT = (+this.FOUNDATION_C1_CREDIT) + (+this.ADVANCED_C1_CREDIT)
        this.NET_C1_CREDIT = this.NET_C1_CREDIT_toINT.toString();
        this.NET_ANCHOR_CREDIT_toINT = (+this.FOUNDATION_ANCHOR_CREDIT) + (+this.ADVANCED_ANCHOR_CREDIT)
        this.NET_ANCHOR_CREDIT = this.NET_ANCHOR_CREDIT_toINT.toString();
    }
}

export class  SuiteDetailType{
    public static ACCESS_SWITCHING:string = 'ACCESS - SWITCHING';
    public static ACCESS_WIRELESS:string = 'ACCESS - WIRELESS';
    public static DATA_CENTER_CENTER:string = 'DATA CENTER - COMPUTE';
    public static DATA_CENTER_NETWORKING:string = 'DATA CENTER - NETWORKING';
    public static WAN:string = 'WAN';
    
}