import React, { useState } from 'react';
import { usePopper } from 'react-popper';

const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} {...props} className="FancyButton" style={{height: 34}}>
    {props.children}
  </button>
));
FancyButton.defaultProps = {
  disabled: true,
};

const Example = () => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
    modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);

/*
      <button type="button" ref={setReferenceElement} onClick={handleClick}>
        Toggle Open
      </button>
*/

  return (
    <>
      <FancyButton ref={setReferenceElement} disabled={false} onClick={handleClick}>
        Toggle Open
      </FancyButton>

      { open &&
        <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
          Popper element
          <div ref={setArrowElement} style={styles.arrow} />
        </div>
      }
    </>
  );
};

const App = () => {
  return (
    <div>
      <Example />
    </div>
  )
};

export default App;
