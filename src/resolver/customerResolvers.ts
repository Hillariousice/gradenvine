import { ArgForCafe, ArgForCustomer, ArgForMeal, ArgForReservation, ArgForReview, CreateCustomer, CreateReservation, CreateReview, DeleteReservation, DeleteReview, LoginCustomer, UpdateCustomerProfile, UpdateReservation, UpdateReview } from "../interface/type"
import { Cafe } from "../model/cafeSchema"
import { Customer } from "../model/customerSchema"
import { Meal } from "../model/mealSchema"
import { Reservation } from "../model/reservationSchema"
import { Review } from "../model/reviewScheme"
import bcrypt, { genSalt } from 'bcryptjs'
import { signToken, verifyPassword } from "../utils"

export const CustomerResolvers = {
    Query: {
        getCustomers : async()=>{
            try{
                const customers = await Customer.find({})
                return customers
            } catch (err) {
                console.log(err)
            }
        },
        getCustomerById: async(_:unknown,args:ArgForCustomer) => {
            try{
                const singleCustomer = await Customer.findById(args.id)
                return singleCustomer
            } catch (err) {
                console.log(err)
            }
        },
        getReservationsByCustomId: async(_:unknown,args:ArgForReservation) => {
            try{
                const singleCustomerReservations = await Reservation.findById(args.id)
                return singleCustomerReservations
            } catch (err) {
                console.log(err)
            }
        },
        getReviewsByCustomId: async(_:unknown,args:ArgForReview) => {
            try{
                const singleCustomerReservations = await Review.findById(args.id)
                return singleCustomerReservations
            } catch (err) {
                console.log(err)
            }
        },
        getCafeByCustomId: async(_:unknown,args:ArgForCafe) => {
            try{
                const singleCustomerCafe = await Cafe.findById(args.id)
                return singleCustomerCafe
            } catch (err) {
                console.log(err)
            }
        },
        getMealsByCustomId: async(_:unknown,args:ArgForMeal) => {
            try{
                const singleCustomerMeal = await Meal.findById(args.id)
                return singleCustomerMeal
            } catch (err) {
                console.log(err)
            }
        },
    },

    Mutation : {
        registerCustomer: async(_:unknown, args: CreateCustomer) =>{
            try{
                const salt = await genSalt()
                const password = await bcrypt.hash(args.input.password, salt)
                const newCustomer={
                    firstName:args.input.firstName,
                    lastName:args.input.lastName,
                    password,
                    email:args.input.email,
                    salt
                }
                const  customerall = await Customer.create(newCustomer)
                if(customerall){
                    return {...newCustomer,_id:customerall._id}
                }
            }catch(err){
                console.log(err)
            }
    },
    loginCustomer:async (parent: any, args:LoginCustomer,context: any) => {
        try{
            const {password,email} = args.input



            const output = await Customer.findOne({email}) 
          
            const isValidPassword = await verifyPassword(args.input.password, password);
          
            if (!isValidPassword) {
              throw new Error("Invalid password");
              console.error("Invalid password");
            }
          
            return {
              id:args.input.id,
              email:args.input.email,
              token: signToken({ customerId:args.input.id }),
            };
         
          
        }catch(err: any){
         console.log(err)
        }
     },

     updateCustomerProfile:async(_:unknown,args:UpdateCustomerProfile)=>{
        try{
       const id = args.input.id
       const updateReservation={
                 id : args.input.id,
                 firstName: args.input.firstName,
                 lastName: args.input.lastName,
                 email: args.input.email,
                 phone: args.input.phone,
                 password: args.input.password,
                 profileImage: args.input.profileImage  
       }
       const updateNew = await Reservation.findByIdAndUpdate(id,updateReservation,{new:true})
       if(updateNew){
         return updateNew
     }
        }catch(err){
         console.log(err)
        }
      },
 

     createReservation:async(_:unknown,args:CreateReservation)=>{
        try{
            const newReservation = {
                time: args.input.time,
                dateOfBooking: args.input.dateOfBooking,
                cancelOfBooking: args.input.cancelOfBooking,
                table: args.input.table,
            }
            const reservation = await Reservation.create(newReservation)
            if(reservation){
                return reservation
            }
        }catch(err){

        }
    },

     updateReservation:async(_:unknown,args:UpdateReservation)=>{
       try{
      const id = args.input.id
      const updateReservation={
                id : args.input.id,
                time: args.input.time,
                dateOfBooking: args.input.dateOfBooking,
                cancelOfBooking: args.input.cancelOfBooking,
                table: args.input.table,
      }
      const updateNew = await Reservation.findByIdAndUpdate(id,updateReservation,{new:true})
      if(updateNew){
        return updateNew
    }
       }catch(err){
        console.log(err)
       }
     },

     deleteReservation: async(_:unknown,args:DeleteReservation)=>{
        try{
            
            const deleteOne =await Reservation.findById({_id:args.id})
            console.log(deleteOne)
            if(deleteOne){
                return {message:`Product with ${args.id} has been deleted`}
            }
        }catch(err){
            console.log(err)
        }
     },

     createReview:async(_:unknown,args:CreateReview)=>{
        try{
            const newReview = {
                rating: args.input.rating,
                comment: args.input.comment,
            }
            const review = await Review.create(newReview)
            if(review){
                return review
            }
        }catch(err){

        }
    },

     updateReview:async(_:unknown,args:UpdateReview)=>{
       try{
      const id = args.input.id
      const updateReview={
                id : args.input.id,
                rating: args.input.rating,
                comment: args.input.comment
      }
      const updateNew = await Review.findByIdAndUpdate(id,updateReview,{new:true})
      if(updateNew){
        return updateNew
    }
       }catch(err){
        console.log(err)
       }
     },

     deleteReview: async(_:unknown,args:DeleteReview)=>{
        try{
            
            const deleteOne =await Review.findById({_id:args.id})
            console.log(deleteOne)
            if(deleteOne){
                return {message:`Product with ${args.id} has been deleted`}
            }
        }catch(err){
            console.log(err)
        }
     } 
  
}
}