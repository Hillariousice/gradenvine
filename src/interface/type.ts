import mongoose from "mongoose";

export interface ArgForReservation{
    id: string,
    time: string;
    dateOfBooking: Date;
    venue: string;
    cancelOfBooking: Date;
    table: string;
    reviews: mongoose.Types.ObjectId[];
}

export interface ArgForReview{
  id:string;
  rating: number;
  comment: string; 
}

export interface ArgForMeal{
    id: string,
    mainCourse: string;
    desert: string;
    sweetener: string;
    drink: string;
    isAvailable: boolean;
    timeOfDelivery: string;
}

export interface ArgForCafe{
  id:string;
  reservation: mongoose.Types.ObjectId[];
  venue: string[];
  name: string;
  meal: mongoose.Types.ObjectId[];
  isVerified: boolean;
  email: string;
  phone: string;
  password: string;
  token: string;
  salt: string;
  profileImage: string;
  dateCreate: Date;
  dateUpdate: Date;
  customer: mongoose.Types.ObjectId[];
}

export interface ArgForCustomer{
    id:string;
    firstName: string;
    lastName: string;
    isVerified: boolean;
    email: string;
    phone: string;
    token: string;
    salt: string;
    password: string;
    dateCreate: Date;
    dateUpdate: Date;
    profileImage: string;
  }


export interface ArgForCreateCustomer{
    firstName: string;
    lastName: string;
    email:string;
    password:string;
    
   
}
export interface CreateCustomer{
    input:ArgForCreateCustomer
}
export interface ArgForUpdateCustomerProfile{
    id: string,
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    profileImage: string;
}
export interface UpdateCustomerProfile{
    input: ArgForUpdateCustomerProfile
}

export interface ArgForUpdateCafeProfile{
    id: string,
    name: string;
    email: string;
    phone: string;
    password: string;
    profileImage: string;
}
export interface UpdateCafeProfile{
    input: ArgForUpdateCafeProfile
}


export interface ArgForLoginCustomer{
    id:string
    email:string;
    password:string;
   
}
export interface LoginCustomer{
    input: ArgForLoginCustomer
}

export interface CreateReservation{
    input:ArgForReservation
}
export interface ArgForUpdateReservation{
    id: string,
    time: string;
    dateOfBooking: Date;
    cancelOfBooking: Date;
    table: string;
}
export interface UpdateReservation{
    input: ArgForUpdateReservation
}

export interface DeleteReservation{
    id:string
}

export interface CreateReview{
    input:ArgForReview
}

export interface ArgForUpdateReview{
    id: string,
    rating: number;
    comment: string;
}
export interface UpdateReview{
    input: ArgForUpdateReview
}

export interface DeleteReview{
    id:string
}

export interface CreateMeal{
    input:ArgForMeal
}
export interface ArgForUpdateMeal{
    id: string,
    time: string;
    dateOfBooking: Date;
    cancelOfBooking: Date;
    table: string;
}
export interface UpdateMeal{
    input: ArgForUpdateMeal
}

export interface DeleteMeal{
    id:string
}

export interface CreateCafe{
    input:ArgForCafe
}
export interface ArgForUpdateCafe{
    id: string,
    time: string;
    dateOfBooking: Date;
    cancelOfBooking: Date;
    table: string;
}
export interface UpdateCafe{
    input: ArgForUpdateCafe
}

export interface DeleteCafe{
    id:string
}