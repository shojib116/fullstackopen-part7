import { forwardRef, useImperativeHandle, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(!visible);

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      {!visible && (
        <Button type="button" onClick={toggleVisibility} variant="contained">
          {props.buttonLabel}
        </Button>
      )}
      {visible && (
        <div>
          {props.children}
          <Button
            type="button"
            onClick={toggleVisibility}
            variant="contained"
            color="error"
          >
            cancel
          </Button>
        </div>
      )}
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
