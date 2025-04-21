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
  labels:labeltype
  label:labeltype
  sku: string;
  Name: string;
  slug: string;
  brand: string;
  image: string;
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

