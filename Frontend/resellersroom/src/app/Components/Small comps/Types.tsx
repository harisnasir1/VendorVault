import { hasCustomGetInitialProps } from "next/dist/build/utils"

export type labeltype={
  label:{name:string,
  col:string,
  },
  _id:string,
}
export type Suggest = {
  _id: string;
  Stockxid: string;
  stockxitem:[{
    name:string,
    image:string
  }];
  labels:labeltype[]
  
  sku: string;
  Name: string;
  slug: string;
  brand: string;
  image: string;
  Description:string
  createdAt: string;
  updatedAt: string;
};

 export type Custprop={
   
  _id:string,
  first_name:string,
  last_name:string,
  Name:String,
  email:string,
  total_spent:string,
  orders_count:string,
  customerfrom:string,
  address:{
    adress1:string,
    city:string,
    zip:string,
    country:string,
  }

}
interface Label {
  label: {
    name: string;
    col: string;
  };
}

interface StockXItem {
  image: string;
  name: string;
}

export interface Task {
  _id:string
  id: number;
  Name: string;
  condition: string;
  size: string;
  stage: string;
  createdAt: string;
  stockxitem: StockXItem[];
  labels: labeltype[];
  Description:string
}