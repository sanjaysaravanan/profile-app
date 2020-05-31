/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  dotSpan: {
    padding: 8,
    marginRight: 5,
    borderRadius: "50%",
    [theme.breakpoints.down("sm")]: {
      padding: 5
    }
  },
  dotMain: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      bottom: 15
    }
  }
}));

export default function({ slides, activeSlide }) {
  const classes = useStyles();

  function Dot({ active }) {
    return (
      <span
        css={css`
          background: ${active ? "white" : "grey"};
        `}
        className={classes.dotSpan}
      />
    );
  }

  return (
    <div className={classes.dotMain}>
      {slides.map((slide, i) => (
        <Dot key={slide} active={activeSlide === i} />
      ))}
    </div>
  );
}
