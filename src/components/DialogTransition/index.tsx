import React from "react";
import { TransitionProps } from "@material-ui/core/transitions";
import Slide from "@material-ui/core/Slide";

const DialogTransition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide direction="up" ref={ref} {...props} />;
});

export default DialogTransition;
