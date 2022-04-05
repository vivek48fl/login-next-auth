import { useSession, signOut, signIn } from "next-auth/react";
import { ImageList, ImageListItem } from "@mui/material";
import { useRouter } from "next/router";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Link from "next/link";
import CardActions from "@material-ui/core/CardActions";
import { getSession } from "next-auth/react"
function Note({ notes }) {
  const { data: session } = useSession();
  const router=useRouter();

  return (
    <>
     {session ?
     <Button
     variant="contained"
     color="secondary"
     onClick={() => signOut()}
   >
     Sign out
   </Button>:<Button
     variant="contained"
     color="secondary"
     onClick={() => signIn()}
   >
     Sign In
   </Button>}
   
      {session ? (
         
        <div className="grid wrapper">
            <h2>Logged in as {session.user.name}</h2>
            {notes !==""?
          notes.map((note) => {
            return (
              <>
                <Card>
                  <CardContent>
                    <Link href={`/${note._id}`}>
                      <a>{note.title}</a>
                    </Link>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Click</Button>
                  </CardActions>
                </Card>
              </>
            );
          }):""}
        </div>
      ) : (
        "Not logged in"
      )}
    </>
  );
}
export async function getServerSideProps  (context)  {
  const res = await fetch("http://localhost:3000/api/notes");
  const session=getSession(context);
  console.log(session+"session in notes page")
if(session){
  const { data } = await res.json();
  console.log(data)
  return { props: {notes: data }}
}
  else{
    return{props:{notes:""}}
  }

};
export default Note;
