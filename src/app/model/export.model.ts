export interface ExportModel {

}

export interface sellwish{
    item:{
        article: number;
        quantity: number;
    }
}

export interface selldirect{
    item:{
        article: number;
        quantity: number;
        price: number;
        penalty: number;
    }
}

export interface orderlist{
    order:{
        article: number;
        quantity: number;
        modus: number;
    }
}

export interface productionlist{
    production:{
        article: number;
        quantity: number;
    }
}

export interface workingtimelist{
    workingtime:{
        station: number;
        shift: number;
        overtime: number;
    }
}
