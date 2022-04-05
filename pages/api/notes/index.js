import clientPromise from "../../../lib/mongodb";
import {useSession }from "next-auth/react";
import { getSession } from 'next-auth/react'
const handler=async (req, res) => {
  
  const session = await getSession({req});
  
  
 try{
if(req.method === "GET"){
  const session = await getSession({req});
  console.log("session", session)
  const client = await clientPromise;
 
  const db= await client.db('test')
  const data=await db.collection('notes').find({}).toArray();

  res.status(200).json({success: true,data:data,session:session});


}
  
  else{
    res.status(400).json({success:false,message:"User is not authenticated"})
  }
 }

catch(e){
  console.log(e);
}

}
  export default handler;