import { createStyles } from '@mantine/core';
import { getTheme } from '../config/config';
import { BLUE_DARK_COLOR, PRIMARY_SHADE } from '../config/constants';

export default createStyles((theme) => ({
  image: {
    height: getTheme(theme) ? "100%" : "100%",
  },
  footerImage: {
    width: "200px",
  },
  heroImage: {
    width: "330px !important",
  },
  color: {
    color: getTheme(theme) ? theme.white : BLUE_DARK_COLOR,
  },
  title: {
    // color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontSize: 70,
    // fontWeight: 900,
    letterSpacing: -2,
    color: PRIMARY_SHADE[2],
    textTransform: "uppercase",

    [theme.fn.smallerThan('md')]: {
      fontSize: 50,
    },
  },
  homeTitle: {
    fontSize: 100,
    fontWeight: 700,
    letterSpacing: -2,
    color: PRIMARY_SHADE[2],
    textShadow: "0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #ff9a00, 0 0 70px #ff9a00, 0 0 80px #ff9a00, 0 0 100px #ff9a00, 0 0 150px #ff9a00",
    
    [theme.fn.smallerThan('md')]: {
      fontSize: 40,
    },
  },
  servicesTitle: {
    fontSize: 72,
    fontWeight: 600,
    letterSpacing: -2,
    lineHeight: 1,
    textTransform: "capitalize",
    color: theme.white,
    mixBlendMode: "lighten",
  },
  title2: {
    // color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    color: PRIMARY_SHADE[2],
    fontSize: 50,
    // fontWeight: 600,
    letterSpacing: -2,

    [theme.fn.smallerThan('md')]: {
      fontSize: 40,
    },
  },
  title3: {
    // color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    color: theme.white,
    fontSize: 50,
    // fontWeight: 600,
    letterSpacing: -2,

    [theme.fn.smallerThan('md')]: {
      fontSize: 40,
    },
  },
  title4: {
    color: theme.white,
    fontSize: 50,
    fontWeight: 600,
    letterSpacing: -2,

    [theme.fn.smallerThan('md')]: {
      fontSize: 30,
    },
  },

  planTitle: {
    color: PRIMARY_SHADE[2],
    fontSize: 40,
    fontWeight: 400,
    letterSpacing: -2,

    [theme.fn.smallerThan('md')]: {
      fontSize: 30,
    },
  },

  text: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[5],
    lineHeight: 1.5,
    letterSpacing: 0.5,
    textAlign: 'justify'

  },

  hero_icon: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[5],
  },

  tldtitle: {
    fontSize: "14px",
    fontWeight: 600,
    color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[5],
  },
  tldprice: {
    fontSize: "14px",
    fontWeight: 400,
    color: theme.colorScheme === 'dark' ? theme.white : theme.colors.dark[5],
  },
  absolute1: {
    borderRadius: theme.radius.lg,
    overflow: "hidden",
    background: `conic-gradient(from 45deg at 45% 57%, rgba(228, 60, 5, 1), rgba(230, 71, 18, 0.66))`,
    ":before": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "#e5e5f7",
      opacity: 0.1,
      backgroundImage: `linear-gradient(30deg, #444cf7 12%, transparent 12.5%, transparent 87%, #444cf7 87.5%, #444cf7), 
                        linear-gradient(150deg, #444cf7 12%, transparent 12.5%, transparent 87%, #444cf7 87.5%, #444cf7), 
                        linear-gradient(30deg, #444cf7 12%, transparent 12.5%, transparent 87%, #444cf7 87.5%, #444cf7), 
                        linear-gradient(150deg, #444cf7 12%, transparent 12.5%, transparent 87%, #444cf7 87.5%, #444cf7), 
                        linear-gradient(60deg, #444cf777 25%, transparent 25.5%, transparent 75%, #444cf777 75%, #444cf777), 
                        linear-gradient(60deg, #444cf777 25%, transparent 25.5%, transparent 75%, #444cf777 75%, #444cf777)`,
      backgroundSize: "20px 35px",
      backgroundPosition: "0 0, 0 0, 10px 18px, 10px 18px, 0 0, 10px 18px",
      zIndex: 1,
    }
  },

  arrowBox: {
    background: getTheme(theme) ? theme.colors.dark[7] : theme.colors.gray[2],
    padding: theme.spacing.xs,
    borderRadius: theme.radius.md,
    cursor: "pointer",
    ":hover": {
      ".icon": {
        animation: "arrow 1s infinite",
      }
    }
  },
  heroCardAbsolute: {
    zIndex: 1,
    position: "absolute",
    // bottom: 0,
    // left: "20px",
    width: "180px",
    height: "200px",
    // transform: "rotate(-15deg)",
    borderRadius: theme.radius.md,
    background: getTheme(theme) ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.3)",
  },
}));
