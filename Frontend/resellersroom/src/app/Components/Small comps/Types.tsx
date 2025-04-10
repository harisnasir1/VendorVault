import { hasCustomGetInitialProps } from "next/dist/build/utils"

export type Suggest={
  _id: string,
  Stockxid: string,
  sku: string,
  name:string,
  slug: string,
  brand: string,
  image:  string,
  createdAt: string,
  updatedAt: string,
}
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

