import { getProviders, signIn, useSession, signOut } from "next-auth/react";
import Note from "../components/Note"
import fetch from "isomorphic-unfetch";
import Button from "@mui/material/Button";
import { ImageList, ImageListItem } from "@mui/material";
import {useRouter} from "next/router"
import { Grid } from "semantic-ui-react";
import Image from 'next/image';
import { getSession } from 'next-auth/react'
export default function SignIn(props) {
  const router=useRouter()
  console.log(props)
  const { data: session, status } = useSession();
 /* console.log(status+"In home page")
  console.log(session+" session In home page")*/
  
  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "error") {
    return <p>Error: {session.error.message}</p>;
  }
 

  return (
    <>
      {!session ? (
        <Button variant="contained" color="secondary" onClick={() => signIn()}>
          Sign in with Google OR Email Password
        </Button>
      ) : 
     <Note notes={props.notes} />
    
      }
    </>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log(session+"in getServerSideProps")
  if(session){
 let res= await fetch("http://localhost:3000/api/notes")
 console.log("fetching data")
   res= await res.json();
 
 return { props: { providers: await getProviders(),notes:res.data}}

  //  return { props: {providers: await getProviders() } }
  
}else{
  return { props: { providers: await getProviders()}}
}
} 
 

  

/*<h2>{session.user.name}</h2>
              <p>You are signed in as {session.user.email}</p>
              
            
              {session.user.image ? (
                <ImageList>
                  
                    <ImageListItem cols={1} >
                      <Image src={session.user.image} height={200} width={200}
                      alt={session.user.name} 
                      />
                  </ImageListItem>
                </ImageList>
              ) : (
                ""
              )}
              
              <Button
                variant="contained"
                color="secondary"
                onClick={() => signOut()}
              >
                Sign out
              </Button>*/