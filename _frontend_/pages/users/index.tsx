import {
  Paper,
  Typography,
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import { Person, ArrowForward } from "@mui/icons-material";
import Link from "next/link";
import { SxProps, CircularProgress } from "@mui/material";
// import { path } from "../../config";
import { list } from "../../lib/api-user";
import { Container } from "../../components/Container";
import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";

type UseStylesProps = {
  root: SxProps;
  title: SxProps;
};
const useStyles = (): UseStylesProps => ({
  root: {
    padding: "1rem",
    margin: "1rem",
  },
  title: {
    margin: "4px 0 2px",
    color: "black",
  },
});

const Users = ({ users: _users }) => {
  const [users, setUsers] = useState(_users);
  const [loading, setLoading] = useState(true);
  const [currentId, setCurrentId] = useState("");
  const classes = useStyles();
  const router = useRouter();
  useEffect(() => {
    // console.table(users);
    // const abortController = new AbortController();
    // const signal = abortController.signal;
    list().then((data) => {
      if (data && data.error) return console.log(data.error);
      // console.log(data);d
      setUsers(data);
      setLoading(false);
    });
    // return function cleanup() {
    //   abortController.abort();
    // };
  }, []);
  return (
    <Container title="Users">
      <Paper sx={classes.root}>
        <Typography variant="h6" sx={classes.title}>
          All Users
        </Typography>
        <List dense>
          {loading ? (
            <div>loading</div>
          ) : (
            // "hola"
            users.map(({ _id, name }, i) => {
              // if (router.isFallback)
              //   return <div> Loading...... desde users component </div>;
              return (
                <Fragment key={_id}>
                  <Link href="/user/[id]" as={`/user/${_id}`}>
                    <a onClick={() => setCurrentId(_id)}>
                      <ListItem button>
                        <ListItemAvatar>
                          <Avatar>
                            {currentId === _id ? (
                              <CircularProgress />
                            ) : (
                              <Person />
                            )}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={name} />
                        <ListItemSecondaryAction>
                          <IconButton>
                            <ArrowForward />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </a>
                  </Link>
                </Fragment>
              );
            })
          )}
        </List>
      </Paper>
    </Container>
  );
};

const getUsers = async () => {
  // const abortController = new AbortController();
  // const { signal } = abortController;
  // list(signal).then((data) => {
  //   if (data && data.error) return console.log(data.error);
  // });
  const data = await list();
  if (data && data.error) return console.log(data.error);
  return data;
};
export async function getStaticProps(context) {
  const users = await getUsers();
  return {
    props: {
      users,
    },
  };
}
// export async function getServerSideProps() {
//   return {
//     props: {},
//   };
// }
export default Users;
