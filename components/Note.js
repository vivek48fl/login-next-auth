import { useSession, signOut, signIn } from "next-auth/react";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Link from "next/link";
import Image from "next/image";
import CardActions from "@material-ui/core/CardActions";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
function Note({ notes }) {
  const { data: session } = useSession();
  console.log(session, "in NOte component");
  return (
    <>
    <Grid container display="flex" direction="row" justifyContent="space-between">
      <Grid item alignSelf="center">
      {session ? (
        <Button variant="contained" onClick={() => signOut()}>
          signOut
        </Button>
      ) : (
        <Button onClick={() => signIn()}>Signin</Button>
      )}
      </Grid>
      {session.user.image ? (
        <Image
          src={session.user.image}
          alt="profile img"
          height={100}
          width={100}
        />
      ) : (
        ""
      )}
      </Grid>
      <Box sx={{textAlign: "center",marginBottom:"3px"}}>
      <Typography variant="h5"  >
        Logged in as{" "}
        {session.user.name ? session.user.name : session.user.email}
      </Typography>
      </Box>
      <div className="grid wrapper">
        {notes.map((note) => {
          return (
            <>
              <Card variant="outlined">
                <CardContent>
                  <Link href={`/${note._id}`}>
                    <Typography variant="h5" Component="p" color="text.primary">
                      {note.title}
                    </Typography>
                  </Link>
                  <Typography variant="body2">{note.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" variant="contained">
                    Click
                  </Button>
                </CardActions>
              </Card>
            </>
          );
        })}
      </div>
    </>
  );
}
/*export async function getServerSideProps(context) {
  const res = await fetch("http://localhost:3000/api/notes");
  //const data = await res.json();
  console.log(res.data)
  return {

    props: {notes:res.data},// will be passed to the page component as props
  }
}*/

export default Note
