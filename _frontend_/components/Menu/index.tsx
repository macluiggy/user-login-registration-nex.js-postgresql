import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";
import Link from "next/link";
import auth from "../../lib/auth-helper";
import { useRouter } from "next/router";

const isActive = (currentPathname: string, pathname: string) => {
  return currentPathname === pathname
    ? { color: "#f50057" }
    : { color: "#ffffff" };
};

export default function Menu() {
  // const { pathname, push } = useRouter();
  // if (process.browser) {
  //   // client-side-only code
  // }
  const router = useRouter();
  const pathname = router.pathname;
  const push = router.push;
  let id = "";
  if (pathname == "/user/[id]") {
    id = router.query.id.toString();
  }
  // console.log(pathname, "here is pathname");
  // console.log(id, "here is the id");
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          MERN Skeleton
        </Typography>
        <Link href="/">
          <a>
            <IconButton aria-label="Home" style={isActive(pathname, "/")}>
              <HomeIcon />
            </IconButton>
          </a>
        </Link>
        <Link href="/users">
          <a>
            <Button style={isActive(pathname, "/users")}>Users</Button>
          </a>
        </Link>
        {!auth.isAuthenticated() && (
          <span>
            <Link href="/signup">
              <a>
                <Button style={isActive(pathname, "/signup")}>Sign Up</Button>
              </a>
            </Link>
            <Link href="/signin">
              <a>
                <Button style={isActive(pathname, "/signin")}>Sign In</Button>
              </a>
            </Link>
          </span>
        )}
        {auth.isAuthenticated() && (
          <span>
            <Link
              href="/user/[id]"
              as={`/user/${auth.isAuthenticated().user._id}`}
            >
              <a>
                <Button
                  style={isActive(
                    pathname.replace("[id]", id),
                    `/user/${auth.isAuthenticated().user._id}`
                  )}
                >
                  My Profile
                </Button>
              </a>
            </Link>
            <a>
              <Button
                style={{ color: "#ffffff" }}
                onClick={() => {
                  auth.clearJWT(() => push("/"));
                }}
              >
                Sign out
              </Button>
            </a>
          </span>
        )}
      </Toolbar>
    </AppBar>
  );
}

export async function gesServerSideProps() {
  return {
    props: {},
  };
}
