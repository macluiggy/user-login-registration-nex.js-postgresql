import { Container } from "../components/Container";
// import { makeStyles } from "@mui/styles";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { SxProps, Theme } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
// import unicornbikeImg from "../public/unicornbike.jpg";
// const unicornbikeImg = require("../public/unicornbike.jpg");
type TUseStyles = {
  card: SxProps<Theme>;
  media: SxProps;
  title: SxProps;
};
const useStyles = (): TUseStyles => ({
  card: {
    // textAlign: "center",
    maxWidth: 600,
    margin: "0 auto",
    marginTop: "5px",
  },
  title: {
    padding: `3px 2.5px 2px`,
    // color: theme.palette.text.secondary,
  },
  media: {
    minHeight: 400,
    margin: "0 auto",
    textAlign: "center",
    position: "relative",
    width: "100%",
    height: "100%",
  },
});

const Index = () => {
  const { media, card, title } = useStyles();
  return (
    <Container title="Home">
      <Card sx={card}>
        <Typography
          variant="h6"
          // className={title}
          sx={title}
        >
          Home Page
        </Typography>
        {/* <CardMedia
          // className={media}
          image={`${unicornbikeImg}`}
          title="Unicorn Bicycle"
        /> */}
        <CardMedia sx={media}>
          <Image
            src={"/unicornbike.jpg"}
            alt="Unicorn Bicycle"
            layout="fill"
            objectFit="cover"
            priority={true}
          />
        </CardMedia>
        <CardContent>
          <Typography>Welcome to the MERN Skeleton home page.</Typography>
          {/* <Link href={"/users"}>
            <a>Users</a>
          </Link> */}
        </CardContent>
      </Card>
    </Container>
  );
};
export default Index;
